<template>
  <!-- Table -->
  <div class="table-history">
    <table class="bs-table" style="text-align: center; margin-top: 25px; cursor: pointer">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col">{{ $t(col) }}</th>
        </tr>
      </thead>
      <tbody class="bg-white">
        <tr v-for="(item, idx) in histories" :key="idx">
          <td>{{ $n(parseInt(item.amount)) }}</td>
          <td>
            <span v-if="item.status === 0" class="badge badge-info">
              {{ $t("status.New") }}
            </span>
            <span v-else-if="item.status === 1" class="badge badge-warning">
              {{ $t("status.Wait") }}
            </span>
            <span v-else-if="item.status === 2" class="badge badge-success">
              {{ $t("status.Complete") }}
            </span>
            <span v-else class="badge badge-danger">
              {{ $t("Status.AdminCancel") }}
            </span>
          </td>
          <td>{{ item.createdAt }}</td>
          <td>{{ item.updatedAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="pager-div">
    <ul class="Pagination">
      <li class="PaginationControl" v-for="index in pages" :key="index">
        <button @click="getHistory(index)" :class="{ 'Page-active': currentPage === index }"
          :style="{ 'background-color': currentPage === index ? 'rgb(220, 237, 255)' : 'transparent' }" class="Page"
          type="button">{{ index }}</button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import ApiService from "@/services/ApiService";

interface IHistory {
  amount: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  name: "PointHistory",
  components: {
  },
  setup() {
    const histories: any = ref<Array<IHistory>>([]);
    const pages = ref(1);
    const currentPage = ref(1);
    const columns = ["point.Amount", "Partner.Status", "Partner.ReqDate", "Partner.ProcessDate"];
    /**
     * Get History
     *
     */
    const getHistory = async (idx: number) => {
      currentPage.value = idx
      const results = await ApiService.get(`/tran/point/history`)
        .then((res) => res.data)
        .catch(() => []);
      // add data
      histories.value.splice(0, histories.value.length, ...results);
    };

    onMounted(() => getHistory(currentPage.value));

    return {
      columns,
      histories,
      pages,
      currentPage,
      getHistory,
    };
  },
});
</script>
