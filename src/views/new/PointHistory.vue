<template>
  <!-- Point History -->
  <div class="point-history-content">
    <!-- Table Section -->
    <div class="table-container">
      <table class="history-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col">{{ $t(col) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in histories" :key="idx">
            <td class="amount-cell">{{ $n(parseInt(item.amount)) }}</td>
            <td>
              <span v-if="item.status === 0" class="status-badge status-new">
                {{ $t("status.New") }}
              </span>
              <span v-else-if="item.status === 1" class="status-badge status-wait">
                {{ $t("status.Wait") }}
              </span>
              <span v-else-if="item.status === 2" class="status-badge status-complete">
                {{ $t("status.Complete") }}
              </span>
              <span v-else class="status-badge status-cancel">
                {{ $t("Status.AdminCancel") }}
              </span>
            </td>
            <td>{{ item.createdAt }}</td>
            <td>{{ item.updatedAt }}</td>
          </tr>
          
          <!-- No Data Row -->
          <tr v-if="histories.length === 0" class="no-data-row">
            <td colspan="4" class="no-data-cell">
              <div class="no-data-container">
                <i class="fas fa-inbox no-data-icon"></i>
                <span class="no-data-label">No data found</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Section - Only show when there's data -->
    <div class="pagination-container" v-if="histories.length > 0">
      <ul class="pagination-list">
        <li class="pagination-item" v-for="index in pages" :key="index">
          <button
            @click="getHistory(index)"
            :class="{ 'pagination-active': currentPage === index }"
            class="pagination-button"
            type="button"
          >
            {{ index }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import ApiService from "@/services/ApiService";

interface IHistory {
  amount: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  name: "PointHistory",
  components: {
  },
  setup() {
    const histories: any = ref<Array<IHistory>>([]);
    const pages = ref(1);
    const currentPage = ref(1);
    const columns = ["point.Amount", "Partner.Status", "Partner.ReqDate", "Partner.ProcessDate"];
    
    /**
     * Get History
     *
     */
    const getHistory = async (idx: number) => {
      currentPage.value = idx
      const results = await ApiService.get(`/tran/point/history`)
        .then((res) => res.data)
        .catch(() => []);
      // add data
      histories.value.splice(0, histories.value.length, ...results);
    };

    onMounted(() => getHistory(currentPage.value));

    return {
      columns,
      histories,
      pages,
      currentPage,
      getHistory,
    };
  },
});
</script>

<style lang="scss" scoped>
.point-history-content {
  background-color: transparent;
  color: #fff;
}

// Table Section
.table-container {
  margin-bottom: 30px;
  
  .history-table {
    width: 100%;
    border-collapse: collapse;
    background-color: rgba(18, 2, 30, 0.8);
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    
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
}

.amount-cell {
  color: #56f000 !important;
  font-weight: 600;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &.status-wait {
    background-color: #ffb302;
    color: #000;
  }
  
  &.status-complete {
    background-color: #56f000;
    color: #000;
  }
  
  &.status-cancel {
    background-color: #808080;
    color: #fff;
  }
  
  &.status-new {
    background-color: #ff3838;
    color: #fff;
  }
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  
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

// Responsive adjustments
@media (max-width: 768px) {
  .point-history-content {
    padding: 15px;
  }
  
  .history-table {
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

// No Data State
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
</style>
