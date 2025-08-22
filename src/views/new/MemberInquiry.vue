<template>
  <!-- Inquiry Body -->
  <div class="inquiry-content">
    <div class="row" v-if="!showInquiryForm && showInquiry && !showInquiryDetail"></div>
    <div class="modal-body-center">
      <div class="table-history">
        <div class="inquiry-button-container">
          <button
            class="action-button delete-button"
            type="button"
            @click="deleteinquiry(false)"
          >
            <i class="fas fa-trash-alt"></i>
            {{ $t("inquiry.Delete") }}
          </button>
          <button
            class="action-button delete-all-button"
            type="button"
            @click="deleteinquiry(true)"
          >
            <i class="fas fa-trash-alt"></i>
            {{ $t("inquiry.DeleteAll") }}
          </button>
          <button
            type="button"
            class="action-button read-button"
            @click="readAllInquiry(false)"
          >
            <i class="fas fa-eye"></i>
            {{ $t("inquiry.Read") }}
          </button>
          <button
            class="action-button read-all-button"
            type="button"
            @click="readAllInquiry(true)"
          >
            <i class="fas fa-eye"></i>
            {{ $t("inquiry.ReadAll") }}
          </button>

          <button
            type="button"
            class="action-button"
            @click="showInquiryForm = true"
            v-if="!showInquiryForm && showInquiry && !showInquiryDetail"
          >
            <i class="fas fa-pen"></i>
            {{ $t("inquiry.Write") }}
          </button>
        </div>
        <table class="inquiry-table">
          <thead>
            <tr>
              <th v-for="col in columns" :key="col">{{ $t(col) }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="paginatedList.length === 0" class="no-data-row">
              <td colspan="4" class="no-data-cell">
                <div class="no-data-container">
                  <i class="fas fa-inbox no-data-icon"></i>
                  <span class="no-data-label">No data found</span>
                </div>
              </td>
            </tr>
            <tr
              v-else
              v-for="(inq, idx) in paginatedList"
              :key="idx"
              :class="{ 'new-msg-tr': inq.state === 2 || inq.state === 4 }"
            >
              <td class="checkbox-column">
                <input
                  style="cursor: pointer"
                  type="checkbox"
                  class="quesChk"
                  :value="inq.id"
                  v-model="deleteSelectedInq"
                />
                <i
                  class="fas fa-circle-info new-msg-icn"
                  :style="{
                    visibility: inq.state === 2 || inq.state === 4 ? 'visible' : 'hidden',
                  }"
                ></i>
              </td>
              <td @click="selectInquiry(inq)" class="clickable-cell">
                {{
                  inq.title === "DEPOSIT_ACCOUNT_REQUEST"
                    ? $t("inquiry.DepositAccReq")
                    : inq.title
                }}
              </td>
              <td @click="selectInquiry(inq)" class="clickable-cell">
                {{ inq.createdAt }}
              </td>
              <td @click="selectInquiry(inq)" class="clickable-cell">
                {{ $t("inquiry.State." + inq.state) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="pagination-container"
        v-if="
          !showInquiryForm &&
          showInquiry &&
          !showInquiryDetail &&
          paginatedList.length > 0
        "
      >
        <ul class="pagination-list">
          <li class="pagination-item" v-for="index in pages" :key="index">
            <button
              @click="getInquiry(index)"
              :class="{ 'pagination-active': currentPage === index }"
              class="pagination-button"
              type="button"
            >
              {{ index }}
            </button>
          </li>
        </ul>
      </div>
      <div v-if="showInquiryDetail && selectedInquiry" class="inquiry-detail">
        <span class="detail-label">{{ $t("inquiry.Title") }}</span>
        <div class="message-content message-title">
          <div class="inner-container">
            <div v-if="selectedInquiry.title === 'DEPOSIT_ACCOUNT_REQUEST'">
              {{ $t("inquiry.DepositAccReq") }}
            </div>
            <div v-html="selectedInquiry.title" v-else></div>
          </div>
        </div>
        <span
          class="detail-label"
          v-if="selectedInquiry.body !== 'DEPOSIT_ACCOUNT_REQUEST'"
          >{{ $t("inquiry.Body") }}</span
        >
        <div
          class="message-content message-title"
          v-if="selectedInquiry.body !== 'DEPOSIT_ACCOUNT_REQUEST'"
        >
          <div class="inner-container">
            <div v-html="selectedInquiry.body"></div>
          </div>
        </div>
        <span class="detail-label">{{ $t("inquiry.Resp") }}</span>
        <div class="message-content">
          <div class="inner-container">
            <QuillEditor
              toolbar="#my-toolbar"
              :content="selectedInquiry.reply"
              readonly="true"
              :key="selectedInquiry.id"
            ></QuillEditor>
            <div id="my-toolbar">
              <button class="ql-bold"></button>
              <button class="ql-italic"></button>
            </div>
          </div>
        </div>
      </div>
      <!-- back button -->
      <div class="modal-footer" v-if="showInquiryDetail">
        <div class="form-footer">
          <button type="submit" class="action-button back-button" @click="displayList()">
            <i class="fas fa-arrow-left"></i>
            {{ $t("inquiry.List") }}
          </button>
        </div>
      </div>

      <WriteInquiry
        :showInquiryForm="showInquiryForm"
        :showInquiry="showInquiry"
        :showInquiryDetail="showInquiryDetail"
        @writeField="displayList"
      />
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
import WriteInquiry from "@/views/new/WriteInquiry.vue";
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
    const selectedInquiry = ref<Inquiry | null>(null);
    //
    const columns = ["", "table.Subject", "table.Date", "inquiry.StateColumn"];

    const inquiries: any = ref<Array<Inquiry>>([]);
    let list: Inquiry[] = [];
    const paginatedList = ref<Inquiry[]>([]);
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
        const results = await ApiService.get("/inquiry")
          .then((res) => res.data)
          .catch(() => []);
        // add data
        list = results;
        inquiries.value = arrayPager(list, 10);
        pages.value = inquiries.value.length;
        paginatedList.value = inquiries.value[currentPage.value - 1];
      } else {
        paginatedList.value = inquiries.value[currentPage.value - 1];
      }
    };

    const readAllInquiry = async (isAll: boolean) => {
      let ids = list.filter((i) => i.state !== 3).map((obj) => Number(obj.id));

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
      let ids = list.filter((i) => i.state === 3).map((obj) => obj.id);

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
      selectedInquiry.value = null;
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

      if (typeof row.reply === "string") row.reply = JSON.parse(row.reply);

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
      readAllInquiry,
    };
  },
});
</script>

