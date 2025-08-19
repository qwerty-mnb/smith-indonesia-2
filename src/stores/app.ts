/**
 * App Store
 * 
 */
import { defineStore } from "pinia";
import Swal from "sweetalert2";
import i18n from "../i18n";
import { useAuthStore } from "./auth";
import ApiService from "../services/ApiService";

/**
 * Create App Store Module
 * 
 */
export const useAppStore = defineStore("app", {
  /**
   * State
   * 
  */
  state: () => {
    return {
      activeTab: "SnowLive",
      activeModal: "",
      settings: {} as unknown,
    }
  },
  /**
   * Actions
   * 
   */
  actions: {
    // Open Modal
    openModal(modal: string) {
      const authStore = useAuthStore();
      const { t } = i18n.global;
      // allow opening of login and register modal
      if (modal === 'Login' || modal === 'Register' || modal === "") return this.activeModal = modal;
      // if not authenticated, prevent open modal
      if (!authStore.isAuthenticated) return Swal.fire(t("notif.Alarm"), t("notif.LoginFirst"), "warning");
      // authenticated allow open
      this.activeModal = modal;
    },
    // Set Tab
    setTab(tab: string) {
      this.activeTab = tab;
    },
    // Get Site Settings
    async getSettings() {
      const { data } = await ApiService.get("/site");
      this.settings = data;
      document.title = "팡팡랜드"

      const authStore = useAuthStore();
      setTimeout(() => {
        if (
          this.settings.ENABLE_MONEY_TRANSFER_GAME === "true" &&
          authStore.isAuthenticated
        ) {
          authStore.updateWalletWithSlot();
          setInterval(() => authStore.updateWalletWithSlot(), 1000 * 60);
        }
      }, 2 * 1000);
    }
  }

});