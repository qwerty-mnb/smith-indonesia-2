<template>
  <div class="d-flex flex-column flex-root bg-black text-xs">
    <!-- Date Range Picker -->
    <div class="mb-4 search-container" data-kt-customer-table-toolbar="base">
      <div class="row form-inline">
        <!-- Search -->
        <div class="col-lg-2 col-md-12 px-2 py-2">
          <select v-model="searchType" class="form-control w-100">
            <option v-for="option in searchTypes" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        <!-- Search Value -->
        <div class="col-lg-2 col-md-12 px-2 py-2">
          <input class="form-control w-100" v-model="searchValue" :placeholder="$t('SearchKeyword')" type="text" />
        </div>
        <!-- Date Range Picker -->
        <div class="col-lg-4 col-md-12 px-2 py-2">
          <DateRangePicker class="form-control w-100" initial="month" @changedate="setSelectedDate"
            style="position:relative;" />
        </div>
        <div class="col-lg-1 col-md-6 px-2 py-2">
          <button type="button" class="btn btn-black-bg text-white w-100" @click="
            setSelectedDate({
              start: moment().format('YYYY-MM-DD'),
              end: moment().format('YYYY-MM-DD'),
            })
            ">
            {{ $t("DateRange.Today") }}
          </button>
        </div>
        <div class="col-lg-1 col-md-6 px-2 py-2">
          <button type="button" class="btn btn-black-bg text-white w-100" @click="
            setSelectedDate({
              start: moment().subtract(7, 'days').format('YYYY-MM-DD'),
              end: moment().format('YYYY-MM-DD'),
            })
            ">
            {{ $t("DateRange.LastWeek") }}
          </button>
        </div>
        <div class="col-lg-1 col-md-6 px-2 py-2">
          <button type="button" class="btn btn-black-bg text-white w-100" @click="
            setSelectedDate({
              start: moment().subtract(15, 'days').format('YYYY-MM-DD'),
              end: moment().format('YYYY-MM-DD'),
            })
            ">
            {{ $t("DateRange.FifteenDays") }}
          </button>
        </div>
        <!-- Search -->
        <div class="col-lg-1 col-md-6 px-2 py-2">
          <button type="button" class="btn btn-black-bg text-white w-100" @click="getList()">
            <i class="fas fa-search" /> {{ $t("Search") }}
          </button>
        </div>
      </div>
    </div>
    <!-- Member List -->
    <div class="row">
      <div class="col-12 d-flex">
        <button type="button" class="btn btn-black-bg text-white px-5 py-2 mb-3 add-member" @click="openModal('AddSubMember')">
          <i class="fas fa-user-plus" />
          {{ $t("Partner.Tab.AddSubMember") }}
        </button>
      </div>
      <!-- Member Tree -->
      <div class="col-xl-4 col-lg-12 col-md-12 col-sm-12 px-3 py-1">
        <MemberTree />
      </div>
      <div class="col-xl-8 col-lg-12 col-md-12 col-sm-12">
        <KTDatatable :tableHeader="tableHeaders" :tableData="tableData" :rowsPerPage="50">
          <!-- Member -->
          <template v-slot:cell-member="{ row: data }">
            <span> ({{ data.nickname }})</span>
          </template>
          <!-- Level -->
          <template v-slot:cell-level="{ row: data }">
            <span>{{ $t(`Partner.Level${data.level}`) }}</span>
          </template>
          <!-- Wallet -->
          <template v-slot:cell-wallet="{ row: data }">
            <div>
              {{ $n(Number(data.wallet)) }}
            </div>
            <button type="button" class="btn btn-primary" @click="refreshWalletBalance(data.member_id)">
              <i class="fa-solid fa-refresh fa-sm"></i>
            </button>
          </template>
          <!-- Shop Transaction -->
          <template v-slot:cell-settle="{ row: data }">
            <div v-if="data.shoplevel === 0 && data.member_id !== authStore.user.id" class="d-flex">
              <button type="button" class="btn btn-primary text-settle mx-1"
                @click="onShopTransact(data.member_id, data.member, data.wallet, 'ADD')">
                <i class="fas fa-plus" aria-hidden="true"></i>
                {{ $t("Partner.Add") }}
              </button>
              <button type="button" class="btn btn-danger text-settle mx-1"
                @click="onShopTransact(data.member_id, data.member, data.wallet, 'DEDUCT')">
                <i class="fas fa-minus" aria-hidden="true"></i>
                {{ $t("Partner.Subtract") }}
              </button>
            </div>
            <div v-else />
          </template>
          <!-- Game Money Dep Wid -->
          <template v-slot:cell-game_money="{ row: data }">
            <button v-if="data.game_bal <= 0" type="button" class="btn btn-danger text-settle"
              @click="onGameMoneyWithdraw(data.member_id)">
              {{ $t("Partner.Subtract") }}
            </button>

            <div v-if="data.game_bal"> {{ $n(Number(data.game_bal)) }} </div>
          </template>
          <!-- Slot Money -->
          <template v-slot:cell-slot_money="{ row: data }">
            <div v-if="data.wallet_game > 0">
              <button type="button" class="btn btn-success text-settle mb-2" @click="slotMoney(data.member_id)">
                <i class="fa-regular fa-circle-check"></i>
                {{ $t("Partner.SlotButton") }}
              </button>
              {{ $n(Number(data.wallet_game)) }}
            </div>
            <div v-else></div>
          </template>
          <!-- Point Transfer -->
          <template v-slot:cell-point_transfer="{ row: data }">
            <div>
              <button type="button" class="btn btn-primary text-settle"
                @click="onPointTransfer(data.member_id, data.member, 'ADD')">
                <i class="fa-solid fa-arrows-left-right"></i>
                {{ $t("Partner.AddPoint") }}
              </button>
            </div>
          </template>
          <template v-slot:cell-bonus="{ }">
            <span></span>
          </template>
        </KTDatatable>
      </div>
    </div>
  </div>
  <ShopMoneyTransaction v-if="selectedModal === 'ShopMoneyTransaction'" :receiver="shop.receiver" :type="shop.type"
    @refresh="getList" />
  <PointMoneyTransfer v-if="selectedModal === 'PointMoneyTransfer'" :receiver="pointTransfer.receiver"
    :type="pointTransfer.type" @refresh="getList" />
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import moment from "moment";
import qs from "qs";
import ApiService from "@/services/ApiService";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import DateRangePicker from "@/components/kt-date/DateRangePicker.vue";
import ShopMoneyTransaction from "@/components/partner/shop/ShopMoneyTransaction.vue";
import PointMoneyTransfer from "@/components/partner/point/PointMoneyTransfer.vue";
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import MemberTree from "@/components/partner/member/MemberTree.vue";
import Swal from "sweetalert2";



