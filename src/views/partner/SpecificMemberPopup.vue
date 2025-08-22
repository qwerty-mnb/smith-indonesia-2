<template>
  <div class="info-main">
    <!-- SummaryProfile -->
    <SummaryProfile v-if="userdata" :userdata="userdata" />

    <ul class="nav nav-tabs nav-line-tabs mb-5 mt-5 fs-6 tab-btn-bg">
      <li class="nav-item">
        <a
          class="nav-link active" 
          data-bs-toggle="tab"
          href="#kt_tab_pane_1"
          @click="setActiveTab('details')"
          >{{ $t("Partner.Tab.Details") }}</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link "
          data-bs-toggle="tab"
          href="#kt_tab_pane_2"
          @click="setActiveTab('bethistory')"
          >{{ $t("header.BetHistory") }}</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link "
          data-bs-toggle="tab"
          href="#kt_tab_pane_3"
          @click="setActiveTab('rate')"
          >{{ $t("Partner.Tab.RateSettings") }}</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link "
          data-bs-toggle="tab"
          href="#kt_tab_pane_4"
          @click="setActiveTab('coupon')"
          >{{ $t("coupon.Title") }}</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link "
          data-bs-toggle="tab"
          href="#kt_tab_pane_5"
          @click="setActiveTab('transaction')"
          >{{ $t("Partner.Tab.TransactionHistory") }}</a
        >
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane fade show active mt-5 ml-2 mr-2" id="kt_tab_pane_1" role="tabpanel">
        <Details
          :member_id="$route.params.memberId"
          v-if="activeTab === 'details'"
        />
      </div>
      <div class="tab-pane fade mt-3" id="kt_tab_pane_2" role="tabpanel">
        <BetHistory
          :member_id="$route.params.memberId"
          v-if="activeTab === 'bethistory'"
        />
      </div>
      <div class="tab-pane fade ml-2 mr-3 mb-2" id="kt_tab_pane_3" role="tabpanel">
        <RateSettings
          :member_id="$route.params.memberId"
          :userdata="userdata"
          v-if="activeTab === 'rate' && userdata"
          @refresh="getData"
        />
      </div>
      <div class="tab-pane fade mt-5 ml-2 mr-2" id="kt_tab_pane_4" role="tabpanel">
        <Coupons
          :member_id="$route.params.memberId"
          v-if="activeTab === 'coupon'"
        />
      </div>
      <div class="tab-pane fade mt-3" id="kt_tab_pane_5" role="tabpanel">
        <DepWidHistory
          :member_id="$route.params.memberId"
          v-if="activeTab === 'transaction'"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ApiService from "@/services/ApiService";
import SummaryProfile from "@/views/partner/profile/SummaryProfile.vue";
import Details from "@/views/partner/profile/Details.vue";
import BetHistory from "@/views/partner/profile/BetHistory.vue";
import RateSettings from "@/views/partner/profile/RateSettings.vue";
import Coupons from "@/views/partner/profile/Coupons.vue";
import DepWidHistory from "@/views/partner/DepWidHistory.vue";

interface IMember {
  id: string;
  username: string;
  status: number;
  rate: number;
  difference: string;
  money: number;
  point: number;
  comp: number;
  total_deposit: number;
  total_withdrawal: number;
  total_depwid: number;
  nickname: string;
  telno: number;
}

export default defineComponent({
  name: "SpecificMemberPopup",
  components: {
    SummaryProfile,
    Details,
    BetHistory,
    RateSettings,
    Coupons,
    DepWidHistory,
  },
  setup() {
    // vue variables
    const route = useRoute();
    // table variables
    const activeTab = ref("details");
    const userdata: any = ref<IMember>();

    /**
     * Set Active Tab
     *
     */
    const setActiveTab = (tab: string) => {
      activeTab.value = tab;
    };

    /**
     * Get info
     *
     */
    const getData = async () => {
      userdata.value = await ApiService.get(
        `/partner/member/info/${route.params.memberId}`
      ).then((res) => res.data);
    };

    /**
     * On Mounted
     *
     */
    onMounted(() => getData());

    return {
      userdata,
      activeTab,
      setActiveTab,
      getData
    };
  },
});
</script>
<style>
.info-main {
  /* background-color: black !important; */
  /* background-image: url(/img/bg/partner-bg.webp); */
  background-position: center 0;
  background-size: cover;
  padding: 1.5em;
  margin-top: 2px;
  max-width: 80%;
  margin: auto;
}

.info-main ul {
  margin-bottom: 0 !important;
}

.tab-content {
  border: 1px solid #262626;
  background-color: rgba(26, 26, 28, 0.8) !important;
}

.nav-tabs .nav-link {
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
}

.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    background-color: unset !important;
    border-bottom-width: 1px !important;
    background-color: none !important;
    color:white !important
}

</style>