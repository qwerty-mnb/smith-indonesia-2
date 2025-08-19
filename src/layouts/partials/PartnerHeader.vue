<template>
  <div class="secondary-header site-header d-none" :class="{ 'partners-header': route.name.includes('partner-') }"
 style="height: 0px;">

    <div class="secondary-sub-header">
      <!-- Logo -->
      <div class="logo-container">
        <router-link to="/">
          <div class="menu-logo" role="button">
            <img src="/img/logo/logo.webp" class="img-logo" alt="LOGO"
            />
          </div>
        </router-link>
      </div>
      <!-- Site Menu -->
      <div class="menu-items">
        <div class="menu">
          <div class="main-menu-wrap partner-menu">
            <div class="main-menu" :class="{'main-menu-hide': hover}" @mouseover="hover = true" @mouseleave="hover = false">
              <!-- Dashboard -->
              <div>
                <router-link class="nav-link ap-text-shadow" to="/partner/dashboard">
                  {{ $t("PartnerMenu.Home") }}
                </router-link>
              </div>
              <!-- Members Management -->
              <div>
                <router-link class="nav-link ap-text-shadow" to="/partner/members">
                  {{ $t("PartnerMenu.MemberManage") }}
                  <ul class="sub-menu mt-4" v-if="hover">
                    <li class="sub-menu-link" @click="setActiveTab('member')">
                      <router-link class="nav-link" to="/partner/members">{{ $t("PartnerMenu.MemberList") }}
                      </router-link>
                    </li>
                    <li class="sub-menu-link" @click="setActiveTab('onlinemember')">
                      <router-link class="nav-link" to="/partner/members">{{ $t("PartnerMenu.MemberOnline") }}
                      </router-link>
                    </li>
                    <li v-if="authStore.user.shoplevel > 0" class="sub-menu-link" @click="setActiveTab('shoptran')">
                      <router-link class="nav-link" to="/partner/members">{{ $t("PartnerMenu.ShopTranHistory") }}
                      </router-link>
                    </li>
                  </ul>
                </router-link>
              </div>
              <!-- Bet History -->
              <div>
                <router-link class="nav-link ap-text-shadow" to="/partner/bet-history">
                  {{ $t("PartnerMenu.Betting") }}
                </router-link>
              </div>
              <div>
                <router-link class="nav-link ap-text-shadow" to="/partner/charge-record">
                  {{ $t("PartnerMenu.Transaction") }}
                </router-link>
              </div>
              <!-- Game Statistics -->
              <div>
                <router-link class="nav-link ap-text-shadow" to="/partner/game-stats">{{ $t("PartnerMenu.Statistics") }}
                </router-link>
              </div>
              <!-- Settlement -->
              <div>
                <router-link class="nav-link ap-text-shadow" to="/partner/settlements" v-if="authStore.user.depth === 1">{{
                  $t("PartnerMenu.Settlement") }}
                  <ul class="sub-menu" v-if="hover">
                    <li class="sub-menu-link">
                      <router-link class="nav-link" to="/partner/settlements/request">{{
                        $t("PartnerMenu.SettlementRequest") }}
                      </router-link>
                    </li>
                    <li class="sub-menu-link">
                      <router-link class="nav-link" to="/partner/settlements">
                        {{ $t("PartnerMenu.SettlementHistory") }}
                      </router-link>
                    </li>
                  </ul>
                </router-link>
              </div>
            </div>
            <div class="hover-menu" v-if="route.name.includes('partner-') && hover"></div>
          </div>
        </div>
      </div>
      <!--Member Details-->
      <div class="member-details" v-if="authStore.isAuthenticated">
        <div @click="setRouter('/mypage'), openModal('change')" class="cursor-pointer">
          {{ `LV.${authStore.user.level}` }} <span class="user-name">{{ `${authStore.user.name}` }}</span> 님, 환영합니다.
        </div>
        <div class="messages cursor-pointer" @click="setRouter('/notice'), openModal('inquiry')">
          <i class="fa-sharp fa-solid fa-envelope fa-lg"></i>쪽지 {{ authStore.inquiryCtr }}통
          <img v-if="authStore.inquiryCtr > 0" src="/img/logo/newinq.webp" class="blink new-inquiry" />
        </div>
        <div class="wallet">
          {{ $t("withdraw.Balance") }} : ￦
          <span v-if="user.wallet_slot"> {{ $n(Number(user.wallet) + Number(user.wallet_slot || 0)) }}</span>
          <span v-else> {{ $n(Number(user.wallet)) }}</span>
          <span
            class="cursor-pointer ml-1"
            @click="authStore.updateWalletWithSlot()">
            <i class="fa-solid fa-refresh"></i>
          </span>
        </div>
        <div class="points">
          {{ $t("point.TransferAmount") }} :
          <span>{{ $n(Number(user.wallet_point)) }} P</span>
          <span class="details">포인트내역</span>
        </div>
        <div class="logout" @click="logout()">
          <i class="fa-solid fa-sign-out-alt fa-lg"></i>{{ $t("header.Logout") }}
        </div>
      </div>      
    </div>
  </div>
  <div class="division" v-if="route.name.includes('partner-')"></div>
</template>
  
<script lang="ts">
  import { defineComponent, ref, computed} from "vue";
  import { useI18n } from "vue-i18n";
  import { useAppStore } from "@/stores/app";
  import { useRoute, useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/auth";
  import Swal from "sweetalert2";

  export default defineComponent({
    name: "PartnerHeader",
    setup() {
      const { t } = useI18n();
      const route = useRoute();
      const router = useRouter();
      const hover = ref(false);
      const authStore = useAuthStore();
      const store = useAppStore();
      const user = computed(() => authStore.user);
      const setActiveTab = (tab: string) => store.setTab(tab);
      const openModal = (modal: string) => store.openModal(modal);

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

      async function logout() {
        authStore.logout();
        router.push({ path: "/" });
      }

      return {
        route,
        hover,
        authStore,
        setActiveTab,
        user,
        openModal,
        setRouter,
        logout
      };
    },
  });
</script>