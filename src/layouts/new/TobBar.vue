<template>
  <div class="topbar-container" bis_skin_checked="1">
    <div class="container" bis_skin_checked="1">
      <div class="row" bis_skin_checked="1">
        <div class="topbar-left-container" bis_skin_checked="1">
          <div class="topbar-left-section" bis_skin_checked="1">
            <div class="topbar-item" bis_skin_checked="1">
              <span class="js_live_chat_link live-chat">
                <i
                  data-icon="live-chat"
                  style="
                    background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/live-chat.svg?v=20250529);
                  "
                ></i>
              </span>
            </div>
            <div class="topbar-item" bis_skin_checked="1">
              <a
                href="https://apk-bank.s3.ap-southeast-1.amazonaws.com/bd303.apk"
                class="download-apk-btn"
              >
                <i
                  data-icon="android"
                  style="
                    background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/icons/android-logo.svg?v=20250529);
                  "
                ></i>
              </a>
            </div>
            <div class="topbar-item" bis_skin_checked="1">
              <a href="/mobile/home" rel="nofollow">
                <i
                  data-icon="contact-us"
                  style="
                    background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/mobile.svg?v=20250529);
                  "
                ></i>
              </a>
            </div>
            <div
              class="topbar-item language-selector-container"
              style="
                --image-src: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/flags.png?v=20250529);
              "
              bis_skin_checked="1"
            >
              <div
                id="language_selector_trigger"
                data-toggle="dropdown"
                class="language-selector-trigger"
                data-language="id"
                bis_skin_checked="1"
              >
                <i data-language="id"></i>
              </div>
              <ul class="dropdown-menu language-selector">
                <li class="language_selector" data-language="en">
                  <i data-language="en"></i>
                  <div class="language-name" bis_skin_checked="1">
                    <div bis_skin_checked="1">ENGLISH</div>
                    <div bis_skin_checked="1">ENGLISH</div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="topbar-item" bis_skin_checked="1">
              <a href="#" class="search_popup_button">
                <i
                  data-icon="search"
                  style="
                    background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/search.svg?v=20250529);
                  "
                ></i>
              </a>
            </div>
          </div>
        </div>
        <div class="topbar-right-container" bis_skin_checked="1">
          <div class="login-panel" v-if="!authStore.isAuthenticated" bis_skin_checked="1">
            <div class="login-panel-item" bis_skin_checked="1">
              <a @click="openModal('Login')" class="login-button"> Masuk </a>
            </div>
            <div class="login-panel-item" bis_skin_checked="1">
              <a @click="goToRegister" class="register-button"> Daftar </a>
            </div>
          </div>
          <div
            class="user-info"
            id="user_info"
            bis_skin_checked="1"
            v-if="authStore.isAuthenticated"
          >
            <div class="user-main-info" bis_skin_checked="1">
              <div
                class="user-info-item"
                id="loyalty_level_container"
                bis_skin_checked="1"
              >
                <div
                  class="user-info-loyalty-xp"
                  id="loyalty_point_section"
                  bis_skin_checked="1"
                >
                  <a href="/desktop/loyalty/benefits">
                    <img
                      alt="Diamond"
                      class="loyalty_level"
                      data-image-path="//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/loyalty/badge/"
                      loading="lazy"
                      src="//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/loyalty/badge/diamond.svg"
                    />
                    <div class="username-container" bis_skin_checked="1">
                      <span>{{ authStore.user.username }}</span>
                      <div
                        class="loyalty-xp-progress"
                        id="loyalty_experience"
                        bis_skin_checked="1"
                      >
                        <div
                          class="progress loyalty_experience_progress"
                          style="width: 89%"
                          bis_skin_checked="1"
                        ></div>
                      </div>
                      <div class="loyalty-xp-detail" bis_skin_checked="1">
                        <span id="loyalty_xp">44,929,564</span> /
                        <span id="loyalty_next_level_xp">50,000,000</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div
                class="user-info-item wallet-container"
                id="wallet_container"
                data-locked-balance="false"
                bis_skin_checked="1"
              >
                <div class="user-info-item" bis_skin_checked="1">
                  <button title="Refresh" class="refresh_balance" data-loading="false">
                    <i
                      class="user-info-icon"
                      data-icon="refresh"
                      style="
                        background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/refresh.png?v=20250529);
                      "
                    ></i>
                  </button>
                </div>
                <div class="balance" bis_skin_checked="1">
                  <a href="#" data-toggle="dropdown">
                    IDR
                    <span class="total_balance">{{ n(Number(user.wallet))  }}</span>
                  </a>
                  <div
                    class="dropdown-menu vendor-balances-container"
                    bis_skin_checked="1"
                  >
                    <div class="vendor-balances-header" bis_skin_checked="1">
                      <div bis_skin_checked="1">SALDO KREDIT</div>
                      <div bis_skin_checked="1">352,514.40</div>
                    </div>
                    <div class="vendor-balances-content" bis_skin_checked="1">
                      <div bis_skin_checked="1">
                        <strong>Slots</strong>
                        <div class="vendor-balance-item" bis_skin_checked="1">
                          <div bis_skin_checked="1">
                            <div bis_skin_checked="1">Pragmatic Play</div>
                            <div data-vendor-game-code="7" bis_skin_checked="1">0.00</div>
                          </div>
                        </div>
                      </div>
                      
                      <div bis_skin_checked="1">
                        <strong>Poker</strong>
                        <div class="vendor-balance-item" bis_skin_checked="1">
                          <div bis_skin_checked="1">
                            <div bis_skin_checked="1">Balak Play</div>
                            <div data-vendor-game-code="24" bis_skin_checked="1">
                              0.00
                            </div>
                          </div>
                          <div bis_skin_checked="1">
                            <div bis_skin_checked="1">9Gaming</div>
                            <div data-vendor-game-code="32" bis_skin_checked="1">
                              0.00
                            </div>
                          </div>
                        </div>
                      </div>
                      <div bis_skin_checked="1">
                        <strong>E-Sports</strong>
                        <div class="vendor-balance-item" bis_skin_checked="1">
                          <div bis_skin_checked="1">
                            <div bis_skin_checked="1">TF Gaming</div>
                            <div data-vendor-game-code="58" bis_skin_checked="1">
                              0.00
                            </div>
                          </div>
                        </div>
                      </div>
                      <div bis_skin_checked="1">
                        <strong>Sabung Ayam</strong>
                        <div class="vendor-balance-item" bis_skin_checked="1">
                          <div bis_skin_checked="1">
                            <div bis_skin_checked="1">SV388</div>
                            <div data-vendor-game-code="57" bis_skin_checked="1">
                              0.00
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="locked-balance locked_balance_container"
                  hidden=""
                  bis_skin_checked="1"
                >
                  <i class="user-info-icon" data-icon="locked-balance"
                    ><img
                      alt="Lock Balance"
                      loading="lazy"
                      src="//d2rzzcn1jnr24x.cloudfront.net/Images/icons/wallet/lock-balance.svg?v=20250529"
                  /></i>
                  IDR
                  <span class="total_locked_balance">0.00</span>
                </div>
              </div>
              <div class="user-info-item" id="loyalty_point_info" bis_skin_checked="1">
                <a href="/desktop/loyalty/rewards" class="user-info-loyalty-point">
                  <div class="lp-label" bis_skin_checked="1">LP</div>
                  <span class="loyalty_point">129,727,653</span>
                </a>
              </div>
              <div class="user-info-item" bis_skin_checked="1">
                <button type="button">
                  <i
                    class="user-info-icon daily_reward_button"
                    data-icon="daily-reward"
                    data-platform="Desktop"
                    data-daily-reward-available="true"
                    style="
                      --chest-claimed-background: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/loyalty/chest-claimed.webp?v=20250529);
                      --chest-available-background: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/loyalty/chest-available.webp?v=20250529);
                    "
                  ></i>
                </button>
              </div>
            </div>
            <div class="user-info-item" bis_skin_checked="1">
              <a href="/account/summary">
                <i
                  class="user-info-icon"
                  data-icon="profile"
                  style="
                    background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/profile.png?v=20250529);
                  "
                ></i>
              </a>
            </div>
            <div class="user-info-item" bis_skin_checked="1">
              <a href="/transactions/deposit">
                <i
                  class="user-info-icon"
                  data-icon="wallet"
                  style="
                    background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/bank-account.png?v=20250529);
                  "
                ></i>
              </a>
            </div>
            <div class="user-info-item" id="redemption_store_link" bis_skin_checked="1">
              <a href="/loyalty/redemption-store" target="_blank">
                <i
                  class="user-info-icon"
                  data-icon="redemption-store"
                  style="
                    background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/redemption-store.png?v=20250529);
                  "
                ></i>
              </a>
            </div>
            <div class="user-info-item" bis_skin_checked="1">
              <a href="/desktop/bonus">
                <i
                  class="user-info-icon"
                  data-icon="wallet"
                  style="
                    background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/bonus.png?v=20250529);
                  "
                ></i>
              </a>
            </div>
            <div class="user-info-item" bis_skin_checked="1">
              <a href="/desktop/messages/inbox" data-new-notification="false">
                <i
                  class="user-info-icon"
                  data-icon="notification"
                  style="
                    background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/notification.png?v=20250529);
                  "
                ></i>
              </a>
            </div>
            <div class="user-info-item" bis_skin_checked="1">
              <a
                href="#"
                data-new-announcement="true"
                data-announcement-count="5"
                id="unread_announcements_button"
              >
                <i
                  class="user-info-icon"
                  data-icon="announcement"
                  style="
                    background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/bell.svg?v=20250529);
                  "
                ></i>
              </a>
              <div
                class="unread-announcements-popup"
                id="unread_announcements_popup"
                bis_skin_checked="1"
              >
                <div class="loader" id="loader" bis_skin_checked="1"></div>
                <iframe
                  data-src="/desktop/message/unread-announcements"
                  src="about:blank"
                ></iframe>
              </div>
              <div
                class="unread-announcements-popup-overlay"
                id="unread_announcements_popup_overlay"
                bis_skin_checked="1"
              ></div>
            </div>
            <div class="user-info-item" bis_skin_checked="1">
              <a
                href="#"
                onclick="window.closeWindows(); document.querySelector('#logout-form').submit();"
                class="btn-logout"
              >
                <form action="/Account/Logout" id="logout-form" method="post">
                  <i
                    data-icon="logout"
                    style="
                      background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/icons/logout.svg?v=20250529);
                    "
                  ></i>
                </form>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import ApiService from "@/services/ApiService";

