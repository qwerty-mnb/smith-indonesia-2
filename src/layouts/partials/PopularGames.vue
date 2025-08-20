<template>
<div class="popular-game-title-container" bis_skin_checked="1">
  <div class="container-title" bis_skin_checked="1">
      <span>Game Populer</span>
  </div>
  <div class="container-content" bis_skin_checked="1">
      <div class="game-list" bis_skin_checked="1" style="display: flex; flex-direction: column; gap: 20px;">
        <div 
          v-for="(row, rowIndex) in popularGames" 
          :key="rowIndex"
          style="display: flex;"
          bis_skin_checked="1"
        >
          <div 
            v-for="game in row" 
            :key="game.id"
            class="game-item" 
            :data-game="game.name"
            bis_skin_checked="1"
          >
                      <div class="wrapper-container" bis_skin_checked="1">
              <picture>
                <source
                  :srcset="game.imageSrc"
                  type="image/webp" />
                <source
                  :srcset="game.imageSrc.replace('.webp', '.jpg')"
                  type="image/jpeg" />
                <img
                  :alt="game.name"
                  height="200"
                  loading="lazy"
                  :src="game.imageSrc"
                  width="200"
                />
              </picture>
                          <div class="link-container" bis_skin_checked="1">
                <a
                  :href="`javascript:openPopup('${game.gameUrl}', 'Slots')`"
                  class="play-now"
                  :data-game="game.name"
                >
                                  MAIN
                              </a>
                          </div>
                      </div>
            <div class="game-name" bis_skin_checked="1">{{ game.name }}</div>
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
      // First Row - 10 games
      [
        {
          id: 1,
          name: 'Sweet Bonanza Super Scatter',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/PP/vs20swbonsup.webp?v=20250529',
          gameUrl: '/dispatch/game/PP/Desktop/vs20swbonsup'
        },
        {
          id: 2,
          name: 'Mahjong Ways',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/PGSOFT/PGSOFT_65.webp?v=20250529',
          gameUrl: '/dispatch/game/PGSOFT/Desktop/PGSOFT_65'
        },
        {
          id: 3,
          name: 'Mahjong Wins 3 – Black Scatter',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/PP/vswaysmahwblck.webp?v=20250529',
          gameUrl: '/dispatch/game/PP/Desktop/vswaysmahwblck'
        },
        {
          id: 4,
          name: 'Wukong - Black Scatter',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/SLOT88/vswayswkngblck.webp?v=20250529',
          gameUrl: '/dispatch/game/SLOT88/Desktop/vswayswkngblck'
        },
        {
          id: 5,
          name: 'Sticky Bandits Thunder Rail',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/PLAYTECH/pop_001378cc_qsp.webp?v=20250529',
          gameUrl: '/dispatch/game/PLAYTECH/Desktop/pop_001378cc_qsp'
        },
        {
          id: 6,
          name: 'Bang Gacor 1000',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/SLOT88/vs20gacorx.webp?v=20250529',
          gameUrl: '/dispatch/game/SLOT88/Desktop/vs20gacorx'
        },
        {
          id: 7,
          name: 'Le Viking',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/HACKSAW/HACKSAW_1689.webp?v=20250529',
          gameUrl: '/dispatch/game/HACKSAW/Desktop/HACKSAW_1689'
        },
        {
          id: 8,
          name: 'Fortune Gems',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/JILI/JILI_109.webp?v=20250529',
          gameUrl: '/dispatch/game/JILI/Desktop/JILI_109'
        },
        {
          id: 9,
          name: 'Mahjong Ways 2',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/PGSOFT/PGSOFT_74.webp?v=20250529',
          gameUrl: '/dispatch/game/PGSOFT/Desktop/PGSOFT_74'
        },
        {
          id: 10,
          name: 'Gates of Olympus Super Scatter',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/PP/vs20olympgold.webp?v=20250529',
          gameUrl: '/dispatch/game/PP/Desktop/vs20olympgold'
        }
      ],
      // Second Row - 10 games
      [
        {
          id: 11,
          name: 'Wild Bounty Showdown',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/PGSOFT/PGSOFT_135.webp?v=20250529',
          gameUrl: '/dispatch/game/PGSOFT/Desktop/PGSOFT_135'
        },
        {
          id: 12,
          name: 'Lucky Twins Nexus',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/MICROGAMING/SMG_luckyTwinsNexus.webp?v=20250529',
          gameUrl: '/dispatch/game/MICROGAMING/Desktop/SMG_luckyTwinsNexus'
        },
        {
          id: 13,
          name: 'Nexus Koi Gate',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/HABANERO/SGNexusKoiGate.webp?v=20250529',
          gameUrl: '/dispatch/game/HABANERO/Desktop/SGNexusKoiGate'
        },
        {
          id: 14,
          name: 'The Crypt',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/NOLIMITCITY/thecrypt00000000.webp?v=20250529',
          gameUrl: '/dispatch/game/NOLIMITCITY/Desktop/thecrypt00000000'
        },
        {
          id: 15,
          name: 'Nexus Mahjong Jackpots',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/MICROGAMING/SMG_nexusMahjongJackpots.webp?v=20250529',
          gameUrl: '/dispatch/game/MICROGAMING/Desktop/SMG_nexusMahjongJackpots'
        },
        {
          id: 16,
          name: 'Fire in the Hole 3',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/NOLIMITCITY/fireinthehole300.webp?v=20250529',
          gameUrl: '/dispatch/game/NOLIMITCITY/Desktop/fireinthehole300'
        },
        {
          id: 17,
          name: '777 Rush',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/FATPANDA/vs5t8goldfp.webp?v=20250529',
          gameUrl: '/dispatch/game/FATPANDA/Desktop/vs5t8goldfp'
        },
        {
          id: 18,
          name: 'Hot Hot Nexus',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/HABANERO/SGHotHotNexus.webp?v=20250529',
          gameUrl: '/dispatch/game/HABANERO/Desktop/SGHotHotNexus'
        },
        {
          id: 19,
          name: 'Le Pharaoh',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/HACKSAW/HACKSAW_1562.webp?v=20250529',
          gameUrl: '/dispatch/game/HACKSAW/Desktop/HACKSAW_1562'
        },
        {
          id: 20,
          name: 'JetX',
          imageSrc: '//d2rzzcn1jnr24x.cloudfront.net/Images/providers/SMARTSOFT/JetX_JetX.webp?v=20250529',
          gameUrl: '/dispatch/game/SMARTSOFT/Desktop/JetX_JetX'
        }
      ]
    ]);

    return {
      popularGames,
    };
  },
});
</script>
