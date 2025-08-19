<template>
  <div class="d-flex flex-column flex-root wrapper-img-container-partner">
    <!-- <div class="menu-gradient-partner"></div> -->
    <!-- Title -->
    <h3 v-if="member_id === undefined" class="text-white-title mb-5">
      {{ $t("PartnerMenu.Transaction") }}
    </h3>
    <!-- Date Range Picker -->
    <div
      class="row justify-content-end mb-4 search-container align-items-end"
      data-kt-customer-table-toolbar="base"
    >
      <div class="col-lg-2 col-md-6 px-2 py-2">
        <select v-model="tranType" class="form-control">
          <option
            v-for="option in tranTypes"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
      <div v-if="member_id === undefined" class="col-lg-2 col-md-6 px-2 py-2">
        <select v-model="searchType" class="form-control">
          <option
            v-for="option in searchTypes"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
      <div v-if="member_id === undefined" class="col-lg-2 col-md-6 px-2 py-2">
        <input class="form-control" v-model="searchValue" type="text" />
      </div>
      <div class="col-lg-1 col-md-6 px-2 py-2">
        <input type="checkbox" id="include-sub-check" v-model="includeSub" />
        <label for="include-sub-check" class="text-white ml-1">{{
          $t("Partner.IncludeSub")
        }}</label>
      </div>
      <!-- Daterange Picker -->
      <div class="col-lg-4 col-md-6 px-2 py-2">
        <DateRangePicker
          class="col-12"
          initial="month"
          @changedate="setSelectedDate"
        />
      </div>
      <div class="col-lg-1 col-md-6 px-2 py-2">
        <button
          type="button"
          class="btn btn-black-bg text-white"
          @click="getList()"
        >
          <i class="fas fa-search mr-1" /> {{ $t("Search") }}
        </button>
      </div>
    </div>
    <!-- List -->
    <div class="card">
      <div class="card-body">
        <!-- Sums Tiles -->
        <div class="row">
          <div class="col-xl-3 mb-4" v-if="tranType === 'DEPOSIT' || tranType === 'ALL'">
            <StatisticsWidget5
                widget-classes="card-xl-stretch mb-2"
                color="success"
                icon="fa-globe-asia"
                :title="$n(sums.deposits)"
                :description="$t('PartnerMenu.TotalDepositAmount')"
              ></StatisticsWidget5>
          </div>
          <div class="col-xl-3 mb-4" v-if="tranType === 'WITHDRAW' || tranType === 'ALL'">
            <StatisticsWidget5
                widget-classes="card-xl-stretch mb-2"
                color="danger"
                icon="fa-globe-asia"
                :title="$n(sums.withdrawals)"
                :description="$t('PartnerMenu.TotalWithdrawalAmount')"
              ></StatisticsWidget5>
          </div>
        </div>

        <KTDatatable
          :tableHeader="tableHeaders"
          :tableData="tableData"
          :rowsPerPage="50"
        >
          <!-- Depwid -->
          <template v-slot:cell-depwid="{ row: data }">
            <span v-if="data.transaction_type === 'DEPOSIT'">
              {{ $n(parseInt(data.amount_deposit)) }} 
              <span v-if="data.amount_coupon > 0">({{ $n(parseInt(data.amount_coupon)) }})</span>
            </span>
            <span v-else>{{ $n(parseInt(data.amount_withdraw)) }}</span>
          </template>
          <!-- Transaction Type -->
          <template v-slot:cell-transaction_type="{ row: data }">
            <span
              class="badge badge-success"
              v-if="data.transaction_type === 'DEPOSIT'"
              >{{ $t("depWid." + data.transaction_type) }}</span
            >
            <span class="badge badge-danger" v-else>{{
              $t("depWid." + data.transaction_type)
            }}</span>
          </template>
        </KTDatatable>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import moment from "moment";
import qs from "qs";
import ApiService from "@/services/ApiService";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import DateRangePicker from "@/components/kt-date/DateRangePicker.vue";
import StatisticsWidget5 from "@/components/widgets/statsistics/Widget5.vue";

interface IData {
  member_id: string;
  member: string;
  transaction_type: string;
  amount_deposit: number;
  amount_withdraw: number;
  createdAt: string;
  updatedAt: string;
}

interface DateRange {
  start: string;
  end: string;
}

export default defineComponent({
  name: "DepWidHistory",
  components: {
    KTDatatable,
    DateRangePicker,
    StatisticsWidget5
  },
  props: {
    member_id: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    // vue variables
    const { t } = useI18n();
    // table variables
    const tableData: any = ref<Array<IData>>([]);
    const tableHeaders = [
      { key: "member", name: t("Partner.Member") },
      { key: "transaction_type", name: t("Partner.DepWid"), customslot: true },
      {
        key: "depwid",
        name: t("Partner.TranAmount"),
        customslot: true,
      },
      {
        key: "createdAt",
        name: t("Partner.ReqDate"),
      },
      {
        key: "updatedAt",
        name: t("Partner.ProcessDate"),
      },
    ];

    const includeSub = ref(true);
    const tranType = ref("ALL");
    const tranTypes = [
      { label: t("Partner.All"), value: "ALL" },
      { label: t("Partner.Deposit"), value: "DEPOSIT" },
      { label: t("Partner.Withdrawal"), value: "WITHDRAW" },
    ];

    const searchType = ref("ID");
    const searchValue = ref("");
    const searchTypes = [
      { label: t("auth.ID"), value: "ID" },
      { label: t("Partner.Nickname"), value: "NICKNAME" },
    ];

    const sums = ref({
      withdrawals: 0,
      deposits: 0
    });

    /**
     * Filters
     */
    let daterange = {
      start: moment().startOf("month").format("YYYY-MM-DD"),
      end: moment().format("YYYY-MM-DD"),
    };
    const setSelectedDate = (date: DateRange) => {
      daterange = date;
      getList();
    };

    /**
     * Get List
     *
     */
    const getList = async () => {
      let query = qs.stringify({
        start: daterange.start,
        end: daterange.end,
        trantype: tranType.value,
        type: searchType.value,
        typeval: searchValue.value,
        inclsub: includeSub.value,
      });

      if (props.member_id)
        query = qs.stringify({
          start: daterange.start,
          end: daterange.end,
          trantype: tranType.value,
          type: searchType.value,
          typeval: searchValue.value,
          inclsub: includeSub.value,
          member_id: props.member_id,
        });

      const results = await ApiService.get(`/partner/tran-history?${query}`)
        .then((res) => res.data)
        .catch(() => []);
      // add data
      tableData.value.splice(0, tableData.value.length, ...results);

      getSums(results);
    };

    const getSums = (results: Array<IData>) => {
      // Total Withdrawals
      sums.value.withdrawals = results.reduce((total: number, obj) => Number(obj.amount_withdraw) + Number(total),0);
      sums.value.withdrawals *= -1;

      // Total Deposits
      sums.value.deposits = results.reduce((total: number, obj) => Number(obj.amount_deposit) + Number(total),0);
    };

    return {
      tableHeaders,
      tableData,
      includeSub,
      tranType,
      tranTypes,
      searchType,
      searchTypes,
      searchValue,
      // Date Picker
      setSelectedDate,
      daterange,
      getList,
      sums,
    };
  },
});
</script>

<style scoped>
.search-container button {
  min-width: 100% !important;
  border-radius: 5px !important;
}

.btn-search {
  background-color: #5d5d5d !important;
  color: white !important;
}

input, select {
  background-color: #0000;
} 
</style>