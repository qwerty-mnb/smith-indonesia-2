<template>
  <div class="standard-profile-bar" bis_skin_checked="1">
    <section class="user-field">
      <img
        alt="Diamond"
        loading="lazy"
        src="/img/new/icons/diamond.svg"
      />
      <div bis_skin_checked="1">
        <span class="username">{{ authStore.user.username }}</span>
        <div class="loyalty-info-container" bis_skin_checked="1">
          <div class="xp-field" bis_skin_checked="1">
            <span class="xp-label">EXP</span>
            {{ n(Number(authStore.user.wallet)) }}
          </div>
          <div class="lp-field" bis_skin_checked="1">
            <span class="lp-label">LP</span>
            {{ n(Number(authStore.user.wallet_point)) }}
          </div>
          <!-- <div bis_skin_checked="1">
            <a href="/desktop/loyalty/rewards" bis_skin_checked="1"
              >Detail &gt;&gt;</a
            >
          </div> -->
        </div>
      </div>
    </section>
    <section class="deposit-field">
      <a href="/transactions/deposit" bis_skin_checked="1">
        <img
          alt="Deposit"
          loading="lazy"
          src="/img/new/icons/deposit-active.svg"
        />
        <span>{{ t("header.deposit") }}</span>
      </a>
    </section>
    <section class="withdraw-field">
      <a href="/desktop/withdrawal" bis_skin_checked="1">
        <img
          alt="Withdrawal"
          loading="lazy"
          src="//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/tabs/withdrawal-active.svg?v=20250528"
        />
        <span>{{ t("header.withdrawal") }}</span>
      </a>
    </section>
    <section class="redemption-field">
      <a
        href="/loyalty/redemption-store"
        target="_blank"
        bis_skin_checked="1"
      >
        <img
          alt="Redemption"
          loading="lazy"
          src="//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/tabs/loyalty-redemption-active.svg?v=20250528"
        />
        Redemption
      </a>
    </section>
    <section class="referral-field">
      <div bis_skin_checked="1">{{ t("New.ReferralCode") }}:</div>
      <a href="/desktop/referral" title="jbiGwV3" bis_skin_checked="1">
        <div
          id="ReferralCode"
          class="referral-code-container"
          bis_skin_checked="1"
        >
          {{ authStore.user.username }}
        </div>
      </a>
    </section>
  </div>
  <div class="standard-form-title" bis_skin_checked="1">
    {{ t("New.AccountInformation") }}
  </div>
  <div class="standard-content-info" bis_skin_checked="1">
    <div class="standard-content-block" bis_skin_checked="1">
      <table class="table profile-summary-table">
        <tbody>
          <tr>
            <th>{{ t("register.ID") }}</th>
            <td>:</td>
            <td>{{ authStore.user.username }}</td>
          </tr>
          <tr>
            <th>{{ t("register.Nickname") }}</th>
            <td>:</td>
            <td>{{ authStore.user.name }}</td>
          </tr>
          <tr>
            <th>{{ t("New.Level") }}</th>
            <td>:</td>
            <td>{{ authStore.user.level }}</td>
          </tr>
          <tr>
            <th>{{ t("register.Phone") }}</th>
            <td>:</td>
            <td>{{ authStore.user.mobile }}</td>
          </tr>
          <tr>
            <th>{{ t("New.Currency") }}</th>
            <td>:</td>
            <td>IDR</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="standard-content-block" bis_skin_checked="1">
      <div class="banking-details-header" bis_skin_checked="1">
        <label>{{t("New.BankDetails") }}</label>
        <a href="javascript:void(0)" @click="showComingSoon" bis_skin_checked="1">
          <img
            alt="Edit"
            loading="lazy"
            src="/img/new/icons/edit.svg"
          />
        </a>
      </div>
      <div
        id="bank_account_carousel"
        class="carousel slide bank-info-container"
        data-interval="false"
        data-ride="carousel"
        bis_skin_checked="1"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#bank_account_carousel"
            data-slide-to="0"
            class="active"
          ></li>
        </ol>
        <div class="carousel-inner" bis_skin_checked="1">
          <div class="bank-info-block item active" bis_skin_checked="1">
            <div class="account-name" bis_skin_checked="1">
              {{ authStore.user.bank_account_name }}
              <img
                alt="BRI"
                class="bank-icon"
                loading="lazy"
                onerror="this.style.display='none'"
                src="/img/new/icons/bri.svg"
              />
            </div>
            <div class="account-number" bis_skin_checked="1">
              033901001610560
            </div>
            <hr />
            <div class="bank-name" bis_skin_checked="1">{{ authStore.user.bank_name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="standard-form-title" bis_skin_checked="1">
    DEPOSIT/WITHDRAW STATUS
  </div>
  <div class="standard-content-info" bis_skin_checked="1">
    <div bis_skin_checked="1">
      <h2>Last Deposit Status</h2>
      <table class="table last-transaction-table">
        <thead>
          <tr>
            <th scope="col">Amount</th>
            <th scope="col">Date/Time GMT+9</th>
            <th scope="col" class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100,000,000.00</td>
            <td>08-Aug-2025 18:56:36</td>
            <td class="text-center">
              D2554865 <br />
              <label data-ticket-status="APP">Approved</label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div bis_skin_checked="1">
      <h2>Last Withdrawal Status</h2>
      <table class="table last-transaction-table">
        <thead>
          <tr>
            <th scope="col">Amount</th>
            <th scope="col">Date/Time GMT+9</th>
            <th scope="col" class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100,000,000.00</td>
            <td>28-Jul-2025 16:58:39</td>
            <td class="text-center">
              W2519770 <br />
              <label data-ticket-status="APP">Approved</label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useAuthStore } from "@/stores/auth";
import Swal from 'sweetalert2';

const { t, n } = useI18n();
const authStore = useAuthStore();

const showComingSoon = () => {
  Swal.fire({
    title: 'Coming Soon!',
    text: 'This feature is currently under development.',
    icon: 'info',
    confirmButtonText: 'OK'
  });
};
</script>

<style lang="scss" scoped>
/* Essential styles for the current template */
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
  background-color: #320050;
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
  background-color: #3e3e3e;
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
  border-top: 1px solid #2e2e2e;
  border-bottom: 1px solid #434343;
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
</style>