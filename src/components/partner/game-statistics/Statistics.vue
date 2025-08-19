<template>
  <div class="d-flex flex-column flex-root">
    <!-- Date Range Picker -->
    <div class="row justify-content-end search-container search-filter" data-kt-customer-table-toolbar="base">
      <!-- Search -->
      <div class="col-lg-2 col-md-12 px-2 py-2">
        <Field class="form-control" name="type" as="select" autocomplete="off" value="" v-model="memberId">
          <option value="">{{ $t("Partner.All") }}</option>
          <option v-for="mem in members" :key="mem.member_id" :value="mem.member_id">
            {{ mem.member }}
          </option>
        </Field>
      </div>
      <!-- Date Range Picker -->
      <div class="col-lg-3 col-md-12 px-2 py-2">
        <DateRangePicker class="col-12" initial="month" @changedate="setSelectedDate" />
      </div>
      <div class="col-lg-1 col-md-6 px-2 py-2">
        <button type="button" class="btn-black3" @click="
          setSelectedDate({
            start: moment().format('YYYY-MM-DD'),
            end: moment().format('YYYY-MM-DD'),
          })
        ">
          {{ $t("DateRange.Today") }}
        </button>
      </div>
      <div class="col-lg-1 col-md-6 px-2 py-2">
        <button type="button" class="btn-black3" @click="
          setSelectedDate({
            start: moment().subtract(7, 'days').format('YYYY-MM-DD'),
            end: moment().format('YYYY-MM-DD'),
          })
        ">
          {{ $t("DateRange.LastWeek") }}
        </button>
      </div>
      <div class="col-lg-1 col-md-6 px-2 py-2">
        <button type="button" class="btn-black3" @click="
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
        <button type="button" class="btn-black3 btn-search" @click="getList()">
          <i class="fas fa-search mr-1" /> {{ $t("Search") }}
        </button>
      </div>
    </div>
    <!-- List -->
    <div class="card card-settlement">
      <div class="card-body m-card-body">
        <KTDatatable :tableHeader="tableHeaders" :tableData="tableData" :rowsPerPage="50">
          <template v-slot:cell-tieamt="{}">
            <span>0</span>
          </template>
        </KTDatatable>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import moment from "moment";
import qs from "qs";
import { useI18n } from "vue-i18n";
import ApiService from "@/services/ApiService";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import DateRangePicker from "@/components/kt-date/DateRangePicker.vue";
import { Field } from "vee-validate";

interface IMember {
  member: string;
  member_id: string;
}

interface IData {
  betamt: number;
  deposits: number;
  loseamt: number;
  loseamtsub: number;
  pdate: string;
  profit: number;
  rollamt: number;
  rollamtsub: number;
  sonic: number;
  winamt: number;
  withdrawals: number;
}

interface DateRange {
  start: string;
  end: string;
}

export default defineComponent({
  name: "GameStats",
  components: {
    Field,
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
      { key: "pdate", name: t("Partner.Date"), text: true },
      {
        key: "deposits",
        name: t("Partner.DepAmount"),
        currency: true,
      },
      { key: "withdrawals", name: t("Partner.WidAmount"), currency: true },
      { key: "sonic", name: t("Partner.DepWidProfit"), currency: true },

      { key: "betamt", name: t("Partner.Betamount"), currency: true },
      {
        key: "winamt",
        name: t("Partner.Winamount"),
        currency: true,
      },
      {
        key: "profit",
        name: t("Partner.BetProfit"),
        currency: true,
      },
      {
        key: "rollamtsub",
        name: t("Partner.SubRolling"),
        currency: true,
      },
      {
        key: "rollamt",
        name: t("Partner.Rolling"),
        currency: true,
      },
    ];
    /**
     * Get Members
     *
     */
    const memberId = ref("");
    const members: any = ref<Array<IMember>>([]);
    const getMembers = async () => {
      const mems: IMember[] = await ApiService.get("/partner/members/select")
        .then((res) => res.data)
        .catch(() => []);
      members.value.splice(0, members.value.length, ...mems);
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
      getList();
    };

    /**
     * Get List
     *
     */
    const getList = async () => {
      let query = qs.stringify({
        game: props.game,
        start: daterange.start,
        end: daterange.end,
      });

      if (memberId.value !== "")
        query = qs.stringify({
          game: props.game,
          start: daterange.start,
          end: daterange.end,
          member_id: memberId.value,
        });

      const results = await ApiService.get(`/partner/game-stats?${query}`)
        .then((res) => res.data)
        .catch(() => []);
      // add data
      tableData.value.splice(0, tableData.value.length, ...results);
    };

    onMounted(() => getMembers());

    return {
      tableHeaders,
      tableData,
      memberId,
      // Date Picker
      setSelectedDate,
      moment,
      daterange,
      getList,
      members,
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