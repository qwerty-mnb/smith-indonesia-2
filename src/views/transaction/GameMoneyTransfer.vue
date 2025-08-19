<template>
  <div>
    <!-- Live Casino -->
    <div
      class="title"
      style="font-size: 2rem; font-weight: 500; padding-bottom: 30px"
    ></div>
    <!-- Live casino -->
    <div class="transfer-bg">
      <div class="transfer-bg-live">
        <span class="game-main-title"
          >{{ $t("gameTransfer.LiveCasino") }}: </span
        ><span class="game-main-title amount">{{
          $n(parseInt(user.wallet), "currency")
        }}</span>
      </div>
    </div>
    <!-- API 2 ALL Slot -->
    <SlotTransactionButton
      v-if="gamesCounter.snow2 > 0"
      provider="SNOW_SNOW2"
    />
    <!-- THE PLUS Slot -->
    <SlotTransactionButton
      v-if="gamesCounter.snow3 > 0"
      provider="SNOW_SNOW3"
    />
    <!-- KGON Slot -->
    <SlotTransactionButton
      v-if="gamesCounter.snow4 > 0"
      provider="SNOW_SNOW4"
    />
    <!-- KTEN Slot -->
    <SlotTransactionButton
      v-if="gamesCounter.snow5 > 0"
      provider="SNOW_SNOW5"
    />
    <!-- SNOW6 Slot -->
    <SlotTransactionButton
      v-if="gamesCounter.snow6 > 0"
      provider="SNOW_SNOW6"
    />
  </div>
  <!-- Slot Deposit Modal -->
  <GameDeposit v-if="showSlotDeposit" provider="" :currentWallet="slotWallet" />
</template>
<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import GameDeposit from "@/views/transaction/GameDeposit.vue";
import SlotTransactionButton from "@/views/transaction/SlotTransactionButton.vue";
import CloseModal from "@/components/CloseModal.vue";
import ApiService from "@/services/ApiService";
import { useAuthStore } from "@/stores/auth";

interface Game {
  code: string;
  provider: string;
  sort: number;
  animationSecs: number;
}

export default defineComponent({
  name: "MoneyTransfer",
  components: {
    GameDeposit,
    SlotTransactionButton,
    CloseModal,
  },
  setup() {
    const authStore = useAuthStore();

    const slotWallet = ref(0);
    const showSlotDeposit = ref(false);

    const gamesCounter = ref({
      snow2: 0,
      snow3: 0,
      snow4: 0,
      snow5: 0,
      snow6: 0,
    });

    const user = computed(() => authStore.user);

    /**
     * Get Games
     *
     */
    async function getGames() {
      const lobbies: Game[] = await ApiService.get("/site/games")
        .then((res) => res.data)
        .catch(() => []);

      if (lobbies.length > 0) {
        gamesCounter.value.snow2 = lobbies.filter(
          (r) => r.provider === "SNOW_SNOW2"
        ).length;
        gamesCounter.value.snow3 = lobbies.filter(
          (r) => r.provider === "SNOW_SNOW3"
        ).length;
        gamesCounter.value.snow4 = lobbies.filter(
          (r) => r.provider === "SNOW_SNOW4"
        ).length;
        gamesCounter.value.snow5 = lobbies.filter(
          (r) => r.provider === "SNOW_SNOW5"
        ).length;
        gamesCounter.value.snow6 = lobbies.filter(
          (r) => r.provider === "SNOW_SNOW6"
        ).length;
      }
    }

    onMounted(() => getGames());

    return {
      user,
      slotWallet,
      showSlotDeposit,
      gamesCounter,
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
  // border-radius: 10px;
}
.game-main-title {
  font-size: 18px;
  line-height: 35px;
  color: black;
  padding-left: 10px;
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
    height: 90px;
  }

  .transfer-wallet-btn {
    position: relative;
    padding-right: 0;
    top: 5px;
  }
}
</style>
