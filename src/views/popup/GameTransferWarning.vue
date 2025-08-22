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
            {{ $t("SlotWarning.P1") }}
          </div>
          <div>{{ $t("SlotWarning.P2") }}</div>
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
            @click="openModal('SlotGameList')"
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
import { useAppStore } from "@/stores/app";
import PopupModal from "./PopupModal.vue";

export default defineComponent({
  name: "GameTransferWarning",
  props: {
    lobby: { type: String, required: true },
  },
  components: {
    PopupModal,
  },
  setup() {
    const store = useAppStore();

    const openModal = (modal: string) => store.openModal(modal);
    const closeModal = () => store.openModal("");

    return {
      openModal,
      closeModal,
    };
  },
});
</script>
