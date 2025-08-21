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
                <component :is="currentComponent" v-else />
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
import AccountInformation from "./AccountInformation.vue";
import ChangePassword from "./ChangePassword.vue";
import DepositRequest from "./DepositRequest.vue";
import Sidebar from "./Sidebar.vue";

const { t } = useI18n();
const authStore = useAuthStore();
const route = useRoute();

// Check if we're on the change-password route
const isChangePasswordRoute = computed(() => {
  return route.params.type === "change-password";
});

// Dynamic component mapping
const componentMap = {
  'summary': AccountInformation,
  'change-password': ChangePassword,
  'deposit': DepositRequest,
};

// Get current component based on route type
const currentComponent = computed(() => {
  const type = route.params.type as string;
  return componentMap[type] || AccountInformation;
});

const menuItems = [
  {
    icon: "/img/new/icons/profile",
    label: t("New.MyAccount"),
    link: "/account/summary",
    class: "profile-link",
  },
  {
    icon: "/img/new/icons/password",
    label: t("password.ChangePassword"),
    link: "/account/change-password",
    class: "password-link",
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

.standard-content-info {
  border: 1px solid #0a1849;
  padding: 10px;
  margin-bottom: 20px;
  border-top: 0;
  display: flex;
  gap: 10px;
}

.standard-content-info > div {
  flex-basis: 50%;
}

.standard-content-info h2 {
  color: #fba501;
  margin: 20px 0;
  font-size: 15px;
  text-transform: uppercase;
}

.standard-content-info .standard-content-block {
  background-color: #0a1849;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-summary-table {
  margin: 0;
}

.profile-summary-table th {
  text-align: right;
  font-weight: normal;
}

.profile-summary-table td {
  word-break: break-word;
}

.profile-summary-table th,
.profile-summary-table td {
  text-transform: uppercase;
}

.profile-summary-table.table,
.profile-summary-table.table > tbody > tr > th,
.profile-summary-table.table > tbody > tr > td {
  border: 0;
  vertical-align: middle;
  color: #fff;
}

.banking-details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding: 5px;
}

.banking-details-header label {
  color: #fff;
  text-transform: uppercase;
  font-weight: normal;
}

.banking-details-header a {
  background-color: #808080;
  border-radius: 5px;
  padding: 2px 2px 6px 4px;
}

.banking-details-header a img {
  height: 20px;
  width: auto;
}

.bank-info-container {
  display: flex;
  flex-direction: column-reverse;
}

.bank-info-container .carousel-inner {
  text-align: initial;
}

.bank-info-container .carousel-indicators {
  position: static;
  width: 100%;
  margin: 10px 0;
}

.bank-info-container .carousel-indicators li {
  display: inline-block;
  width: 17px;
  height: 4px;
  margin: 1px;
  text-indent: -999px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 0;
  border: none;
}

.bank-info-container .carousel-indicators .active {
  background-color: #fe9b00;
}

.bank-info-block {
  background-color: #263366;
  color: #fff;
  margin: 0 5px;
  padding: 15px 10px;
  border-radius: 5px;
}

.bank-info-block .account-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 25px;
}

.bank-info-block .account-name img {
  height: 20px;
  width: auto;
}

.bank-info-block .account-number,
.bank-info-block hr,
.bank-info-block .bank-name {
  display: block;
}

.bank-info-block .account-number {
  font-size: 25px;
  letter-spacing: 5px;
}

.bank-info-block hr {
  border-top: 1px solid #0a1849;
  border-bottom: 1px solid #344279;
  margin: 10px 0;
}

.bank-info-block .bank-name {
  text-transform: uppercase;
  font-size: 16px;
}

.last-transaction-table {
  border: 1px solid #0a1849;
}

.last-transaction-table thead {
  background-color: #0a1849;
}

.last-transaction-table thead th {
  font-weight: normal;
}

.last-transaction-table.table thead th,
.last-transaction-table.table tbody td {
  color: #fff;
}

.last-transaction-table [data-ticket-status] {
  border-radius: 10px;
  padding: 2px 10px;
  margin: 4px 0 0;
  font-weight: normal;
  font-size: 10px;
  color: #fff;
  text-align: center;
  background-color: #808080;
}

.last-transaction-table [data-ticket-status="REJ"] {
  background-color: #ff3838;
}

.last-transaction-table [data-ticket-status="APP"] {
  background-color: #56f000;
}

.last-transaction-table [data-ticket-status="PEN"] {
  background-color: #999;
}

.last-transaction-table [data-ticket-status="FAI"] {
  background-color: #ffb302;
}

.loading-message {
  text-align: center;
  padding: 40px;
  color: #fff;
  font-size: 16px;
}

.error-message {
  text-align: center;
  padding: 40px;
  color: #ff0000;
  font-size: 16px;
  background-color: rgba(255, 0, 0, 0.1);
  border: 1px solid #ff0000;
  border-radius: 4px;
}
.profile-link,
.password-link,
.deposit-link {
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
