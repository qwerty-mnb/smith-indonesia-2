<template>
  <div id="app" class="main-layout">
    <TopBar />
    <SiteHeader />
    <Banner />

    <div class="home-info-container">
      <div class="container">
        <Announcement />
      </div>
    </div>

    <!-- Main Content Area -->
    <!-- <main class="main-content">
      <router-view />
    </main> -->

    <!-- Footer -->
    <!-- <Footer /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SiteHeader from "@/layouts/new/SiteHeader.vue";
import Footer from "@/layouts/partials/Footer.vue";
import TopBar from "@/layouts/new/TobBar.vue";
import Banner from "./new/Banner.vue";
import Announcement from "./new/Announcement.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    TopBar,
    SiteHeader,
    Footer,
    Banner,
    Announcement,
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
