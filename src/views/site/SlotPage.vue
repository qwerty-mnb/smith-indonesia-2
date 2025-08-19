<template>
  <div>
		<SiteHeader />
		<div class="relative container mx-auto px-4">
			<div class="py-6 main-content">
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
							<button class="try-btn" @click="tryGame(game)">
								<i class="fas fa-play"></i>
								TRY
							</button>
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
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';
import ApiService from '@/services/ApiService';
import GameBanner from "../site/GameBanner.vue";
import SiteHeader from "@/layouts/partials/SiteHeader.vue";
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
		SiteHeader
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { t } = useI18n();
    const authStore = useAuthStore();
    const appStore = useAppStore();

    // Reactive data
    const error = ref('');
    const gameList = ref<Game[]>([]);

    // Computed properties
    const provider = computed(() => route.params.provider as string);
    const code = computed(() => route.params.code as string);

    // Methods

    const getGameList = async () => {
      try {
        error.value = '';
				        
        const response = await ApiService.get(
          `/site/gamelists/${provider.value}/${code.value}`
        );

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
        `/slot/${provider.value}/${code.value}/${game.game.code}`,
        "SlotWindow",
        "height=400;width=600"
      );
    };

    const tryGame = (game: any) => {
      // Open game in demo/try mode
      window.open(
        `/slot/${provider.value}/${code.value}/${game.game.code}?mode=demo`,
        "SlotWindow",
        "height=400;width=600"
      );
    };

    onMounted(() => {
      getGameList();
    });

    return {
      error,
      gameList,
      provider,
      code,
      getGameList,
			openGame,
			tryGame
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
    grid-template-columns: repeat(6, 1fr) !important;
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

// Fix header overlap issue
.main-content {
  padding-top: 120px !important; // Adjust this value based on your header height
  
  @media (max-width: 768px) {
    padding-top: 100px !important; // Smaller padding on mobile
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
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.game-box:hover) {
  transform: translateY(-5px) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4) !important;
  border-color: rgba(255, 215, 0, 0.5) !important;
}

:deep(.game-thumb) {
  width: 100% !important;
  height: 160px !important; // Fixed height for consistency
  overflow: hidden !important;
  position: relative !important;
  background: #000 !important;
  border: 3px solid #8b5cf6 !important; // Purple border
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
  padding: 12px !important;
  background: linear-gradient(145deg, #2a2a3e 0%, #1e1e2e 100%) !important;
  text-align: center !important;
}

:deep(.game-info h3) {
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #ffffff !important;
  margin: 0 0 8px 0 !important;
  padding: 0 !important;
  line-height: 1.3 !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5) !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
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
