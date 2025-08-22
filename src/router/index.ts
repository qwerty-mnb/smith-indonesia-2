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
  // {
  //   path: "/account",
  //   name: "AccountPage",
  //   component: () => import("../layouts/PageLayout.vue"),
  //   children: [
  //     {
  //       path: "summary",
  //       name: "AccountSummary",
  //       component: () => import("../views/new/AccountSummary.vue"),
  //     },
  //     {
  //       path: "change-password",
  //       name: "ChangePassword",
  //       component: () => import("../views/new/AccountSummary.vue"),
  //     },
  //   ],
  // },
  {
    path: "/account/:type",
    name: "AccountPage",
    component: () => import("../layouts/PageLayout.vue"),
    children: [
      {
        path: "",
        name: "AccountSummary",
        component: () => import("../views/new/AccountSummary.vue"),
      },
    ],
  },
  {
    path: "/transactions/:type",
    name: "TransactionPage",
    component: () => import("../layouts/PageLayout.vue"),
    children: [
      {
        path: "",
        name: "Transactions",
        component: () => import("../views/new/Transactions.vue"),
      },
    ],
  },
  {
    path: "/inquiries/:type",
    name: "InquiriesPage",
    component: () => import("../layouts/PageLayout.vue"),
    children: [
      {
        path: "",
        name: "Inquiries",
        component: () => import("../views/new/Messages.vue"),
      },
    ],
  },
  {
    path: "/announcements",
    name: "AnnouncementsPage",
    component: () => import("../layouts/PageLayout.vue"),
    children: [
      {
        path: "",
        name: "Announcements",
        component: () => import("../views/new/Messages.vue"),
      },
    ],
  },
  {
    path: "/point/:type",
    name: "PointPage",
    component: () => import("../layouts/PageLayout.vue"),
    children: [
      {
        path: "",
        name: "Point",
        component: () => import("../views/new/PointPanel.vue"),
      },
    ],
  },
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
  {
    path: "/desktop/slots/:provider/:code",
    name: "SlotPage",
    component: () => import("../views/site/SlotPage.vue"),
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

  // Check if user is trying to logout (going to main page after logout)
  if (to.name === "main-page" && !authStore.isAuthenticated) {
    // Allow access to main page without authentication
    next();
    return;
  }

  switch (to.name) {
    // Connect to Socket
    case "main-page":
      // For main page, only verify auth if user is authenticated
      if (authStore.isAuthenticated) {
        authStore.verifyAuth(true);
      }
      next();
      break;
    case "CasinoGame":
    case "SlotGame":
    case "SlotPage":
    case "AccountSummary":
    case "AccountPage":
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
