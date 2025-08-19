<template>
  <!-- Transaction histoy -->
  <div class="bet-history-content">
    <div class="row">
      <div class="col-lg-3 ml-auto">
        <Field
          class="form-control sel-hist"
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
    <div class="table-history">
      <table
        class="bs-table"
        style="text-align: center; cursor: pointer"
      >
        <thead>
          <tr>
            <th v-for="col in columns" :key="col">{{ $t(col) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tran, idx) in paginatedList" :key="idx">
            <td
              v-bind:class="{
                bluetext: tran.type === 'DEPOSIT',
                redtext: tran.type === 'WITHDRAWAL',
              }"
            >
              {{ $t("depWid." + tran.type) }}
            </td>
            <td>{{ tran.bank_name }}</td>
            <td>{{ tran.bank_account_name }}</td>
            <td>{{ tran.bank_account }}</td>
            <td
              v-bind:class="{
                bluetext: tran.type === 'DEPOSIT',
                redtext: tran.type === 'WITHDRAWAL',
              }"
            >
              {{ $n(tran.amount, "currency") }}
            </td>
            <td>
              <span class="badge badge-primary" v-if="tran.status === 1">
                {{ $t("status.Wait") }}
              </span>
              <span class="badge badge-success" v-else-if="tran.status === 2">
                {{ $t("status.Complete") }}
              </span>
              <span class="badge badge-dark" v-else-if="tran.status === 3">
                {{ $t("status.Cancel") }}
              </span>
              <span class="badge badge-danger" v-else>{{
                $t("status.New")
              }}</span>
            </td>
            <td>{{ tran.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pager-div">
      <ul class="Pagination">
        <li class="PaginationControl" v-for="index in pages" :key="index">
          <button
            @click="getHistory(index)"
            :class="{ 'Page-active': currentPage === index }"
            :style="{
              'background-color':
                currentPage === index ? 'rgb(220, 237, 255)' : 'transparent',
            }"
            class="Page"
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
    const transactions = ref([]);
    const paginatedList = ref([]);
    const pageCount = ref(1);
    const pages = ref(1);
    const currentPage = ref(1);
    const historyFilter = ref("ALL");
    let list: any = ref([]);
    /**
     * Get History
     *
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
     *
     */
    const arrayPager = (items: any, count: number) => {
      return items
        .map((x: any, i: any) => i % count == 0 && items.slice(i, i + count))
        .filter((x: any) => x);
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
<style>
.PaginationControl .Control {
  width: 100% !important;
  height: 100% !important;
}
.Control {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  margin: 0 2px;
  fill: #bbbbbb;
}

.sel-hist {
  background-color: #0c0c0c !important;
  color: #a6a6a6 !important;
}
</style>
