<template>
  <!-- Category -->
  <section class="toggle-section">
    <div
      class="container dflex-ac-jc"
      style="width: 100% !important; max-width: 91% !important"
    >
      <!-- Live -->
      <button
        class="toggle-btn casino-toggle"
        v-if="games.casinoGames.length > 0"
        :class="{ active: activeTab === 'SnowLive' }"
        @click="setActiveTab('SnowLive')"
      >
        <div class="btn-panel dflex-ac-js w-ba ml-auto">
          <span class="category">{{ $t("nav.LiveCasino") }}</span>
          <i class="fa-solid fa-caret-down indicator ml-md-3 ml-1"></i>
        </div>
      </button>
      <!-- Snowplay Slot -->
      <button
        class="toggle-btn slot-toggle"
        v-if="games.slotGames.length > 0"
        :class="{ active: activeTab === 'SnowSlot' }"
        @click="setActiveTab('SnowSlot')"
      >
        <div class="btn-panel dflex-ac-js w-ba ml-auto">
          <span class="category">{{ $t("nav.SlotGame") }}</span>
          <i class="fa-solid fa-caret-down indicator ml-md-3 ml-1"></i>
        </div>
      </button>
      <!-- Snowplay Sport -->
      <button
        class="toggle-btn slot-toggle"
        v-if="games.snowSport.length > 0"
        :class="{ active: activeTab === 'SnowSport' }"
        @click="setActiveTab('SnowSport')"
      >
        <div class="btn-panel dflex-ac-js w-ba ml-auto">
          <span class="category">{{ $t("nav.SportGame") }}</span>
          <i class="fa-solid fa-caret-down indicator ml-md-3 ml-1"></i>
        </div>
      </button>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useAppStore } from "@/stores/app";

export default defineComponent({
  name: "GameNavbar",
  props: {
    games: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const store = useAppStore();

    const activeTab = computed(() => store.activeTab);
    const setActiveTab = (tab: string) => store.setTab(tab);

    return {
      activeTab,
      setActiveTab,
    };
  },
});
</script>
