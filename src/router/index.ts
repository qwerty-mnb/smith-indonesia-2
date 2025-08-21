import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useAppStore } from "../stores/app";

const routes: Array<RouteRecordRaw> = [
  /**
   * Partner Layout
   *
   */
  {
    path: "/partner",
    name: "partner-layout",
    component: () => import("../layouts/PartnerLayout.vue"),
    children: [
      {
        path: "/partner/dashboard",
        name: "partner-dashboard",
        component: () => import("../views/partner/Dashboard.vue"),
      },
      {
        path: "/partner/members",
        name: "partner-members",
        component: () => import("../views/partner/MemberManagement.vue"),
      },
      {
        path: "/partner/members/online",
        name: "partner-online",
        component: () => import("../views/partner/MemberManagement.vue"),
      },
      {
        path: "/partner/shop-transactions",
        name: "partner-shop-transations",
        component: () => import("../views/partner/ShopTransactions.vue"),
      },
      {
        path: "/partner/bet-history",
        name: "partner-bet-history",
        component: () => import("../views/partner/BetHistory.vue"),
      },
      {
        path: "/partner/charge-record",
        name: "partner-charge-record",
        component: () => import("../views/partner/DepWidHistory.vue"),
      },
      {
        path: "/partner/game-stats",
        name: "partner-game-stats",
        component: () => import("../views/partner/GameStatistics.vue"),
      },
      {
        path: "/partner/settlements",
        name: "partner-settlements",
        component: () => import("../views/partner/Settlement.vue"),
      },
      {
        path: "/partner/settlements/request",
        name: "partner-settlements-request",
        component: () => import("../views/partner/SettlementRequest.vue"),
      },
    ],
  },
  /**
   * Main Layout
   *
   */
  {
    path: "/",
    name: "main-layout",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "main-page",
        component: () => import("../views/MainHome.vue"),
      },
      {
        path: "/transaction",
        name: "transactiopn-page",
        component: () => import("../views/transaction/TransactionPanel.vue"),
      },
      {
        path: "/mypage",
        name: "my-page",
        component: () => import("../views/mypage/PointTransactionPanel.vue"),
      },
      {
        path: "/notice",
        name: "notice-page",
        component: () => import("../views/site/SitePanel.vue"),
      },
    ],
  },
  {
    path: "/auth",
    name: "auth-register",
    component: () => import("../layouts/PageLayout.vue"),
    children: [
      {
        path: "register",
        name: "register-page",
        component: () => import("../views/auth/Register.vue"),
      },
    ],
  },

  {
    path: "/account",
    name: "AccountPage",
    component: () => import("../layouts/PageLayout.vue"),
    children: [
      {
        path: "summary",
        name: "AccountSummary",
        component: () => import("../views/new/AccountSummary.vue"),
      },
      {
        path: "change-password",
        name: "ChangePassword",
        component: () => import("../views/new/AccountSummary.vue"),
      },
    ],
  },
  // Desktop routes
  // {
  //   path: "/desktop",
  //   name: "desktop-layout",
  //   component: () => import("../layouts/PageLayout.vue"),
  //   children: [
  //     {
  //       path: "account-summary",
  //       name: "desktop-account-summary",
  //       component: () => import("../views/new/AccountSummary.vue"),
  //     },
  //     {
  //       path: "deposit",
  //       name: "desktop-deposit",
  //       component: () => import("../views/transaction/new/AccountSummary.vue"),
  //     },
  //     {
  //       path: "withdrawal",
  //       name: "desktop-withdrawal",
  //       component: () => import("../views/transaction/new/AccountSummary.vue"),
  //     },
  //     {
  //       path: "referral",
  //       name: "desktop-referral",
  //       component: () => import("../views/transaction/new/AccountSummary.vue"),
  //     },
  //     {
  //       path: "password",
  //       name: "desktop-password",
  //       component: () => import("../views/transaction/new/AccountSummary.vue"),
  //     },
  //   ],
  // },
  {
    path: "/game/:provider/:code",
    name: "CasinoGame",
    component: () => import("../views/game-launch/LiveGameLaunch.vue"),
  },
  {
    path: "/slot/:provider/:game/:game_id",
    name: "SlotGame",
    component: () => import("../views/game-launch/SlotGameLaunch.vue"),
  },
  // Kplay Slot Launch
  {
    path: "/slots/:product_id/:type",
    name: "KplaySlotLaunch",
    component: () => import("../views/game-launch/KplaySlotLaunch.vue"),
  },
  // Desktop Slot Page
  // {
  //   path: "/desktop/slots/:provider/:code",
  //   name: "SlotPage",
  //   component: () => import("../views/site/SlotPage.vue"),
  // },
  // Desktop Transaction Page
  // {
  //   path: "/desktop/:type",
  //   name: "TransactionPage",
  //   component: () => import("../views/site/TransactionPage.vue"),
  // },

  {
    path: "/bet-details/:provider/:id",
    name: "BetDetails",
    component: () => import("../views/histories/BetDetail.vue"),
  },
  {
    path: "/partner/member/:memberId",
    name: "MemberPopup",
    component: () => import("../views/partner/SpecificMemberPopup.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Error404",
    component: () => import("../views/error/Error404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const appStore = useAppStore();

  // Get Site Settings
  appStore.getSettings();

  switch (to.name) {
    // Connect to Socket
    case "main-page":
    case "CasinoGame":
    case "SlotGame":
    case "SlotPage":
    case "AccountSummary":
    case "desktop-account-summary":
    case "desktop-deposit":
    case "desktop-withdrawal":
    case "desktop-referral":
    case "desktop-password":

    case "ChangePassword":
    case "MemberPopup":
      authStore.verifyAuth(true);
      next();
      break;
    // No need to connect socket but need api auth verify
    case "BetDetails":
      const authSuccess = await authStore.verifyAuth(false);
      if (authSuccess) next();
      else next({ name: "main-page" });
      break;
    // Auth routes that don't require verification
    case "auth-register":
      next();
      break;
    case "register-page":
      next();
      break;
    case "Error404":
      next();
      break;
    default:
      // verify the auth allow if authenticated; otherwise return to main-page
      const verify = await authStore.verifyAuth(true);
      if (verify) next();
      else next({ name: "main-page" });
      break;
  }
});

export default router;
