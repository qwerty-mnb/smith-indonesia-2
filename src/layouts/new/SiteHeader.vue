<template>
  <div class="site-header h-[96px]" bis_skin_checked="1">
    <div class="container" bis_skin_checked="1">
      <div class="row" bis_skin_checked="1">
        <div class="col-sm-3 col-md-3" bis_skin_checked="1">
          <a
            href="/"
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
        <div
          class="col-sm-9 col-md-9"
          bis_skin_checked="1"
        >
          <!-- <i class="fas fa-angle-left"></i> -->
          <div class="menu-slide" id="menu_slides" bis_skin_checked="1">
            <i class="glyphicon glyphicon-chevron-left left_trigger text-[#adbed2]"></i>
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
              <a :href="getMenuHref(menuItem)" @click="handleMenuClick(menuItem)">
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

              <ul
                v-if="menuItem.games && menuItem.games.length > 0"
                class="game-list"
                style="--maintenance-text: 'Pemeliharaan'"
              >
                <li v-for="game in menuItem.games" :key="game.id">
                  <a @click="handleGameClick(game)">
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
            <i class="glyphicon glyphicon-chevron-right right_trigger text-[#adbed2]"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useGamesStore } from "@/stores/games";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";


const authStore = useAuthStore();
const { t } = useI18n();
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
    title: "Coming Soon!",
    text: `${menuName} will be available soon.`,
    icon: "info",
    confirmButtonText: "OK",
    confirmButtonColor: "#3085d6",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    customClass: {
      title: "swal-title-large",
      popup: "swal-popup-large",
    },
  });
};

// Navigation scroll functions
const scrollLeft = () => {
  const menu = document.querySelector(".top-menu");
  if (menu) {
    menu.scrollLeft -= 200;
  }
};

const scrollRight = () => {
  const menu = document.querySelector(".top-menu");
  if (menu) {
    menu.scrollLeft += 200;
  }
};

const headerMenu = ref([
  {
    id: "hot-games",
    text: "Hot Games",
    href: "javascript:void(0)",
    alt: "Hot Games",
    icon: "/img/new/icons/hot-games.svg",
    activeIcon: "/img/new/icons/hot-games-active.svg",
    active: false,
    games: computed(() => {
      const allowedCodes = ["H_PPS", "H_JILI", "H_PGS"];
      return slotGames.value.filter((game) => allowedCodes.includes(game.code));
    }),
  },
  {
    id: "slot-games",
    text: "Slot Games",
    href: "javascript:void(0)",
    alt: "Slot Games",
    icon: "/img/new/icons/slots.svg",
    activeIcon: "/img/new/icons/slots-active.svg",
    active: false,
    games: slotGames,
  },
  {
    id: "live-casino",
    text: "Live Casino",
    href: "javascript:void(0)",
    alt: "Live Casino",
    icon: "/img/new/icons/casino.svg",
    activeIcon: "/img/new/icons/casino-active.svg",
    active: false,
    games: casinoGames,
  },
  {
    id: "togel",
    text: "Togel",
    href: "/desktop/togel",
    alt: "Togel",
    icon: "/img/new/icons/others.svg",
    activeIcon: "/img/new/icons/others-active.svg",
    active: false,
    onClick: () => showComingSoon("Togel"),
  },
  {
    id: "sports",
    text: "Olahraga",
    href: "/desktop/sports",
    alt: "Sports",
    icon: "/img/new/icons/sports.svg",
    activeIcon: "/img/new/icons/sports-active.svg",
    active: false,
    onClick: () => showComingSoon("Olahraga"),
  },
  {
    id: "crash-games",
    text: "Crash Game",
    href: "/desktop/crash-games",
    alt: "Crash Games",
    icon: "/img/new/icons/crash-game.svg",
    activeIcon: "/img/new/icons/crash-game-active.svg",
    active: false,
    onClick: () => showComingSoon("Crash Game"),
  },
  {
    id: "arcade",
    text: "Arcade",
    href: "/desktop/arcade",
    alt: "Arcade",
    icon: "/img/new/icons/arcade.svg",
    activeIcon: "/img/new/icons/arcade-active.svg",
    active: false,
    onClick: () => showComingSoon("Arcade"),
  },
  {
    id: "poker",
    text: "Poker",
    href: "/desktop/poker",
    alt: "Poker",
    icon: "/img/new/icons/poker.svg",
    activeIcon: "/img/new/icons/poker-active.svg",
    active: false,
    onClick: () => showComingSoon("Poker"),
  },
  {
    id: "e-sports",
    text: "E-Sports",
    href: "/desktop/e-sports",
    alt: "E-Sports",
    icon: "/img/new/icons/e-sports.svg",
    activeIcon: "/img/new/icons/e-sports-active.svg",
    active: false,
    onClick: () => showComingSoon("E-Sports"),
  },
  {
    id: "cockfight",
    text: "Sabung Ayam",
    href: "/desktop/cockfight",
    alt: "Sabung Ayam",
    icon: "/img/new/icons/cockfight.svg",
    activeIcon: "/img/new/icons/cockfight-active.svg",
    active: false,
    onClick: () => showComingSoon("Sabung Ayam"),
  },
  {
    id: "promotion",
    text: "Promosi",
    href: "/desktop/promotion",
    alt: "Promotion",
    icon: "/img/new/icons/promotion.svg",
    activeIcon: "/img/new/icons/promotion-active.svg",
    active: false,
    onClick: () => showComingSoon("Promosi"),
  },
]);

const getMenuHref = (menuItem: any) => {
  return menuItem.onClick ? "javascript:void(0)" : menuItem.href;
};

const handleMenuClick = (menuItem: any) => {
  if (menuItem.onClick && typeof menuItem.onClick === "function") {
    menuItem.onClick();
  }
};
const handleGameClick = async (game: any) => {
  if (!authStore.isAuthenticated) {
    await Swal.fire({
        icon: "warning",
        title: t("notif.Alarm"),
        text: t("notif.LoginFirst"),
        confirmButtonColor: "#FF0000",
        confirmButtonText: t("notif.Close"),
      });
      return;
  }
  if (game.type === "SLOT") {
    // Redirect to slots route for casino games
    window.location.href = `/desktop/slots/${game.provider}/${game.code}`;
  } else {
    window.open(
      `/game/${game.provider}/${game.code}`,
      "LiveWindow",
      "height=400;width=600"
    );
  }
};
</script>

<style lang="scss" scoped>
.swal2-title {
  font-size: 2.875em !important;
}

.swal2-html-container {
  font-size: 1.4em;
}

.swal2-styled.swal2-confirm {
  font-size: 1.5em;
}
</style>
