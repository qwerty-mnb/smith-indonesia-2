<template>
  <div class="d-flex flex-column flex-root details-tab">
    <!-- Date Range Picker -->
    <div
      class="d-flex justify-content-end mb-4"
      data-kt-customer-table-toolbar="base"
    >
      <div class="px-2 d-flex">
        <label class="text-white text-nowrap mr-2" for="search-type"
          >검색키</label
        >
        <select v-model="searchType" class="pl-3 pr-3 mr-2" id="search-type">
          <option
            v-for="option in searchTypes"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <button type="submit" class="btn btn-black-bg text-white">
          {{ $t("Partner.Casino") }}
        </button>
      </div>
    </div>
    <!-- Dep Wid Summary -->
    <div class="row">
      <div class="col-md-12">
        <KTDatatable
          :tableHeader="tableHeaders"
          :tableData="tableData"
          :rowsPerPage="50"
        ></KTDatatable>
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
  coupon_name: string;
  amount: number;
  expiration: string;
  used_date: string;
  how_to_use: string;
  req_status: number;
  status: number;
}

interface DateRange {
  start: string;
  end: string;
}

export default defineComponent({
  name: "Coupons",
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
      {
        key: "coupon_name",
        name: t("Partner.CouponName"),
      },
      {
        key: "amount",
        name: t("depWid.Amount"),
      },
      {
        key: "expiration",
        name: t("Partner.CouponExpired"),
      },
      {
        key: "used_date",
        name: t("Partner.UsedDate"),
      },
      {
        key: "how_to_use",
        name: t("Partner.HowToUse"),
      },
      {
        key: "req_status",
        name: t("Partner.ReqStatus"),
      },
      {
        key: "status",
        name: t("Partner.Status"),
      },
    ];
    const searchTypes = [
      { label: "전체", value: "0" },
      { label: "사용가능", value: "1" },
      { label: "사용완료", value: "2" },
      { label: "기간만료", value: "3" },
      { label: "회수", value: "4" },
    ];
    const searchType = ref(0);

    /**
     * Get List
     *
     */
    const getList = async () => {
      const results = await ApiService.get(`/tran/coupons/${props.member_id}`)
        .then((res) => res.data)
        .catch(() => []);
      // add data
      tableData.value.splice(0, tableData.value.length, ...results);
    };

    /**
     * On Mounted
     *
     */
    onMounted(() => {
      // set theme
      // get user data
      getList();
    });

    return {
      tableHeaders,
      tableData,
      searchTypes,
      searchType,
    };
  },
});
</script>

<style scoped>
button {
  border-radius: 5px !important;
}
</style>