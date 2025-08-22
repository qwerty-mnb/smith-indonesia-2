<template>
  <div class="wrapper partner">
    <!-- Header -->
    <Header />
    <!-- Partner Header -->
    <PartnerHeader />
    <!-- Content -->
    <div class="wrapper-img-partner"></div>
    <div class="wrapper-img-body"></div>
    <div class="app-partner">
      <div class="app-partner-content">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
    <!-- Footer -->
    <Footer />
  </div>
  <!-- Login Modal -->
  <AuthLogin />
  <!-- Notice Popup -->
  <NoticePopup />

  <AddSubMember v-if="selectedModal === 'AddSubMember'" />
</template>
<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useAppStore } from "@/stores/app";

import Header from "./partials/Header.vue";
import PartnerHeader from "./partials/PartnerHeader.vue";
import Footer from "./partials/Footer.vue";
import AuthLogin from "@/views/auth/Login.vue";
import NoticePopup from "@/views/popup/NoticePopup.vue";
import AddSubMember from "@/views/partner/AddSubMember.vue";

export default defineComponent({
  name: "PartnerLayout",
  components: {
    Header,
    PartnerHeader,
    Footer,
    AuthLogin,
    NoticePopup,
    AddSubMember,
  },
  setup() {
    const appStore = useAppStore();
    const selectedModal = computed(() => appStore.activeModal);

    return {
      selectedModal,
    };
  },
});
</script>