<template>
  <div class="d-flex flex-column flex-root ratesettings-tab">
    <div class="row">
      <div class="col-md-12">
        <form class="mt-2">
          <KTDatatable
            :tableHeader="tableHeaders"
            v-if="tableData"
            :tableData="tableData"
            :rowsPerPage="50"
          >
            <!-- Point type -->
            <template v-slot:cell-point_type="{ row: data }">
              <div class="text-center">
                {{ data.point_type === 1 ? "단폴" : "다폴" }}
              </div>
            </template>

            <!-- Rolling Type -->
            <template v-slot:cell-type_rolling="{}">
              <div class="text-center">
                {{ $t("Partner.RollingType." + userdata.type_roll) }}
              </div>
            </template>

            <!-- Losing -->
            <template v-slot:cell-losing="{ row: data }">
              <div class="text-center">
                <span>{{ data.losing }}% </span>
                <input
                  v-if="authStore.user.id !== member_id"
                  class="form_control text-center"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  v-model="rates.losing[data.idx]"
                  style="width: 9em"
                />
              </div>
            </template>

            <!-- Rolling -->
            <template v-slot:cell-rolling="{ row: data }">
              <div class="text-center">
                <input
                  :readonly="authStore.user.id === member_id"
                  class="form_control text-center"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  v-model="rates.rolling[data.idx]"
                  style="width: 9em"
                />
              </div>
            </template>
          </KTDatatable>
          <button
            v-if="authStore.user.id !== member_id"
            type="button"
            class="btn-black3 btn-submit mt-0 float-right"
            @click="updateRate"
          >
            {{ $t("Partner.ChangeRate") }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
import ApiService from "@/services/ApiService";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import DateRangePicker from "@/components/kt-date/DateRangePicker.vue";

interface IData {
  idx: number;
  game_name: string;
  point_type: number;
  no: string;
  losing: number;
  rolling: number;
}

export default defineComponent({
  name: "RateSettings",
  components: {
    KTDatatable,
    DateRangePicker,
  },
  props: {
    member_id: {
      type: String,
      required: true,
    },
    userdata: {
      type: Object,
      required: true,
    },
  },
  emits: ["refresh"],
  setup(props, { emit }) {
    // vue variables
    const { t } = useI18n();
    const authStore = useAuthStore();

    const tableData: any = ref<Array<IData>>();

    
    watch(
      () => props.userdata,
      () => {
        setTableData()
      },
      {deep: true}
    );


    const setTableData = () => {
      tableData.value = [
      {
        idx: 0,
        game_name: t("header.Casino"),
        point_type: 1,
        no: "#1",
        losing: props.userdata.pct_lose_casino,
        rolling: props.userdata.pct_roll_casino,
      },
      {
        idx: 1,
        game_name: t("header.Slot"),
        point_type: 2,
        no: "#2",
        losing: props.userdata.pct_lose_slot,
        rolling: props.userdata.pct_roll_slot,
      },
      {
        idx: 2,
        game_name: t("header.Hotel"),
        point_type: 3,
        no: "#3",
        losing: props.userdata.pct_lose_hotel,
        rolling: props.userdata.pct_roll_hotel,
      },
      // {
      //   idx: 3,
      //   game_name: t("header.Sport"),
      //   point_type: 4,
      //   no: "#4",
      //   losing: props.userdata.pct_lose_sport,
      //   rolling: props.userdata.pct_roll_sport,
      // },
    ]
    }

    const tableHeaders = [
      { key: "game_name", name: t("Partner.Game"), text: true },
      {
        key: "point_type",
        name: t("Partner.Points"),
        customslot: true,
      },
      { key: "no", name: "#", text: true },
      {
        key: "type_rolling",
        name: t("Commission.TypeRolling"),
        customslot: true,
      },
      { key: "rolling", name: t("Partner.Rolling"), customslot: true },
    ];

    const rates = ref({
      rolling: [
            props.userdata.pct_roll_casino, 
            props.userdata.pct_roll_slot, 
            props.userdata.pct_roll_hotel, 
            props.userdata.pct_roll_sport
      ],
      losing: [0, 0, 0, 0],
    });

    /**
     * Update Rate
     *
     */
    const updateRate = async () => {
      if (rates.value.rolling[0] < 0) {
        Swal.fire(t("Partner.ChangeRate"), t("INVALID_RATE"), "error");
      }
      if (rates.value.rolling[1] < 0) {
        Swal.fire(t("Partner.ChangeRate"), t("INVALID_RATE"), "error");
      }
      if (rates.value.losing[0] < 0) {
        Swal.fire(t("Partner.ChangeRate"), t("INVALID_RATE"), "error");
      }
      if (rates.value.losing[1] < 0) {
        Swal.fire(t("Partner.ChangeRate"), t("INVALID_RATE"), "error");
      }
      await ApiService.patch(`/partner/member/rate/${props.member_id}`, {
        pct_roll_casino: rates.value.rolling[0],
        pct_roll_slot: rates.value.rolling[1],
        pct_lose_casino: rates.value.losing[0],
        pct_lose_slot: rates.value.losing[1],

        pct_roll_hotel: rates.value.rolling[2],
        pct_roll_sport:0,
        pct_lose_hotel: rates.value.losing[2],
        pct_lose_sport: 0,
      })
        .then(() => {
          Swal.fire(
            t("Partner.ChangeRate"),
            t("Partner.ChangeRateSuccess"),
            "success"
          );
          setTimeout(() => {
            emit("refresh");
          }, 1000);
        }

        )
        .catch((e) =>
          Swal.fire(
            t("Partner.ChangeRate"),
            t("Partner." + e.response.data.message),
            "error"
          )
        );

    };

    onMounted(() => {
      setTableData()
    });

    return {
      tableHeaders,
      tableData,
      rates,
      updateRate,
      authStore,
    };
  },
});
</script>

<style scoped>
button {
  border-radius: 5px !important;
}
</style>