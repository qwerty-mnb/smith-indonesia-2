<template>
  <!-- Deposit Form -->
  <div class="transaction-wrap">
    <div class="transaction-container">
      <Form class="form" @submit="onDeposit" :validation-schema="rules">
        <div>
          <div class="row">
            <div class="col-md-10 col-9">
              <!-- Nickname -->
              <div class="sub-container">
                <div class="transaction-item">
                  {{ $t("deposit.Name") }}
                </div>
                <div class="transaction-item item-input">
                  <input
                    class="form-control"
                    readonly
                    type="text"
                    :placeholder="$t('deposit.NameCheck')"
                    :value="user.name"
                  />
                </div>
              </div>
              
              <!-- Depositor Name -->
              <div class="sub-container">
                <div class="transaction-item">
                  {{ $t("deposit.Depositor") }}
                </div>
                <div class="transaction-item item-input">
                  <input
                    class="form-control"
                    readonly
                    type="text"
                    :value="user.bank_account_name.includes('[') ? user.bank_account_name.substring(0, user.bank_account_name.indexOf('[')) : user.bank_account_name"
                  />
                </div>
              </div>
              <!-- Phone -->
              <div class="sub-container">
                <div class="transaction-item">
                  {{ $t("deposit.Phone") }}
                </div>
                <div class="transaction-item item-input">
                  <input
                    class="form-control"
                    readonly
                    type="text"
                    :value="user.mobile"
                  />
                </div>
              </div>
              <!-- Amount -->
              <div class="sub-container">
                <div class="transaction-item">
                  {{ $t("deposit.Amount") }} <label style="color: red">*</label>
                </div>
                <div class="transaction-item item-input">
                  <CurrencyInput
                    class="form-control form-control-solid text-right"
                    name="amount"
                    :placeholder="$t('deposit.AmountCheck')"
                    v-model="amount"
                  />
                  <!-- Error -->
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block text-danger">
                      <ErrorMessage name="amount" />
                    </div>
                  </div>
                </div>
              </div>
              <!-- Coupon -->
              <div class="sub-container" v-if="couponList.length > 0">
                <div class="transaction-item">
                  {{ $t("deposit.Coupon") }}
                </div>
                <div class="transaction-item item-input">
                  <select class="form-control" v-model="selectedCoupon">
                    <option value="">
                      {{ $t("deposit.CouponSelect") }}
                    </option>
                    <option
                      v-for="item in couponList"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.code }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- Set Amount -->
              <div class="sub-container">
                <div class="transaction-item"></div>
                <div class="transaction-item item-input">
                  <div class="btn-grp">
                    <button type="button" @click="setAmount(10000)" class="btn-purple-bg">
                      {{ $t("deposit.10K") }}
                    </button>
                    <button type="button" @click="setAmount(50000)" class="btn-purple-bg">
                      {{ $t("deposit.50K") }}
                    </button>
                    <button type="button" @click="setAmount(100000)" class="btn-purple-bg">
                      {{ $t("deposit.100K") }}
                    </button>
                    <button type="button" @click="setAmount(500000)" class="btn-purple-bg">
                      {{ $t("deposit.500K") }}
                    </button>
                    <button type="button" @click="setAmount(1000000)" class="btn-purple-bg">
                      {{ $t("deposit.1M") }}
                    </button>
                    <button type="button" class="btn-black-bg" @click="setAmount(0)">
                      {{ $t("deposit.Others") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-2 col-3">
              <button type="submit" :disabled="isLoading" class="btn-gradient-orange">
              {{ $t("header.DepositRequest") }}
            </button>
            </div>
          </div>

          <div class="sub-container mt-3">
            <div class="notes">
              <div class="notes-textarea">
                <textarea readonly>
                  - 싸이트 특성상 계좌가 수시로 변경 됩니다.
                  - 입금전 필히 "입금 계좌 고객센터" 후 입금 해주시길 당부 드립니다.
                  - 입금자와 이용자가 상이 할경우 입금 처리는 불가 합니다. 꼭 인지 하여 주시기 바랍니다.
                  - 23:40 ~ 00:30 분까지는 은행별 점검으로 입금 처리가 안될 수 있습니다.
                </textarea>
              </div>
            </div>
          </div>
        </div>
        <!-- Submit -->
        <!-- <div class="transaction-footer">
          <div class="form-footer dflex-ac-jc">
            <button type="submit" :disabled="isLoading" class="btn-primary login-btn w-100">
              {{ $t("header.DepositRequest") }}
            </button>
          </div>
        </div> -->
      </Form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { ErrorMessage, Form } from "vee-validate";
import { useI18n } from "vue-i18n";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import CurrencyInput from "@/components/CurrencyInput.vue";
import ApiService from "@/services/ApiService";

export default defineComponent({
  name: "MoneyDeposit",
  components: {
    Form,
    ErrorMessage,
    CurrencyInput,
  },
  setup() {
    // vue variables
    const authStore = useAuthStore();
    const appStore = useAppStore();
    const { t } = useI18n();

    // page variables
    const rules = Yup.object().shape({
      amount: Yup.number()
        .typeError(t("deposit.AmountCheck"))
        .positive()
        .transform((o, v) => parseFloat(v.replace(/,/g, "")))
        .required(t("deposit.AmountCheck"))
        .min(10000, t("deposit.DepositCheck"))
        .test("", t("deposit.DepositDivCheck"), value => value % 10000 === 0)
    });

    const user = computed(() => authStore.user);
    const amount = ref(0);
    const setAmount = (amt: number) =>
      amt > 0
        ? (amount.value = Number(amount.value) + Number(amt))
        : (amount.value = 0);

    const couponList = ref([]);
    const selectedCoupon = ref("");

    /**
     * Get Coupons
     *
     */
    const getCoupons = async () => {
      couponList.value = await ApiService.get("/tran/coupons/active")
        .then((res) => res.data)
        .catch(() => []);
    };

    const closeModal = () => appStore.openModal("");
    const isLoading = ref(false);

    /**
     * Submit Deposit
     *
     */
    async function onDeposit() {
      let payload: any = {
        amount: amount.value,
      };

      isLoading.value = true;

      if (selectedCoupon.value) {
        payload = {
          amount: amount.value,
          couponId: selectedCoupon.value,
        };
      }

      await ApiService.post("/tran/deposit", payload)
        .then(() => {
          Swal.fire(
            t("header.DepositRequest"),
            t("deposit.Success"),
            "success"
          );
          appStore.openModal("widephistory");
        })
        .catch((e) =>
          Swal.fire(
            t("header.DepositRequest"),
            t("notif." + e.response.data.message),
            "error"
          )
        );
      // reset fields
      setAmount(0);
      isLoading.value = false;
    }

    onMounted(() => getCoupons());

    return {
      amount,
      user,
      rules,
      isLoading,
      onDeposit,
      setAmount,
      closeModal,
      couponList,
      selectedCoupon,
    };
  },
});
</script>

<style scoped>
.form-container .infos {
  width: 100%;
  float: right;
  display: unset !important;
  align-items: center;
}
.form-container .form-group {
  width: 100%;
  float: left;
  margin: 0 0 3px !important;
}
.fv-help-block {
  font-size: 0.89em;
  font-weight: bolder;
  text-align: center;
  line-height: 2em;
  margin-left: 0.5em;
}
</style>
