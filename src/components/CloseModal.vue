<template>
  <button
    type="button"
    data-bs-dismiss="modal"
    class="modal-close-btn w-ba"
    @click="closeModal"
  ></button>
</template>
<script lang="ts">
import { useAppStore } from "@/stores/app";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CloseModal",
  setup() {
    const appStore = useAppStore();

    const closeModal = () => appStore.openModal("");

    return {
      closeModal,
    };
  },
});
</script>
