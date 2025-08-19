<template>
  <div class="content-wrap cw-transaction">
    <div class="form-container">
      <div class="form-choices">
        <div class="panel">
          <div class="d-flex tab-btn-bg">
            <button
              type="button"
              class="btn-transaction btn-basic-tab tab-btn"
              :class="{ active: selectedModal === 'notice' }"
              @click="openModal('notice')"
            >
              {{ $t("header.Notice") }}
            </button>
            <button
              type="button"
              class="btn-transaction btn-basic-tab tab-btn"
              :class="{
                active:
                  selectedModal === 'inquiry' || selectedModal === 'support',
              }"
              @click="openModal('inquiry')"
            >
              {{ $t("header.CustomerSupport") }}
            </button>
            <button
              type="button"
              class="btn-transaction btn-basic-tab tab-btn"
              :class="{
                active:
                  selectedModal === 'terms' || selectedModal === 'regulations',
              }"
              @click="openModal('terms')"
            >
              {{ $t("header.TermsCondition") }}
            </button>
          </div>
        </div>
      </div>
      <div class="tabpanel">
        <Notice v-if="selectedModal === 'notice'" />
        <Inquiry
          v-if="selectedModal === 'inquiry' || selectedModal === 'support'"
        />
        <TermsCondition
          v-if="selectedModal === 'terms' || selectedModal === 'regulations'"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useAppStore } from "@/stores/app";
import Notice from "@/views/site/SiteNotice.vue";
import Inquiry from "@/views/mypage/MemberInquiry.vue";
import TermsCondition from "@/views/site/TermsAndCondition.vue";

export default defineComponent({
  name: "Site-Panel",
  components: {
    Notice,
    Inquiry,
    TermsCondition,
  },
  setup() {
    const appStore = useAppStore();

    const openModal = (modal: string) => appStore.openModal(modal);
    const selectedModal = computed(() => appStore.activeModal);

    onMounted(() => {
      setTimeout(() => {
        if (selectedModal.value === "") openModal("notice");
      }, 1000);

      // Set background
      var el = document.querySelector('.wrapper-img-container');
      el.style.backgroundImage = "url('')";
      el.style.backgroundColor = "#0c0c0c";
    });

    return {
      openModal,
      appStore,
      selectedModal,
    };
  },
});
</script>