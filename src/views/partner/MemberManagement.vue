<template>
  <div class="d-flex flex-column flex-root banner-top wrapper-img-container-partner">
    <div class="menu-gradient-partner"></div>
    <!-- Title -->
    <h3 class="text-white-title mb-5">
        <span v-if="activeTab == 'member'">{{ $t("PartnerMenu.MemberList") }}</span>
        <span v-if="activeTab == 'onlinemember'">{{ $t("PartnerMenu.MemberOnline") }}</span>
        <span v-if="activeTab == 'shoptran'">{{ $t("PartnerMenu.ShopTranHistory") }}</span>
    </h3>
    <!-- Tabs -->
    <ul class="nav nav-tabs nav-line-tabs nav-line-tabs-2x nav-set mb-5 fs-5 pb-4 tab-btn-bg">
      <!-- Member List -->
      <li class="nav-item nav-settlement-item tab-btn"
        :class="{'active': activeTab == 'member'}">
        <a
          class="nav-link nav-settlement nav-statistics"
          @click="setActiveTab('member')"
          >{{ $t("PartnerMenu.MemberList") }}</a
        >
      </li>
      <!-- Online Member -->
      <li class="nav-item nav-settlement-item"
        :class="{'active': activeTab == 'onlinemember'}">
        <a
          class="nav-link nav-settlement nav-statistics"
          @click="setActiveTab('onlinemember')"
          >{{ $t("PartnerMenu.MemberOnline") }}</a
        >
      </li>
      <!-- Shop History -->
        <li class="nav-item nav-settlement-item"
        :class="{'active': activeTab == 'shoptran'}">
        <a
          class="nav-link nav-settlement nav-statistics"
          @click="setActiveTab('shoptran')"
          >{{ $t("PartnerMenu.ShopTranHistory") }}</a
        >
      </li>
    </ul>
    <!-- Tab Panes -->
    <div class="tab-panel">
      <!-- Member List -->
      <MemberList v-if="activeTab === 'member'" />
      <!-- Online Member -->
      <OnlineMember v-if="activeTab === 'onlinemember'" />
      <!-- Shop Transactions -->
      <ShopTransactions v-if="activeTab === 'shoptran'" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted, } from "vue";
import { useAppStore } from "@/stores/app";
import MemberList from "@/views/partner/MembersList.vue";
import OnlineMember from "@/views/partner/OnlineMembers.vue";
import ShopTransactions from "@/views/partner/ShopTransactions.vue";

export default defineComponent({
  name: "MemberManagement",
  components: {
    MemberList,
    OnlineMember,
    ShopTransactions
  },
  setup() {
    const store = useAppStore();

    const activeTab = computed(() => store.activeTab);
    const setActiveTab = (tab: string) => store.setTab(tab);

    onMounted(() => {
      setActiveTab('member');
    });

    return {
      activeTab,
      setActiveTab,
    };
  },
});
</script>