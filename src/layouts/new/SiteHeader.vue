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
              <a 
                :href="menuItem.onClick ? 'javascript:void(0)' : menuItem.href"
                @click="menuItem.onClick ? menuItem.onClick() : null"
              >
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
                <!-- {{  game.provider }} {{  game.code }} -->
                  <a :href="`/slots/${game.code}`">
                    <div class="background" bis_skin_checked="1"></div>
                    <div
                      class="foreground"
                      :style="`background-image: url(/img/new/${game.type}/${game.code}.webp);`"
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
import Swal from 'sweetalert2';

const gamesStore = useGamesStore();

// Get games from store
const slotGames = computed(() => gamesStore.getSlotGames);
const casinoGames = computed(() => gamesStore.getCasinoGames);

// Fetch games when component mounts
onMounted(async () => {
  // Fetch games if not already loaded
  if (gamesStore.getAllGames.length === 0) {
    await gamesStore.fetchGames();
  }
});

// Function to show coming soon alert
const showComingSoon = (menuName: string) => {
  Swal.fire({
    title: 'Coming Soon!',
    text: `${menuName} will be available soon.`,
    icon: 'info',
    confirmButtonText: 'OK',
    confirmButtonColor: '#3085d6',
    width: '60rem',        // 960px wide - much larger
    padding: '4rem',       // 64px padding for better spacing
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    customClass: {
      title: 'swal-title-large',
      popup: 'swal-popup-large'
    }
  });
};

const headerMenu = ref([
  {
    id: "hot-games",
    text: "Hot Games",
    href: "/desktop/hot-games",
    alt: "Hot Games",
    icon: "/img/new/icons/hot-games.svg",
    activeIcon: "/img/new/icons/hot-games-active.svg",
    active: false,
    games: computed(() => {
      const allowedCodes = ["H_PPS", "H_JILI", "H_PGS"];
      return slotGames.value.filter((game) => allowedCodes.includes(game.code));
    })
  },
  {
    id: "slot-games",
    text: "Slot Games",
    href: "/desktop/slot-games",
    alt: "Slot Games",
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
    games: casinoGames
  },
  {
    id: "togel",
    text: "Togel",
    href: "/desktop/togel",
    alt: "Togel",
    icon: "/img/new/icons/others.svg",
    activeIcon: "/img/new/icons/others-active.svg",
    active: false,
    onClick: () => showComingSoon("Togel")
  },
  {
    id: "sports",
    text: "Olahraga",
    href: "/desktop/sports",
    alt: "Sports",
    icon: "/img/new/icons/sports.svg",
    activeIcon: "/img/new/icons/sports-active.svg",
    active: false,
    onClick: () => showComingSoon("Olahraga")
  },
  {
    id: "crash-games",
    text: "Crash Game",
    href: "/desktop/crash-games",
    alt: "Crash Games",
    icon: "/img/new/icons/crash-game.svg",
    activeIcon: "/img/new/icons/crash-game-active.svg",
    active: false,
    onClick: () => showComingSoon("Crash Game")
  },
  {
    id: "arcade",
    text: "Arcade",
    href: "/desktop/arcade",
    alt: "Arcade",
    icon: "/img/new/icons/arcade.svg",
    activeIcon: "/img/new/icons/arcade-active.svg",
    active: false,
    onClick: () => showComingSoon("Arcade")
  },
  {
    id: "poker",
    text: "Poker",
    href: "/desktop/poker",
    alt: "Poker",
    icon: "/img/new/icons/poker.svg",
    activeIcon: "/img/new/icons/poker-active.svg",
    active: false,
    onClick: () => showComingSoon("Poker")
  },
  {
    id: "e-sports",
    text: "E-Sports",
    href: "/desktop/e-sports",
    alt: "E-Sports",
    icon: "/img/new/icons/e-sports.svg",
    activeIcon: "/img/new/icons/e-sports-active.svg",
    active: false,
    onClick: () => showComingSoon("E-Sports")
  },
  {
    id: "cockfight",
    text: "Sabung Ayam",
    href: "/desktop/cockfight",
    alt: "Sabung Ayam",
    icon: "/img/new/icons/cockfight.svg",
    activeIcon: "/img/new/icons/cockfight-active.svg",
    active: false,
    onClick: () => showComingSoon("Sabung Ayam")
  },
  {
    id: "promotion",
    text: "Promosi",
    href: "/desktop/promotion",
    alt: "Promotion",
    icon: "/img/new/icons/promotion.svg",
    activeIcon: "/img/new/icons/promotion-active.svg",
    active: false,
    onClick: () => showComingSoon("Promosi")
  },
]);
</script>

<style lang="scss" scoped>
// Custom SweetAlert2 styles for larger modal
:deep(.swal-title-large) {
  font-size: 4rem !important; // 64px title - increased from 48px
  font-weight: bold !important;
  margin-bottom: 1.5rem !important; // Increased spacing
}

:deep(.swal-popup-large) {
  min-height: 45rem !important; // 720px minimum height - increased from 640px
  font-size: 2rem !important; // 32px text - increased from 24px
  
  .swal2-content {
    font-size: 2rem !important; // 32px content text - increased from 24px
    line-height: 1.8 !important; // Better line height for larger text
  }
  
  .swal2-confirm {
    font-size: 1.75rem !important; // 28px button text - increased from 20px
    padding: 1.5rem 3rem !important; // Larger button padding
    border-radius: 0.75rem !important; // More rounded corners
    font-weight: bold !important; // Make button text bold
  }
}
</style>
