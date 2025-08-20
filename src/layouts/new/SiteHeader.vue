<template>
  <div class="site-header h-[96px]" bis_skin_checked="1">
    <div class="container" bis_skin_checked="1">
      <div class="row" bis_skin_checked="1">
        <div class="col-sm-3 col-md-3" bis_skin_checked="1">
          <a
            href="/desktop/home"
            class="logo"
            style="
              background-image: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/logo-background.png?v=20250529);
            "
          >
            <img
              alt="Logo"
              loading="lazy"
              src="https://api2-bd3.imgnxa.com/images/r96QGwANso/logo_bbd08d87-902a-45a6-992b-bb22d082eff6_1753926985993.png"
            />
          </a>
        </div>
        <div class="col-sm-9 col-md-9" bis_skin_checked="1">
          <ul
            class="top-menu"
            style="
              --separator-src: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/layout/vertical-seperator.png?v=20250529);
            "
          >
            <li
              v-for="menuItem in headerMenu"
              :key="menuItem.id"
              :data-active="menuItem.active"
            >
              <a :href="menuItem.href">
                <img
                  :alt="menuItem.alt"
                  height="30"
                  loading="lazy"
                  :src="menuItem.icon"
                  :style="
                    menuItem.activeIcon ? `--image-src: url(${menuItem.activeIcon});` : ''
                  "
                  width="30"
                />
                {{ menuItem.text }}
              </a>

              <!-- Game List Dropdown for Hot Games -->
              <ul
                v-if="menuItem.games && menuItem.games.length > 0"
                class="game-list"
                style="--maintenance-text: 'Pemeliharaan'"
              >
                <li v-for="game in menuItem.games" :key="game.id">
                <!-- {{  game.code }} -->
                  <a :href="`/slots/${game.code}`">
                    <div class="background" bis_skin_checked="1"></div>
                    <div
                      class="foreground"
                      :style="`background-image: url(/img/new/slots/${game.code}.webp);`"
                      bis_skin_checked="1"
                    ></div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useGamesStore } from '@/stores/games';
const gamesStore = useGamesStore();
    
// Access games data
const slotGames = computed(() => gamesStore.getSlotGames);
const isLoading = computed(() => gamesStore.getIsLoading);
    
  // Fetch games if needed
  onMounted(async () => {
    // Fetch games if not already loaded
    if (gamesStore.getAllGames.length === 0) {
      await gamesStore.fetchGames();
    }
  });

const headerMenu = ref([
  {
    id: "hot-games",
    text: "Hot Games",
    href: "/desktop/hot-games",
    alt: "Hot Games",
    icon: "/img/new/icons/hot-games.svg",
    activeIcon: "/img/new/icons/hot-games-active.svg",
    active: false,
    games: computed(() => slotGames.value.filter((game) => game.code === "H_PPS" || game.code === "H_JILI" || game.code === "H_PGS"))
  },
  {
    id: "slots",
    text: "Slots",
    href: "/desktop/slots",
    alt: "Slots",
    icon: "/img/new/icons/slots.svg",
    activeIcon: "/img/new/icons/slots-active.svg",
    active: false,
    games: slotGames
  },
  {
    id: "live-casino",
    text: "Live Casino",
    href: "/desktop/live-casino",
    alt: "Live Casino",
    icon: "/img/new/icons/casino.svg",
    activeIcon: "/img/new/icons/casino-active.svg",
    active: false,
  },
  {
    id: "togel",
    text: "Togel",
    href: "/desktop/togel",
    alt: "Togel",
    icon: "/img/new/icons/others.svg",
    activeIcon: "/img/new/icons/others-active.svg",
    active: false,
  },
  {
    id: "sports",
    text: "Olahraga",
    href: "/desktop/sports",
    alt: "Sports",
    icon: "/img/new/icons/sports.svg",
    activeIcon: "/img/new/icons/sports-active.svg",
    active: false,
  },
  {
    id: "crash-games",
    text: "Crash Game",
    href: "/desktop/crash-games",
    alt: "Crash Games",
    icon: "/img/new/icons/crash-game.svg",
    activeIcon: "/img/new/icons/crash-game-active.svg",
    active: false,
  },
  {
    id: "arcade",
    text: "Arcade",
    href: "/desktop/arcade",
    alt: "Arcade",
    icon: "/img/new/icons/arcade.svg",
    activeIcon: "/img/new/icons/arcade-active.svg",
    active: false,
  },
  {
    id: "poker",
    text: "Poker",
    href: "/desktop/poker",
    alt: "Poker",
    icon: "/img/new/icons/poker.svg",
    activeIcon: "/img/new/icons/poker-active.svg",
    active: false,
  },
  {
    id: "e-sports",
    text: "E-Sports",
    href: "/desktop/e-sports",
    alt: "E-Sports",
    icon: "/img/new/icons/e-sports.svg",
    activeIcon: "/img/new/icons/e-sports-active.svg",
    active: false,
  },
  {
    id: "cockfight",
    text: "Sabung Ayam",
    href: "/desktop/cockfight",
    alt: "Sabung Ayam",
    icon: "/img/new/icons/cockfight.svg",
    activeIcon: "/img/new/icons/cockfight-active.svg",
    active: false,
  },
  {
    id: "promotion",
    text: "Promosi",
    href: "/desktop/promotion",
    alt: "Promotion",
    icon: "/img/new/icons/promotion.svg",
    activeIcon: "/img/new/icons/promotion-active.svg",
    active: false,
  },
]);
</script>

<style lang="scss" scoped></style>
