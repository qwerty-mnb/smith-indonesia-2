<template>
  <div class="d-flex flex-column flex-root">
    <!-- Date Range Picker -->
    <div
      class="row justify-content-end mb-4 search-container align-items-end"
      data-kt-customer-table-toolbar="base"
      v-if="authStore.user.shoplevel < 2"
    >
      <div class="col-lg-2 col-md-6 px-2 py-2 text-left">
        <span>{{ $t("Partner.TranType") }}</span>
        <select v-model="tranType" class="form-control my-2">
          <option
            v-for="option in tranTypes"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="col-lg-2 col-md-6 px-2 py-2 text-left">
        <span>{{ $t("Partner.StoreMember") }}</span>
        <input class="form-control my-2" v-model.lazy="receiver" type="text" />
      </div>
      <!-- Daterange Picker -->
      <div class="col-lg-4 col-md-6 px-2 py-2">
        <DateRangePicker
          class="col-12 my-2"
          initial="month"
          @changedate="setSelectedDate"
        />
      </div>
      <div class="col-lg-1 col-md-6 px-2 pb-3">
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
      <div class="card-body p-1">
        <KTDatatable
          :tableHeader="tableHeaderShop"
          :tableData="tableData"
          :rowsPerPage="50"
        >
          <!-- Transaction Type -->
          <template v-slot:cell-type="{ row: data }">
            <span
              class="badge badge-success"
              v-if="data.type === 'ADD'"
              >{{ $t("Partner.Add") }}</span
            >
            <span class="badge badge-danger" v-else>
              {{ $t("Partner.Deduct") }}
            </span>
          </template>
          <!-- Amount -->
          <template v-slot:cell-amount="{ row: data }">
            <span
              class="text-success"
              v-if="data.type === 'ADD'"
              >+ {{ $n(Number(data.amount)) }}</span
            >
            <span class="text-danger" v-else>
              - {{ $n(Number(data.amount)) }}
            </span>
          </template>
        </KTDatatable>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import moment from "moment";
import qs from "qs";
import ApiService from "@/services/ApiService";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import DateRangePicker from "@/components/kt-date/DateRangePicker.vue";
import { useAuthStore } from "@/stores/auth";

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
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);

    // table variables
    const tableData: any = ref<Array<IData>>([]);
    const tableHeaderShop = ref([
      { key: "receiver", name: t("Partner.StoreMember"), text: true },
      { key: "type", name: t("Partner.TranType"), customslot: true },
      { key: "amount", name: t("Partner.TranAmount"), customslot: true },
      {
        key: "updatedAt",
        name: t("depWid.Date"),
      },
    ]);

    const tranType = ref("ALL");
    const tranTypes = [
      { label: t("Partner.All"), value: "ALL" },
      { label: t("Partner.Add"), value: "ADD" },
      { label: t("Partner.Deduct"), value: "DEDUCT" },
    ];

    const searchType = ref("ID");
    const receiver = ref("");
    const searchTypes = [
      { label: t("auth.ID"), value: "ID" },
      { label: t("Partner.Nickname"), value: "NICKNAME" },
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

    onMounted(() => {
      if (user.value.shoplevel === 2) {
        tableHeaderShop.value[0].key = "sender"
        tableHeaderShop.value[0].name =  t("Partner.Sender")
      }

      if (user.value.shoplevel === 2) {
        getList();
      }
    });

    /**
     * Get List
     *
     */
    const getList = async () => {
      let apipath = "";
      let query = qs.stringify({
          receiver: receiver.value, 
          type: tranType.value, 
          start: daterange.start, 
          end: daterange.end,
        });

      if (user.value.shoplevel < 2) {
        apipath = `/partner/shop/transactions/sender?${query}`
      } else if (user.value.shoplevel === 2) {
        apipath = `/partner/shop/transactions/receiver`
      }

      const results = await ApiService.get(apipath)
        .then((res) => res.data)
        .catch(() => []);
      // add data
      tableData.value.splice(0, tableData.value.length, ...results);
    };



    return {
      tableHeaderShop,
      tableData,
      tranType,
      tranTypes,
      searchType,
      searchTypes,
      receiver,
      // Date Picker
      setSelectedDate,
      daterange,
      getList,
      authStore
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