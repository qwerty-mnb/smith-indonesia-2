<template>
  <div class="d-flex flex-column flex-root">
    <!-- Date Range Picker -->
    <div class="row justify-content-end mb-4 align-items-end search-container search-filter-bet"
      data-kt-customer-table-toolbar="base">
      <!-- Search -->
      <div v-if="memberId === undefined" class="col-lg-2 col-md-12 px-2 py-2">
        <select v-model="searchType" class="form-control">
          <option v-for="option in searchTypes" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <!-- Search Value -->
      <div v-if="memberId === undefined" class="col-lg-2 col-md-12 px-2 py-2 form">
        <input class="form-control" v-model="searchValue" type="text" />
      </div>
      <!-- Date Range Picker -->
      <div class="col-lg-3 col-md-12 px-2 py-2">
        <DateRangePicker class="col-12" initial="week" @changedate="setSelectedDate" />
      </div>
      <div class="col-lg-1 col-md-6 px-2 py-2">
        <button type="button" class="btn btn-black-bg text-white" @click="
          setSelectedDate({
            start: moment().format('YYYY-MM-DD'),
            end: moment().format('YYYY-MM-DD'),
          })
          ">
          {{ $t("DateRange.Today") }}
        </button>
      </div>
      <div class="col-lg-1 col-md-6 px-2 py-2">
        <button type="button" class="btn btn-black-bg text-white" @click="
          setSelectedDate({
            start: moment().subtract(7, 'days').format('YYYY-MM-DD'),
            end: moment().format('YYYY-MM-DD'),
          })
          ">
          {{ $t("DateRange.LastWeek") }}
        </button>
      </div>
      <div class="col-lg-1 col-md-6 px-2 py-2">
        <button type="button" class="btn btn-black-bg text-white" @click="
          setSelectedDate({
            start: moment().subtract(15, 'days').format('YYYY-MM-DD'),
            end: moment().format('YYYY-MM-DD'),
          })
          ">
          {{ $t("DateRange.FifteenDays") }}
        </button>
      </div>
      <!-- Search -->
      <div class="col-lg-1 col-md-6 px-2 py-2">
        <button type="button" class="btn btn-black-bg text-white" @click="getHistory()">
          <i class="fas fa-search mr-1" /> {{ $t("Search") }}
        </button>
      </div>
    </div>
    <!-- Widget -->
    <div class="row h-100 widget-bet-history text-left">
      <!-- Betting Amount Excluding Tie -->
      <div class="col-xl-2">
        <StatisticsWidget5 widget-classes="card-xl-stretch mb-2" color="danger" :title="$n(Number(historySums.rollamt))"
          :description="game === 'CASINO' ? $t('Partner.NoTieBetAmount') : $t('Partner.RollAmount')"></StatisticsWidget5>

      </div>
      <!-- Betting Amount -->
      <div class="col-xl-2">
        <StatisticsWidget5 widget-classes="card-xl-stretch mb-2" color="success" :title="$n(Number(historySums.winamt))"
          :description="$t('history.WinningAmount')"></StatisticsWidget5>

      </div>
      <!-- Tie Amount -->
      <div v-if="game === 'CASINO'" class="col-xl-2">
        <StatisticsWidget5 widget-classes="card-xl-stretch mb-2" color="info" :title="$n(Number(historySums.tieamt))"
          :description="$t('Partner.TieBetAmount')"></StatisticsWidget5>
      </div>

    </div>
    <!-- List -->
    <div class="card card-settlement">
      <div class="card-body m-card-body">
        <KTDatatable :tableHeader="tableHeaders" :tableData="tableData" :rowsPerPage="50" :rows-per-page="50"
          :total="rowsCount" @items-per-page-change="setPageLimit" @current-change="setPage">
          <!-- Game -->
          <template v-slot:cell-game="{ row: data }">
            <span>{{ $t(data.game) }} - <span v-if="data.game === 'K_EVO'">{{ $t('Evolution.' + data.roomno)
            }}</span><span v-else>{{ data.roomno }}</span></span>
          </template>
          <!-- Status -->
          <template v-slot:cell-status="{ row: data }">
            <span v-if="data.state === 0">
              {{ $t("status.0") }}
            </span>
            <span class="text-danger" v-else-if="data.state === 1 && data.winamount > 0">
              {{ $t("status.win") }}
            </span>

            <span class="text-info" v-else-if="data.state === 1 && data.winamount <= 0">
              {{ $t("status.lose") }}
            </span>
            <span v-else>{{ $t("status.2") }}</span>
          </template>
          <!-- Profit -->
          <template v-slot:cell-profit="{ row: data }">
            <span v-if="data.state === 0"> </span>
            <span v-else>
              {{ $n(Number(data.profit)) }}
            </span>
          </template>
          <!-- After Acc -->
          <template v-slot:cell-after_acc="{ row: data }">
            <span v-if="data.state === 0"> </span>
            <span v-else>
              {{ $n(Number(data.after_acc)) }}
            </span>
          </template>
        </KTDatatable>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import moment from "moment";
