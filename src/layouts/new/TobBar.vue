<template>
  <div class="topbar-container">
    <div class="container">
      <div class="row">
        <div class="topbar-left-container">
          <div class="topbar-left-section">
            <div class="topbar-item">
              <span class="js_live_chat_link live-chat">
                <i
                  data-icon="live-chat"
                  style="
                    background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/live-chat.svg?v=20250529);
                  "
                ></i>
              </span>
            </div>
            <div class="topbar-item">
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
            <div class="topbar-item">
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
              @click="toggleLanguageDropdown"
            >
              <div
                id="language_selector_trigger"
                class="language-selector-trigger"
                data-language="id"
              >
                <i data-language="id"></i>
              </div>
                             <ul 
                 class="dropdown-menu language-selector" 
                 :class="{ 'show': showLanguageDropdown }"
               >
                                   <li class="language_selector" data-language="en" @click.stop="selectLanguage('en')">
                    <i data-language="en" class="flag-icon flag-en"></i>
                    <div class="language-name">
                      <div>ENGLISH</div>
                      <div>ENGLISH</div>
                    </div>
                  </li>
                  <li class="language_selector" data-language="id" @click.stop="selectLanguage('id')">
                    <i data-language="id" class="flag-icon flag-id"></i>
                    <div class="language-name">
                      <div>INDONESIA</div>
                      <div>INDONESIA</div>
                    </div>
                  </li>
                  <li class="language_selector" data-language="kr" @click.stop="selectLanguage('kr')">
                    <i data-language="kr" class="flag-icon flag-kr"></i>
                    <div class="language-name">
                      <div>KOREAN</div>
                      <div>KOREAN</div>
                    </div>
                  </li>
                  <li class="language_selector" data-language="th" @click.stop="selectLanguage('th')">
                    <i data-language="th" class="flag-icon flag-th"></i>
                    <div class="language-name">
                      <div>THAI</div>
                      <div>THAI</div>
                    </div>
                  </li>
               </ul>
            </div>
            <div class="topbar-item">
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
                 <div class="topbar-right-container">
          <div class="login-panel" v-if="!authStore.isAuthenticated">
            <div class="login-panel-item">
              <a @click="openModal('Login')" class="login-button"> {{ t("auth.Login") }} </a>
            </div>
            <div class="login-panel-item">
              <a @click="goToRegister" class="register-button"> {{ t("auth.Register") }} </a>
            </div>
          </div>
          <div
            class="user-info"
            id="user_info"
            v-if="authStore.isAuthenticated"
          >
            <div class="user-main-info">
              <div
                class="user-info-item"
                id="loyalty_level_container"
              >
                <div
                  class="user-info-loyalty-xp"
                  id="loyalty_point_section"
                >
                  <a href="/desktop/loyalty/benefits">
                    <img
                      alt="Diamond"
                      class="loyalty_level"
                      data-image-path="//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/loyalty/badge/"
                      loading="lazy"
                      src="//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/loyalty/badge/diamond.svg"
                    />
                    <div class="username-container">
                      <span>{{ authStore.user.username }}</span>
                      <div
                        class="loyalty-xp-progress"
                        id="loyalty_experience"
                      >
                        <div
                          class="progress loyalty_experience_progress"
                          style="width: 89%"
                        ></div>
                      </div>
                      <div class="loyalty-xp-detail">
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
              >
                <div class="user-info-item">
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
                <div class="balance">
                  <a href="#" data-toggle="dropdown">
                    IDR
                    <span class="total_balance">{{ n(Number(user.wallet)) }}</span>
                  </a>
                  <div
                    class="dropdown-menu vendor-balances-container"
                  >
                    <div class="vendor-balances-header">
                      <div>SALDO KREDIT</div>
                      <div>352,514.40</div>
                    </div>
                    <div class="vendor-balances-content">
                      <div>
                        <strong>Slots</strong>
                        <div class="vendor-balance-item">
                          <div>
                            <div>Pragmatic Play</div>
                            <div data-vendor-game-code="7">0.00</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <strong>Poker</strong>
                        <div class="vendor-balance-item">
                          <div>
                            <div>Balak Play</div>
                            <div data-vendor-game-code="24">
                              0.00
                            </div>
                          </div>
                          <div>
                            <div>9Gaming</div>
                            <div data-vendor-game-code="32">
                              0.00
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <strong>E-Sports</strong>
                        <div class="vendor-balance-item">
                          <div>
                            <div>TF Gaming</div>
                            <div data-vendor-game-code="58">
                              0.00
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <strong>Sabung Ayam</strong>
                        <div class="vendor-balance-item">
                          <div>
                            <div>SV388</div>
                            <div data-vendor-game-code="57">
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
              <div class="user-info-item" id="loyalty_point_info">
                <a href="/point/withdrawal" class="user-info-loyalty-point">
                  <div class="lp-label">P</div>
                  <span class="loyalty_point">{{ n(Number(user.wallet_point)) }}</span>
                </a>
              </div>
              <div class="user-info-item">
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
            <div class="user-info-item">
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
            <div class="user-info-item">
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
            <div class="user-info-item" id="redemption_store_link">
              <a href="javascript:void(0)" @click="showComingSoon">
                <i
                  class="user-info-icon"
                  data-icon="redemption-store"
                  style="
                    background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/redemption-store.png?v=20250529);
                  "
                ></i>
              </a>
            </div>
            <div class="user-info-item">
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
            <div class="user-info-item">
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
            <div class="user-info-item">
              <a
                href="#"
                data-new-announcement="true"
                data-announcement-count="0"
                id="unread_announcements_button"
              >
                <i
                  class="user-info-icon"
                  data-icon="announcement"
                  style="
                    background-image: url(/img/new/icons/bell.svg);
                  "
                ></i>
              </a>
              <div
                class="unread-announcements-popup"
                id="unread_announcements_popup"
              >
                <div class="loader" id="loader"></div>
                <iframe
                  data-src="/desktop/message/unread-announcements"
                  src="about:blank"
                ></iframe>
              </div>
              <div
                class="unread-announcements-popup-overlay"
                id="unread_announcements_popup_overlay"
              ></div>
            </div>
            <div class="user-info-item">
              <a href="javascript:void(0)" @click="authStore.logout()" class="btn-logout">
                <form>
                  <i
                    data-icon="logout"
                    style="
                      background-image: url(/img/new/icons/logout.svg);
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
import { defineComponent, computed, ref, onMounted, onUnmounted } from "vue";
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
    const { t, n, locale } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const store = useAppStore();
    // page
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    const activeTab = computed(() => store.activeTab);
    const setActiveTab = (tab: string) => store.setTab(tab);
    const openModal = (modal: string) => store.openModal(modal);

    // Language dropdown state
    const showLanguageDropdown = ref(false);

    const menus = [
      { icon: "fa-diamond", id: "Casino", route: "/#pos-casino" },
      { icon: "fa-diamond", id: "Slot", route: "/#pos-slot" },
      { icon: "fa-money-bill-transfer", id: "Support", route: "/notice" },
      { icon: "fa-book", id: "Notice", route: "/notice" },
      { icon: "fa-coins", id: "Regulations", route: "/notice" },
      { icon: "fa-handshake", id: "Partners", route: "/partner/dashboard" },
    ];

    // Language dropdown functions
    const toggleLanguageDropdown = () => {
      showLanguageDropdown.value = !showLanguageDropdown.value;
    };

    const closeLanguageDropdown = () => {
      showLanguageDropdown.value = false;
    };

    const selectLanguage = (language: string) => {
      // Update the trigger to show selected language
      const trigger = document.getElementById("language_selector_trigger");
      if (trigger) {
        trigger.setAttribute("data-language", language);
        const icon = trigger.querySelector("i");
        if (icon) {
          icon.setAttribute("data-language", language);
        }
      }

      // Hide dropdown after selection
      closeLanguageDropdown();

      // Change the application language using Vue i18n
      try {
        // Set the new locale
        if (language === 'en') {
          locale.value = 'en';
        } else if (language === 'id') {
          locale.value = 'id';
        } else if (language === 'kr') {
          locale.value = 'kr';
        } else if (language === 'th') {
          locale.value = 'th';
        }
        
        // Store the preference
        localStorage.setItem('locale', language);
        
        console.log("Language switched to:", language);
      } catch (error) {
        console.error("Error switching language:", error);
        // Fallback: reload page if i18n switching fails
        localStorage.setItem('locale', language);
        window.location.reload();
      }
    };

    // Handle click outside to close dropdown
    const handleClickOutside = (event: Event) => {
      const target = event.target as HTMLElement;
      const languageContainer = document.querySelector('.language-selector-container');
      
      if (languageContainer && !languageContainer.contains(target)) {
        closeLanguageDropdown();
      }
    };

    // Handle keyboard events to close dropdown
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showLanguageDropdown.value) {
        closeLanguageDropdown();
      }
    };

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

    const showComingSoon = () => {
      Swal.fire({
        icon: "info",
        title: t("New.ComingSoon"),
        text: t("New.ComingSoon"),
      });
    };

    onMounted(() => {
      // Add click outside listener for language dropdown
      document.addEventListener('click', handleClickOutside);
      // Add keyboard listener for language dropdown
      document.addEventListener('keydown', handleKeydown);
      
      setTimeout(() => {
        let el: HTMLElement | null = null;
        if (route.hash.includes("pos-casino")) el = document.getElementById("pos-casino");
        else if (route.hash.includes("pos-slot"))
          el = document.getElementById("pos-slot");

        if (el) {
          el.scrollIntoView();
        }
      }, 1000);
    });

    // Clean up event listeners
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeydown);
    });

    return {
      t,
      n,
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
      showComingSoon,
      showLanguageDropdown,
      toggleLanguageDropdown,
      selectLanguage,
      closeLanguageDropdown,
    };
  },
});
</script>

