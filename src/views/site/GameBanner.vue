<template>
  <div class="game-item-list"
    @mouseover="itemOver(provider, game)"
    @mouseleave="itemOverLeave()"
    @click="openGame(provider, game)"
  >
    <div class="game-item cursor-pointer w-full">
      <div class="game-box">
        <div class="game-thumb">
          <img
            v-if="tag === 'CASINO' || tag === 'HOTEL' || tag === 'SLOT'"
            :src="`/img/providers/${game.code}.webp`"
            alt=""
          />

          <img
            v-if="tag === 'slot-th'"
            :src="`${game.img_url}`"
          />

        </div>

        <div class="game-info">
          <h3
             v-if="tag === 'CASINO' || tag === 'HOTEL'"
          >
            {{ $t(game.code) }}
          </h3>

          <h3
            v-if="tag === 'SLOT'"
          >
            {{ $t(game.code) }}
          </h3>

          <h3
            v-if="tag === 'slot-th'"
          >
            {{ game.ko_title }}
          </h3>

          <h4
            v-if="tag === 'CASINO' || tag === 'HOTEL'"
          >
            CASINO
          </h4>
          

          <h4 v-if="tag === 'SLOT'">
            SLOT
          </h4>

          <button class="btn-start">Play</button>
        </div>
      </div>
    </div>
  </div>  

</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useAppStore } from "@/stores/app";
import ApiService from "@/services/ApiService";

interface Game {
  code: string;
  img_url: string;
  img_url_2: string;
}

export default defineComponent({
  name: "GameBanner",
  components: {
    // Warning,
  },
  props: {
    game: {
      type: Object,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
  },
  emits: ["select", "itemOverEmit", "itemOverLeaveEmit"],
  setup(props, { emit }) {
    const appStore = useAppStore();
    // vue
    const authStore = useAuthStore();
    const settings = computed(() => appStore.settings);

    /**
     * Open Game
     *
     */
    const openGame = async (provider: string, game: Game) => {

      if (settings.value.ENABLE_MONEY_TRANSFER_GAME === "true") {
        if (props.provider === "SNOW_SNOW2" || props.provider === "KH") {
          if (Number(authStore.user.wallet) > 0) {
            await ApiService.post(`/game/snow/money-transfer/deposit`,
              {
                amount: Number(authStore.user.wallet),
              }
            ).then((res: any) => res.data).catch(() => false);
            authStore.user.wallet = 0;
          }
        } else {
          const balance = await ApiService.get(`/game/snow/money-transfer/balance`).then((res) => res.data.balance);

          if (balance > 0) {
            // Withdraw
            await ApiService.post(`/game/snow/money-transfer/withdrawal`, null).then((res) => res.data);
            authStore.user.wallet_slot = 0;
          }
        }
      }

      emit("select", { provider, game, status: true });
    }


    const itemOver = (provider: string, game: Game) =>
      emit("itemOverEmit", { provider, game, status: true });

    const itemOverLeave = () => emit("itemOverLeaveEmit");

    return {
      openGame,
      itemOver,
      itemOverLeave,
    };
  },
});
</script>

<style scoped>
.g-cont {
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}
</style>