import { useI18n } from "vue-i18n";
import qs from "qs";
import ApiService from "@/services/ApiService";
import StatisticsWidget5 from "@/components/widgets/statsistics/Widget5.vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import DateRangePicker from "@/components/kt-date/DateRangePicker.vue";

interface IData {
  betamount: number;
  createdAt: string;
  game: string;
  game_type: string;
  member: string;
  member_id: string;
  nickname: string;
  profit: number;
  roomno: string;
  roomorder: string;
  state: number;
  updatedAt: string;
  winamount: string;
}

interface DateRange {
  start: string;
  end: string;
}

export default defineComponent({
  name: "BetHistory",
  components: {
    StatisticsWidget5,
    KTDatatable,
    DateRangePicker,
  },
  props: {
    game: {
      type: String,
      required: true,
    },
    memberId: {
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
      {
        key: "member",
        name: t("Partner.Member"),
      },
      {
        key: "game",
        name: t("Partner.Game"),
        customslot: true,
      },
      {
        key: "roomorder",
        name: t("Partner.Round"),
        text: "true",
      },
      {
        key: "status",
        name: t("Partner.Status"),
        customslot: true,
      },
      {
        key: "betamount",
        name: t("Partner.Betamount"),
        currency: true,
      },
      {
        key: "winamount",
        name: t("Partner.Winamount"),
        currency: true,
      },
      {
        key: "profit",
        name: t("Partner.BetProfit"),
        customslot: true,
      },
      {
        key: "pre_acc",
        name: t("history.AmountBefore"),
        currency: true,
      },
      {
        key: "after_acc",
        name: t("history.AmountAfter"),
        customslot: true,
      },
      {
        key: "createdAt",
        name: t("Partner.BetDate"),
      },
      {
        key: "updatedAt",
        name: t("Partner.ResultDate"),
      },
    ];

    const searchType = ref("ID");
    const searchValue = ref("");
    const searchTypes = [
      { label: t("auth.ID"), value: "ID" },
      { label: t("Partner.Nickname"), value: "NICKNAME" },
    ];
    const betamount: any = ref(0);
    const winamount: any = ref(0);
    const tieamount: any = ref(0);
    const historySums = ref({
      rollamt: 0,
      tieamt: 0,
      winamt: 0,
    })


    /**
     * Pagination
     *
     */
    const rowsCount = ref(0);
    let pageLimit = 50;
    let pageNumber = 1;

    /**
     * Set Page Limit
     *
     */
    const setPageLimit = (limit: number) => {
      pageLimit = limit;
      // refresh
      getHistory();
    };
    /**
     * Set Page
     *
     */
    const setPage = (page: number) => {
      pageNumber = page;
      // refresh
      getHistory();
    };
    /**
     * Filters
     */
    let daterange = {
      start: moment().startOf("month").format("YYYY-MM-DD"),
      end: moment().format("YYYY-MM-DD"),
    };
    const setSelectedDate = (date: DateRange) => {
      daterange = date;
      getHistory();
    };

    /**
     * Get List
     *
     */
    const getHistory = async () => {
      let query = qs.stringify({
        game: props.game,
        start: daterange.start,
        end: daterange.end,
        type: searchType.value,
        typeval: searchValue.value,
        limit: pageLimit,
        page: pageNumber,
      });

      if (props.memberId)
        query = qs.stringify({
          game: props.game,
          start: daterange.start,
          end: daterange.end,
          type: searchType.value,
          typeval: searchValue.value,
          member_id: props.memberId,
          limit: pageLimit,
          page: pageNumber,
        });

      const results = await ApiService.get(`/partner/bet-history?${query}`)
        .then((res) => res.data)
        .catch(() => []);

      // add rows
      rowsCount.value = Number(results.rows);
      // add history sums
      historySums.value = results.sums;
      // add data
      tableData.value.splice(0, tableData.value.length, ...results.data);
    };

    return {
      tableHeaders,
      tableData,
      searchType,
      searchTypes,
      searchValue,
      historySums,
      // pagination
      setPageLimit,
      setPage,
      rowsCount,
      // Date Picker
      setSelectedDate,
      getHistory,
      moment,
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