import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import ApiService from '@/services/ApiService';

export interface Game {
  code: string;
  provider: string;
  type: string;
  subgames: boolean;
  sort: number;
  animationSecs: number;
  // Optional properties that might exist
  id?: string;
  name?: string;
  image?: string;
  url?: string;
  isHot?: boolean;
  isNew?: boolean;
}

export interface GamesState {
  slotGames: Game[];
  casinoGames: Game[];
  allGames: Game[];
  isLoading: boolean;
  lastUpdated: Date | null;
}

export const useGamesStore = defineStore('games', () => {
  // State
  const games = ref<GamesState>({
    slotGames: [],
    casinoGames: [],
    allGames: [],
    isLoading: false,
    lastUpdated: null
  });

  // Getters
  const getSlotGames = computed(() => games.value.slotGames);
  const getCasinoGames = computed(() => games.value.casinoGames);
  const getAllGames = computed(() => games.value.allGames);
  const getIsLoading = computed(() => games.value.isLoading);
  const getLastUpdated = computed(() => games.value.lastUpdated);

  // Helper function to set animation seconds
  const setAnimationSecs = (gameList: Game[]): Game[] => {
    return gameList.map((game, index) => ({
      ...game,
      animationSecs: index * 0.1 // 0.1 second delay between each game
    }));
  };

  // Actions
  const fetchGames = async () => {
    try {
      games.value.isLoading = true;
      
      const response = await ApiService.get("/site/games");
      const lobbies: Game[] = response.data || [];

      if (lobbies.length > 0) {
        // Filter games by type
        const slotGames = lobbies.filter((game) => game.type === "SLOT");
        const casinoGames = lobbies.filter(
          (game) => game.type === "CASINO" || game.type === "HOTEL"
        );

        // Set animation delays
        const slotGamesWithAnimation = setAnimationSecs(slotGames);
        const casinoGamesWithAnimation = setAnimationSecs(casinoGames);

        // Update state
        games.value.slotGames = slotGamesWithAnimation;
        games.value.casinoGames = casinoGamesWithAnimation;
        games.value.allGames = lobbies;
        games.value.lastUpdated = new Date();
      }
    } catch (error) {
      console.error('Error fetching games:', error);
      // Keep existing games if API fails
    } finally {
      games.value.isLoading = false;
    }
  };

  const getGameById = (id: string): Game | undefined => {
    return games.value.allGames.find(game => game.id === id);
  };

  const getGamesByProvider = (provider: string): Game[] => {
    return games.value.allGames.filter(game => game.provider === provider);
  };

  const getHotGames = (): Game[] => {
    return games.value.allGames.filter(game => game.isHot);
  };

  const getNewGames = (): Game[] => {
    return games.value.allGames.filter(game => game.isNew);
  };

  const clearGames = () => {
    games.value = {
      slotGames: [],
      casinoGames: [],
      allGames: [],
      isLoading: false,
      lastUpdated: null
    };
  };

  return {
    // State
    games,
    
    // Getters
    getSlotGames,
    getCasinoGames,
    getAllGames,
    getIsLoading,
    getLastUpdated,
    
    // Actions
    fetchGames,
    getGameById,
    getGamesByProvider,
    getHotGames,
    getNewGames,
    clearGames
  };
});
