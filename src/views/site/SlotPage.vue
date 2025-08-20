<template>
  <div class="slot-page-container">
		<SiteHeader />
		
    <div class="container mx-auto px-4">
      <SlotCarousel />
    </div>

    <!-- Search Header UI -->
    <div class="search-header">
      <div class="provider-title">
        <h1>{{ $t(code) }}</h1>
      </div>
      <div class="search-navigation">
        <div class="nav-buttons">
          <button 
            class="nav-btn" 
            :class="{ active: activeFilter === 'All Games' }"
            @click="setActiveFilter('All Games')"
          >
            All Games
          </button>
          <button 
            class="nav-btn" 
            :class="{ active: activeFilter === 'Top 20' }"
            @click="setActiveFilter('Top 20')"
          >
            Top 20
          </button>
          <button 
            class="nav-btn" 
            :class="{ active: activeFilter === 'New' }"
            @click="setActiveFilter('New')"
          >
            New
          </button>
          <button 
            class="nav-btn" 
            :class="{ active: activeFilter === 'Classic' }"
            @click="setActiveFilter('Classic')"
          >
            Classic
          </button>
          <button 
            class="nav-btn" 
            :class="{ active: activeFilter === 'Bonus Buy' }"
            @click="setActiveFilter('Bonus Buy')"
          >
            Bonus Buy
          </button>
        </div>
        <div class="category-buttons">
          <button 
            class="category-btn" 
            :class="{ active: activeFilter === 'Reel Kingdom' }"
            @click="setActiveFilter('Reel Kingdom')"
          >
            Reel Kingdom
          </button>
          <button 
            class="category-btn" 
            :class="{ active: activeFilter === 'Megaways' }"
            @click="setActiveFilter('Megaways')"
          >
            Megaways
          </button>
          <button 
            class="category-btn" 
            :class="{ active: activeFilter === 'Jackpot Play Games' }"
            @click="setActiveFilter('Jackpot Play Games')"
          >
            Jackpot Play Games
          </button>
          <button 
            class="category-btn" 
            :class="{ active: activeFilter === 'Video Slots' }"
            @click="setActiveFilter('Video Slots')"
          >
            Video Slots
          </button>
        </div>
        <div class="search-box">
          <input 
            type="text" 
            placeholder="Search Games" 
            v-model="searchQuery"
            @input="handleSearch"
            class="search-input"
          />
          <i class="fas fa-search search-icon"></i>
        </div>
      </div>
    </div>

		<div class="relative container mx-auto px-4">
			<div class="p-4 main-content">
				
				<div class="responsive-game-grid">
					<div
						class="game-card-wrapper"
						v-for="(game, idx) in gameList"
						:key="idx"
					>
						<GameBanner
							:game="game"
							tag="slot-th"
							:code="code"
							:provider="provider"
							@select="openGame"
						/>
						<!-- Hover overlay buttons -->
						<div class="hover-overlay">
							<button class="play-btn" @click="openGame(game)">
								<i class="fas fa-play"></i>
								PLAY
							</button>
							<!-- <button class="try-btn" @click="tryGame(game)">
								<i class="fas fa-play"></i>
								TRY
							</button> -->
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import ApiService from '@/services/ApiService';
import GameBanner from "../site/GameBanner.vue";
import SiteHeader from "@/layouts/partials/SiteHeader.vue";
import SlotCarousel from "@/views/site/SlotCarousel.vue";
import Swal from 'sweetalert2';

interface Game {
  id?: string | number;
  name?: string;
  title?: string;
  ko_title?: string;
  image?: string;
  thumbnail?: string;
  img_url?: string;
  provider?: string;
  code?: string;
  is_new?: boolean;
  is_hot?: boolean;
  is_top?: boolean;
  jackpot?: boolean;
}

