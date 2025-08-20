<template>
  <div class="popular-game-title-container" bis_skin_checked="1">
  <div class="container-title" bis_skin_checked="1">
      <span>Game Yang Baru Dimainkan</span>
  </div>
  <div class="container-content" bis_skin_checked="1">
      <div class="game-list" bis_skin_checked="1">
        <div class="games-group !flex flex-row" bis_skin_checked="1">
          <div
            class="game-item"
            data-game="Sweet Bonanza Super Scatter"
            bis_skin_checked="1"
          >
                  <div class="wrapper-container" bis_skin_checked="1">
              <picture
                ><source
                  srcset="
                    //d2rzzcn1jnr24x.cloudfront.net/Images/providers/PP/vs20swbonsup.webp?v=20250529
                  "
                  type="image/webp" />
                <source
                  srcset="
                    //d2rzzcn1jnr24x.cloudfront.net/Images/providers/PP/vs20swbonsup.jpg?v=20250529
                  "
                  type="image/jpeg" />
                <img
                  alt="vs20swbonsup"
                  height="200"
                  loading="lazy"
                  src="//d2rzzcn1jnr24x.cloudfront.net/Images/providers/PP/vs20swbonsup.jpg?v=20250529"
                  width="200"
              /></picture>
                      <div class="link-container" bis_skin_checked="1">
                <a
                  href="javascript:openPopup('/dispatch/game/PP/Desktop/vs20swbonsup', 'Slots')"
                  class="play-now"
                  data-game="Sweet Bonanza Super Scatter"
                >
                              MAIN
                          </a>
                      </div>
                  </div>
                  <div class="game-name" bis_skin_checked="1">Sweet Bonanza Super Scatter</div>
              </div>
          <div class="game-item" data-game="Mahjong Ways" bis_skin_checked="1">
                  <div class="wrapper-container" bis_skin_checked="1">
              <picture
                ><source
                  srcset="
                    //d2rzzcn1jnr24x.cloudfront.net/Images/providers/PGSOFT/PGSOFT_65.webp?v=20250529
                  "
                  type="image/webp" />
                <source
                  srcset="
                    //d2rzzcn1jnr24x.cloudfront.net/Images/providers/PGSOFT/PGSOFT_65.jpg?v=20250529
                  "
                  type="image/jpeg" />
                <img
                  alt="PGSOFT_65"
                  height="200"
                  loading="lazy"
                  src="//d2rzzcn1jnr24x.cloudfront.net/Images/providers/PGSOFT/PGSOFT_65.jpg?v=20250529"
                  width="200"
              /></picture>
                      <div class="link-container" bis_skin_checked="1">
                <a
                  href="javascript:openPopup('/dispatch/game/PGSOFT/Desktop/PGSOFT_65', 'Slots')"
                  class="play-now"
                  data-game="Mahjong Ways"
                >
                              MAIN
                          </a>
                      </div>
                  </div>
            <div class="game-name" bis_skin_checked="1">Mahjong Ways</div>
              </div>
      </div>
  </div>
</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "PopularGames",
  setup() {
    const popularGames = ref([
      {
        id: 1,
        name: "Sweet Bonanza Super Scatter",
        badges: [{ text: "EKSKLUSIF", type: "exclusive" }],
      },
      {
        id: 2,
        name: "Mahjong Wins 3 - Black Scatter",
        badges: [{ text: "VIRAL", type: "viral" }],
      },
      {
        id: 3,
        name: "Sticky Bandits Thunder Rail",
        subText: "playtech",
      },
      {
        id: 4,
        name: "Le Viking",
      },
      {
        id: 5,
        name: "Mahjong Ways 2",
      },
      {
        id: 6,
        name: "Wild Bounty Showdown",
        badges: [{ text: "DOUBLE MULTIPLIERS 5,000X", type: "multiplier" }],
      },
      {
        id: 7,
        name: "Nexus",
        badges: [{ text: "JACKPOT Race", type: "multiplier" }],
      },
      {
        id: 8,
        name: "Mahjong Ways",
      },
      {
        id: 9,
        name: "Wukong - Black Scatter",
        badges: [{ text: "EKSKLUSIF", type: "exclusive" }],
      },
      {
        id: 10,
        name: "Bang Gacor 1000",
        badges: [{ text: "EKSKLUSIF", type: "exclusive" }],
      },
      {
        id: 11,
        name: "Fortune Gems",
        badges: [
          { text: "375X", type: "multiplier" },
          { text: "JILI", type: "provider" },
        ],
      },
      {
        id: 12,
        name: "Gates of Olympus Super Scatter",
        badges: [{ text: "NEW", type: "new" }],
      },
      {
        id: 13,
        name: "Lucky Twins Nexus",
        subText: "SPIN RUSH",
      },
      {
        id: 14,
        name: "The Crypt",
      },
    ]);

    return {
      popularGames,
    };
  },
});
</script>
