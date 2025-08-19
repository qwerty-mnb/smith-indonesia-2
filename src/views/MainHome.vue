<template>
  <!-- Gamelist -->
  <!-- <GameList :games="games" v-if="appStore.activeModal != 'Partners'" /> -->
  <div class="max-w-[1170px] mx-auto">
    <PopularGames />

    <RecentGames />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { useAppStore } from "@/stores/app";

// Components
import ApiService from "../services/ApiService";
import GameList from "./site/GameList.vue";
import PopularGames from "@/layouts/partials/PopularGames.vue";
import RecentGames from "@/layouts/partials/RecentGames.vue";

interface Game {
  code: string;
  provider: string;
  sort: number;
  animationSecs: number;
  type?: string;
}

export default defineComponent({
  name: "MainHome",
  components: {
    GameList,
    PopularGames,
    RecentGames,
  },
  setup() {
    // vue
    const appStore = useAppStore();
    // page
    const settings = computed(() => appStore.settings);
    const selectedModal = computed(() => appStore.activeModal);

    const moveable = ref({
      target: [".moveable"],
      draggable: true,
      throttleDrag: 1,
      resizable: false,
      throttleResize: 1,
      keepRatio: false,
      scalable: true,
      throttleScale: 0.01,
      rotatable: true,
      throttleRotate: 0.2,
      pinchable: true,
      origin: false,
    });

    const handleDrag = (e: any) => {
      e.target.style.transform = e.transform;
    };
    /**
     * Games
     *
     */
    const games = ref({
      slotGames: [] as Game[],
      casinoGames: [] as Game[],
    });

    async function getGames() {
      let lobbies: Game[] = await ApiService.get("/site/games")
        .then((res) => res.data)
        .catch(() => []);

      if (lobbies.length > 0) {
        games.value.slotGames = lobbies.filter((r) => r.type === "SLOT");
        games.value.casinoGames = lobbies.filter(
          (r) => r.type === "CASINO" || r.type === "HOTEL"
        );

        games.value.slotGames = setAnimationSecs(games.value.slotGames);
        games.value.casinoGames = setAnimationSecs(games.value.casinoGames);
      }
    }

    const setAnimationSecs = (data: any) => {
      let i = 0;
      const settedVal = data;
      for (let x = 0; x < settedVal.length; x++) {
        settedVal[x].animationSecs = 0;
        settedVal[x].animationSecs = i;
        i += 0.1;
      }

      return settedVal;
    };

    onMounted(() => {
      getGames();
    });

    return {
      selectedModal,
      settings,
      games,
      handleDrag,
      moveable,
      appStore,
    };
  },
});
</script>

<style>
.modal-backdrop {
  display: none;
}

.modal {
  background-color: rgba(0, 0, 0, 0.8) !important;
  position: fixed;
}

.modal-footer {
  border-top: 1px solid #262626 !important;
  margin-top: 2em;
}

.form-footer {
  margin: 11px auto 0 !important;
}
</style>
