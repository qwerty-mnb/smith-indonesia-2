<template>
  <header class="header-section topbar hs-pc container-fluid"
    :style="{ 'background-color': !authStore.isAuthenticated ? 'rgb(0,0,0,0.2) !important' : '' }"
    :class="authStore.isAuthenticated ? 'header-border' : ''">
    <div class="header-sub">
      <div class="header-transaction-buttons" v-if="authStore.isAuthenticated">
        <button v-if="authStore.user.shoplevel < 2" type="button"
            class="btn-group-header btn-group-header-sub btn-deposit btn-money"
            @click="setRouter('/transaction', true), openModal('deposit')">
            {{ $t("header.DepositRequest") }}
          </button>
          <button v-if="authStore.user.shoplevel < 2" type="button"
            class="btn-group-header btn-group-header-sub btn-withdraw btn-money"
            @click="setRouter('/transaction', true), openModal('withdrawal')">
            {{ $t("header.WithdrawRequest") }}
          </button>
          <button v-if="authStore.user.shoplevel < 2" type="button"
            class="btn-group-header btn-group-header-sub btn-money"
            @click="setRouter('/transaction'), openModal('widephistory')">
            {{ $t("header.WidDepHistory") }}
          </button>
      </div>
    </div>
    <div class="row header-mobile">
      <div class="col-4">
        <i class="fa-solid fa-bars fa-2x showSideNav" @click="showLeftNavigation()"></i>
      </div>
      <div class="col-4">
        <router-link class="mobile-router" to="/"><img src="/img/logo/logo-mobile.webp" class="mobile-logo"
            alt="LOGO" /></router-link>
      </div>
      <div class="col-4 text-right pt-1">
        <button type="button" v-if="authStore.isAuthenticated" class="btn-default text-white" @click="logout()">
          {{ $t("header.Logout") }}
        </button>
      </div>
    </div>
  </header>
  <div class="mobile-info" v-if="authStore.isAuthenticated">
    <div class="item">
      <span>{{ `LV.${user.level} ${user.name}` }} 님 </span>
      <span @click="setRouter('/notice'), openModal('inquiry')" class="position-relative"><i
          class="fa-sharp fa-solid fa-envelope inquiry mx-2"> <span class="text-warning mx-1">({{ authStore.inquiryCtr
          }})</span>
          <h4></h4>
        </i>
        <img v-if="authStore.inquiryCtr > 0" src="/img/logo/newinq.webp" class="blink new-inquiry" />
      </span>
    </div>
    <div class="item">
      <span class="user-balance">{{ $n(Number(user.wallet)) }}</span>원
    </div>
    <div class="item">
      <span class="user-balance">{{ $n(Number(user.wallet_point)) }}</span>P
    </div>
  </div>
  <Register />
  <Login />

  <!-- Left Side Bar -->
  <div class="sidebar-backdrop" v-if="showLeftNav" @click="showLeftNavigation()"></div>
  <div class="sidenav" :class="{ active: showLeftNav }">
    <div class="scroll">
      <div class="my-info">
        <div class="login text-left" v-if="!authStore.isAuthenticated">
          <button @click="authStore.getCaptcha" class="btn btn-default justify-content-start ml-4" data-bs-toggle="modal"
            data-bs-target="#loginModal">
            <i class="fa-solid fa-circle-user fa-2x mr-2"></i>
            <span class="login-text">{{ $t("auth.Login") }}</span>
          </button>
          <!-- Close Button -->
          <button @click="showLeftNavigation()" type="button" class="modal-close-btn w-ba btn-left-nav"></button>
        </div>
        <div class="info-container" v-if="authStore.isAuthenticated">
          <div class="info-header">
            <div class="row mx-1">
              <div class="">
                <i class="fa-solid fa-face-smile fa-xl"></i>
                <span class="info-level">{{ `LV.${user.level}` }}</span>
                <i class="fa-solid fa-rotate-right"></i>
              </div>
              <div class="col-6 d-flex justify-content-end username-container">
                <a href="#" class="info-username" @click="setRouter('/mypage'), openModal('point')">
                  <span>{{ user.name }}</span> 님
                </a>
              </div>
              <div @click="showLeftNavigation()">
                <button type="button" class="modal-close-btn w-ba btn-left-nav"></button>
              </div>
            </div>
          </div>
          <div class="ul-info">
            <div class="row">
              <div class="col-sm-6 pl-0 w-50">
                <span class="text-white">
                  {{ $t("withdraw.Balance") }}
                </span>
              </div>
              <div class="col-sm-6 text-right w-50">
                <span class="user-balance text-white">{{ $n(Number(user.wallet)) }} 원</span>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 pl-0 w-50">
                <span>
                  {{ $t("point.TransferAmount") }}
                </span>
                <!-- <span @click="setRouter('/mypage'), openModal('point'), showLeftNavigation()" class="bg-info bg-point pl-2 pr-2 ml-2 rounded">{{ $t("point.TransferPoint") }}</span> -->
              </div>
              <div class="col-sm-6 text-right w-50">
                <span class="user-balance text-white text-right">{{ $n(Number(user.wallet_point)) }} 원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="mobilemenu">
        <li v-for="(menu, i) in menus_mobile" :key="i" @click="
          menu.id == 'AccountRequest'
            ? requestAccount()
            : menu.id !== 'Casino' && menu.id !== 'Slot'
              ? (setRouter(`${menu.route}`, true), setActiveTab(menu.id.toLowerCase()),
                openModal(menu.id.toLowerCase()),
                showLeftNavigation())
              : null
          ">
          <router-link :key="i" :to="menu.id === 'Casino' || menu.id === 'Slot'
              ? `/#pos-${menu.id.toLowerCase()}`
              : ''
            " class="mobilemenu-item deposit-link menu-flex-center">

            <span style="margin-right: 4px; font-size: 1.2em !important; padding-bottom: 5px;">{{ menuEmoji(menu.id) }}</span>
            <span>{{ $t("header." + menu.id) }}</span>
          </router-link>
        </li>
      </ul>
      <div class="btn-partner">
        <span>{{ $t("header.Partners") }}</span>
      </div>
      <ul class="mobilemenu partner-mmenu">
        <li v-for="(menu, i) in partnerMenu" :key="i" @click="
          setActiveTab(menu.id.toLowerCase()),
          openModal(menu.id.toLowerCase()),
          showLeftNavigation()
          ">
          <router-link :key="i" :to="menu.route" class="mobilemenu-item deposit-link pmenu menu-flex-center">
            <span style="margin-right: 4px; font-size: 1.2em !important;padding-bottom: 5px;">{{ partnerMenuEmoji(menu.id) }}</span>
            <span>{{ $t("PartnerMenu." + menu.id) }}</span>
          </router-link>
        </li>
      </ul>
      <!-- <div class="info-telegram">
        <a :href="`https://t.me/${settings.TELEGRAM}`" target="_blank">
          <div class="d-flex">
            <img src="/img/icon/telegram.webp" />
            <span>{{ settings.TELEGRAM }}</span>
          </div>
        </a>
      </div> -->
      <hr class="hr-info" />
      <div  class="logout-div">
        <button type="button" v-if="authStore.isAuthenticated" class="btn-default text-white" @click="logout()">
          {{ $t("header.Logout") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, onMounted } from "vue";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
import Register from "@/views/auth/Register.vue";
import Login from "@/views/auth/Login.vue";
import ApiService from "@/services/ApiService";
import { isWindow } from "@vueuse/shared";

export default defineComponent({
  name: "LayoutHeader",
  components: {
    Login,
    Register,
  },
  setup() {
    // vue
    const appStore = useAppStore();
    const authStore = useAuthStore();
    const router = useRouter();
    const route = useRoute();
    const user = computed(() => authStore.user);

    const settings = computed(() => appStore.settings);
    const { t, locale } = useI18n();

    const showLeftNav = ref(false);
    const showRightNav = ref(false);

    const isShowLang = ref(false);
    const selectedLang = ref({ code: "", label: "" });

    const langs = [
      {
        code: "ko",
        label: "Korean",
      },
      {
        code: "en",
        label: "English",
      },
    ];

    const menus = [
      { id: "Casino", route: "/#pos-casino" },
      { id: "Slot", route: "/#pos-slot" },
      { id: "deposit", route: "/transaction" },
      { id: "withdrawal", route: "/transaction" },
      { id: "MoneyTransfer", route: "/transaction" },
      { id: "widephistory", route: "/transaction" },
      { id: "Notice", route: "/notice" },
      { id: "Inquiry", route: "/notice" },
    ];

    const menus_mobile = [
      { id: "deposit", route: "/transaction" },
      { id: "withdrawal", route: "/transaction" },
      { id: "AccountRequest", route: "" },
      { id: "Notice", route: "/notice" },
      { id: "Point", route: "/mypage" },
      { id: "Inquiry", route: "/notice" },
    ];

    const partnerMenu = [
      { id: "Home", route: "/partner/dashboard" },
      { id: "Member", route: "/partner/members" },
      { id: "Betting", route: "/partner/bet-history" },
      { id: "Transaction", route: "/partner/charge-record" },
      { id: "Statistics", route: "/partner/game-stats" },
      { id: "Settlement", route: "/partner/settlements" },
    ];

    const openModal = (modal: string) => {
      appStore.openModal(modal);
    };

    const setRouter = (path: string, checkMessage = false) => {
      if (path === "/transaction" && checkMessage) {
        if (authStore.inquiryCtr > 0) {
          return Swal.fire(
            t("inquiry.UnreadMessage"),
            t("CasinoWarning.Unread"),
            "warning"
          ).then((result) => {
            if (result.value)
              router.push("/notice");
            openModal("inquiry");
          });
        } else {
          router.push({ path });
        }
      } else {
        router.push({ path });
      }
    };

    const setActiveTab = (tab: string) => appStore.setTab(tab);

    const selectLang = (lang: any) => {
      selectedLang.value = lang;
      localStorage.setItem("langLabel", lang.label);
      localStorage.setItem("langcode", lang.code);
    };

    selectedLang.value = {
      code: localStorage.getItem("langcode") || "",
      label: localStorage.getItem("langLabel") || "",
    };

    if (selectedLang.value.code == "") {
      selectedLang.value = langs[0];
      localStorage.setItem("langLabel", selectedLang.value.label);
      localStorage.setItem("langcode", selectedLang.value.code);
    }

    locale.value = selectedLang.value.code;

    /**
     * Logout
     *
     */
    async function logout() {
      authStore.logout();
      router.push({ path: "/" });
    }

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

    const showLeftNavigation = () => {
      showRightNav.value = false;
      showLeftNav.value = !showLeftNav.value;
    };

    const showRightNavigation = () => {
      showLeftNav.value = false;
      showRightNav.value = !showRightNav.value;
    };

    onMounted(() => {
      setTimeout(() => {
        let el = null;
        if (route.hash.includes("pos-casino"))
          el = document.getElementById("pos-casino");
        else if (route.hash.includes("pos-slot"))
          el = document.getElementById("pos-slot");

        if (el) {
          el.scrollIntoView();
        }
      }, 1000);
    });

    // Icon mapping for menus_mobile
    const menuEmoji = (id: string) => {
      switch (id) {
        case "deposit":
          return "➕";
        case "withdrawal":
          return "➖";
        case "AccountRequest":
          return "📝";
        case "Notice":
          return "🔔";
        case "Point":
          return "💰";
        case "Inquiry":
          return "✉️";
        default:
          return "🔘";
      }
    };

    // Emoji mapping for partnerMenu
    const partnerMenuEmoji = (id: string) => {
      switch (id) {
        case "Home":
          return "🏠";
        case "Member":
          return "👥";
        case "Betting":
          return "🎫";
        case "Transaction":
          return "🔄";
        case "Statistics":
          return "📊";
        case "Settlement":
          return "⚖️";
        default:
          return "🔘";
      }
    };

    return {
      authStore,
      menus,
      menus_mobile,
      partnerMenu,
      user,
      openModal,
      setRouter,
      setActiveTab,
      requestAccount,
      logout,
      showLeftNavigation,
      showRightNavigation,
      showLeftNav,
      showRightNav,
      langs,
      isShowLang,
      selectedLang,
      selectLang,
      settings,
      menuEmoji,
      partnerMenuEmoji,
    };
  },
});
</script>
<style scoped>
.user-info {
  color: var(--white-yellow) !important;
  text-decoration: none;
}

.new-inquiry {
  position: absolute;
  height: 35px;
  top: -11px;
  z-index: 10;
  left: -29px;
}

.blink {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

.bal-container {
  text-align: end;
  font-size: 1.3em;
  margin-top: -25px;
  /*
  margin-bottom: 20px; */
}

.header-section .container {
  max-width: 100% !important;
}

.points-btn {
  color: rgba(0, 0, 0, 0.75);
  text-shadow: 0 1px 0 rgb(255 255 255 / 40%);
  background-color: #dece8f;
  background-image: linear-gradient(#dece8f, #998643);
  border: solid 1px #dece8f;
  height: 26px !important;
  width: 65px !important;
  font-size: 14px;
}

.bs-ul {
  font-size: 17px !important;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 20%);
  z-index: 1000;
  border-radius: 3px;
  right: 0px;
  background-image: linear-gradient(#261e12, #17110b);
  border-top: solid 1px #614822;
  box-shadow: 0 5px 20px rgb(0 0 0 / 60%);
  border-bottom: solid 1px #614822;
}

.dropdown-content div {
  padding: 5px;
}

.dropdown-content div:hover {
  background-color: goldenrod;
  cursor: pointer;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.lang-img,
.lang-img-btn {
  width: 2em;
  height: 2em;
  border-radius: 50%;
  margin-right: 0.5em;
  transform: scale(0.9);
}

.lang-img-btn {
  cursor: pointer;
}

.user-info {
  white-space: nowrap;
}

.partner-btn {
  color: rgb(255, 255, 255);
  padding: 0px 8px !important;
  font-size: 1em;
  background: #3C3C3C;
  border: 1px solid #494949 !important;
  border-radius: 15px !important;
}

.sidebar-backdrop {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  z-index: 101;
  width: 100vw;
  height: 100vh;
}

.btn-money {
  font-size: 0.9rem;
  font-weight: 500;
  color: #f5f5f5;
  background: #000000;
  outline: 0px;
  margin: 0px;
  cursor: pointer
}

.logout {
  margin-top: 6px;
  margin-right: -32px;
}

.header-border {
  padding: 2px;
  border: 1px solid rgba(255, 255, 255, 0.2)
}

.join-link {
  background-color: rgba(173, 173, 173, 0.3) !important;
}

.refresh-bal {
  padding: 0 !important;
  margin-left: 2px;
  min-width: 16px !important; 
}

.menu-flex-center {
  display: flex;
  align-items: center;
}

.btn-partner {
  text-align: left;
  padding-left: 16px;
  font-weight: 600;
  background: none;
  border: none;
  background: linear-gradient(90deg, #cfb357 0%, #fda085 100%);
  padding-top: 10px;
}
.btn-partner::after {
content: "";
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    background-image: linear-gradient(to right, #6c6c6c 0%, #25252f 100%);
    width: 100%;
    height: 3px;
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
}
</style>
