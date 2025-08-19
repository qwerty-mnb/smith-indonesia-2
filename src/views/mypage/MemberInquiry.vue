<template>
  <!-- Inquiry Body -->
  <div class="mx-4">
    <div class="row" v-if="!showInquiryForm && showInquiry && !showInquiryDetail">
    </div>
    <div class="modal-body-center">
      <div class="table-history">
        <div class="inquiry-button dflex-ac-jc">
          <button class="btn mb-2 btn-red-bg text-white" type="button" @click="deleteinquiry(false)">
            {{ $t("inquiry.Delete") }}
          </button>
          <button class="btn mb-2 btn-red-bg text-white" type="button" @click="deleteinquiry(true)">
            {{ $t("inquiry.DeleteAll") }}
          </button>
          <button  type="button" class="btn-orange mb-2"  @click="readAllInquiry(false)">
            {{ $t("inquiry.Read") }}
          </button>
          <button class="btn-orange mb-2" type="button" @click="readAllInquiry(true)">
            {{ $t("inquiry.ReadAll") }}
          </button>
        </div>
        <table class="bs-table" style="text-align: center; margin-top: 25px; cursor: pointer">
          <thead>
            <tr>
              <th v-for="col in columns" :key="col">{{ $t(col) }}</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="(inq, idx) in paginatedList" :key="idx"
              :class="{ 'new-msg-tr': inq.state === 2 || inq.state === 4 }">
              <td class="d-flex align-items-center justify-content-center">
                <input style="cursor: pointer;" type="checkbox" class="quesChk" :value="parseInt(inq.id)"
                  v-model="deleteSelectedInq" />
                <i class="fas fa-circle-info new-msg-icn" :style="{
                  visibility:
                    inq.state === 2 || inq.state === 4 ? 'visible' : 'hidden',
                }"></i>
              </td>
              <td @click="selectInquiry(inq)">
                {{
                  inq.title === "DEPOSIT_ACCOUNT_REQUEST"
                  ? $t("inquiry.DepositAccReq")
                  : inq.title
                }}
              </td>
              <td @click="selectInquiry(inq)">{{ inq.createdAt }}</td>
              <td @click="selectInquiry(inq)">
                {{ $t("inquiry.State." + inq.state) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pager-div" v-if="!showInquiryForm && showInquiry && !showInquiryDetail">
        <ul class="Pagination">
          <li class="PaginationControl" v-for="index in pages" :key="index">
            <button @click="getInquiry(index)" :class="{ 'Page-active': currentPage === index }" :style="{
              'background-color':
                currentPage === index ? 'rgb(220, 237, 255)' : 'transparent',
            }" class="Page" type="button">
              {{ index }}
            </button>
          </li>
        </ul>
      </div>
      <div v-if="showInquiryDetail">
        <span class="text-white">{{ $t("inquiry.Title") }}</span>
        <div class="message-content message-title">
          <div class="inner-container">
            <div v-if="selectedInquiry.title === 'DEPOSIT_ACCOUNT_REQUEST'">
              {{ $t("inquiry.DepositAccReq") }}
            </div>
            <div v-html="selectedInquiry.title" v-else></div>
          </div>
        </div>
        <span class="text-white" v-if="selectedInquiry.body !== 'DEPOSIT_ACCOUNT_REQUEST'">{{
          $t("inquiry.Body")
        }}</span>
        <div class="message-content message-title" v-if="selectedInquiry.body !== 'DEPOSIT_ACCOUNT_REQUEST'">
          <div class="inner-container">
            <div v-html="selectedInquiry.body"></div>
          </div>
        </div>
        <span class="text-white">{{ $t("inquiry.Resp") }}</span>
        <div class="message-content">
          <div class="inner-container">
            <QuillEditor toolbar="#my-toolbar" :content="selectedInquiry.reply" readOnly="true" :key="selectedInquiry.id"></QuillEditor>
            <div id="my-toolbar">
              <button class="ql-bold"></button>
              <button class="ql-italic"></button>
            </div>
            <!-- <div v-html="selectedInquiry.reply"></div> -->
          </div>
        </div>
      </div>
      <!-- back button -->
      <div class="modal-footer" v-if="showInquiryDetail">
        <div class="form-footer dflex-ac-jc">
          <button type="submit" class="btn btn-black-bg text-white" @click="displayList()">
            {{ $t("inquiry.List") }}
          </button>
        </div>
      </div>
      <!-- Write inquiry button -->
      <div class="modal-footer text-right" v-if="!showInquiryForm && showInquiry && !showInquiryDetail">
        <div class="form-footer dflex-ac-jc">
          <button type="button" class="btn mr-2 btn-purple-bg text-white" @click="showInquiryForm = true">
            {{ $t("inquiry.Write") }}
          </button>
          <button type="button" :disabled="isLoading" v-if="authStore.user.shoplevel < 2" class="btn btn-black-bg text-white" @click="requestAccount()">
            {{ $t("header.AccountRequest") }}
          </button>
        </div>
      </div>
      <WriteInquiry :showInquiryForm="showInquiryForm" :showInquiry="showInquiry" :showInquiryDetail="showInquiryDetail"
        @writeField="displayList" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { QuillEditor } from "@vueup/vue-quill";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
import CloseModal from "@/components/CloseModal.vue";
import WriteInquiry from "./WriteInquiry.vue";
import SocketService from "@/services/SocketService";
import ApiService from "@/services/ApiService";

interface Inquiry {
  id: number;
  title: string;
  body: string;
  reply: string;
  state: number;
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  name: "Inquiry",
  components: {
    WriteInquiry,
    QuillEditor,
    CloseModal,
  },
  setup() {
    // vue variables
    const { t } = useI18n();
    const authStore = useAuthStore();

    const showInquiryForm = ref(false);
    const showInquiry = ref(true);
    const showInquiryDetail = ref(false);
    const selectedInquiry = ref({});
    //
    const columns = ["", "table.Subject", "table.Date", "inquiry.StateColumn"];

    const inquiries: any  = ref<Array<Inquiry>>([]);
    let list: Inquiry[] = [];
    const paginatedList = ref([]);
    const deleteSelectedInq = ref([]);
    const pageCount = ref(1);
    const pages = ref(1);
    const currentPage = ref(1);

    const content = ref({});
    const isLoading = ref(false);

    /**
     * Get History
     *
     */
    const getInquiry = async (idx: number) => {
      currentPage.value = idx;
      if (currentPage.value == 1) {
        list = await ApiService.get("/inquiry")
          .then((res) => res.data)
          .catch(() => []);
        inquiries.value = arrayPager(list, 10);
        pages.value = inquiries.value.length;
        paginatedList.value = inquiries.value[currentPage.value - 1];
      } else {
        paginatedList.value = inquiries.value[currentPage.value - 1];
      }
    };

    const readAllInquiry = async (isAll: boolean) => {
      let ids = list.filter(i => i.state !== 3).map(obj => Number(obj.id));

      if (!isAll) ids = Object.values(deleteSelectedInq.value);

      if (ids.length === 0) {
        Swal.fire({
          icon: "success",
          title: t("header.Inquiry"),
          text: t("inquiry.InquiryRead"),
          confirmButtonColor: "#FF0000",
          confirmButtonText: t("notif.Close"),
        });
        return;
      }

      await ApiService.patch(`/inquiry/read`, {
        inquiryIds: ids,
      })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: t("header.Inquiry"),
            text: t("inquiry.InquiryRead"),
            confirmButtonColor: "#FF0000",
            confirmButtonText: t("notif.Close"),
          });
          deleteSelectedInq.value = [];
          SocketService.socket.emit("members_init");
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: t("header.Inquiry"),
            text: t("notif." + e.response.data.message),
            confirmButtonColor: "#FF0000",
            confirmButtonText: t("notif.Close"),
          });
        });
      getInquiry(currentPage.value);
    };

    const deleteinquiry = async (isAll: boolean) => {
      let ids = list.filter(i => i.state === 3).map(obj => obj.id);

      if (!isAll) ids = Object.values(deleteSelectedInq.value);
      await ApiService.patch(`/inquiry`, {
        inquiryIds: ids,
      })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: t("header.Inquiry"),
            text: t("inquiry.InquiryDeletedSuccess"),
            confirmButtonColor: "#FF0000",
            confirmButtonText: t("notif.Close"),
          });
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: t("header.Inquiry"),
            text: t("notif." + e.response.data.message),
            confirmButtonColor: "#FF0000",
            confirmButtonText: t("notif.Close"),
          });
        });

      getInquiry(currentPage.value);
    };

    const displayList = () => {
      showInquiryForm.value = false;
      showInquiry.value = true;
      showInquiryDetail.value = false;
      selectedInquiry.value = {};
      getInquiry(currentPage.value);
    };

    /**
     * Group the array based on the page count
     *
     */
    const arrayPager = (items: any, count: number) => {
      return items
        .map((x: any, i: any) => i % count == 0 && items.slice(i, i + count))
        .filter((x: any) => x);
    };

    const selectInquiry = async (row: any) => {
      if (row.state === 2 || row.state === 4 || row.state === 8) {
        await ApiService.patch(`/inquiry/read`, {
          inquiryIds: [parseInt(row.id)],
        })
          .then((res) => res.data)
          .catch((e) => e.response?.data);
        SocketService.socket.emit("members_init");
      }

      if(typeof row.reply === 'string') row.reply = JSON.parse(row.reply);

      selectedInquiry.value = row;
      showInquiryDetail.value = true;
    };


    const requestAccount = async () => {
      const data = {
        title: "DEPOSIT_ACCOUNT_REQUEST",
        body: "DEPOSIT_ACCOUNT_REQUEST",
      };

      if (!authStore.isAuthenticated) {
        return Swal.fire({
          icon: "warning",
          title: t("notif.Alarm"),
          text: t("notif.LoginFirst"),
          confirmButtonColor: "#FF0000",
          confirmButtonText: t("notif.Close"),
        });
      } else {
        try {
          isLoading.value = true;
          const resp = await ApiService.post("/inquiry", data)
            .then((res) => res.data)
            .catch((e) => e.response.data);

          if (resp.message !== "MESSAGE_SENT") {
            isLoading.value = false;
            return Swal.fire({
              icon: "error",
              title: t("header.AccountInquiry"),
              text: t("notif." + resp.message),
              confirmButtonColor: "#FF0000",
              confirmButtonText: t("notif.Close"),
            });
          }
          Swal.fire({
            icon: "success",
            title: t("header.AccountInquiry"),
            text: t("inquiry.AccountRequest"),
            confirmButtonColor: "#FF0000",
            confirmButtonText: t("notif.Close"),
          });
        } catch (e) {
          Swal.fire({
            icon: "error",
            title: t("header.AccountInquiry"),
            text: t("notif.ErrorOccured"),
            confirmButtonColor: "#FF0000",
            confirmButtonText: t("notif.Close"),
          });
        }
        isLoading.value = false;
      }
    };

    onMounted(() => getInquiry(currentPage.value));

    return {
      authStore,
      columns,
      content,
      currentPage,
      pageCount,
      paginatedList,
      pages,
      inquiries,
      showInquiryForm,
      showInquiry,
      selectedInquiry,
      showInquiryDetail,
      requestAccount,
      getInquiry,
      selectInquiry,
      displayList,
      deleteSelectedInq,
      deleteinquiry,
      isLoading,
      readAllInquiry
    };
  },
});
</script>
<style>
#my-toolbar {
  display: none !important;
}

.quillview-height {
  pointer-events: none !important;
  border-top-right-radius: 0.475rem;
  border-top-left-radius: 0.475rem;
  height: 10em;
}

.ql-container.ql-snow {
  border: unset !important;
}

.ql-hidden {
  display: none !important;
}

.delete-btn {
  height: 33px !important;
}
</style>
<style scoped>
.modal-body-center {
  text-align: left !important;
  padding-top: 1em !important;
}

.new-msg-icn {
  font-size: 1.1rem !important;
  margin-top: 0.1rem !important;
  color: red;
}

.new-msg-tr {
  background-color: darkgoldenrod;
}
</style>