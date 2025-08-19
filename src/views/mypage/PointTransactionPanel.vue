<template>
  <div class="content-wrap cw-transaction">
    <div class="form-container">
      <div class="form-choices">
        <div class="panel">
          <div class="d-flex">
            <button
              type="button"
              class="btn-transaction btn-basic-tab"
              :class="{ active: selectedModal === 'point' }"
              @click="openModal('point')"
            >
              {{ $t("point.Title") }}
            </button>
            <button
              type="button"
              class="btn-transaction btn-basic-tab"
              :class="{ active: selectedModal === 'change' }"
              @click="openModal('change')"
            >
              {{ $t("password.ChangePassword") }}
            </button>
            <button
              type="button"
              class="btn-transaction btn-basic-tab"
              :class="{ active: selectedModal === 'CouponModal' }"
              @click="openModal('CouponModal')"
            >
              {{ $t("coupon.Title") }}
            </button>
          </div>
        </div>
      </div>
      <div class="tabpanel">
        <ChangePassword v-if="selectedModal === 'change'" />
        <PointTransfer v-if="selectedModal === 'point'" />
        <MemberCoupon v-if="selectedModal === 'CouponModal'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useAppStore } from "@/stores/app";
import { useRouter } from "vue-router";

// components
import PointTransfer from "@/views/mypage/PointTransfer.vue";
import ChangePassword from "@/views/mypage/ChangePassword.vue";
import MemberCoupon from "@/views/mypage/MemberCoupons.vue";


export default defineComponent({
  name: "Point-Panel",
  components: {
    PointTransfer,
    ChangePassword,
    MemberCoupon,
  },
  setup() {
    const appStore = useAppStore();

    const openModal = (modal: string) => appStore.openModal(modal);
    const selectedModal = computed(() => appStore.activeModal);
    const router = useRouter();

    const setRouter = (path: string) => {
      router.push({ path });
    };

    onMounted(() => {
      setTimeout(() => {
        if (selectedModal.value === "")
        openModal('point')
      }, 1000);
    });

    return {
      openModal,
      appStore,
      selectedModal,
      setRouter
    };
  },
});
</script>