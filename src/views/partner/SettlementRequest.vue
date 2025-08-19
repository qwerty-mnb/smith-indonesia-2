<template>
  <div class="d-flex flex-column flex-root banner-top wrapper-img-container-partner">
    <div class="menu-gradient-partner"></div>
    <!-- Title -->
    <h3 class="text-white-title mb-5">{{ $t("PartnerMenu.SettlementRequest") }}</h3>
    <!-- Tabs -->
    <ul class="nav nav-tabs nav-line-tabs nav-line-tabs-2x nav-set mb-5 fs-5 pb-4 tab-btn-bg">
      <!-- Casino -->
      <li class="nav-item nav-settlement-item"
        :class="{'active': activeTab == 'casino'}">
        <a
          class="nav-link nav-settlement"
          data-bs-toggle="tab"
          href="#kt_tab_casino"
          @click="setActiveTab('casino')"
          >{{ $t("Partner.Casino") }}</a
        >
      </li>
      <!-- Hotel -->
      <li class="nav-item nav-settlement-item"
        :class="{'active': activeTab == 'hotel'}">
        <a
          class="nav-link nav-settlement"
          data-bs-toggle="tab"
          href="#kt_tab_hotel"
          @click="setActiveTab('hotel')"
          >{{ $t("Partner.Hotel") }}</a
        >
      </li>
      <!-- Slot -->
      <li class="nav-item nav-settlement-item"
        :class="{'active': activeTab == 'slot'}">
        <a
          class="nav-link nav-settlement"
          data-bs-toggle="tab"
          href="#kt_tab_slot"
          @click="setActiveTab('slot')"
          >{{ $t("Partner.Slot") }}</a
        >
      </li>
      <!-- Sport -->
      <li class="nav-item nav-settlement-item"
        :class="{'active': activeTab == 'sport'}">
        <a
          class="nav-link nav-settlement"
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
        <SettlementRequestReport v-if="activeTab === 'casino'" game="CASINO" />
      </div>
      <!-- Hotel -->
      <div class="tab-pane active" id="kt_tab_casino" role="tabpanel">
        <SettlementRequestReport v-if="activeTab === 'hotel'" game="HOTEL" />
      </div>
      <!-- Slot -->
      <div class="tab-pane active" id="kt_tab_slot" role="tabpanel">
        <SettlementRequestReport v-if="activeTab === 'slot'" game="SLOT" />
      </div>
      <!-- Sport -->
      <div class="tab-pane active" id="kt_tab_sport" role="tabpanel">
        <SettlementRequestReport v-if="activeTab === 'sport'" game="SPORT" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import SettlementRequestReport from "@/components/partner/settlement/SettlementRequestReport.vue";

export default defineComponent({
  name: "Settlement",
  components: {
    SettlementRequestReport,
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

<style scoped>
.nav-link {
  background-color: transparent !important;
}
</style>