<style lang="scss" scoped>
.inquiry-content {
  background-color: transparent;
  color: #fff;
  border-radius: 8px;
}

.inquiry-button-container {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  min-width: 120px;
  justify-content: center;

  i {
    font-size: 16px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
}

.delete-button {
  background: #4a4a4a;
  color: #fff;

  &:hover {
    background: #666;
  }
}

.delete-all-button {
  background: #4a4a4a;
  color: #fff;

  &:hover {
    background: #666;
  }
}

.read-button {
  background: #4a4a4a;
  color: #fff;

  &:hover {
    background: #666;
  }
}

.read-all-button {
  background: #4a4a4a;
  color: #fff;

  &:hover {
    background: #666;
  }
}

.write-button {
  background: #4a4a4a;
  color: #fff;

  &:hover {
    background: #666;
  }
}

.account-button {
  background: #4a4a4a;
  color: #fff;

  &:hover {
    background: #666;
  }
}

.back-button {
  background: #4a4a4a;
  color: #fff;

  &:hover {
    background: #666;
  }
}

.action-button.active {
  background: #56f000;
  color: #fff;

  &:hover {
    background: #4ad000;
  }
}

.inquiry-table {
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(18, 2, 30, 0.8);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 30px;

  thead {
    background-color: transparent;

    th {
      color: #fff;
      font-weight: 500;
      text-align: center;
      padding: 15px 12px;
      border-bottom: 1px solid #fff;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #fff;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: rgba(26, 3, 45, 0.6);
      }

      &:last-child {
        border-bottom: none;
      }

      td {
        color: #fff;
        text-align: center;
        padding: 15px 12px;
        font-size: 14px;
        vertical-align: middle;
      }
    }
  }
}

.checkbox-column {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.clickable-cell {
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #e4ff23;
  }
}

.no-data-row {
  border: none;

  .no-data-cell {
    padding: 40px 20px;
    text-align: center;
    border: none;

    .no-data-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;

      .no-data-icon {
        font-size: 48px;
        color: #666;
        opacity: 0.6;
      }

      .no-data-label {
        font-size: 16px;
        color: #999;
        font-weight: 500;
      }
    }
  }
}

.new-msg-tr {
  background-color: rgba(255, 193, 7, 0.2) !important;
  border-left: 4px solid #ffc107;
}

.new-msg-icn {
  font-size: 1.1rem !important;
  color: #ffc107;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.pagination-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  .pagination-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 8px;

    .pagination-item {
      .pagination-button {
        background-color: transparent;
        color: #fff;
        border: 1px solid #320050;
        border-radius: 5px;
        padding: 8px 12px;
        min-width: 40px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 14px;

        &:hover {
          background-color: rgba(50, 0, 80, 0.3);
          border-color: rgba(173, 216, 230, 0.5);
        }

        &.pagination-active {
          background-color: #320050;
          border-color: rgba(173, 216, 230, 0.8);
          color: #e4ff23;
          font-weight: 600;
        }
      }
    }
  }
}

.inquiry-detail {
  background-color: rgba(18, 2, 30, 0.8);
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  border: 1px solid #320050;

  .detail-label {
    display: block;
    color: #e4ff23;
    font-weight: 600;
    font-size: 16px;
    margin: 20px 0 10px 0;

    &:first-child {
      margin-top: 0;
    }
  }

  .message-content {
    background-color: rgba(26, 3, 45, 0.6);
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
    border: 1px solid rgba(50, 0, 80, 0.3);

    .inner-container {
      color: #fff;
      line-height: 1.6;
    }
  }
}

.form-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

// Responsive adjustments
@media (max-width: 768px) {
  .inquiry-content {
    padding: 15px;
  }

  .inquiry-button-container {
    justify-content: center;
    gap: 10px;
  }

  .action-button {
    min-width: 100px;
    padding: 10px 15px;
    font-size: 12px;

    i {
      font-size: 14px;
    }
  }

  .inquiry-table {
    font-size: 12px;

    thead th,
    tbody td {
      padding: 10px 8px;
    }
  }

  .pagination-container .pagination-list {
    gap: 4px;

    .pagination-item .pagination-button {
      padding: 6px 10px;
      min-width: 35px;
      font-size: 12px;
    }
  }
}
</style>

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