interface IData {
  createdAt: string;
  deposits: number;
  last_login: string;
  level: number;
  member: string;
  member_count: number;
  member_id: string;
  nickname: string;
  payment_collection: string;
  profit: number;
  sonic: number;
  wallet: number;
  wallet_point: number;
  winamt: number;
  withdrawals: number;
  shop_add: number;
  shop_deduct: number;
}

interface DateRange {
  start: string;
  end: string;
}

export default defineComponent({
  name: "MemberList",
  components: {
    KTDatatable,
    DateRangePicker,
    ShopMoneyTransaction,
    PointMoneyTransfer,
    MemberTree,
  },
  setup() {
    // vue variables
    const { t } = useI18n();
    const appStore = useAppStore();
    const authStore = useAuthStore();
    const openModal = (modal: string) => appStore.openModal(modal);
    const setActiveTab = (tab: string) => appStore.setTab(tab);
    const selectedModal = computed(() => appStore.activeModal);
    // table variables
    const tableData: any = ref<Array<IData>>([]);
    const tableHeaders = [
      {
        key: "member_count",
        name: t("Partner.LowerUserCount"),
        text: true
      },
      {
        key: "level",
        name: t("Partner.Level"),
        customslot: true
      },
      {
        key: "member",
        name: t("Partner.Member"),
        customslot: true
      },
      {
        key: "createdAt",
        name: t("Partner.Regdate")
      },
      {
        key: "last_login",
        name: t("Partner.LastLogin"),
        text: true
      },
      {
        key: "wallet",
        name: t("Partner.Wallet"),
        currency: true,
      },
      {
        key: "wallet_point",
        name: t("Partner.WalletPoint"),
        currency: true,
      },
      {
        key: "settle",
        name: t("Partner.Settle"),
        customslot: true,
      },
      {
        key: "slot_money",
        name: t("Partner.SlotMoney"),
        customslot: true,
      },
      {
        key: "point_transfer",
        name: t("Partner.PointTransfer"),
        customslot: true,
      },
      {
        key: "deposits",
        name: t("Partner.DepAmount"),
        currency: true,
      },
      {
        key: "bonus",
        name: t("Partner.DepBonus"),
        customslot: true,
      },
      {
        key: "withdrawals",
        name: t("Partner.WidAmount"),
        currency: true,
      },
      {
        key: "sonic",
        name: t("Partner.DepWidProfit"),
        currency: true,
      },
      {
        key: "winamt",
        name: t("Partner.Winamount"),
        currency: true,
      },
      {
        key: "profit",
        name: t("Partner.BetProfit"),
        currency: true,
      },
    ];

    const searchType = ref("ID");
    const searchValue = ref("");
    const searchTypes = [
      { label: t("auth.ID"), value: "ID" },
      { label: t("Partner.Nickname"), value: "NICKNAME" },
    ];

    /**
     * Filters
     */
    let daterange = {
      start: moment().startOf("month").format("YYYY-MM-DD"),
      end: moment().format("YYYY-MM-DD"),
    };
    const setSelectedDate = (date: DateRange) => {
      daterange = date;
      getList();
    };

    /**
     * Get List
     *
     */
    const getList = async () => {
      const query = qs.stringify({
        start: daterange.start,
        end: daterange.end,
        type: searchType.value,
        typeval: searchValue.value,
      });

      const results = await ApiService.get(`/partner/members?${query}`)
        .then((res) => res.data)
        .catch(() => []);
      // add data
      tableData.value.splice(0, tableData.value.length, ...results);
      if (tableData.value.length > 0) {
        for (const row of tableData.value) {
          await new Promise(r => setTimeout(r, 100));
          const gameBalance = await ApiService.post(`/partner/member/game/balance/${row.member_id}`, {})
            .then((res) => res.data.balance)
          row.game_bal = gameBalance;
        }
      }
    };

    const slotMoney = async (memberId: string) => {
      await ApiService.post(`/partner/member/game/withdrawal/${memberId}`, {})
        .then(() => {
          Swal.fire(
            t(`Partner.SlotMoney`),
            t("notif.StoreMoneySuccess"),
            "success"
          );
          getList();
        })
        .catch((e) =>
          Swal.fire(
            t(`Partner.SlotMoney`),
            t(`notif.${e.response.data.message}`),
            "error"
          )
        );
    }

    const refreshWalletBalance = async (member_id: string) => {
      if (tableData.value.length > 0) {
        for (const row of tableData.value) {
          if (row.member_id === member_id) {
            const balance = await ApiService.get(`/partner/member/game/balance/${row.member_id}`)
            .then((res) => res.data.balance)

            if(balance !== 0) {
              row.wallet = balance;
            }
          }
        }
      }
    }

    const shop = ref({ receiver: { id: "", username: "", wallet: "" }, type: "" });
    const onShopTransact = (memberId: string, member: string, wallet: string, type: string) => {
      shop.value.receiver = { id: memberId, username: member, wallet: wallet };
      shop.value.type = type;

      openModal("ShopMoneyTransaction");
    };

    /**
     * Point Transfer
     *
     */
    const pointTransfer = ref({ receiver: { id: "", username: "" }, type: "" });
    const onPointTransfer = (memberId: string, member: string, type: string) => {
      pointTransfer.value.receiver = { id: memberId, username: member };
      pointTransfer.value.type = type;

      openModal("PointMoneyTransfer");
    };

    const onGameMoneyWithdraw = async (memberId: string) => {
      await ApiService.post(`/partner/member/game/withdrawal/${memberId}`, {
      })
        .then(() =>
          Swal.fire(
            t("Partner.GameWid"),
            t("notif.GameWidSuccess"),
            "success"
          )
        )
        .catch((e) =>
          Swal.fire(
            t("Partner.GameWid"),
            t("notif.GameWidFail"),
            "error"
          )
        );
    }

    return {
      tableHeaders,
      tableData,
      searchType,
      searchTypes,
      searchValue,
      // Date Picker
      setSelectedDate,
      setActiveTab,
      daterange,
      openModal,
      selectedModal,
      getList,
      moment,
      // Shop Transaction
      onShopTransact,
      shop,
      // Point Transfer
      onPointTransfer,
      pointTransfer,
      authStore,
      onGameMoneyWithdraw,
      refreshWalletBalance,
      slotMoney
    };
  },
});
</script>
