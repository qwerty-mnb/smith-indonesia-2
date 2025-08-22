<template>
  <PopupModal :title="lobby.code" type="tran">
    <template v-slot:close>
      <CloseModal />
    </template>
    <template v-slot:header>
      <div class="modal-title">
        <div class="title-panel">
          <span class="title">{{
            $t(lobby.code) + " " + $t("header.SlotList")
          }}</span>
        </div>
      </div>
    </template>
    <template v-slot:body>
      <div class="slot-section sc-section active">
        <div class="dflex-ac-jc align-items-start justify-content-center">
          <a
            href="javascript:void(0);"
            class="sc-btn w-ba"
            style="animation-delay: 0s"
            v-for="(game, idx) in games"
            :key="idx"
          >
            <GameBanner
              :game="game"
              tag="slot-th"
              :code="lobby.code"
              :provider="provider"
              @select="openGame"
            />
          </a>
        </div>
      </div>
    </template>
  </PopupModal>
</template>
<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import PopupModal from "../popup/PopupModal.vue";
import GameBanner from "../site/GameBanner.vue";
import CloseModal from "@/components/CloseModal.vue";
import ApiService from "@/services/ApiService";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SlotGameList",
  props: {
    provider: {
      type: String,
      required: true,
    },
    lobby: {
      type: Object,
      required: true,
    },
  },
  components: {
    CloseModal,
    PopupModal,
    GameBanner,
  },
  setup(props) {
    const { t } = useI18n();
    const authStore = useAuthStore();
    const appStore = useAppStore();
    const router = useRouter();

    const games = ref([]);
    /**
     * Get Lobby
     *
     */
    const getGameList = async () => {
      games.value = await ApiService.get(
        `/site/gamelists/${props.lobby.provider}/${props.lobby.code}`
      )
        .then((res) => res.data)
        .catch(() => []);
    };

    /**
     * Open Game
     *
     */
    const openGame = (game: any) => {
      if (authStore.inquiryCtr > 0)
        return Swal.fire(
          t("CasinoWarning.Warning"),
          t("CasinoWarning.Unread"),
          "warning"
        ).then((result) => {
          if (result.value)
          router.push("/notice");
          openModal("inquiry");
        });

      window.open(
        `/slot/${props.provider}/${props.lobby.code}/${game.game.code}`,
        "SlotWindow",
        "height=400;width=600"
      );
    };
    const openModal = (modal: string) => appStore.openModal(modal);
    onBeforeMount(() => getGameList());

    return {
      games,
      openGame,
    };
  },
});
</script>

<style scoped>
.dflex-ac-jc {
  gap: 1rem;
}
</style>
