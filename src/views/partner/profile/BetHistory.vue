<template>
  <div class="d-flex flex-column flex-root banner-top wrapper-img-container-partner">
    <!-- Tabs -->
    <ul class="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-5 pb-4">
      <!-- Casino -->
      <li class="nav-item">
        <a
          class="nav-link active"
          data-bs-toggle="tab"
          href="#kt_tab_casino"
          @click="setActiveTab('casino')"
          >{{ $t("Partner.Casino") }}</a
        >
      </li>
      <!-- Slot -->
      <li class="nav-item">
        <a
          class="nav-link"
          data-bs-toggle="tab"
          href="#kt_tab_slot"
          @click="setActiveTab('slot')"
          >{{ $t("Partner.Slot") }}</a
        >
      </li>
      <!-- Hotel -->
      <li class="nav-item">
        <a
          class="nav-link"
          data-bs-toggle="tab"
          href="#kt_tab_hotel"
          @click="setActiveTab('hotel')"
          >{{ $t("Partner.Hotel") }}</a
        >
      </li>
      <!-- Sport -->
      <li class="nav-item">
        <a
          class="nav-link"
          data-bs-toggle="tab"
          href="#kt_tab_sport"
          @click="setActiveTab('sport')"
          >{{ $t("Partner.Sport") }}</a
        >
      </li>
    </ul>
    <!-- Tab Panes -->
    <div class="tab-content">
      <!-- Casino -->
      <div class="tab-pane active" id="kt_tab_casino" role="tabpanel">
        <GameBetHistory
          :memberId="$route.params.memberId"
          v-if="activeTab === 'casino'"
          game="CASINO"
        />
      </div>
      <!-- Slot -->
      <div class="tab-pane active" id="kt_tab_slot" role="tabpanel">
        <GameBetHistory
          :memberId="$route.params.memberId"
          v-if="activeTab === 'slot'"
          game="SLOT"
        />
      </div>
      <!-- Hotel -->
      <div class="tab-pane active" id="kt_tab_hotel" role="tabpanel">
        <GameBetHistory
          :memberId="$route.params.memberId"
          v-if="activeTab === 'hotel'"
          game="HOTEL"
        />
      </div>
      <!-- Sport -->
      <div class="tab-pane active" id="kt_tab_sport" role="tabpanel">
        <GameBetHistory
          :memberId="$route.params.memberId"
          v-if="activeTab === 'sport'"
          game="SPORT"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import GameBetHistory from "@/components/partner/bet-history/GameBetHistory.vue";

export default defineComponent({
  name: "BetHistory",
  components: {
    GameBetHistory,
  },
  setup() {
    const activeTab = ref("casino");
    const setActiveTab = (tab: string) => (activeTab.value = tab);

    return {
      activeTab,
      setActiveTab,
    };
  },
});
</script>