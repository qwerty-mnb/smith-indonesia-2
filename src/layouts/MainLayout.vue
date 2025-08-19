<template>
  <div>
    <SiteHeader />
  </div>

  <MainBanner />

  <div class="max-w-[1170px] mx-auto">
    <div
      class="h-[50px] bg-[#40027e] text-white rounded-[5px] my-[15px] mx-0 py-[10px] px-[20px] flex justify-between"
    ></div>
  </div>

  <!-- <div class="wrapper"> -->
  <!-- Header -->
  <!-- <Header /> -->
  <!-- <div class="wrap-content"> -->
  <!-- <div class="wrapper-img"></div> -->

  <!-- Site Header -->
  <!-- <SiteHeader /> -->
  <!-- Partners Header -->
  <!-- <PartnerHeader />
      <MainBanner/> -->

  <!-- <div class="wrapper-img-container"> -->
  <!-- Banner -->
  <!-- <Banner /> -->
  <!-- Content -->
  <!-- <div id="page-content" :class="{ 'adjust-pagecnt': route.path != '/' }">
          <router-view :key="$route.fullPath" />
        </div> -->

  <!-- </div> -->

  <!-- Footer -->
  <!-- <GameFooter /> -->
  <!-- <Footer /> -->
  <!-- </div>
  </div> -->
  <!-- Login Modal -->
  <AuthLogin />
  <!-- Notice Popup -->
  <NoticePopup />
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useAppStore } from "@/stores/app";
import { useRoute } from "vue-router";

import Header from "./partials/Header.vue";
import SiteHeader from "./partials/SiteHeader.vue";
import PartnerHeader from "./partials/PartnerHeader.vue";
import Banner from "./partials/Banner.vue";
import Footer from "./partials/Footer.vue";
import AuthLogin from "@/views/auth/Login.vue";
import NoticePopup from "@/views/popup/NoticePopup.vue";
import GameFooter from "@/layouts/partials/GameFooter.vue";
import MainBanner from "@/components/banner/MainBanner.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    Header,
    SiteHeader,
    GameFooter,
    Footer,
    AuthLogin,
    NoticePopup,
    PartnerHeader,
    Banner,
    MainBanner,
  },
  setup() {
    // vue
    const appStore = useAppStore();
    const selectedModal = computed(() => appStore.activeModal);
    const route = useRoute();

    return {
      selectedModal,
      route,
    };
  },
});
</script>

<style>
.adjust-pagecnt {
  top: 10rem;
  /* position: absolute; */
  width: 100%;
}
</style>
