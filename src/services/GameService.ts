import ApiService from "./ApiService";
import Swal from "sweetalert2";

export interface Game {
  code: string;
  img_url: string;
  img_url_2: string;
  ko_title?: string;
  [key: string]: any;
}

export interface GameOpenResult {
  provider: string;
  game: Game;
  status: boolean;
}

/**
 * Game Service - Handles game opening logic and money transfer operations
 */
export class GameService {
  /**
   * Opens a game with money transfer logic
   * @param provider - The game provider
   * @param game - The game object
   * @param settings - Settings object containing ENABLE_MONEY_TRANSFER_GAME flag
   * @returns Promise<GameOpenResult>
   */
  static async openGame(
    provider: string,
    game: Game,
    settings: any,
    authStore: any,
    t: (key: string) => string
  ): Promise<GameOpenResult> {

    if (!authStore.isAuthenticated) {
      const result: GameOpenResult = {
        provider: provider,
        game: game,
        status: false
      };
      await Swal.fire({
        icon: "warning",
        title: t("notif.Alarm"),
        text: t("notif.LoginFirst"),
        confirmButtonColor: "#FF0000",
        confirmButtonText: t("notif.Close"),
      });
      return result;
    }


    if (settings.ENABLE_MONEY_TRANSFER_GAME === "true") {
      if (provider === "SNOW_SNOW2" || provider === "KH") {
        if (Number(authStore.user.wallet) > 0) {
          await ApiService.post(`/game/snow/money-transfer/deposit`, {
            amount: Number(authStore.user.wallet),
          }).then((res: any) => res.data).catch(() => false);
          authStore.user.wallet = 0;
        }
      } else {
        const balance = await ApiService.get(`/game/snow/money-transfer/balance`)
          .then((res) => res.data.balance);

        if (balance > 0) {
          // Withdraw
          await ApiService.post(`/game/snow/money-transfer/withdrawal`, null)
            .then((res) => res.data);
          authStore.user.wallet_game = 0;
        }
      }
    }

    return { provider, game, status: true };
  }

  /**
   * Handles money transfer deposit for specific providers
   * @param provider - The game provider
   * @param amount - Amount to deposit
   * @returns Promise<boolean>
   */
  static async handleMoneyTransferDeposit(provider: string, amount: number): Promise<boolean> {
    try {
      if (provider === "SNOW_SNOW2" || provider === "KH") {
        await ApiService.post(`/game/snow/money-transfer/deposit`, { amount });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Money transfer deposit failed:", error);
      return false;
    }
  }

  /**
   * Handles money transfer withdrawal
   * @returns Promise<boolean>
   */
  static async handleMoneyTransferWithdrawal(): Promise<boolean> {
    try {
      await ApiService.post(`/game/snow/money-transfer/withdrawal`, null);
      return true;
    } catch (error) {
      console.error("Money transfer withdrawal failed:", error);
      return false;
    }
  }

  /**
   * Gets current money transfer balance
   * @returns Promise<number>
   */
  static async getMoneyTransferBalance(): Promise<number> {
    try {
      const response = await ApiService.get(`/game/snow/money-transfer/balance`);
      return response.data.balance;
    } catch (error) {
      console.error("Failed to get money transfer balance:", error);
      return 0;
    }
  }
}
