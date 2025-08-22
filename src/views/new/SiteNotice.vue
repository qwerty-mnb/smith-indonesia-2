<template>
  <!-- Notice -->
  <div class="notice-content">
    <!-- Table -->
    <div class="table-history">
      <table class="notice-table" style="cursor: pointer">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col">{{ $t(col) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(notice, idx) in paginatedList" :key="idx" @click="selectNotice(notice)" class="clickable-row">
            <td>{{ idx + 1 }}</td>
            <td>
              <div v-html="notice.title"></div>
            </td>
            <td>{{ moment(notice.createdAt).format("YYYY-MM-DD") }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="pagination-container" v-if="showNotice && paginatedList.length > 0">
      <ul class="pagination-list">
        <li class="pagination-item" v-for="index in pages" :key="index">
          <button 
            @click="getNotices(index)" 
            :class="{ 'pagination-active': currentPage === index }" 
            class="pagination-button" 
            type="button"
          >
            {{ index }}
          </button>
        </li>
      </ul>
    </div>
    
    <!-- View Notice -->
    <div class="notice-detail" v-if="(selectedNotice as Notice).body || (selectedNotice as Notice).imgsrc">
      <img 
        v-if="(selectedNotice as Notice).imgsrc !== ''" 
        class="notice-img" 
        :src="(selectedNotice as Notice).imgsrc" 
        alt="Notice Image"
      />
      <div v-else class="message-content">
        <QuillEditor 
          toolbar="#my-toolbar" 
          :content="(selectedNotice as Notice).body" 
          readonly="true" 
          theme="snow"
          class="quillview-height" 
          v-if="(selectedNotice as Notice).type === 'TEXT'" 
          :key="(selectedNotice as Notice).id"
        />
        <div id="my-toolbar" v-if="(selectedNotice as Notice).type === 'TEXT'">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
        </div>
      </div>
      
      <!-- Back Button -->
      <div class="form-footer">
        <button type="button" class="action-button back-button" @click="returnNotice">
          <i class="fas fa-arrow-left"></i>
          {{ $t("notice.Back") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import moment from "moment";
import { QuillEditor } from "@vueup/vue-quill";
import CloseModal from "@/components/CloseModal.vue";
import ApiService from "@/services/ApiService";

interface Notice {
  id: number;
  title: string;
  body: string;
  imgsrc?: string;
  type?: string;
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  name: "Notice",
  components: {
    QuillEditor,
    CloseModal,
  },
  setup() {
    const notices = ref<Notice[]>([]);
    const selectedNotice = ref<Notice | {}>({});
    const columns = ["table.Number", "table.Subject", "table.Date"];

    const paginatedList = ref<Notice[]>([]);
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
    const arrayPager = (items: any, count: number) => {
      return items
        .map((x: any, i: any) => i % count == 0 && items.slice(i, i + count))
        .filter((x: any) => x);
    };

    onMounted(() => getNotices(currentPage.value));

    const selectNotice = (notice: any) => {
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

<style lang="scss" scoped>
.notice-content {
  background-color: transparent;
  color: #fff;
  border-radius: 8px;
}

.notice-table {
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

.clickable-row {
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #e4ff23;
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

.notice-detail {
  background-color: rgba(18, 2, 30, 0.8);
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  border: 1px solid #320050;

  .notice-img {
    display: block;
    margin: 0 auto 20px;
    height: 400px;
    width: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .message-content {
    background-color: rgba(26, 3, 45, 0.6);
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
    border: 1px solid rgba(50, 0, 80, 0.3);
  }
}

.form-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
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

.back-button {
  background: #4a4a4a;
  color: #fff;

  &:hover {
    background: #666;
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .notice-content {
    padding: 15px;
  }

  .notice-table {
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

  .action-button {
    min-width: 100px;
    padding: 10px 15px;
    font-size: 12px;

    i {
      font-size: 14px;
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
</style>
