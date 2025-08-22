<template>
  <div class="site-content-container" style="--image-src: url(/img/new/bg/general.jpg)">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="row profile-container standard-main-container">
            <Sidebar />
            <div class="standard-main-content">
              <div class="top-tab-container">
                <router-link
                  v-for="item in menuItems"
                  :key="item.link"
                  :to="item.link"
                  :class="[item.class, { active: item.link === route.path }]"
                >
                  <i
                    :data-icon="item.icon"
                    :style="{
                      '--image-src': `url(${item.icon}.svg)`,
                      '--active-image-src': `url(${item.icon}-active.svg)`,
                    }"
                  ></i>
                  {{ item.label }}
                </router-link>
              </div>

              <div class="tab-content-container">
                <div v-if="!authStore.user" class="loading-message">
                  Loading
                </div>
                <PointTransfer v-if="route.path === '/point/withdrawal'" />
                <PointHistory v-if="route.path === '/point/history'" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Sidebar from "./Sidebar.vue";
import PointTransfer from "@/views/new/PointTransfer.vue";
import PointHistory from "@/views/new/PointHistory.vue";

const { t } = useI18n();
const authStore = useAuthStore();
const route = useRoute();

const menuItems = [
  {
    icon: "/img/new/icons/loyalty-reward",
    label: t("header.Point"),
    link: "/point/withdrawal",
    class: "point-link",
  },
  {
    icon: "/img/new/icons/deposit-history",
    label: t("point.History"),
    link: "/point/history",
    class: "point-history-link",
  },
];
</script>

<style lang="scss">
 .site-content-container {
   background-image: var(--image-src);
   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;
   min-height: 100vh;
 }

 .standard-main-container {
  display: flex !important;
  flex-direction: row !important;
}

.standard-main-content {
  flex: 1;
}

.point-link {
  text-decoration: none;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 6px 6px 0 0;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  border-bottom: none;

  &.active {
    color: #e4ff23 !important;

    i {
      background-image: var(--active-image-src) !important;
    }
  }
}
</style>
