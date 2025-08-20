/**
 * Auth Store
 * 
 */
import { defineStore } from "pinia";
import ApiService from "../services/ApiService";
import JwtService from "../services/JwtService";
import SocketService from "../services/SocketService";

interface IMember {
  id: string;
  username: string;
  name: string;
  mobile?: number;
  level: number;
  wallet: number;
  wallet_point: number;
  wallet_game: number;
  wallet_lose_casino: number;
  wallet_lose_slot: number;
  wallet_lose_hotel: number;
  wallet_lose_sport: number;
  bank_name: string;
  bank_account_name: string;
  bank_account?: number;
  coupons: number;
  depth: number;
  shoplevel: number;
}

interface ILogin {
  username: string;
  password: string;
  captcha: number;
}

interface IRegForm {
  username: string;
  password: string;
  confirm_pass: string;
  name: string;
  mobile: number;
  bank_name: string;
  bank_account_name: string;
  bank_account: number;
  recommand: string;
  captcha: number;
}

interface ILoginResp {
  success: boolean;
  msg?: string;
}

interface ICounter {
  type: string;
  new: number;
  wait: number;
  completed: number;
}


/**
 * Create Auth Store Module
 * 
 */
export const useAuthStore = defineStore("auth", {
  /**
   * State
   * 
   */
  state: () => {
    return {
      user: {
        id: "",
        username: "",
        name: "",
        level: 0,
        wallet: 0,
        wallet_point: 0,
        wallet_game: 0,
        wallet_lose_casino: 0,
        wallet_lose_slot: 0,
        wallet_lose_hotel: 0,
        wallet_lose_sport: 0,
        bank_name: "",
        bank_account_name: "",
        coupons: 0,
        depth: 0,
        shoplevel: 0,
      } as IMember,
      inquiryCtr: 0,
      cid: "",
      cvalue: "",
    }
  },
  /**
   * Getters
   * 
   */
  getters: {
    isAuthenticated: (state) => state.user.id !== "",
  },
  /**
   * Actions
   * 
   */
  actions: {
    /**
     * Get Captcha
     *
     */
    async getCaptcha() {
      const { data } = await ApiService.get("/auth/cap");

      this.cid = data.id;
      this.cvalue = data.content;
    },
    /**
     * Login
     * 
     * @param account 
     * @returns 
     */
    async login(account: ILogin) {

      const resp: ILoginResp = await ApiService.post("/auth/login", {
        cid: this.cid,
        ...account
      })
        .then(res => {
          if (import.meta.env.DEV) JwtService.saveToken(res.data.token);
          return { success: true }
        })
        .catch((e) => {
          return {
            success: false,
            msg: e.response.data.message
          }
        });

      return resp;
    },
    /**
     * Register
     * 
     * @param regform 
     * @returns boolean, msg
     */
    async register(regform: IRegForm) {
      const resp: ILoginResp = await ApiService.post("/auth/register", {
        cid: this.cid,
        ...regform,
      })
        .then(() => {
          return {
            success: true,
          }
        }).catch(e => {
          return {
            success: false,
            msg: e.response.data.message
          }
        });
      return resp;
    },
    /**
     * Connect to Socket
     * 
     */
    async connectSocket() {
      try {
        // Get Socket Token - only if we don't already have one
        if (!SocketService.socket || !SocketService.socket.connected) {
          const { data: token } = await ApiService.get("/auth/s");
          // Connect Socket
          const rootDomain = window.location.hostname.split('.').reverse().splice(0, 2).reverse().join('.');
          const socketURL = import.meta.env.DEV ? String(import.meta.env.VITE_APP_WS) : `https://adsc.${rootDomain}`;
          SocketService.init(socketURL, String(token));
        }

        // Socket Events

        // User Info
        SocketService.socket.on("info", (member: IMember) => this.user = member);
        // Wallet
        SocketService.socket.on("wallet", (member: IMember) => {
          this.user.wallet = member.wallet;
          this.user.wallet_point = member.wallet_point;
          this.user.wallet_lose_casino = member.wallet_lose_casino;
          this.user.wallet_lose_slot = member.wallet_lose_slot;
          this.user.wallet_lose_hotel = member.wallet_lose_hotel;
          this.user.wallet_lose_sport = member.wallet_lose_sport;
        });
        // Counter Init
        SocketService.socket.on("counter_init", (data: ICounter) => {
          switch (data.type) {
            case "MEMBER_INQUIRY": {
              this.inquiryCtr = data.new;
              break;
            }
            default: break;
          }
        });
        // Counter Update
        SocketService.socket.on("counter_update", (data: ICounter) => {
          switch (data.type) {
            case "MEMBER_INQUIRY": {
              this.inquiryCtr += data.new;
              break;
            }
            default: break;
          }
        });
        // Force Logout
        SocketService.socket.on("reloaduser", () => {
          JwtService.destroyToken();
          window.location.reload();
        });

      } catch (e) {
        JwtService.destroyToken();
        window.location.reload();
      }
    },
    /**
     * Verify Authentication
     * 
     * @param needSocket 
     * @returns boolean
     */
    async verifyAuth(needSocket: Boolean) {
      if (!this.isAuthenticated) {
        // Set Header
        ApiService.setHeader();
        // Get Socket Token
        const verify = await ApiService.get("/auth/v").then(res => this.user = res.data).catch(() => false);
        if (!verify) {
          JwtService.destroyToken();
          return false;
        }

        this.user = verify
        this.user.wallet_game = Number(0);

        // Connect to Socket 
        if (needSocket) {
          await this.connectSocket();
        }
      }
      return true
    },
    /**
     * Logout
     * 
     */
    async logout() {
      try {
        await ApiService.get("/auth/logout");
      } catch (e) {
        // Ignore logout errors
      } finally {
        // Clear JWT token
        JwtService.destroyToken();
        
        // Clear any existing cookies by setting them to expire
        this.clearAuthCookies();
        
        // Reload page
        window.location.reload();
      }
    },

    /**
     * Clear authentication cookies
     * 
     */
    clearAuthCookies() {
      // Clear any token cookies by setting them to expire
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },

    /**
     * Combine Slot Money
     *
     */
    async updateWalletWithSlot() {

      const slotBalance = await ApiService.get(
        "/game/snow/money-transfer/balance"
      )
        .then((res) => Number(res.data.balance))
        .catch(() => 0);

      this.user.wallet_game = Number(slotBalance);
    },
  }

})
