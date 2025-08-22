<template>
  <div class="popular-game-title-container">
    <div class="container-title">
      <span>Game Populer</span>
    </div>
    <div class="container-content">
      <div
        class="game-list"
        style="display: flex; flex-direction: column; gap: 20px"
      >
        <div
          v-for="(row, rowIndex) in popularGames"
          :key="rowIndex"
          style="display: flex"
        >
          <div
            v-for="game in row"
            :key="game.code"
            class="game-item"
            :data-game="game.eng_title"
          >
            <div class="wrapper-container">
              <picture>
                <source :srcset="game.img_url" type="image/webp" />
                <source :srcset="game.img_url" type="image/jpeg" />
                <img
                  :alt="game.img_url"
                  height="200"
                  loading="lazy"
                  :src="game.img_url"
                  width="200"
                />
              </picture>
              <div class="link-container">
                <a
                  href="javascript:void(0)"
                  class="play-now"
                  @click="openGame(game.provider, game)"
                >
                  MAIN
                </a>
              </div>
            </div>
            <div class="game-name">{{ game.eng_title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { GameService } from "@/services/GameService";

export default defineComponent({
  name: "PopularGames",
  setup() {
    const { t } = useI18n();
    const authStore = useAuthStore();
    const popularGames = ref([
      // First Row - 10 games
      [
        {
          code: "vs20swbonsup",
          provider: "HONORLINK",
          eng_title: "Sweet Bonanza - Super Scatter",
          img_url: "/img/new/popular_games/vs20swbonsup.png",
          gameUrl: "/slot/HONORLINK/H_PPS/vs20swbonsup",
        },
        {
          code: "vswaysmwss",
          provider: "HONORLINK",
          eng_title: "Mahjong Wins - Super Scatter",
          img_url: "/img/new/popular_games/vswaysmwss.png",
          gameUrl: "/slot/HONORLINK/H_PPS/vswaysmwss",
        },
        {
          code: "287",
          provider: "HONORLINK",
          eng_title: "Boom! Boom! Gold",
          img_url: "/img/new/popular_games/287.jpg",
          gameUrl: "/slot/HONORLINK/H_BOOONGO/287",
        },
        {
          code: "261",
          provider: "HONORLINK",
          eng_title: "Power Wilds and Multipliers",
          img_url: "/img/new/popular_games/261.jpg",
          gameUrl: "/slot/HONORLINK/H_BOOONGO/261",
        },
        {
          code: "250",
          provider: "HONORLINK",
          eng_title: "Wild Blood",
          img_url: "/img/new/popular_games/250.png",
          gameUrl: "/slot/HONORLINK/H_PNG/250",
        },
        {
          code: "293",
          provider: "HONORLINK",
          eng_title: "Easter Egg",
          img_url: "/img/new/popular_games/293.png",
          gameUrl: "/slot/HONORLINK/H_PNG/293",
        },
        {
          code: "320",
          provider: "HONORLINK",
          eng_title: "Matsuri",
          img_url: "/img/new/popular_games/320.png",
          gameUrl: "/slot/HONORLINK/H_PNG/320",
        },
        {
          code: "137",
          provider: "HONORLINK",
          eng_title: "Disco Night",
          img_url: "/img/new/popular_games/137.png",
          gameUrl: "/slot/HONORLINK/H_CQ9/137",
        },
        {
          code: "115",
          provider: "HONORLINK",
          eng_title: "Snow Queen",
          img_url: "/img/new/popular_games/115.png",
          gameUrl: "/slot/HONORLINK/H_CQ9/115",
        },
        {
          code: "209",
          provider: "HONORLINK",
          eng_title: "The Cupids",
          img_url: "/img/new/popular_games/209.png",
          gameUrl: "/slot/HONORLINK/H_CQ9/209",
        },
      ],
      // Second Row - 10 games
      [
        {
          code: "bloodsuckers2000",
          provider: "HONORLINK",
          eng_title: "Blood Suckers 2",
          img_url: "/img/new/popular_games/bloodsuckers2000.jpg",
          gameUrl: "/slot/HONORLINK/H_NET/bloodsuckers2000",
        },
        {
          code: "codexoffortune00",
          provider: "HONORLINK",
          eng_title: "Codex Of Fortune",
          img_url: "/img/new/popular_games/codexoffortune00.jpg",
          gameUrl: "/slot/HONORLINK/H_NET/codexoffortune00",
        },
        {
          code: "110003",
          provider: "HONORLINK",
          eng_title: "Talisman Of Fortune",
          img_url: "/img/new/popular_games/110003.png",
          gameUrl: "/slot/HONORLINK/H_EVOPLAY/110003",
        },
        {
          code: "110006",
          provider: "HONORLINK",
          eng_title: "Indiana Quest",
          img_url: "/img/new/popular_games/110006.png",
          gameUrl: "/slot/HONORLINK/H_EVOPLAY/110006",
        },
        {
          code: "110059",
          provider: "HONORLINK",
          eng_title: "Rise Of Horus",
          img_url: "/img/new/popular_games/110059.png",
          gameUrl: "/slot/HONORLINK/H_EVOPLAY/110059",
        },
        {
          code: "bp_wolflegendmegaways",
          provider: "HONORLINK",
          eng_title: "Wolf Legend Megaways",
          img_url: "/img/new/popular_games/bp_wolflegendmegaways.png",
          gameUrl: "/slot/HONORLINK/H_BLUE/bp_wolflegendmegaways",
        },
        {
          code: "bp_riseofatlantis94",
          provider: "HONORLINK",
          eng_title: "Rise of Altlantis 94",
          img_url: "/img/new/popular_games/bp_riseofatlantis94.png",
          gameUrl: "/slot/HONORLINK/H_BLUE/bp_riseofatlantis94",
        },
        {
          code: "bp_vikingsunleashedmegaway",
          provider: "HONORLINK",
          eng_title: "Vikings Unleashed Megaway",
          img_url: "/img/new/popular_games/bp_vikingsunleashedmegaway.png",
          gameUrl: "/slot/HONORLINK/H_BLUE/bp_vikingsunleashedmegaway",
        },
        {
          code: "mysticspells",
          provider: "HONORLINK",
          eng_title: "Mystic Spells",
          img_url: "/img/new/popular_games/mysticspells.png",
          gameUrl: "/slot/HONORLINK/H_RELAX/mysticspells",
        },
        {
          code: "abrakadabra",
          provider: "HONORLINK",
          eng_title: "Abrakadabra",
          img_url: "/img/new/popular_games/abrakadabra.png",
          gameUrl: "/slot/HONORLINK/H_RELAX/abrakadabra",
        },
      ],
    ]);

    const openGame = async (provider: string, game: any) => {
      try {
        const result = await GameService.openGame(provider, game, {
          ENABLE_MONEY_TRANSFER_GAME: "true",
        }, authStore, t);

        if (result.status) {
          window.open(`${game.gameUrl}`, "SlotWindow", "height=400;width=600");
        }
      } catch (error) {
        console.error("Error opening game:", error);
      }
    };

    return {
      openGame,
      popularGames,
    };
  },
});
</script>
