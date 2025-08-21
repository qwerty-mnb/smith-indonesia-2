<template>
  <div class="standard-side-menu">
    <div class="player-account-section">
      <div class="username">{{ authStore.user.username }}</div>
      <div class="last-login-date">
        {{ t("New.LastLogin") }}: {{ moment().format("DD-MMM-YYYY HH:mm:ss") }}
      </div>
    </div>
    <div class="menu-section">
      <div class="title">{{ t("New.AccountCenter") }}</div>
      <hr />
      <a v-for="item in menuItems" :key="item.link" :href="item.link" :data-active="item.link === route.path">
        <i
          :data-icon="item.icon"
          :style="{ backgroundImage: `url(${item.icon})` }"
        ></i>
        <span>{{ item.label }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
import { computed } from "vue";
import moment from "moment";

const { t } = useI18n();
const authStore = useAuthStore();
const route = useRoute();

const menuItems = [
  {
    icon: "/img/new/icons/profile-active.svg",
    label: t("New.MyAccount"),
    link: "/account/summary",
  },
  {
    icon: "/img/new/icons/bank-account-active.svg",
    label: "Bank",
    link: "/transactions/deposit",
  },
  {
    icon: "/img/new/icons/message-active.svg",
    label: "Message",
    link: "/messages",
  },
];

</script>
