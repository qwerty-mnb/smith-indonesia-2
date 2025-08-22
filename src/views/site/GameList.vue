<template>
  <MobileLogin />
  <main class="page-content w-ba">
    <section class="game-provider">
      <div class="">
        <!-- SnowLive Games -->
        <div class="casino-section sc-section" :class="{
          active:
            route.path === '/' ||
            (route.path === '/games' && activeTab === 'snowlive'),
        }" v-if="games.casinoGames.length > 0" ref="casino">
          <div class="game-title-wrap">
            <div class="game-title">
              <span>카지노</span>
              <em>CASINO</em>
              <p></p>
            </div>
          </div>
            
          <div class="dflex-ac-jc align-items-center gap15px">
            <a href="javascript:void(0);" class="sc-btn w-ba" style="animation-delay: 0s" v-for="(game, idx) in games.casinoGames.slice(
              0,
              viewAll.casino ? games.casinoGames.length : defItems
            )" :key="idx" :style="{ 'animation-delay': `${game.animationSecs}s` }" :class="{
  off: selectedLobbyM.code && selectedLobbyM.code !== game.code,
}">
              <GameBanner :game="game" :tag="game.type" :provider="game.provider" @select="openGame"
                @itemOverEmit="itemOverEmit" @itemOverLeaveEmit="itemOverLeaveEmit" />
            </a>
          </div>
        </div>

        <div>
          <!-- Slot Games -->
          <div id="pos-slot" name="pos-slot" class="slot-section sc-section mt-n3" :class="{
            active:
              route.path === '/' ||
              (route.path === '/games' && activeTab === 'slot'),
          }" v-if="games.slotGames.length > 0" ref="slot">
            <div class="game-title-wrap">
              <div class="game-title game-slot">
                <span>카지노</span>
                <em>SLOT</em>
                <p>
                  <!-- <img src="/img/icon/slot.webp" class="img-title" /> -->
                </p>
              </div>
            </div>
            
            <div class="dflex-ac-jc align-items-center gap15px">
              <a href="javascript:void(0);" class="sc-btn w-ba" style="animation-delay: 0s" v-for="(game, idx) in games.slotGames.slice(
                0,
                viewAll.slot ? games.slotGames.length : defItems
              )" :key="idx" :style="{ 'animation-delay': `${game.animationSecs}s` }" :class="{
  off: selectedLobbyM.code && selectedLobbyM.code !== game.code,
}">
                <GameBanner :game="game" :tag="game.type" :provider="game.provider" @select="openGame"
                  @itemOverEmit="itemOverEmit" @itemOverLeaveEmit="itemOverLeaveEmit" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  </main>
  <!-- Game Transfer Warning -->
  <!-- <GameTransferWarning v-if="selectedModal === 'SlotTransferWarning'" :lobby="selectedLobby.code" /> -->
  <!-- Game Casino Warning -->
  <!-- <GameCasinoWarning v-if="selectedModal === 'CasinoWarning'" :lobby="selectedLobby.code" :provider="selectedProvider" /> -->
  <!-- Slot Game List -->
  <SlotGameList v-if="selectedModal === 'SlotGameList'" :lobby="selectedLobby" :provider="selectedProvider" />
</template>

<script lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";
import GameTransferWarning from "@/views/popup/GameTransferWarning.vue";
import GameCasinoWarning from "@/views/popup/GameCasinoWarning.vue";
import SlotGameList from "@/views/site/SlotGameList.vue";
import Navbar from "./GameNavbar.vue";
import GameBanner from "./GameBanner.vue";
import MobileLogin from "@/views/auth/MobileLogin.vue";

interface Game {
  code: string;
  type: string;
  subgames: boolean;
  img_url: string;
  img_url_2: string;
  isOn: boolean;
}
interface OpenGame {
  provider: string;
  game: Game;
  status: boolean;
}

export default {
  name: "GameList",
  components: {
    GameBanner,
    Navbar,
    GameCasinoWarning,
    SlotGameList,
    GameTransferWarning,
    MobileLogin
  },
  props: {
    games: {
      type: Object,
      required: true,
    },
  },
  setup() {
    // vue variables
    const store = useAppStore();
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();

    const selectedLobby = ref({});
    const selectedProvider = ref("");
    const viewAll = ref({
      casino: false,
      slot: false,
    });

    const selectedLobbyM = ref({});
    const defItems = ref(12);

    const activeTab = computed(() => store.activeTab);
    const setActiveTab = (tab: string) => store.setTab(tab);
    const selectedModal = computed(() => store.activeModal);
    /**
     * Open Game
     *
     */
    const openGame = (open: OpenGame) => {
      selectedProvider.value = open.provider;
      selectedLobby.value = open.game;

      switch (open.game.type) {
        case "CASINO":
        case "HOTEL":  {
          store.openModal("");
          launchGame(open.provider, open.game.code);
          break;
        }
        case "SLOT": {
          store.openModal("SlotGameList");
          break;
        }
      }
    };

    async function launchGame(provider: string, code: string) {
      store.openModal("");
      window.open(
        `/game/${provider}/${code}`,
        "LiveWindow",
        "height=400;width=600"
      );
    }

    const itemOverEmit = (open: OpenGame) => {
      selectedLobbyM.value = open.game;
    };

    const itemOverLeaveEmit = () => {
      selectedLobbyM.value = {};
    };

    const setRouter = (path: string) => {
      router.push({ path });
    };

    const getAnimationDelay = (value: any) => {
      return 0;
    };

    const view = (type: String) => {
      switch (type) {
        case "casino":
          viewAll.value.casino = !viewAll.value.casino;
          break;
        case "slot":
          viewAll.value.slot = !viewAll.value.slot;
          break;
      }
    };

    // Check if is mobile
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    onMounted(() => {
      defItems.value = isMobile ? 6 : 12;
      window.addEventListener("resize", (evt: any) => {
        if (evt.target.window.innerWidth <= 767) {
          defItems.value = 6;
        } else {
          defItems.value = 12;
        }
      });

      view('casino');
      view('slot');
    });

    return {
      route,
      authStore,
      activeTab,
      selectedModal,
      selectedLobby,
      selectedProvider,
      selectedLobbyM,
      viewAll,
      view,
      openGame,
      setRouter,
      setActiveTab,
      getAnimationDelay,
      itemOverEmit,
      itemOverLeaveEmit,
      defItems,
    };
  },
};
</script>
