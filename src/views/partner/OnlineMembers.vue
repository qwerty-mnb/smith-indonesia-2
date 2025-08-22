<template>
  <div class="d-flex flex-column flex-root">
    <!-- Member List -->
    <div class="card">
      <div class="card-body m-card-body">
        <KTDatatable
          :tableHeader="tableHeaders"
          :tableData="tableData"
          :rowsPerPage="50"
        >
          <template v-slot:cell-location="{ row: data }">
            <strong
              ><a
                :href="`https://whatismyipaddress.com/ip/${data.last_ip}`"
                target="_blank"
                >{{ data.last_ip }}</a
              ></strong
            >
          </template>
        </KTDatatable>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import ApiService from "@/services/ApiService";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";

interface IData {
  last_ip: string;
  last_login: string;
  level: number;
  member: string;
  member_id: string;
  name: string;
  wallet: number;
  wallet_game: number;
  wallet_lose_casino: number;
  wallet_lose_slot: number;
  wallet_point: number;
}

export default defineComponent({
  name: "MemberOnline",
  components: {
    KTDatatable,
  },
  setup() {
    // vue variables
    const { t } = useI18n();
    // table variables
    const tableData: any = ref<Array<IData>>([]);
    const tableHeaders = [
      { key: "member", name: t("Partner.Member") },
      {
        key: "name",
        name: t("Partner.Nickname"),
        text: true,
      },
      { key: "level", name: t("Partner.Level"), text: true },
      { key: "last_login", name: t("Partner.Regdate"), text: true },
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
        key: "location",
        name: t("Partner.IP"),
        customslot: true,
      },
    ];

    /**
     * Get List
     *
     */
    const getList = async () => {
      const results = await ApiService.get(`/partner/members/online`)
        .then((res) => res.data)
        .catch(() => []);
      // add data
      tableData.value.splice(0, tableData.value.length, ...results);
    };

    /**
     * On Mounted
     *
     */
    onMounted(() => getList());
    return {
      tableHeaders,
      tableData,
    };
  },
});
</script>