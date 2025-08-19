<template>
  <div class="d-flex flex-column flex-root details-tab">
    <!-- Date Range Picker -->
    <div
      class="row justify-content-end mb-4 search-container"
    >
      <div class="col-lg-3 col-md-12 px-2 py-2">
        <DateRangePicker
          class="col-12"
          @changedate="setSelectedDate"
          initial="month"
        />
      </div>
      <div class="col-lg-1 col-md-6 px-2 py-2">
        <button
          type="button"
          class="btn btn-black-bg text-white w-100"
          @click="
            setSelectedDate({
              start: moment().format('YYYY-MM-DD'),
              end: moment().format('YYYY-MM-DD'),
            })
          "
        >
          {{ $t("DateRange.Today") }}
        </button>
      </div>
      <div class="col-lg-1 col-md-6 px-2 py-2">
        <button
          type="button"
          class="btn btn-black-bg text-white w-100"
          @click="
            setSelectedDate({
              start: moment().subtract(7, 'days').format('YYYY-MM-DD'),
              end: moment().format('YYYY-MM-DD'),
            })
          "
        >
          {{ $t("DateRange.LastWeek") }}
        </button>
      </div>
      <div class="col-lg-1 col-md-6 px-2 py-2">
        <button
          type="button"
          class="btn btn-black-bg text-white w-100"
          @click="
            setSelectedDate({
              start: moment().subtract(15, 'days').format('YYYY-MM-DD'),
              end: moment().format('YYYY-MM-DD'),
            })
          "
        >
          {{ $t("DateRange.FifteenDays") }}
        </button>
      </div>
      <!-- Search -->
      <div class="col-lg-1 col-md-6 px-2 py-2">
        <button
          type="button"
          class="btn btn-black-bg text-white w-100 text-nowrap"
          @click="getList()"
        >
          <i class="fas fa-search mr-1" /> {{ $t("Search") }}
        </button>
      </div>
    </div>
    <!-- DepWid Summary -->
    <div class="row">
      <div class="col-md-12 font-weight-bold text-secondary text-left">
        <h6 class="text-white">{{ $t("Partner.TotalDepWidWithSub") }}</h6>
      </div>
      <div class="col-md-12">
        <KTDatatable
          :tableHeader="tableHeaders"
          :tableData="tableData"
          :rowsPerPage="50"
        ></KTDatatable>
      </div>
    </div>
    <!-- Game Summary  -->
    <div class="card mb-2">
      <div class="card-title mt-2">
        <h5 class="text-white">{{ $t("Partner.GameBetTotal") }}</h5>
      </div>
      <div class="card-body">
        <KTDatatable
          :tableHeader="gameTableHeaders"
          :tableData="gameTableData"
          :rowsPerPage="50"
          :isAccordion="true"
        >
          <!-- Casino Sub Table  -->
          <template v-slot:table-sub0="{}">
            <KTDatatable
              :tableHeader="gameTableHeaders"
              :tableData="gameTableData[0].games"
              :rowsPerPage="50"
            >
              <!-- Game -->
              <template v-slot:cell-game="{ row: data }">
                <span>{{ $t(data.game) }}</span>
              </template>
            </KTDatatable>
          </template>
          <!-- Slot Sub Table -->
          <template v-slot:table-sub1="{}">
            <KTDatatable
              :tableHeader="gameTableHeaders"
              :tableData="gameTableData[1].games"
              :rowsPerPage="50"
            >
              <!-- Game -->
              <template v-slot:cell-game="{ row: data }">
                <span>{{ $t(data.game) }}</span>
              </template>
            </KTDatatable>
          </template>
          <!-- Hotel Sub Table -->
          <template v-slot:table-sub2="{}">
            <KTDatatable
              :tableHeader="gameTableHeaders"
              :tableData="gameTableData[2].games"
              :rowsPerPage="50"
            >
              <!-- Game -->
              <template v-slot:cell-game="{ row: data }">
                <span>{{ $t(data.game) }}</span>
              </template>
            </KTDatatable>
          </template>
          <!-- Sports Sub Table -->
          <template v-slot:table-sub3="{}">
            <KTDatatable
              :tableHeader="gameTableHeaders"
              :tableData="gameTableData[3].games"
              :rowsPerPage="50"
            >
              <!-- Game -->
              <template v-slot:cell-game="{ row: data }">
                <span>{{ $t(data.game) }}</span>
              </template>
            </KTDatatable>
          </template>
          <!-- Game Type -->
          <template v-slot:cell-game="{ row: data }">
            <span>{{ $t(data.game_type) }}</span>
          </template>
        </KTDatatable>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import moment from "moment";
import qs from "qs";
import { useI18n } from "vue-i18n";
import ApiService from "@/services/ApiService";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import DateRangePicker from "@/components/kt-date/DateRangePicker.vue";

interface IData {
  deposit: number;
  bonus: number;
  withdrawal: number;
  depwid: number;
  wallet: number;
  wallet_point: number;
  wallet_rolling: number;
}

interface ISummary {
  game_type: string;
  betamt: string;
  winamt: string;
  profit: string;
  rollamt: string;
  rollamtsub: string;
  loseamt: string;
  loseamtsub: string;
  games: Object;
}

interface DateRange {
  start: string;
  end: string;
}

export default defineComponent({
  name: "Details",
  components: {
    KTDatatable,
    DateRangePicker,
  },
  props: {
    member_id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // vue variables
    const { t } = useI18n();
    // table variables
    const tableData: any = ref<Array<IData>>([]);
    const tableHeaders = [
      { key: "deposits", name: t("Partner.DepAmount"), currency: true },
      { key: "withdrawals", name: t("Partner.WidAmount"), currency: true },
      { key: "depwid", name: t("Partner.DepWidProfit"), currency: true },

      { key: "wallet", name: t("Partner.CurrentWallet"), currency: true },
      {
        key: "wallet_point",
        name: t("Partner.CurrentPoint"),
        currency: true,
      },
    ];

    const gameTableData: any = ref<Array<ISummary>>([]);
    const gameTableHeaders = [
      {
        key: "game",
        name: t("Partner.Game"),
        customslot: true,
      },
      { key: "betamt", name: t("Partner.TotalBetAmount"), currency: true },
      { key: "winamt", name: t("Partner.TotalWinAmount"), currency: true },

      { key: "profit", name: t("Partner.BetProfit"), currency: true },
      {
        key: "rollamtsub",
        name: t("Partner.SubRolling"),
        currency: true,
      },
      {
        key: "rollamt",
        name: t("Partner.MyRolling"),
        currency: true,
      },
    ];

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
      const query = qs.stringify({
        start: daterange.start,
        end: daterange.end,
        member_id: props.member_id,
      });

      const results = await ApiService.get(`/partner/dashboard?${query}`)
        .then((res) => res.data)
        .catch(() => []);
      // add data
      tableData.value.splice(0, tableData.value.length, ...results);

      const gameResults = await ApiService.get(
        `/partner/dashboard/summary?${query}`
      )
        .then((res) => res.data)
        .catch(() => []);
      // add data
      gameTableData.value.splice(0, gameTableData.value.length, ...gameResults);
    };

    return {
      moment,
      tableHeaders,
      tableData,
      gameTableHeaders,
      gameTableData,
      // Date Picker
      setSelectedDate,
      getList,
    };
  },
});
</script>

<style scoped>
.search-container button {
  /* min-width: 100% !important; */
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