export default defineComponent({
  name: 'SlotPage',
  components: {
    GameBanner,
		SiteHeader,
		SlotCarousel
  },
  setup() {
    const route = useRoute();
    const { t } = useI18n();

    // Reactive data
    const error = ref('');
    const gameList = ref<Game[]>([]);
    const searchQuery = ref('');
    const activeFilter = ref('All Games');
    const originalGameList = ref<Game[]>([]); // Store original list for filtering

    // Computed properties
    const provider = computed(() => route.params.provider as string);
    const code = computed(() => route.params.code as string);
    const providerName = computed(() => provider.value.toUpperCase());

    // Methods

    const getGameList = async () => {
      try {
        error.value = '';
				        
        const response = await ApiService.get(
          `/site/gamelists/${provider.value}/${code.value}`
        );

        originalGameList.value = response.data;
        gameList.value = response.data;

      } catch (err: any) {
        console.error('Failed to fetch game list:', err);
        error.value = err.message || 'Failed to fetch game list';
      }
    };

    const openGame = (game: any) => {
      /*if (authStore.inquiryCtr > 0)
        return Swal.fire(
          t("CasinoWarning.Warning"),
          t("CasinoWarning.Unread"),
          "warning"
        ).then((result) => {
          if (result.value)
          router.push("/notice");
          openModal("inquiry");
        });*/

      window.open(
        `/slot/${provider.value}/${code.value}/${game.code}`,
        "SlotWindow",
        "height=400;width=600"
      );
    };

    const tryGame = (game: any) => {
      // Open game in demo/try mode
      window.open(
        `/slot/${provider.value}/${code.value}/${game.code}?mode=demo`,
        "SlotWindow",
        "height=400;width=600"
      );
    };

    const handleSearch = () => {
      applyFilters();
    };

    const setActiveFilter = (filter: string) => {
      activeFilter.value = filter;
      applyFilters();
    };

    const applyFilters = () => {
      let filteredGames = [...originalGameList.value];

      // Apply search filter
      if (searchQuery.value.trim()) {
        const searchTerm = searchQuery.value.toLowerCase().trim();
        filteredGames = filteredGames.filter(game => {
          const gameName = (game.name || game.title || game.ko_title || '').toLowerCase();
          return gameName.includes(searchTerm);
        });
      }

      // Apply category filter
      switch (activeFilter.value) {
        case 'Top 20':
          // Assuming games have a 'is_top' property or we can sort by some criteria
          filteredGames = filteredGames.filter(game => game.is_top).slice(0, 20);
          break;
        case 'New':
          filteredGames = filteredGames.filter(game => game.is_new);
          break;
        case 'Classic':
          // Filter for classic games (you might need to adjust this based on your data)
          filteredGames = filteredGames.filter(game => !game.is_new && !game.is_hot);
          break;
        case 'Bonus Buy':
          // Filter for bonus buy games (you might need to adjust this based on your data)
          filteredGames = filteredGames.filter(game => game.jackpot);
          break;
        case 'All Games':
        default:
          // No additional filtering needed
          break;
      }

      gameList.value = filteredGames;
    };

    onMounted(() => {
      getGameList();
    });

    return {
      error,
      gameList,
      provider,
      code,
      providerName,
      searchQuery,
      activeFilter,
      getGameList,
			openGame,
			tryGame,
      handleSearch,
      setActiveFilter,
      applyFilters
    };
  }
});
</script>

<style lang="scss" scoped>
// Custom responsive grid to override Bootstrap conflicts
.responsive-game-grid {
  display: grid !important;
  gap: 1rem !important;
  width: 100% !important;
  
  // Mobile: 2 columns (0-639px)
  grid-template-columns: repeat(2, 1fr) !important;
  
  // Small tablets: 3 columns (640px+)
  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr) !important;
  }
  
  // Tablets: 4 columns (768px+)
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr) !important;
  }
  
  // Small desktop: 5 columns (1024px+)
  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr) !important;
  }
  
  // Large desktop: 6 columns (1280px+)
  @media (min-width: 1280px) {
    grid-template-columns: repeat(5, 1fr) !important;
  }
  
  // Force grid items to behave properly
  > .game-card-wrapper {
    display: block !important;
    width: 100% !important;
    min-width: 0 !important; // Important for grid items
    position: relative !important;
  }
}

// Ensure container doesn't conflict
.container {
  max-width: 1400px !important;
  margin: 0 auto !important;
  padding: 0 1rem !important;
}

