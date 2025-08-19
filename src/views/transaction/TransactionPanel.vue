<template>
  <div class="content-wrap cw-transaction">
    <div class="form-container">
      <div class="form-title">
        <div class="form-button">
          <button
            type="button"
            class="btn btn-black-bg text-white px-4"
            @click="setRouter('notice'), openModal('inquiry')"
          >
            {{ $t("header.Inquiry") }}
          </button>
        </div>
      </div>
      <div class="form-choices mt-4">
        <div class="panel">
          <div class="d-flex tab-btn-bg">
            <button
              type="button"
              class="btn-transaction btn-basic-tab tab-btn"
              :class="{ active: selectedModal === 'deposit' }"
              @click="openModal('deposit')"
            >
              {{ $t("header.DepositRequest") }}
            </button>
            <button
              type="button"
              class="btn-transaction btn-basic-tab tab-btn"
              :class="{ active: selectedModal === 'withdrawal' }"
              @click="openModal('withdrawal')"
            >
              {{ $t("header.WithdrawRequest") }}
            </button>
            <button
              type="button"
              class="btn-transaction btn-basic-tab tab-btn"
              :class="{ active: selectedModal === 'widephistory' }"
              @click="openModal('widephistory')"
            >
              {{ $t("header.WidDepHistory") }}
            </button>
          </div>
        </div>
      </div>
      <div class="tabpanel">
        <MoneyDeposit v-if="selectedModal === 'deposit'" />
        <MoneyWithdrawal v-if="selectedModal === 'withdrawal'" />
        <MoneyHistory v-if="selectedModal === 'widephistory'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useAppStore } from "@/stores/app";
import { useRouter } from "vue-router";
import MoneyDeposit from "@/views/transaction/MoneyDeposit.vue";
import MoneyWithdrawal from "@/views/transaction/MoneyWithdrawal.vue";
import MoneyHistory from "@/views/histories/DepWidHistory.vue";

export default defineComponent({
  name: "Page-Panel",
  components: {
    MoneyDeposit,
    MoneyWithdrawal,
    MoneyHistory,
  },
  setup() {
    const appStore = useAppStore();
    const router = useRouter();

    const openModal = (modal: string) => appStore.openModal(modal);
    const selectedModal = computed(() => appStore.activeModal);

    const setRouter = (path: string) => {
      router.push({ path });
    };

    onMounted(() => {
      setTimeout(() => {
        if (selectedModal.value === "")
        openModal('widephistory')
      }, 1000);

      // Set background
      var el = document.querySelector('.wrapper-img-container');
      el.style.backgroundImage = "url('')";
      el.style.backgroundColor = "#0c0c0c";
    });

    return {
      openModal,
      setRouter,
      appStore,
      selectedModal,
    };
  },
});
</script>

<style scoped>
  .btn-inq {
    border-radius: 3px !important;
    background: #0c0c0c !important;
  }
</style>