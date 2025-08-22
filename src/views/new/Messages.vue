<template>
  <div class="site-content-container" style="--image-src: url(/img/new/bg/general.jpg)">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="row profile-container standard-main-container">
            <Sidebar />
            <div class="standard-main-content">
              <ul class="messaging-side-menu">
                <li :data-active="route.path === '/inquiries/list'">
                  <a href="/inquiries/list">
                    <img alt="Inbox" loading="lazy" src="/img/new/icons/inbox.webp" />
                    {{ t("header.Inquiry") }}
                    <span>[{{ authStore.inquiryCtr }}]</span>
                  </a>
                </li>
                <li :data-active="route.path === '/announcements'">
                  <a href="/announcements">
                    <img
                      alt="Announcement"
                      loading="lazy"
                      src="/img/new/icons/announcement.webp"
                    />
                    {{ t("header.Notice") }}
                    <!-- <span>[5]</span> -->
                  </a>
                </li>
                <li class="support-ticket">
                  <a href="javascript:void(0)" @click="requestAccount()">
                    <img
                      alt="Account Request"
                      loading="lazy"
                      src="/img/new/icons/support-ticket.webp"
                    />
                    {{ t("header.AccountRequest") }}
                  </a>
                </li>
              </ul>

              <div class="standard-form-content">
                <MemberInquiry v-if="route.path === '/inquiries/list'" />
                <SiteNotice v-if="route.path === '/announcements'" />
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
import { ref } from "vue";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";
import Sidebar from "./Sidebar.vue";
import MemberInquiry from "./MemberInquiry.vue";
import SiteNotice from "./SiteNotice.vue";

const { t } = useI18n();
const authStore = useAuthStore();
const route = useRoute();
const isLoading = ref(false);

const requestAccount = async () => {
  const data = {
    title: "DEPOSIT_ACCOUNT_REQUEST",
    body: "DEPOSIT_ACCOUNT_REQUEST",
  };

  if (!authStore.isAuthenticated) {
    return Swal.fire({
      icon: "warning",
      title: t("notif.Alarm"),
      text: t("notif.LoginFirst"),
      confirmButtonColor: "#FF0000",
      confirmButtonText: t("notif.Close"),
    });
  } else {
    try {
      isLoading.value = true;
      const resp = await ApiService.post("/inquiry", data)
        .then((res) => res.data)
        .catch((e) => e.response.data);

      if (resp.message !== "MESSAGE_SENT") {
        isLoading.value = false;
        return Swal.fire({
          icon: "error",
          title: t("header.AccountInquiry"),
          text: t("notif." + resp.message),
          confirmButtonColor: "#FF0000",
          confirmButtonText: t("notif.Close"),
        });
      }
      Swal.fire({
        icon: "success",
        title: t("header.AccountInquiry"),
        text: t("inquiry.AccountRequest"),
        confirmButtonColor: "#FF0000",
        confirmButtonText: t("notif.Close"),
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: t("header.AccountInquiry"),
        text: t("notif.ErrorOccured"),
        confirmButtonColor: "#FF0000",
        confirmButtonText: t("notif.Close"),
      });
    }
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.standard-main-container {
  display: flex !important;
  flex-direction: row !important;
}

.standard-main-content {
  flex: 1;
}

.messaging-side-menu {
  background-color: #320050;
  display: flex;
  align-items: flex-start;
  padding: 5px 10px 0;
  margin: 0;
  color: #fff;
}

.messaging-side-menu a,
.messaging-side-menu a:hover {
  text-decoration: none;
  color: inherit;
}

.messaging-side-menu a {
  display: block;
  padding: 10px 35px;
  border-bottom: 5px solid transparent;
}

.messaging-side-menu [data-active="true"] a {
  color: #bdd700;
  border-color: #bdd700;
}

.messaging-side-menu .support-ticket {
  margin-left: auto;
}

.messaging-side-menu .support-ticket > a {
  background-color: #584593;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

.standard-form-content {
  padding: 20px;
  color: #fff;
}
</style>