export default defineComponent({
  name: "TopBar",
  setup() {
    // vue
    const { t, n } = useI18n();
    const store = useAppStore();
    const route = useRoute();
    const router = useRouter();
    // page
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    const activeTab = computed(() => store.activeTab);
    const setActiveTab = (tab: string) => store.setTab(tab);
    const openModal = (modal: string) => store.openModal(modal);

    const menus = [
      { icon: "fa-diamond", id: "Casino", route: "/#pos-casino" },
      { icon: "fa-diamond", id: "Slot", route: "/#pos-slot" },
      { icon: "fa-money-bill-transfer", id: "Support", route: "/notice" },
      { icon: "fa-book", id: "Notice", route: "/notice" },
      { icon: "fa-coins", id: "Regulations", route: "/notice" },
      { icon: "fa-handshake", id: "Partners", route: "/partner/dashboard" },
    ];

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
          const resp = await ApiService.post("/inquiry", data)
            .then((res) => res.data)
            .catch((e) => e.response.data);

          if (resp.message !== "MESSAGE_SENT") {
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
      }
    };

    /**
     * Logout
     *
     */
    async function logout() {
      authStore.logout();
      router.push({ path: "/" });
    }

    const setRouter = (path: string, checkMessage = false) => {
      if (path === "/transaction" && checkMessage) {
        if (authStore.inquiryCtr > 0) {
          return Swal.fire(
            t("inquiry.UnreadMessage"),
            t("CasinoWarning.Unread"),
            "warning"
          ).then((result) => {
            if (result.value) router.push("/notice");
            openModal("inquiry");
          });
        } else {
          router.push({ path });
        }
      } else {
        router.push({ path });
      }
    };

    const goToRegister = () => {
      router.push({ path: "/auth/register" });
    };

    onMounted(() => {
      setTimeout(() => {
        let el = null;
        if (route.hash.includes("pos-casino")) el = document.getElementById("pos-casino");
        else if (route.hash.includes("pos-slot"))
          el = document.getElementById("pos-slot");

        if (el) {
          el.scrollIntoView();
        }
      }, 1000);
    });

    return {
      t, n,
      router,
      requestAccount,
      activeTab,
      setActiveTab,
      openModal,
      menus,
      authStore,
      user,
      setRouter,
      logout,
      goToRegister,
    };
  },
});
</script>
