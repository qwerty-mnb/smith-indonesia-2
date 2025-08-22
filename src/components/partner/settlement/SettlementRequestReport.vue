<template>
<div class="d-flex flex-column flex-root banner-top">
  <div class="row">
    <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-9 col-sm-12 col-xs-12">
      <!-- List -->
      <div class="card">
        <div class="card-body">
          <KTDatatable
            :tableHeader="tableHeaders"
            :tableData="tableData"
            :rowsPerPage="50"
          ></KTDatatable>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted} from "vue";
import moment from "moment";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";
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
  name: "SettlementRequestReport",
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
    const authStore = useAuthStore();
    // table variables
    const tableData: any = ref<Array<IData>>([]);
    const tableHeaders = [
      { key: "pdate", name: t("depWid.Date"), text: true },
      {
        key: "betamt",
        name: t("history.BetAmount"),
        currency: true,
      },
      { key: "winamt", name: t("history.WinningAmount"), currency: true },
      { key: "loseamt", name: t("history.LosingAmount"), currency: true },

      { key: "rollamt", name: t("Partner.RollFee"), currency: true },
      {
        key: "profit",
        name: t("Partner.Profit"),
        currency: true,
      },
    ];

    const user = computed(() => authStore.user);
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
        // `/partner/settlements/request?game=${props.game}&start=${daterange.start}&end=${daterange.end}`
        `/partner/settlements/request?game=${props.game}`
      )
        .then((res) => res.data)
        .catch(() => []);

      tableData.value.splice(0, tableData.value.length, ...results);
    };

    /**
     * Withdraw current losing
     * 
     */
    const requestWithdrawal = async () => {
      await ApiService.post("/partner/settlements/request", {
        game: props.game
      })
        .then(() => {
          Swal.fire(
            t("PartnerMenu.SettlementRequest"),
            t("Partner.SettlemetRequestSuccess"),
            "success"
          );
        })
        .catch((e) =>
          Swal.fire(
            t("PartnerMenu.SettlementRequest"),
            t("Error." + e.response.data.message),
            "error"
          )
        );
    };

    onMounted(() => {
      getList();
    });

    return {
      tableHeaders,
      tableData,
      user,
      // Date Picker
      setSelectedDate,
      daterange,
      moment,
      getList,
      requestWithdrawal,
    };
  },
});
</script>