<template>
  <div class="d-flex flex-column flex-root">
    <!-- Date Range Picker -->
    <div
      class="row justify-content-end mb-4 search-container search-filter"
      data-kt-customer-table-toolbar="base"
    >
      <!-- Date Range Picker -->
      <div class="col-lg-4 col-md-12 px-2 py-2">
        <DateRangePicker
          class="col-12"
          initial="month"
          @changedate="setSelectedDate"
        />
      </div>
      <div class="col-lg-2 col-md-6 px-2 py-2">
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
      <div class="col-lg-2 col-md-6 px-2 py-2">
        <button
          type="button"
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
      <div class="col-lg-2 col-md-6 px-2 py-2">
        <button
          type="button"
          class="btn btn-black-bg text-white"
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
      <div class="col-lg-2 col-md-6 px-2 py-2">
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
    <div class="card card-settlement">
      <div class="card-body m-card-body">
        <KTDatatable
          :tableHeader="tableHeaders"
          :tableData="tableData"
          :rowsPerPage="50"
        >
          <!-- Status -->
          <template v-slot:cell-status="{ row: agent }">
            <span class="badge badge-success" v-if="agent.status === 0">
              {{ $t("Status.New") }}
            </span>
            <span class="badge badge-warning" v-else-if="agent.status === 1">
              {{ $t("Status.Waiting") }}
            </span>
            <span class="badge badge-primary" v-else-if="agent.status === 2">
              {{ $t("Status.Complete") }}
            </span>
            <span class="badge badge-danger" v-else>
              {{ $t("Status.AdminCancel") }}
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
import ApiService from "@/services/ApiService";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import DateRangePicker from "@/components/kt-date/DateRangePicker.vue";

interface IData {
  1: string;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
}

interface DateRange {
  start: string;
  end: string;
}

export default defineComponent({
  name: "SettlementReport",
  components: {
    KTDatatable,
    DateRangePicker,
  },
  props: {
    game: {
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
      { key: "start_date", name: t("Partner.SettleStart"), text: true },
      {
        key: "end_date",
        name: t("Partner.SettleEnd"),
        text: true,
      },
      { key: "createdAt", name: t("Partner.ReqDate") },
      { key: "updatedAt", name: t("Partner.ProcessDate") },

      { key: "amount", name: t("Partner.SettlementAmount"), currency: true },
      {
        key: "status",
        name: t("Partner.Status"),
        customslot: true,
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
      const results = await ApiService.get(
        `/partner/settlements/withdraw?game=${props.game}&start=${daterange.start}&end=${daterange.end}`
      )
        .then((res) => res.data)
        .catch(() => []);

      tableData.value.splice(0, tableData.value.length, ...results);
    };

    return {
      tableHeaders,
      tableData,
      // Date Picker
      setSelectedDate,
      daterange,
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

input, select {
  background-color: #0000;
} 
</style>