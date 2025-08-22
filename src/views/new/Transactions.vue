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
                <DepositRequest v-if="route.path === '/transactions/deposit'" />
                <WithdrawalRequest v-if="route.path === '/transactions/withdrawal'" />
                <DepWidHistory v-if="route.path === '/transactions/history'" />
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
import DepositRequest from "./DepositRequest.vue";
import WithdrawalRequest from "./WithdrawalRequest.vue";
import DepWidHistory from "./DepWidHistory.vue";

const { t } = useI18n();
const authStore = useAuthStore();
const route = useRoute();

// Check if we're on the change-password route
const isChangePasswordRoute = computed(() => {
  return route.params.type === "change-password";
});

const menuItems = [
  {
    icon: "/img/new/icons/deposit",
    label: t("header.DepositRequest"),
    link: "/transactions/deposit",
    class: "deposit-link",
  },
  {
    icon: "/img/new/icons/withdrawal",
    label: t("header.WithdrawRequest"),
    link: "/transactions/withdrawal",
    class: "withdrawal-link",
  },
  {
    icon: "/img/new/icons/deposit-history",
    label: t("header.WidDepHistory"),
    link: "/transactions/history",
    class: "deposit-history-link",
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

.deposit-link,
.withdrawal-link,
.deposit-history-link {
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
