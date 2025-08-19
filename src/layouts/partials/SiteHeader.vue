<template>
  <!-- Top Bar - Dark Grey -->
  <div class="h-[52px] bg-[#0f0f0f] flex items-center justify-between py-[8px] mx-auto">
    <div class="w-[1170px] mx-auto flex items-center justify-between">
      <!-- Left Section -->
      <div class="flex flex-nowrap h-full w-full items-center">
        <div class="ml-[5px] border-r border-r-dotted pr-[5px] border-[#ccc] h-[24px]">
          <div
            class="text-white text-sm flex justify-center items-center w-[24px] h-[24px] bg-[#e3fe24] rounded-[3px]"
          >
            <img
              src="/img/new/icons/live-chat.svg"
              alt="live-chat"
              class="w-[14px] h-[14px]"
            />
          </div>
        </div>

        <div class="ml-[5px] border-r border-r-dotted pr-[5px] border-[#ccc] h-[24px]">
          <div
            class="text-white text-sm flex justify-center items-center w-[24px] h-[24px] bg-[#e3fe24] rounded-[3px]"
          >
            <img
              src="/img/new/icons/android-logo.svg"
              alt="android"
              class="w-[14px] h-[14px]"
            />
          </div>
        </div>

        <div class="ml-[5px] border-r border-r-dotted pr-[5px] border-[#ccc] h-[24px]">
          <div
            class="text-white text-sm flex justify-center items-center w-[24px] h-[24px] rounded-[3px]"
          >
            <img src="/img/new/icons/mobile.svg" alt="mobile" class="w-[14px] h-[14px]" />
          </div>
        </div>

        <div class="ml-[5px] border-r border-r-dotted pr-[5px] border-[#ccc] h-[24px]">
          <div
            class="text-white text-sm flex justify-center items-center w-[24px] h-[24px] rounded-[3px]"
          >
            <img src="/img/new/icons/search.svg" alt="search" class="w-[14px] h-[14px]" />
          </div>
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex flex-nowrap h-full w-full items-center">
        <div class="user-main-info flex flex-nowrap justify-end rounded bg-[#262626]">
          <div class="py-[4px] px-[8px] flex flex-row items-center justify-center">
            <a class="flex text-white items-center justify-center mr-2">
              <img
                class="w-[22px] h-[22px] mr-1"
                alt="Diamond"
                src="/img/new/icons/diamond.svg"
              />
              <div
                class="username-container flex flex-col gap-[2px] relative min-w-[80px] max-w-[120px]"
              >
                <span class="text-[14px]">kenzo</span>
                <div
                  class="loyalty-xp-progress flex h-[0.3rem] overflow-hidden text-[0.75rem] bg-[#000] rounded-[0.25rem]"
                  id="loyalty_experience"
                >
                  <div
                    class="progress loyalty_experience_progress bg-[#29ff00]"
                    style="width: 89%"
                  ></div>
                </div>
              </div>
            </a>

            <div class="flex flex-row items-center topbar-item mr-2">
              <img
                src="/img/new/icons/refresh.png"
                alt="refresh"
                class="w-[22px] h-[22px]"
              />
              <div class="w-px h-5 bg-gray-500 mx-2"></div>
              <a href="#" class="text-[#d8f221] text-[12px]">
                IDR
                <span class="total_balance">352,514.40</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Navigation Bar - Dark Purple -->
  <div
    class="bg-[#25013b] border-b-[4px] border-b-solid border-[#460289] h-[92px] relative"
  >
    <div class="w-[1170px] mx-auto flex items-center h-full relative">
      <!-- Logo Section -->
      <div class="w-1/4 relative h-full flex items-center">
        <img
          src="/img/new/logo/logo-background.png"
          alt="logo"
          class="w-[262px] h-[59px] absolute top-0 left-0"
        />
        <img
          src="/img/new/logo/logo.png"
          alt="logo"
          class="w-[262px] h-[59px] relative z-10"
        />
      </div>

      <!-- Navigation Menu -->
      <div class="w-3/4 flex items-center justify-center">
        <ul class="flex flex-row items-center justify-center w-full m-0">
          <li
            v-for="(item, index) in headerMenu"
            :key="index"
            class="flex flex-col items-center mr-4 relative group"
            @mouseenter="hoveredMenu = item.label"
            @mouseleave="hoveredMenu = null"
          >
            <a class="flex flex-col items-center cursor-pointer">
              <img class="h-[30px] w-[30px] mb-2" :src="item.src" :alt="item.label" />
              <span class="text-[#8b9dc3] text-[11px] font-medium text-nowrap">{{
                item.label
              }}</span>
            </a>
            
            <!-- Dropdown Menu -->
            <div 
              v-if="hoveredMenu === item.label"
              class="absolute top-full left-1/2 transform -translate-x-1/2 z-50 mt-2 w-[800px] bg-[#25013b] border border-[#460289] rounded-lg shadow-2xl"
              style="border-top-color: #460289; background-color: rgba(23, 3, 36, .79); border-bottom-color: #e4ff23;"
            >
              <div class="p-6">
                <!-- Sample content based on menu item -->
                <div v-if="item.label === 'HOT GAMES'" class="grid grid-cols-4 gap-4">
                  <div v-for="i in 8" :key="i" class="bg-[#1a0128] rounded-lg p-3 border border-[#460289] hover:bg-[#2d0240] transition-colors cursor-pointer">
                    <div class="text-center">
                      <div class="w-16 h-16 bg-[#e4ff23] rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span class="text-[#000] text-xs font-bold">HOT {{ i }}</span>
                      </div>
                      <span class="text-[#8b9dc3] text-xs font-medium">Popular Game {{ i }}</span>
                    </div>
                  </div>
                </div>

                <div v-else-if="item.label === 'SLOTS'" class="grid grid-cols-4 gap-4">
                  <div v-for="i in 12" :key="i" class="bg-[#1a0128] rounded-lg p-3 border border-[#460289] hover:bg-[#2d0240] transition-colors cursor-pointer">
                    <div class="text-center">
                      <div class="w-16 h-16 bg-[#460289] rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span class="text-[#8b9dc3] text-xs">SLOT {{ i }}</span>
                      </div>
                      <span class="text-[#8b9dc3] text-xs font-medium">Slot Game {{ i }}</span>
                    </div>
                  </div>
                </div>

                <!-- border-top-color: #460289;
  background-color: rgba(23, 3, 36, .79);
  border-bottom-color: #e4ff23; -->

                <div v-else-if="item.label === 'LIVE CASINO'" class="grid grid-cols-4 gap-4 bg-[rgba(23, 3, 36, .79)] border-[#1130a5]">
                  
                  
                  <div v-for="i in 12" :key="i" class="">
                    test
                  </div>
                </div>

                <div v-else-if="item.label === 'TOGEL'" class="grid grid-cols-3 gap-4">
                  <div v-for="i in 6" :key="i" class="bg-[#1a0128] rounded-lg p-3 border border-[#460289] hover:bg-[#2d0240] transition-colors cursor-pointer">
                    <div class="text-center">
                      <div class="w-20 h-20 bg-[#460289] rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span class="text-[#8b9dc3] text-xs">TOGEL {{ i }}</span>
                      </div>
                      <span class="text-[#8b9dc3] text-xs font-medium">Togel Game {{ i }}</span>
                    </div>
                  </div>
                </div>

                <div v-else-if="item.label === 'OLAHRAGA'" class="grid grid-cols-4 gap-4">
                  <div v-for="i in 8" :key="i" class="bg-[#1a0128] rounded-lg p-3 border border-[#460289] hover:bg-[#2d0240] transition-colors cursor-pointer">
                    <div class="text-center">
                      <div class="w-16 h-16 bg-[#e4ff23] rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span class="text-[#000] text-xs font-bold">SPORT {{ i }}</span>
                      </div>
                      <span class="text-[#8b9dc3] text-xs font-medium">Sports Betting {{ i }}</span>
                    </div>
                  </div>
                </div>

                <div v-else-if="item.label === 'CRASH GAME'" class="grid grid-cols-3 gap-4">
                  <div v-for="i in 6" :key="i" class="bg-[#1a0128] rounded-lg p-3 border border-[#460289] hover:bg-[#2d0240] transition-colors cursor-pointer">
                    <div class="text-center">
                      <div class="w-20 h-20 bg-[#e4ff23] rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span class="text-[#000] text-xs font-bold">CRASH {{ i }}</span>
                      </div>
                      <span class="text-[#8b9dc3] text-xs font-medium">Crash Game {{ i }}</span>
                    </div>
                  </div>
                </div>

                <div v-else-if="item.label === 'ARCADE'" class="grid grid-cols-4 gap-4">
                  <div v-for="i in 8" :key="i" class="bg-[#1a0128] rounded-lg p-3 border border-[#460289] hover:bg-[#2d0240] transition-colors cursor-pointer">
                    <div class="text-center">
                      <div class="w-16 h-16 bg-[#460289] rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span class="text-[#8b9dc3] text-xs">ARCADE {{ i }}</span>
                      </div>
                      <span class="text-[#8b9dc3] text-xs font-medium">Arcade Game {{ i }}</span>
                    </div>
                  </div>
                </div>

                <div v-else-if="item.label === 'POKER'" class="grid grid-cols-3 gap-4">
                  <div v-for="i in 6" :key="i" class="bg-[#1a0128] rounded-lg p-3 border border-[#460289] hover:bg-[#2d0240] transition-colors cursor-pointer">
                    <div class="text-center">
                      <div class="w-20 h-20 bg-[#e4ff23] rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span class="text-[#000] text-xs font-bold">POKER {{ i }}</span>
                      </div>
                      <span class="text-[#8b9dc3] text-xs font-medium">Poker Game {{ i }}</span>
                    </div>
                  </div>
                </div>

                <div v-else-if="item.label === 'E-SPORTS'" class="grid grid-cols-4 gap-4">
                  <div v-for="i in 8" :key="i" class="bg-[#1a0128] rounded-lg p-3 border border-[#460289] hover:bg-[#2d0240] transition-colors cursor-pointer">
                    <div class="text-center">
                      <div class="w-16 h-16 bg-[#460289] rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span class="text-[#8b9dc3] text-xs">E-SPORT {{ i }}</span>
                      </div>
                      <span class="text-[#8b9dc3] text-xs font-medium">E-Sports Game {{ i }}</span>
                    </div>
                  </div>
                </div>

                <div v-else-if="item.label === 'SABUNG AYAM'" class="grid grid-cols-3 gap-4">
                  <div v-for="i in 6" :key="i" class="bg-[#1a0128] rounded-lg p-3 border border-[#460289] hover:bg-[#2d0240] transition-colors cursor-pointer">
                    <div class="text-center">
                      <div class="w-20 h-20 bg-[#e4ff23] rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span class="text-[#000] text-xs font-bold">COCK {{ i }}</span>
                      </div>
                      <span class="text-[#8b9dc3] text-xs font-medium">Cockfight {{ i }}</span>
                    </div>
                  </div>
                </div>

                <div v-else-if="item.label === 'PROMOSI'" class="grid grid-cols-2 gap-4">
                  <div v-for="i in 4" :key="i" class="bg-[#1a0128] rounded-lg p-4 border border-[#460289] hover:bg-[#2d0240] transition-colors cursor-pointer">
                    <div class="text-center">
                      <div class="w-24 h-24 bg-[#e4ff23] rounded-lg mx-auto mb-3 flex items-center justify-center">
                        <span class="text-[#000] text-sm font-bold">PROMO {{ i }}</span>
                      </div>
                      <span class="text-[#8b9dc3] text-sm font-medium">Promotion {{ i }}</span>
                      <p class="text-[#8b9dc3] text-xs mt-1">Special offer for you!</p>
                    </div>
                  </div>
                </div>

                <!-- Default content for other menu items -->
                <div v-else class="grid grid-cols-4 gap-4">
                  <div v-for="i in 8" :key="i" class="bg-[#1a0128] rounded-lg p-3 border border-[#460289] hover:bg-[#2d0240] transition-colors cursor-pointer">
                    <div class="text-center">
                      <div class="w-16 h-16 bg-[#460289] rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <span class="text-[#8b9dc3] text-xs">GAME {{ i }}</span>
                      </div>
                      <span class="text-[#8b9dc3] text-xs font-medium">{{ item.label }} Game {{ i }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
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
  name: "SiteHeader",
  setup() {
    const { t, locale } = useI18n();
    const store = useAppStore();
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    const activeTab = computed(() => store.activeTab);
    const showLanguageDropdown = ref(false);
    const hoveredMenu = ref<string | null>(null);

    const setActiveTab = (tab: string) => store.setTab(tab);
    const openModal = (modal: string) => store.openModal(modal);

    const currentLanguage = computed(() => locale.value);

    const languages = [
      { code: "en", name: "ENGLISH", native: "ENGLISH" },
      { code: "id", name: "BHS INDONESIA", native: "INDONESIAN" },
      { code: "ko", name: "한국어", native: "KOREAN" },
      { code: "zh", name: "中文", native: "CHINESE" },
      { code: "ja", name: "日本語", native: "JAPANESE" },
      { code: "th", name: "ไทย", native: "THAI" },
      { code: "my", name: "မြန်မာစာ", native: "BURMESE" },
      { code: "km", name: "ខេមរភាសា", native: "KHMER" },
      { code: "hi", name: "हिन्दी", native: "HINDI" },
      { code: "ta", name: "தமிழ்", native: "TAMIL" },
      { code: "te", name: "తెలుగు", native: "TELUGU" },
      { code: "vi", name: "Tiếng Việt", native: "VIETNAMESE" },
      { code: "bn", name: "বাংলাদেশী", native: "BENGALI" },
      { code: "pt", name: "Português", native: "PORTUGESE" },
    ];

    const headerMenu = [
      { src: "/img/new/icons/hot-games.svg", label: "HOT GAMES" },
      { src: "/img/new/icons/slots.svg", label: "SLOTS" },
      { src: "/img/new/icons/casino.svg", label: "LIVE CASINO" },
      { src: "/img/new/icons/others.svg", label: "TOGEL" },
      { src: "/img/new/icons/sports.svg", label: "OLAHRAGA" },
      { src: "/img/new/icons/crash-game.svg", label: "CRASH GAME" },
      { src: "/img/new/icons/arcade.svg", label: "ARCADE" },
      { src: "/img/new/icons/poker.svg", label: "POKER" },
      { src: "/img/new/icons/e-sports.svg", label: "E-SPORTS" },
      { src: "/img/new/icons/cockfight.svg", label: "SABUNG AYAM" },
      { src: "/img/new/icons/promotion.svg", label: "PROMOSI" },
    ];

    const menus = [
      { icon: "fa-diamond", id: "Casino", route: "/#pos-casino" },
      { icon: "fa-diamond", id: "Slot", route: "/#pos-slot" },
      { icon: "fa-money-bill-transfer", id: "Support", route: "/notice" },
      { icon: "fa-book", id: "Notice", route: "/notice" },
      { icon: "fa-coins", id: "Regulations", route: "/notice" },
      { icon: "fa-handshake", id: "Partners", route: "/partner/dashboard" },
    ];

    const toggleLanguageDropdown = () => {
      showLanguageDropdown.value = !showLanguageDropdown.value;
    };

    const changeLanguage = (langCode: string) => {
      locale.value = langCode;
      showLanguageDropdown.value = false;
    };

    const getLanguageName = (code: string) => {
      const lang = languages.find((l) => l.code === code);
      return lang ? lang.name : "ENGLISH";
    };

    const hasFlag = (code: string) => {
      // Check if flag image exists for the language code
      const availableFlags = ["en", "ko", "id"]; // Add more as they become available
      return availableFlags.includes(code);
    };

    const openLoginModal = () => {
      store.openModal("login");
    };

    const openRegisterModal = () => {
      store.openModal("register");
    };

    const refreshBalance = () => {
      authStore.updateWalletWithSlot();
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

    onMounted(() => {
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

    return {
      headerMenu,
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
      languages,
      currentLanguage,
      showLanguageDropdown,
      toggleLanguageDropdown,
      changeLanguage,
      getLanguageName,
      hasFlag,
      openLoginModal,
      openRegisterModal,
      refreshBalance,
      hoveredMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.topbar-item::before {
  content: "";
  background: #5d5d5d;
  height: 20px;
  width: 1px;
  margin: 0 8px;
}

/* Enhanced navigation styles converted from CSS */
.site-header .top-menu > li:hover {
  color: #fff;
  background-image: radial-gradient(circle at top center, #450287 0, #25013b 100%);
}

/* Announcement container styles */
.announcement-container i ul {
  background: #40027e;
  color: #fff;
}

.announcement-container [data-section="announcements"] {
  background: #40027e;
  color: #fff;
}

/* Enhanced hover effects for navigation */
ul#nav li a {
  color: #fff;
  transition: color 0.3s ease;
}

ul#nav li a:hover {
  color: #e4ff23;
}

/* Button and form styles */
.modal-btn {
  background: #a1b60d;
  color: #fff;
  border-color: #a1b60d;
}

.modal-btn:hover {
  background: #e4ff23;
  color: #333;
}

/* Standard form styles */
.standard-form-note {
  background-color: #320050;
  color: #fff;
}

.standard-form-content .btn-primary {
  color: #fff;
  background: linear-gradient(to bottom, #d6ef20 0%, #899a10 100%);
}

.standard-form-content .btn-primary:hover {
  background: linear-gradient(to bottom, #899a10 0%, #d6ef20 100%);
}

/* Panel and container styles */
.panel-default > .panel-heading {
  background-color: #320050;
  border-color: #320050;
}

.panel-default > .panel-heading a {
  color: #e4ff23;
}

/* Game list styles */
.game-list .game-name {
  color: #fff;
  background: linear-gradient(to right, #170826 1%, #3a036e 53%, #170826 100%);
}

/* Popular games styles */
.popular-games .nav-tabs > li > a {
  background-color: #1b072f;
  color: #fff;
}

.popular-games .nav-tabs > li.active > a,
.popular-games .nav-tabs > li.active > a:hover,
.popular-games .nav-tabs > li.active > a:focus,
.popular-games .nav-tabs > li > a:hover {
  background-color: #2a064d;
  color: #fff;
}

.popular-games .tab-pane {
  background-color: #050e2d;
}

/* Footer styles */
.footer-links > li > a {
  color: #fff;
}

.footer-links > li > a:hover {
  color: #e4ff23;
}

/* Site info styles */
.site-info .site-info-title p {
  color: #e4ff23;
}

.site-info .site-info-description h4 {
  color: #e4ff23;
}

/* Provider container styles */
.provider-container > h5 {
  background: #000412;
  color: #e4ff23;
}

.provider-container p {
  color: #e4ff23;
}

/* Jackpot styles */
.jackpot-winners .jackpot-winner-title {
  color: #e4ff23;
}

.home-jackpot-container .jackpot-container span {
  color: #e4ff23;
}

/* Progress bar styles */
.progressbar {
  background-color: #0a0909 !important;
}

.proggress {
  background-color: #e4ff23 !important;
}

/* Standard side menu styles */
.standard-side-menu a[data-active="true"],
.standard-side-menu a:hover {
  color: #e4ff23;
  background-color: #5401a5;
}

.standard-side-menu,
.standard-side-menu .menu-section {
  background-color: #1b002b;
}

.standard-side-menu .player-account-section {
  background-color: #320050;
}

.standard-side-menu .player-account-section .username {
  color: #bdd700;
}

/* Form control styles */
.form-control {
  border-color: #320050;
  background: #12021e;
  color: #ccc;
}

/* Standard button styles */
.standard-button-group .btn-primary {
  color: #000;
  background: linear-gradient(to bottom, #e4ff23 0%, #9db20a 100%);
  border-color: #e4ff23;
}

.standard-button-group .btn-primary:hover {
  background: linear-gradient(to bottom, #9db20a 0%, #e4ff23 100%);
}

/* Login panel styles */
.login-panel.login-panel-item {
  background-color: #0a0a0a;
  color: #fff;
  border-color: #888;
}

.login-panel .login-button {
  background: linear-gradient(to bottom, #6a6a6a 0%, #484848 100%);
  color: #fff;
}

.login-panel .login-button:hover {
  background: linear-gradient(to bottom, #484848 0%, #6a6a6a 100%);
  color: #fff;
}

.login-panel .register-button {
  background: linear-gradient(to bottom, #3f0279 0%, #270140 100%);
  color: #fff;
}

.login-panel .register-button:hover {
  background: linear-gradient(to bottom, #270140 0%, #3f0279 100%);
  color: #fff;
}

/* Modal styles */
.modal-content {
  background: #0c0c0c;
  border-color: #0c0c0c;
  color: #bbb;
}

.modal-header {
  border-bottom-color: #333;
}

.modal-header .close {
  color: #fff;
}

.modal-footer .btn-primary {
  color: #000;
  background: linear-gradient(to bottom, #e4ff23 0%, #9db20a 100%);
}

.modal-footer .btn-primary:hover {
  background: linear-gradient(to bottom, #9db20a 0%, #e4ff23 100%);
}

/* Table styles */
.table-bordered tr th {
  color: #fff;
  background-color: #44016c;
}

.standard-reporting-control-group .table tr th {
  background-color: #3f6b6e;
  color: #fff;
}

/* Claim item styles */
.claim-item .claim-button,
.claim-item .activation-button,
.claim-item .cancellation-button,
.claim-item .expiration-button {
  background-color: #afc700;
  color: #fff;
}

.claim-item .claim-button:hover,
.claim-item .activation-button:hover,
.claim-item .cancellation-button:hover,
.claim-item .expiration-button:hover {
  background-color: #7800eb;
}

/* Bonus slider modal styles */
.bonus-slider-modal .modal-title {
  color: #fff;
}

.bonus-slider-modal .activation-button {
  background-color: #afc700;
  color: #fff;
}

.bonus-slider-modal .activation-button:hover {
  background-color: #7800eb;
  color: #fff;
}

/* Promotion styles */
.promotion-info .close-button {
  background-color: #e4ff23;
  color: #000;
}

.promotion-item .click-for-get-promo-button {
  background: linear-gradient(to bottom, #d3ec1f 0%, #8b9c10 100%);
  color: #fff;
}

.promotion-item .click-for-get-promo-button:hover {
  background: linear-gradient(to bottom, #8b9c10 0%, #d3ec1f 100%);
  color: #fff;
}

/* User info styles */
.user-info .dropdown-menu > li > a:focus,
.user-info .dropdown-menu > li > a:hover {
  background: #460289;
  color: #fff;
}

.user-info .dropdown-menu > li > a {
  background-color: #25013b;
  color: #fff;
}

/* Topbar styles */
.topbar-left-section .topbar-item a {
  color: #7c7c7c;
  border-right-color: #bdbdbd;
}

.topbar-left-section .topbar-item a:hover {
  color: #e3fe24;
}

.topbar-left-section .topbar-item .live-chat {
  color: #7c7c7c;
  background: #e3fe24;
}

.topbar-left-section .topbar-item .live-chat:hover {
  color: #daf22c;
  background: #7c7c7c;
}

/* Language selector styles */
.topbar-item.language-selector-container ul {
  background-color: #000629;
}

.topbar-item.language-selector-container ul li {
  border-bottom: 1px solid #fff;
  background-color: #25013b;
}

/* Hot match styles */
.hot-match-container .live-streaming-link {
  border-color: #e4ff23;
  color: #fff;
}

.hot-match-container .live-streaming-link:hover {
  border-color: #e4ff23;
  color: #180126;
  background-color: #e4ff23;
}

/* Navigation hover effects */
li.navigation1:hover:after,
li.active.navigation1:after,
li.navigation2:hover:after,
li.active.navigation2:after,
li.navigation3:hover:after,
li.active.navigation3:after,
li.navigation4:hover:after,
li.active.navigation4:after,
li.navigation5:hover:after,
li.active.navigation5:after,
li.navigation6:hover:after,
li.active.navigation6:after,
li.navigation7:hover:after,
li.active.navigation7:after,
li.navigation8:hover:after,
li.active.navigation8:after {
  background: #e4ff23;
}

/* Site header styles */
.site-header {
  background: #25013b;
  border-color: #460289;
}

.site-header .top-menu .game-list {
  border-top-color: #460289;
  background-color: rgba(23, 3, 36, 0.79);
  border-bottom-color: #e4ff23;
}

/* Footer styles */
.site-footer {
  border-top-color: #4a0776;
  background: #000;
}

.footer-separator {
  border-top-color: #3f3d41;
}

/* Copyright styles */
.copyright {
  color: #fff;
}

/* Standard form link header styles */
.standard-form-link-header a {
  background-color: #25013b;
}

.standard-form-link-header a[data-active="false"]:hover {
  background-color: #38015a;
  color: #fff;
}

.standard-form-link-header a[data-active="true"] {
  background-color: #490076;
}

/* Standard inline form group styles */
.standard-inline-form-group [data-section="input"] {
  color: #fff;
}

.standard-inline-form-group [data-section="asterisk"] {
  color: #f00;
}

/* Bank info styles */
.bank-info {
  background: linear-gradient(to bottom, #1b002b 0%, #25013b 100%);
}

.bank-info hr {
  border-top: 1px solid #1b002b;
  border-bottom: 1px solid #393939;
}

/* Copy button styles */
.copy-input-button-field .copy-input-button {
  background: none;
  color: #bdd700;
}

.copy-input-button-field .copy-input-button:hover {
  color: #e4ff23;
}

/* Deposit and withdrawal styles */
.deposit-amount-container .real-deposit-amount,
.deposit-amount-container .deposit-amount .currency-suffix,
.deposit-amount-container .deposit-amount input.form-control {
  color: #bdd700;
}

.withdrawal-container .total-balance {
  color: #919eff;
  border-color: #ccc;
}

.withdrawal-container .real-withdrawal-amount,
.withdrawal-container .withdrawal-amount input.form-control,
.withdrawal-container .withdrawal-amount .currency-suffix {
  color: #e4ff28;
}

/* Contact list styles */
.contact-list > li a {
  background: #0a0a0a;
  color: #e4ff23;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding-left: 20px;
}

.contact-list > li a i {
  background: #5a2096;
}

/* Referral styles */
.referral-box-container .referral-box {
  background-color: #320050;
  border-bottom: 1px solid #e4ff23;
}

.referral-box-container .referral-box span {
  color: #e4ff23;
}

.referral-box-container .referral-box h4 {
  color: #fff;
}

.referral-box-container .referral-box .referral-box-icon {
  background: #97a91a;
}

.referral-box a,
.referral-code-container a,
.change-referral-code a {
  color: #e4ff23;
}

.referral-box a:hover,
.referral-code-container a:hover,
.change-referral-code a:hover {
  color: #919eff;
}

/* Loyalty styles */
.loyalty-container .standard-form-note {
  background-color: #320050;
}

.mission-container .mission-item[data-status="claimable"] .mission-action-container .action-button {
  background: linear-gradient(to bottom, #d6ef20 0%, #899a10 100%);
  color: #fff;
}

.mission-container .mission-item[data-status="claimable"] .mission-action-container .action-button:hover {
  background: linear-gradient(to bottom, #899a10 0%, #d6ef20 100%);
  color: #fff;
}

/* Daily reward styles */
.daily-reward-container {
  background-color: #1d1028;
}

.daily-reward-container .standard-secondary-button {
  background: linear-gradient(to bottom, #d6ef20 0%, #899a10 100%);
}

.daily-reward-container .standard-secondary-button:hover {
  background: linear-gradient(to bottom, #899a10 0%, #d6ef20 100%);
}

/* Benefit styles */
.benefit-container .benefit-list .benefit-card {
  background-color: #1b002b;
  border-color: #391f4f;
}

/* Intro.js styles */
.introjs-tooltip-title {
  color: #fff;
}

.introjs-tooltiptext .subtitle {
  color: #d6ef20;
}

.introjs-nextbutton {
  background-image: linear-gradient(to bottom, #d6ef20, #899a10);
  color: #fff;
}

.introjs-nextbutton:hover {
  background-image: linear-gradient(to bottom, #899a10, #d6ef20);
  color: #fff;
}

.introjs-bullets ul li a {
  background-color: #626f08;
}

.introjs-bullets ul li a.active,
.introjs-bullets ul li a:hover {
  background-color: #d6ef20;
}

.introjs-skipbutton,
.introjs-skipbutton:hover {
  color: #d6ef20;
}

/* How it works styles */
.how-it-works-container .how-it-works-section .how-it-works-section-title {
  color: #d6ef20;
}

/* Referral features styles */
.referral-features .referral-features-item .feature-icon > div {
  background: linear-gradient(to bottom, #d6ef20 0%, #899a10 100%);
}

.referral-features .referral-features-item .feature-info p {
  color: #d6ef20;
}

/* Pending verification styles */
.pending-verification-container .icon-container {
  background-color: #d6ef20;
}

.pending-verification-container p {
  color: #d6ef20;
}

/* Notification styles */
.notification-list .notification-item {
  background: #040404;
  border-color: #242424;
}

.notification-list .notification-item[data-seen="false"] {
  background: #190028;
  border-color: #540088;
}

.notification-list .notification-item .notification-header .notification-label {
  background: #8f00e6;
}

.notification-list .notification-item .notification-title-container .notification-title-content h3 {
  color: #fff;
}

.notification-list .notification-item .notification-content p {
  color: #999;
}

/* Floating action button styles */
.floating-action-button .floating-action-button-item {
  background: linear-gradient(0deg, #26013f 0%, #3f0279 100%);
  border-color: #7e34c5;
  box-shadow: 0 4px 24px 0 #3f027980;
}

/* Bonus selection styles */
.bonus-selection-container,
.bonus-selection-list .bonus-selection-card.selected {
  background: #273400;
  border-color: #e4ff23;
}

.bonus-selection-list .bonus-selection-card.selected .bonus-selection-card-footer {
  background: #273400;
}

.bonus-selection-list .bonus-selection-card.selected .bonus-selection-card-content .bonus-selected {
  background: #e4ff23;
}

/* Simple modal styles */
.simple-modal .btn-secondary {
  border: 1px solid #d8f221;
  color: #d8f221;
}

/* Standard outline button styles */
.standard-outline-button {
  border-color: #e4ff23;
}

/* Standard remarks styles */
.standard-remarks-container .standard-remarks-content-container p span {
  color: #e4ff23;
}

/* Update verification note styles */
.update-verification-note-container .update-verification-note {
  background: #320050;
  color: #fff;
}

.update-verification-note-container .update-verification-note span {
  color: #f00;
}

/* Replied message styles */
.replied-message:not([data-message-type="announcement"]) .replied-message-content * {
  color: #858585;
}

/* Standard form container loyalty benefit styles */
.standard-form-container.loyalty-benefit-form-container {
  background-color: #1b002b;
}

.loyalty-benefit-form-container .standard-form-content {
  background-color: #1b002b;
}

/* Loyalty level styles */
.loyalty-level-benefits-section {
  background: #0b0113;
  border-color: #320050;
}

.loyalty-level-container .loyalty-level-item .loyalty-level-badge-container {
  background: #1a0a27;
}

.loyalty-level-container .loyalty-level-item[data-selected="true"] .loyalty-level-badge-container {
  background: #3b2c49;
}

.loyalty-level-container .loyalty-level-item .loyalty-level-progress-container .loyalty-level-progress-point {
  background: #2f2539;
  border-color: #2f2539;
}

.loyalty-level-container .loyalty-level-item .loyalty-level-progress-container .loyalty-level-progress-bar {
  background: #2f2539;
}

.loyalty-level-remarks-container {
  background: #e4ff2333;
  border-color: #e4ff23;
}

.loyalty-level-benefits-container {
  background: #26013d;
}

.loyalty-level-benefits-container .loyalty-level-benefits-list .loyalty-level-benefits-list-item {
  background: #351b50;
}

/* Loyalty container styles */
.loyalty-container .loyalty-menu a {
  background-color: #2c0047;
  border-color: #422d57;
}

.loyalty-reward-container {
  border-color: #320050;
  background-color: #0b0113;
}

.loyalty-reward-container .category-title::before {
  background-color: #e4ff23;
}

.loyalty-reward-container .loyalty-reward-button {
  background-image: linear-gradient(to bottom, #d3ec1f, #8b9c10);
  color: #fff;
}

.loyalty-reward-container .tab-filter .tab {
  background-color: #22172b;
}

.loyalty-reward-container .tab-filter input:checked + .tab {
  background-color: #e4ff23;
  color: #3f1d5f;
}

.loyalty-reward-container .flash-sale-container::-webkit-scrollbar-thumb,
.loyalty-reward-container .lucky-draw-container::-webkit-scrollbar-thumb,
.loyalty-reward-container .other-product-container::-webkit-scrollbar-thumb {
  background: #342d4e;
}

.loyalty-reward-container .flash-sale-container .item,
.loyalty-reward-container .lucky-draw-container .item,
.loyalty-reward-container .other-product-container .item {
  background-color: #2b0f44;
}

.loyalty-reward-container .flash-sale-container .item .item-detail-contaner .item-lp .item-lp-detail,
.loyalty-reward-container .lucky-draw-container .item .item-detail-contaner .item-lp .item-lp-detail,
.loyalty-reward-container .other-product-container .item .item-detail-contaner .item-lp .item-lp-detail {
  background-color: #ffffff33;
}

/* Loyalty top bar styles */
.loyalty-top-bar-container {
  background: linear-gradient(82.95deg, #25013b -41.64%, #4c2d6d 138.36%);
}

/* Whitelisted domains styles */
.whitelisted-domains-link {
  background: #97a91a;
  color: #fff;
}

/* Search header styles */
.search-header .search-title img {
  filter: invert(82%) sepia(81%) saturate(463%) hue-rotate(11deg) brightness(103%) contrast(103%);
}

/* Standard remark notification styles */
.standard-remark-notification .remark-notification-content span {
  color: #e4ff23;
}

/* Back link styles */
.back-link-container a,
.back-link-container a:hover {
  color: #fff;
  background: none;
}

/* Add new payment account styles */
.add-new-payment-account-container a {
  color: #e4ff23;
}

.add-new-payment-account-container a > img {
  filter: invert(73%) sepia(54%) saturate(595%) hue-rotate(22deg) brightness(117%) contrast(105%);
}

/* Set as default button styles */
.set-as-default-button {
  background: none;
  color: #e4ff23;
  border-color: #e4ff23;
}

/* Notification play button styles */
.notification-list .notification-item .notification-play-button {
  background: #584593;
}

/* Claim item free spin note styles */
.claim-item .claim-title .free-spin-note {
  color: #6a03cf;
}

/* Standard inline form group readonly styles */
.standard-inline-form-group .form-control[readonly] {
  background-color: #333;
}

/* Standard secondary button styles */
.standard-secondary-button {
  border-color: #e4ff23;
}

/* Standard remarks content container styles */
.standard-remarks-container .standard-remarks-content-container p span {
  color: #e4ff23;
}
</style>
