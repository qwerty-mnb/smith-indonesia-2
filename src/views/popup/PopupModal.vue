<template>
  <div
    class="joinModal modal fade show"
    tabindex="-1"
    role="dialog"
    id="depositModal"
    style="display: unset !important"
    v-if="appStore.activeModal != 'Partners'"
  >
  <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header"
          :class="{ 'modal-header-season': type === 'money' }">
          <slot name="close"></slot>
          <div class="modal-banner">
            <slot name="header"></slot>
          </div>
        </div>
        <div class="modal-body pt-md-5 pt-3"
          :class="{ 'cw-transaction modal-bg': type === 'money' }">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useAppStore } from "@/stores/app";

export default defineComponent({
  name: "PopupModal",
  props: {
    title: { type: String, required: true },
    type: { type: String, required: false },
  },
  setup() {
    const appStore = useAppStore();

    const closeModal = () => appStore.openModal("");
    const openModal = (modal: string) => appStore.openModal(modal);

    return {
      closeModal,
      openModal,
      appStore,
    };
  },
});
</script>

<style scoped>
.partner-wrapper .modal-banner {
    border: none !important;
}
</style>