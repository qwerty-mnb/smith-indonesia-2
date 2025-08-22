<template>
  <!-- Transaction history -->
  <div class="depwid-history-content">
    <!-- Filter Section -->
    <div class="filter-section">
      <div class="filter-container">
        <Field
          class="form-control history-select"
          name="type"
          as="select"
          autocomplete="off"
          value=""
          v-model="historyFilter"
          @Change="filterHistory()"
        >
          <option value="ALL">{{ $t('Partner.All') }}</option>
          <option value="DEPOSIT">{{ $t('Partner.Deposit') }}</option>
          <option value="WITHDRAWAL">{{ $t('Partner.Withdrawal') }}</option>
        </Field>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-container">
      <table class="history-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col">{{ $t(col) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tran, idx) in paginatedList" :key="idx">
            <td
              v-bind:class="{
                'type-deposit': tran.type === 'DEPOSIT',
                'type-withdrawal': tran.type === 'WITHDRAWAL',
              }"
            >
              {{ $t("depWid." + tran.type) }}
            </td>
            <td>{{ tran.bank_name }}</td>
            <td>{{ tran.bank_account_name }}</td>
            <td>{{ tran.bank_account }}</td>
            <td
              v-bind:class="{
                'type-deposit': tran.type === 'DEPOSIT',
                'type-withdrawal': tran.type === 'WITHDRAWAL',
              }"
            >
              {{ $n(tran.amount, "currency") }}
            </td>
            <td>
              <span class="status-badge status-wait" v-if="tran.status === 1">
                {{ $t("status.Wait") }}
              </span>
              <span class="status-badge status-complete" v-else-if="tran.status === 2">
                {{ $t("status.Complete") }}
              </span>
              <span class="status-badge status-cancel" v-else-if="tran.status === 3">
                {{ $t("status.Cancel") }}
              </span>
              <span class="status-badge status-new" v-else>{{
                $t("status.New")
              }}</span>
            </td>
            <td>{{ tran.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Section -->
    <div class="pagination-container">
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
import moment from "moment";
import PopupModal from "../popup/PopupModal.vue";
import ApiService from "@/services/ApiService";
import { Field } from "vee-validate";
import CloseModal from "@/components/CloseModal.vue";

export default defineComponent({
  name: "DepWidHistory",
  components: {
    Field,
    PopupModal,
    CloseModal,
  },
  created() {
    this.moment = moment;
  },
  setup() {
    const columns = [
      "depWid.Type",
      "register.BankName",
      "register.BankAccountName",
      "register.BankAccount",
      "depWid.Amount",
      "depWid.State",
      "depWid.Date",
    ];
    interface Transaction {
      type: string;
      bank_name: string;
      bank_account_name: string;
      bank_account: string;
      amount: number;
      status: number;
      createdAt: string;
    }

    const transactions = ref<Transaction[][]>([]);
    const paginatedList = ref<Transaction[]>([]);
    const pageCount = ref(1);
    const pages = ref(1);
    const currentPage = ref(1);
    const historyFilter = ref("ALL");
    let list = ref<Transaction[]>([]);

    /**
     * Get History
     */
    const getHistory = async (idx: number) => {
      currentPage.value = idx;
      if (currentPage.value == 1 || historyFilter.value != "ALL") {
        list.value = await ApiService.get("/tran/depwid/history")
          .then((res) => res.data)
          .catch((e) => e.response.data);

        if(historyFilter.value != "ALL") list.value = list.value.filter(x => x.type === historyFilter.value);
        transactions.value = arrayPager(list.value, 10);
        pages.value = transactions.value.length;

        transactions.value = transactions.value.map((x) => x);
        paginatedList.value = transactions.value[currentPage.value - 1];
      } else {
        paginatedList.value = transactions.value[currentPage.value - 1];
      }
    };

    /**
     * Group the array based on the page count
     */
    const arrayPager = (items: Transaction[], count: number): Transaction[][] => {
      const result: Transaction[][] = [];
      for (let i = 0; i < items.length; i += count) {
        result.push(items.slice(i, i + count));
      }
      return result;
    };

    const filterHistory = () => {
      currentPage.value = 1;
      getHistory(currentPage.value);
    };

    onMounted(() => {
      getHistory(currentPage.value);
    });

    return {
      historyFilter,
      columns,
      currentPage,
      pageCount,
      paginatedList,
      pages,
      transactions,
      moment,
      getHistory,
      filterHistory,
    };
  },
});
</script>

<style lang="scss" scoped>
.depwid-history-content {
  background-color: transparent;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
}

.filter-section {
  margin-bottom: 30px;
  
  .filter-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    
    .history-select {
      background-color: #12021e;
      color: #fff;
      border: 1px solid #320050;
      border-radius: 5px;
      padding: 8px 12px;
      min-width: 150px;
      font-size: 14px;
      
      &:focus {
        outline: none;
        border-color: rgba(173, 216, 230, 0.5);
        box-shadow: 0 0 3px rgba(173, 216, 230, 0.2);
      }
      
      option {
        background-color: #12021e;
        color: #fff;
      }
    }
  }
}

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

.type-deposit {
  color: #56f000 !important;
  font-weight: 600;
}

.type-withdrawal {
  color: #ff3838 !important;
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
  .depwid-history-content {
    padding: 15px;
  }
  
  .filter-section .filter-container {
    justify-content: center;
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
</style>
