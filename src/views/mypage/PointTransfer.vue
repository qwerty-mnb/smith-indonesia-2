<template>
  <div class="point-wrapper">
    <div class="overflow-hidden">
      <div class="point-container row">
        <div class="point col-4 col-sm-5">
          <div class="title">{{ $t("point.AmountBefore") }}</div>
          <div class="point-box">
            <div class="box-container row">
              <div class="col-lg-4 col-sm-3">
                {{ $t("point.Point") }}
              </div>
              <div class="col-lg-8 col-sm-8 transaction-item">
                <input class="form-control text-right" readonly type="number" v-model="walletPoint.current" />
              </div>
            </div>
            <div class="box-container row">
              <div class="col-lg-4 col-sm-3">
                {{ $t("withdraw.Balance") }}
              </div>
              <div class="col-lg-8 col-sm-8 transaction-item">
                <input class="form-control text-right" readonly type="number" v-model="wallet.current" />
              </div>
            </div>
          </div>
        </div>
        <div class="point-center col-2 col-sm-12">
          <i class="fa-solid fa-chevron-right"></i>
        </div>
        <div class="point col-4 col-sm-5 current-wallet">
          <div class="title">{{ $t("point.AmountAfter") }}</div>
          <div class="point-box">
            <div class="box-container row">
              <div class="col-lg-4 col-sm-3">
                {{ $t("point.Point") }}
              </div>
              <div class="col-lg-8 col-sm-8 transaction-item">
                <input class="form-control text-right" readonly type="number" v-model="walletPoint.new" />
              </div>
            </div>
            <div class="box-container row">
              <div class="col-lg-4 col-sm-3">
                {{ $t("withdraw.Balance") }}
              </div>
              <div class="col-lg-8 col-sm-8 transaction-item">
                <input class="form-control text-right" readonly type="number" v-model="wallet.new" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="point-container row" style="padding-top: 32px">
        <div class="col-4 turning-title">
          {{ $t("point.TurningPoint") }}
        </div>
        <div class="col-8">
          <div>
            <div class="turning-point row">
              <div class="col-6 transaction-item">
                <input class="form-control text-right" type="number" placeholder="0" v-model="amount" />
              </div>
              <div class="col-6 text-left">
                <button class="btn btn-black-bg text-white h-100" @click="setMaxWalletPoint()">
                  {{ $t("point.MaxAmount") }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 notes">
          {{ $t("point.Notes") }}
        </div>
        <div class="col-12 notes">
          <div class="sub-container pt-3 d-flex">
            <div class="transaction-item tp"></div>
            <div class="transaction-item item-input">
              <div class="btn-grp">
                <button class="btn-purple-bg" type="button" @click="setAmount(10000)">
                  {{ $t("deposit.10K") }}
                </button>
                <button class="btn-purple-bg" type="button" @click="setAmount(50000)">
                  {{ $t("deposit.50K") }}
                </button>
                <button class="btn-purple-bg" type="button" @click="setAmount(100000)">
                  {{ $t("deposit.100K") }}
                </button>
                <button class="btn-purple-bg" type="button" @click="setAmount(500000)">
                  {{ $t("deposit.500K") }}
                </button>
                <button class="btn-purple-bg" type="button" @click="setAmount(1000000)">
                  {{ $t("deposit.1M") }}
                </button>
                <button type="button" class="btn-black-bg" @click="setAmount(0)">
                  {{ $t("deposit.Others") }}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
      <!-- Submit -->
      <div class="transaction-footer" v-if="amount > 0">
        <div class="form-footer dflex-ac-jc">
          <button type="submit" :disabled="isLoading" class="btn-primary login-btn w-100" @click="onPointTransfer">
            {{ $t("point.Transfer") }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div class="point-wrapper">
    <h5 class="text-left">{{ $t("point.History") }}</h5>
    <PointHistory />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";
import PointHistory from "@/views/histories/PointHistory.vue";
import ApiService from "@/services/ApiService";

export default defineComponent({
  name: "Point History",
  components: {
    PointHistory,
  },
  setup() {
    // vue variables
    const { t } = useI18n();
    const authStore = useAuthStore();
    const user = computed(() => authStore.user);
    // page variables
    let amount = ref(0);
    const wallet = ref({ current: user.value.wallet, new: 0 });
    const walletPoint = ref({ current: user.value.wallet_point, new: 0 });
    const isLoading = ref(false);

    watch(
      () => amount.value,
      (value) => {
        if (Number(value) > Number(walletPoint.value.current)) {
          walletPoint.value.new = walletPoint.value.current;
          wallet.value.new = wallet.value.current;
        } else {
          walletPoint.value.new =
            Number(walletPoint.value.current) - Number(value);
          wallet.value.new = Number(wallet.value.current) + Number(value);
        }
      }
    );

    const onPointTransfer = async () => {
      isLoading.value = true;
      if (Number(amount.value) > Number(walletPoint.value.current))
        return Swal.fire(t("point.Title"), t(`point.AMOUNT_GT`), "info");

      await ApiService.post("/tran/point", { amount: Number(amount.value) })
        .then(() =>
          Swal.fire(
            t("point.Title"),
            t("point.TransferSuccess", amount.value),
            "success"
          )
        )
        .catch((e) =>
          Swal.fire(
            t("point.Title"),
            t(`point.${e.response.data.message}`),
            "error"
          )
        );
      amount.value = 0
      isLoading.value = false;
    };

    const setAmount = (amt: number) =>
      amt > 0
        ? (amount.value = Number(amount.value) + Number(amt))
        : (amount.value = 0);

    const setMaxWalletPoint = () => {
      amount.value = walletPoint.value.current;
    }

    return {
      amount,
      isLoading,
      wallet,
      walletPoint,
      onPointTransfer,
      setAmount,
      setMaxWalletPoint,
    };
  },
});
</script>
