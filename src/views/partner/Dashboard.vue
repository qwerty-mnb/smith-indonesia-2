<template>
  <div class="d-flex flex-column flex-root banner-top wrapper-img-container-partner">
    <div class="menu-gradient-partner"></div>
    <!-- Title -->
    <h3 class="text-white-title">{{ $t("PartnerMenu.Home") }}</h3>
    <!-- Date Range Picker -->
    <div
      class="row justify-content-end mb-4 search-container"
      data-kt-customer-table-toolbar="base"
    >
      <div class="col-lg-4 col-md-12 px-2 py-2">
        <DateRangePicker
          class="col-12 standard-h"
          @changedate="setSelectedDate"
          initial="month"
        />
      </div>
      <div class="col-lg-1 col-md-6 px-2 py-2">
        <button
          type="button"
          class="btn btn-black-bg text-white"
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
          type="submit"
          class="btn btn-black-bg text-white"
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
          @click="
            setSelectedDate({
              start: moment().subtract(15, 'days').format('YYYY-MM-DD'),
              end: moment().format('YYYY-MM-DD'),
            })
          "
          class="btn btn-black-bg text-white"
        >
          {{ $t("DateRange.FifteenDays") }}
        </button>
      </div>
      <div class="col-lg-1 col-md-6 px-2 py-2">
        <button
          type="button"
          @click="getList"
          class="btn btn-black-bg text-white"
        >
          <i class="fas fa-search mr-1" /> {{ $t("Search") }}
        </button>
      </div>
    </div>
    <!-- Dep Wid Summary -->
    <div class="card">
      <div class="card-title mt-2">
        <h5 class="text-white">{{ $t("Partner.TotalDepWid") }}</h5>
      </div>
      <div class="card-body m-card-body">
        <KTDatatable
          :tableHeader="tableHeaders"
          :tableData="tableData"
          :rowsPerPage="50"
        ></KTDatatable>
      </div>
    </div>
    <!-- Game Summary -->
    <div class="card mt-3">
      <!-- Game Summary Table -->
      <div class="card">
        <div class="card-title mt-2">
          <h5 class="text-white">{{ $t("Partner.GameBetTotal") }}</h5>
        </div>
        <div class="card-body m-card-body">
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
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import moment from "moment";
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

interface ISummaryTable {
  game_type: string;
  betamt: string;
  winamt: string;
  profit: string;
  total_profit: string;
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
  name: "PartnerDashboard",
  components: {
    KTDatatable,
    DateRangePicker,
  },
  setup() {
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
    // game table summary
    const gameTableData: any = ref<Array<ISummaryTable>>([]);
    const gameTableHeaders = [
      {
        key: "game",
        name: t("Partner.Game"),
        customslot: true,
      },
      { key: "betamt", name: t("Partner.TotalBetAmount"), currency: true },
      { key: "winamt", name: t("Partner.TotalWinAmount"), currency: true },
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
      { key: "total_profit", name: t("Partner.TotalProfit"), currency: true },
    ];

    /**
     * Filters
     */
    let range = {
      start: moment().startOf("month").format("YYYY-MM-DD"),
      end: moment().format("YYYY-MM-DD"),
    };

    const setSelectedDate = (date: DateRange) => {
      range = date;
      getList();
    };

    /**
     * Get List
     *
     */
    const getList = async () => {
      const results = await ApiService.get(
        `/partner/dashboard?start=${range.start}&end=${range.end}`
      )
        .then((res) => res.data)
        .catch(() => []);
      // add data
      tableData.value.splice(0, tableData.value.length, ...results);

      // game summary
      const gameResults = await ApiService.get(
        `/partner/dashboard/summary?start=${range.start}&end=${range.end}`
      )
        .then((res) => res.data)
        .catch(() => []);
      // add data
      gameTableData.value.splice(0, gameTableData.value.length, ...gameResults);
    };

    onMounted(()=>{
      // Set background
      var el = document.querySelector('.wrapper-img-container-partner');
      el.style.backgroundImage = "url('')";
      el.style.backgroundColor = "#0c0c0c";
    });

    return {
      tableHeaders,
      tableData,
      gameTableHeaders,
      gameTableData,
      // Date Picker
      setSelectedDate,
      moment,
      getList,
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
</style>