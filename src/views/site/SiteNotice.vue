<template>
  <!-- Notice -->
  <div>
    <!-- Table -->
    <div class="table-history">
      <table class="bs-table" style="cursor: pointer">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col">{{ $t(col) }}</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(notice, idx) in paginatedList" :key="idx" @click="selectNotice(notice)">
            <td>{{ idx + 1 }}</td>
            <td>
              <div v-html="notice.title"></div>
            </td>
            <td>{{ moment(notice.createdAt).format("YYYY-MM-DD") }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pager-div" v-if="showNotice">
      <ul class="Pagination">
        <li class="PaginationControl" v-for="index in pages" :key="index">
          <button @click="getNotices(index)" :class="{ 'Page-active': currentPage === index }"
            :style="{ 'background-color': currentPage === index ? 'rgb(220, 237, 255)' : 'transparent' }" class="Page"
            type="button">{{ index }}</button>
        </li>
      </ul>
    </div>
    <!-- View Notice -->
    <div class="message-content" v-if="selectedNotice.body || selectedNotice.imgsrc">
      <img v-if="selectedNotice.imgsrc !== ''" class="img img-responsive notice-img" :src="selectedNotice.imgsrc" width="200" />
      <div v-else class="inner-container" style="position: relative">
        <QuillEditor toolbar="#my-toolbar" :content="selectedNotice.body" readonly="true" theme="snow"
          class="quillview-height" v-if="selectedNotice.type === 'TEXT'" :key="selectedNotice.id"></QuillEditor>
        <div id="my-toolbar" v-if="selectedNotice.type === 'TEXT'">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
        </div>
      </div>
    </div>
    <!-- Close View Notice -->
    <!-- <div class="modal-footer" v-if="selectedNotice.body || selectedNotice.imgsrc">
      <button type="submit" @click="returnNotice">
        <span class="icon">
          <i class="fas fa-reply"></i>
        </span>
        <span>{{ $t("notice.Back") }}</span>
      </button>
    </div> -->
    <div class="modal-footer text-right form-footer dflex-ac-jc" v-if="selectedNotice.body || selectedNotice.imgsrc">
      <button type="submit" class="btn btn-black-bg text-white" @click="returnNotice">
        {{ $t("notice.Back") }}
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import moment from "moment";

import { QuillEditor } from "@vueup/vue-quill";
import CloseModal from "@/components/CloseModal.vue";
import ApiService from "@/services/ApiService";

export default defineComponent({
  name: "Notice",
  components: {
    QuillEditor,
    CloseModal,
  },
  setup() {
    const notices = ref([]);
    const selectedNotice = ref({});
    const columns = ["table.Number", "table.Subject", "table.Date"];

    const paginatedList = ref([]);
    const pageCount = ref(1);
    const pages = ref(1);
    const currentPage = ref(1);

    const showNotice = ref(true);

    /**
     * Get Notices
     *
     */
    const getNotices = async (idx: number) => {
      currentPage.value = idx
      if (currentPage.value == 1) {
        const list = await ApiService.get("/site/notices")
          .then((res) => res.data)
          .catch((e) => e.response.data);
        notices.value = arrayPager(list, 10);
        pages.value = notices.value.length;
        paginatedList.value = notices.value[currentPage.value - 1];
      } else {
        paginatedList.value = notices.value[currentPage.value - 1];
      }
    };

    /**
     * Group the array based on the page count
     *
     */
    const arrayPager = (items, count) => {
      return items
        .map((x, i) => i % count == 0 && items.slice(i, i + count))
        .filter((x) => x);
    };

    onMounted(() => getNotices(currentPage.value));

    const selectNotice = (notice) => {
      selectedNotice.value = notice;
      showNotice.value = false;
    };

    const returnNotice = () => {
      selectedNotice.value = {};
      showNotice.value = true;
    };

    return {
      getNotices,
      columns,
      selectedNotice,
      selectNotice,
      returnNotice,
      currentPage,
      pageCount,
      paginatedList,
      pages,
      showNotice,
      moment,
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

.notice-img {
  margin: auto;
  height: 400px;
  width: auto;
}

.ql-hidden {
  display: none !important;
}

.table-history tr td, .table-history thead th {
  text-align: left !important;
  padding-left: 1rem;
}

</style>
