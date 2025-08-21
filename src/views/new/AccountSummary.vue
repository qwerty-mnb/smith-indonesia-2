<template>
  <div
    class="site-content-container"
    style="
      --image-src: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/backgrounds/general.jpg?v=20250528);
    "
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="row profile-container standard-main-container">
            <div class="standard-side-menu">
              <div class="player-account-section">
                <div class="username">{{ authStore.user.username }}</div>
                <div class="last-login-date">
                  {{ t("New.LastLogin") }}: {{ moment().format("DD-MMM-YYYY HH:mm:ss") }}
                </div>
              </div>
              <div class="menu-section">
                <div class="title">{{t("New.AccountCenter") }}</div>
                <hr />
                <a
                  href="/account/summary"
                  data-active="true"
                >
                  <i
                    data-icon="profile"
                    style="
                      background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/tabs/profile-active.svg?v=20250528);
                    "
                  ></i>
                  <span>{{t("New.MyAccount") }}</span>
                </a>
                <a href="/desktop/deposit" data-active="false">
                  <i
                    data-icon="bank"
                    style="
                      background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/tabs/bank-account-active.svg?v=20250528);
                    "
                  ></i>
                  <span> Bank </span>
                </a>
              </div>
            </div>

            <div class="standard-main-content">
              <div class="top-tab-container">
                <router-link
                  to="/account/summary"
                  :class="{ 'active': !isChangePasswordRoute }"
                  class="profile-link"
                >
                  <i
                    data-icon="profile"
                    style="
                      --image-src: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/tabs/profile.svg?v=20250528);
                      --active-image-src: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/tabs/profile-active.svg?v=20250528);
                    "
                  ></i>
                  {{t("New.MyAccount") }}
                </router-link>
                <router-link 
                  to="/account/change-password" 
                  :class="{ 'active': isChangePasswordRoute }"
                  class="password-link"
                >
                  <i
                    data-icon="password"
                    style="
                      --image-src: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/tabs/password.svg?v=20250528);
                      --active-image-src: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/tabs/password-active.svg?v=20250528);
                    "
                  ></i>
                  {{ t("password.ChangePassword") }}
                </router-link>
              </div>

              <div class="tab-content-container">
                <div v-if="!authStore.user" class="loading-message">
                  Loading user data...
                </div>
                <ChangePassword v-else-if="isChangePasswordRoute" />
                <AccountInformation v-else />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useI18n } from 'vue-i18n';
import { useAuthStore } from "@/stores/auth";
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import AccountInformation from './AccountInformation.vue';
import ChangePassword from './ChangePassword.vue';
import moment from 'moment';

const { t } = useI18n();
const authStore = useAuthStore();
const route = useRoute();

// Check if we're on the change-password route
const isChangePasswordRoute = computed(() => {
  return route.path.includes('change-password');
});

</script>

<style lang="scss" scoped>
/* Essential styles for the current template */
.standard-main-container {
  display: flex !important;
  flex-direction: row !important;
}

.standard-main-content {
  flex: 1; /* Takes remaining space */
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

</style>
