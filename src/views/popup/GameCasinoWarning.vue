<template>
  <PopupModal title="header.DepositRequest" type="tran">
    <template v-slot:header>
      <div class="modal-title">
        <div class="title-panel">
          <span class="title">{{ $t("CasinoWarning.Warning") }}</span>
          <span class="sub w-mob-title">Warning</span>
        </div>
      </div>
    </template>

    <template v-slot:body>
      <div class="form-container">
        <span style="font-size: 18px; line-height: 1.8em">
          <div>
            {{ $t("CasinoWarning.P1") }}
          </div>
          <div>{{ $t("CasinoWarning.P2") }}</div>
          <div>
            <span>{{ $t("CasinoWarning.P3") }}</span>
          </div>
          {{ $t("CasinoWarning.P4") }}
        </span>
      </div>
      <div class="modal-footer">
        <div class="form-footer dflex-ac-jc">
          <button type="button" class="btn btn-red-bg text-white" @click="closeModal()">
            {{ $t("Close") }}
          </button>
          <button
            type="button"
            class="btn btn-black-bg text-white mx-3"
            @click="launchGame(provider, lobby)"
          >
            {{ $t("ViewGame") }}
          </button>
        </div>
      </div>
    </template>
  </PopupModal>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import PopupModal from "./PopupModal.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "GameTransferWarning",
  props: {
    lobby: { type: String, required: true },
    provider: {
      type: String,
      required: true,
    },
  },
  components: {
    PopupModal,
  },
  setup() {
    const { t } = useI18n();
    const appStore = useAppStore();
    const authStore = useAuthStore();
    const router = useRouter();

    async function launchGame(provider: string, code: string) {
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
        `/game/${provider}/${code}`,
        "LiveWindow",
        "height=400;width=600"
      );
    }

    const openModal = (modal: string) => appStore.openModal(modal);
    const closeModal = () => appStore.openModal("");

    return {
      launchGame,
      openModal,
      closeModal,
    };
  },
});
</script>