// Add background image to the entire page
.slot-page-container {
  min-height: 100vh;
  background-image: url('/img/bg/slots-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

// Fix header overlap issue
.main-content {
	border: 1px solid #0c1740;
	background: rgba(2, 7, 28, 0.9); // Semi-transparent to show background
  max-width: 1140px !important;
  margin: 0 auto !important;
}

// Search Header UI Styling
.search-header {
  margin-bottom: 30px;
  max-width: 1140px !important;
  margin: 0 auto !important;

  .provider-title {
    text-align: center;
    background-color: #330460;

    h1 {
      color: white;
      font-size: 24px;
      font-weight: bold;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 15px 30px;
      border-radius: 8px;
      display: inline-block;
    }
  }

  .search-navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 15px 20px;
    background: #5b1699;

    .nav-buttons {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;

      .nav-btn {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 0;
        font-weight: 500;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        min-width: 100px;

        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        &.active {
          background: linear-gradient(to right, #170826 1%, #3a036e 53%, #170826 100%);
          font-weight: bold;
        }
      }
    }

    .category-buttons {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;

      .category-btn {
        background: rgba(255, 255, 255, 0.15);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 0;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        &.active {
          background: rgba(0, 0, 0, 0.4);
          font-weight: bold;
        }
      }
    }

    .search-box {
      display: flex;
      position: relative;
      max-width: 250px;
      min-width: 200px;

      .search-input {
        width: 100%;
        padding: 10px 40px 10px 15px;
        background: #000000;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 0;
        color: white;
        font-size: 14px;

        &::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        &:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.5);
          background: rgba(0, 0, 0, 0.6);
        }
      }

      .search-icon {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(255, 255, 255, 0.7);
        pointer-events: none;
      }
    }
  }

  @media (max-width: 768px) {
    .search-navigation {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;

      .nav-buttons {
        justify-content: center;
        
        .nav-btn {
          min-width: 80px;
          padding: 8px 12px;
          font-size: 12px;
        }
      }

      .category-buttons {
        justify-content: center;
        
        .category-btn {
          padding: 6px 10px;
          font-size: 11px;
        }
      }

      .search-box {
        max-width: 100%;
      }
    }
  }
}

// Modern game card design like the reference image
:deep(.game-item-list) {
  width: 100% !important;
  height: auto !important;
  display: block !important;
}

:deep(.game-item) {
  width: 100% !important;
  height: auto !important;
}

:deep(.game-box) {
  width: 100% !important;
  height: auto !important;
  display: flex !important;
  flex-direction: column !important;
  background: linear-gradient(145deg, #2a2a3e 0%, #1e1e2e 100%) !important;
  border-radius: 0 !important;
  overflow: hidden !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3) !important;
  transition: all 0.3s ease !important;
  //border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.game-box:hover) {
  transform: translateY(-5px) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4) !important;
  border-color: rgba(255, 215, 0, 0.5) !important;
}

:deep(.game-thumb) {
  width: 100% !important;
  height: 200px !important; // Even taller images
  overflow: hidden !important;
  position: relative !important;
  background: #5b1699 !important;
  padding: 7px !important;
  box-sizing: border-box !important;
}

:deep(.game-thumb img) {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important; // Fill the container like the reference
  transition: transform 0.3s ease !important;
}

:deep(.game-box:hover .game-thumb img) {
  transform: scale(1.05) !important;
}

// Add hover overlay after the image
:deep(.game-thumb::after) {
  content: '' !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: rgba(0, 0, 0, 0.75) !important;
  opacity: 0 !important;
  transition: opacity 0.3s ease !important;
  pointer-events: none !important;
}

:deep(.game-box:hover .game-thumb::after) {
  opacity: 1 !important;
}

:deep(.game-info) {
  background: linear-gradient(145deg, #2a2a3e 0%, #1e1e2e 100%) !important;
  text-align: center !important;
}

:deep(.game-info h3) {
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #ffffff !important;
  margin: 0 !important;
  padding: 10px 12px !important;
  line-height: 1.3 !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5) !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  background: linear-gradient(to right, #170826 1%, #3a036e 53%, #170826 100%);
  border-radius: 0 !important;
}

:deep(.game-info h4) {
  display: none !important; // Hide the category text for cleaner look
}

// Hide the original play button
:deep(.btn-start) {
  display: none !important;
}

// Hover overlay with PLAY and TRY buttons
.hover-overlay {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: rgba(0, 0, 0, 0.75) !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 12px !important;
  opacity: 0 !important;
  transition: opacity 0.3s ease !important;
  border-radius: 0 !important;
  z-index: 5 !important;
}

.game-card-wrapper:hover .hover-overlay {
  opacity: 1 !important;
}

.play-btn, .try-btn {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  padding: 12px 32px !important;
  border: none !important;
  border-radius: 25px !important;
  font-weight: bold !important;
  font-size: 14px !important;
  text-transform: uppercase !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  min-width: 120px !important;
}

.play-btn {
  background: linear-gradient(45deg, #8b5cf6, #a855f7) !important;
  color: white !important;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3) !important;
}

.play-btn:hover {
  background: linear-gradient(45deg, #a855f7, #8b5cf6) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4) !important;
}

.try-btn {
  background: linear-gradient(45deg, #6b7280, #9ca3af) !important;
  color: white !important;
  box-shadow: 0 4px 15px rgba(107, 114, 128, 0.3) !important;
}

.try-btn:hover {
  background: linear-gradient(45deg, #9ca3af, #6b7280) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 20px rgba(107, 114, 128, 0.4) !important;
}

// Alternative syntax (older Vue versions)
// ::v-deep .game-info h3 {
//   /* styles here */
// }
</style>
