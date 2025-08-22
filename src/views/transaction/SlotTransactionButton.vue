<template>
  <div class="d-flex wallet-slots">
    <div class="badge badge-default slot-wallet">
      <span class="game-main-title">{{ $t(`slot.${provider}Amount`) }}:</span>
      <span class="game-main-title">{{
        $n(parseInt(slotWallet), "currency")
      }}</span>
    </div>
    <button
      type="button"
      class="btn btn-deposit-1"
      @click="showSlotDeposit = true"
    >
      {{ $t("depWid.DEPOSIT") }}
    </button>
    <button type="button" class="btn btn-withdraw-1" @click="withdrawSlot">
      {{ $t("depWid.WITHDRAW") }}
    </button>
    <button type="button" class="btn btn-warning btn-refresh-1" @click="refresh">
      <i class="fa-solid fa-refresh text-white"></i>
    </button>
  </div>
  <!-- Slot Deposit Modal -->
  <GameDeposit
    v-if="showSlotDeposit"
    :provider="provider"
    :currentWallet="parseInt(slotWallet)"
    @closeModal="showSlotDeposit = false"
    @refresh="refresh"
  />
</template>
<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import GameDeposit from "./GameDeposit.vue";
import ApiService from "@/services/ApiService";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "SlotTransactionButton",
  components: {
    GameDeposit,
  },
  props: {
    provider: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const authStore = useAuthStore();
    const { t } = useI18n();

    const user = computed(() => authStore.user);
    const slotWallet = ref(0);
    const showSlotDeposit = ref(false);

    /**
     * Get Slot Balance
     *
     */
    async function refresh() {
      // refresh
      if (authStore.isAuthenticated) 
      slotWallet.value = await ApiService.get(
        `/game/snow/money-transfer/balance`
      )
        .then((res) => res.data.balance)
        .catch(() => 0);
    }

    /**
     * Withdraw Slot
     *
     */
    async function withdrawSlot() {
      const resp = await ApiService.post(
        `/game/snow/money-transfer/withdrawal`,
        null
      )
        .then((res) => res.data)
        .catch((e) => e.response.data);

      if (resp.message != "WITHDRAW_SUCCESS" && resp.message != "LAUNCH_FIRST")
        return Swal.fire({
          icon: "error",
          title: t("gameTransfer.AllGameTransfer"),
          text: t("notif." + resp.message),
          confirmButtonColor: "#FF0000",
          confirmButtonText: t("notif.Close"),
        });

      Swal.fire({
        icon: "success",
        title: t("gameTransfer.AllGameTransfer"),
        text: t("gameTransfer.WithdrawSuccess"),
        confirmButtonColor: "#FF0000",
        confirmButtonText: t("notif.Close"),
      });
      // refresh balance
      slotWallet.value = 0;
      
    }

    onMounted(() => refresh());

    return {
      user,
      slotWallet,
      showSlotDeposit,
      withdrawSlot,
      refresh,
    };
  },
});
</script>
<style lang="scss">
.transfer-bg {
  height: 45px;
  background: linear-gradient(
    to right,
    #bf953f,
    #fcf6ba,
    #b38728,
    #fbf5b7,
    #aa771c
  );
  width: 100%;
  position: relative;
  border-bottom: 5px solid black;
  border-radius: 0.3em;
}
.game-main-title {
  font-size: 0.9em;
    color: white;
    padding-left: 10px;
    font-weight: 600;
}
.game-main-title .btn-warning {
  color: black !important;
  font-weight: 600;
}
.amount {
  color: rgb(236, 17, 28);
}

.transfer-bg-live {
  position: absolute;
  margin-left: 5px;
  margin-top: 3px;
}

.transfer-bg-wallet {
  margin-left: 0px;
  margin-top: 3px;
  text-align: left;
  padding-left: 5px;
}

.transfer-wallet-btn {
  position: absolute;
  right: 0;
  padding-right: 22px;
  top: 0;
}

@media only screen and (max-width: 572px) {
  .transfer-bg {
    height: 75px;
  }

  .transfer-bg-live {
    position: relative;
    margin-left: 0;
  }

  .transfer-bg-live > span {
    display: block;
    padding: 0;
  }

  .transfer-bg-wallet {
    position: relative;
    margin-left: 0;
    margin-top: 0;
    text-align: center;
    height: auto;
    padding-bottom: 0.5em;
  }

  .transfer-wallet-btn {
    position: relative;
    padding-right: 0;
    top: 5px;
  }
}
</style>