<style lang="scss" scoped>
.language-selector-container {
  position: relative;
  cursor: pointer;
}

.language-selector-trigger {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  i {
    width: 24px;
    height: 16px;
    background-size: cover;
    background-position: center;
    border-radius: 2px;
    
    &[data-language="en"] {
      background-image: url(/img/logo/flags/English.png);
    }
    
    &[data-language="kr"] {
      background-image: url(/img/logo/flags/Korean.png);
    }
    
    &[data-language="id"] {
      background-image: url(/img/new/icons/flags.png);
      background-position: 0 0;
    }
    
    &[data-language="th"] {
      background-image: url(/img/new/icons/flags.png);
      background-position: -24px 0;
    }
    

  }
}

.dropdown-menu.language-selector {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #18041c;
  border: none;
  border-radius: 0;
  box-shadow: none;
  min-width: 200px;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;

  &.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

.language_selector {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  i {
    width: 24px;
    height: 16px;
    margin-right: 12px;
    background-size: cover;
    background-position: center;
    border-radius: 2px;
  }

  .flag-icon {
    &.flag-en {
      background-image: url(/img/logo/flags/English.png);
    }
    
    &.flag-kr {
      background-image: url(/img/logo/flags/Korean.png);
    }
    
    &.flag-id {
      background-image: url(/img/new/icons/flags.png);
      background-position: 0 0;
    }
    
    &.flag-th {
      background-image: url(/img/new/icons/flags.png);
      background-position: -24px 0;
    }
    

  }

  .language-name {
    color: #fff;
    font-size: 14px;
    font-weight: 500;

    div:first-child {
      font-weight: 600;
      margin-bottom: 2px;
      color: #fff;
      font-size: 14px;
    }

    div:last-child {
      font-size: 12px;
      color: #8b9dc3;
      font-weight: 400;
    }
  }
}
</style>
