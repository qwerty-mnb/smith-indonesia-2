<template>
  <!-- Inquiry Body -->
  <div class="mx-4">
    <div class="row">
    </div>
    <div class="modal-body-center">
      <div class="table-history">
        <table class="bs-table" style="text-align: center; margin-top: 25px; cursor: pointer">
          <thead>
            <tr>
              <th v-for="col in columns" :key="col">{{ $t(col) }}</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="(tran, idx) in paginatedList" :key="idx">
              <td>{{ tran.type }}</td>
              <td>{{ tran.code }}</td>
              <td>{{ tran.amount }}</td>
              <td>{{ tran.expiryAt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="pager-div">
        <ul class="Pagination">
          <li class="PaginationControl" v-for="index in pages" :key="index">
            <button @click="getCoupons(index)" :class="{ 'Page-active': currentPage === index }"
              :style="{ 'background-color': currentPage === index ? 'rgb(220, 237, 255)' : 'transparent' }" class="Page"
              type="button">{{ index }}</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import moment from "moment";
import PopupModal from "../popup/PopupModal.vue";
import ApiService from "@/services/ApiService";

import CloseModal from "@/components/CloseModal.vue";

export default defineComponent({
  name: "CouponModal",
  components: {
    PopupModal,
    CloseModal,
  },
  created() {
    this.moment = moment;
  },
  setup() {
    const columns = [
      "depWid.Type",
      "coupon.Code",
      "coupon.Description",
      "coupon.ExpirationDate",
    ];
    const couponList = ref([]);
    const paginatedList = ref([]);
    const pageCount = ref(1);
    const pages = ref(1);
    const currentPage = ref(1);

    /**
     * Get Coupons
     *
     */
    const getCoupons = async (idx: number) => {
      currentPage.value = idx
      // Change the api endpoint
      if (currentPage.value == 1) {
        const list = await ApiService.get("/tran/coupons")
          .then((res) => res.data)
          .catch((e) => e.response.data);
        couponList.value = arrayPager(list, 20);
        pages.value = couponList.value.length;
        paginatedList.value = couponList.value[currentPage.value - 1];
      } else {
        paginatedList.value = couponList.value[currentPage.value - 1];
      }
    };

    /**
     * Group the array based on the page count
     *
     */
    const arrayPager = (items: any, count: any) => {
      return items
        .map((x: any, i: any) => i % count == 0 && items.slice(i, i + count))
        .filter((x: any) => x);
    };

    onMounted(() => {
      getCoupons(currentPage.value);
    });
    return {
      columns,
      currentPage,
      pageCount,
      paginatedList,
      pages,
      couponList,
      moment,
      getCoupons,
    };
  },
});
</script>
  