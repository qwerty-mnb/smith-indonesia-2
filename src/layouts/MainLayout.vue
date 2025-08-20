<template>
  <div id="app" class="main-layout">
    <TopBar />
    <SiteHeader />
    <Banner />

    <div class="home-info-container">
      <div class="container">
        <Announcement />

        <Jackpot />

        <!-- Main Content Area -->
        <main class="main-content">
          <router-view />
        </main>

        <PopularGames />
      </div>
    </div>

    <SportsPlatform />

    <DownloadApp />

    <SiteFooter />

    <Login v-if="activeModal === 'Login'" @close="closeModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useAppStore } from "@/stores/app";
import SiteHeader from "@/layouts/new/SiteHeader.vue";
import TopBar from "@/layouts/new/TobBar.vue";
import Banner from "./new/Banner.vue";
import Announcement from "./new/Announcement.vue";
import Login from "@/views/auth/Login.vue";
import Jackpot from "./new/Jackpot.vue";
import PopularGames from "./new/PopularGames.vue";
import SportsPlatform from "./new/SportsPlatform.vue";
import SiteFooter from "./new/SiteFooter.vue";
import DownloadApp from "./new/DownloadApp.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    TopBar,
    SiteHeader,
    Banner,
    Announcement,
    Login,
    Jackpot,
    PopularGames,
    SportsPlatform,
    DownloadApp,
    SiteFooter
  },
  setup() {
    const store = useAppStore();

    const activeModal = computed(() => store.activeModal);
    const closeModal = () => store.openModal("");

    return {
      activeModal,
      closeModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #000418;
}

.main-content {
  flex: 1;
  width: 100%;
}
</style>
