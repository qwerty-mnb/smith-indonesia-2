<template>
  <div class="standard-form-content deposit-container">
    <Form class="form" @submit="onDeposit" :validation-schema="rules">
      <div class="form-group deposit-form-group">
        <hr class="deposit-gap" />
      </div>

      <!-- Bank Name -->
      <div class="form-group deposit-form-group">
        <label for="Amount">
          {{ t("withdraw.BankName") }}
          <span data-section="asterisk">*</span>
        </label>
        <div
          class="deposit-amount-container"
          data-section="depo-amount"
        >
          <div data-section="depo-input">
            <div
              data-field="amount"
              class="deposit-amount"
              data-currency="idr"
            >
              <input
                type="text"
                class="form-control !text-left"
                readonly
                :value="user.bank_name"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Bank Account Name -->
      <div class="form-group deposit-form-group">
        <label for="Amount">
          {{ t("withdraw.BankAccountName") }}
          <span data-section="asterisk">*</span>
        </label>
        <div
          class="deposit-amount-container"
          data-section="depo-amount"
        >
          <div data-section="depo-input">
            <div
              data-field="amount"
              class="deposit-amount"
              data-currency="idr"
            >
              <input
                type="text"
                class="form-control !text-left"
                readonly
                :value="
                  user.bank_account_name.includes('[')
                    ? user.bank_account_name.substring(
                        0,
                        user.bank_account_name.indexOf('[')
                      )
                    : user.bank_account_name
                "
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Bank Account Name -->
      <div class="form-group deposit-form-group">
        <label for="Amount">
          {{ t("withdraw.BankAccount") }}
          <span data-section="asterisk">*</span>
        </label>
        <div
          class="deposit-amount-container"
          data-section="depo-amount"
        >
          <div data-section="depo-input">
            <div
              data-field="amount"
              class="deposit-amount"
              data-currency="idr"
            >
              <input
                type="text"
                class="form-control !text-left"
                readonly
                :value="user.bank_account"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Bank Account Name -->
      <div class="form-group deposit-form-group">
        <label for="Amount">
          {{ t("withdraw.BankAccount") }}
          <span data-section="asterisk">*</span>
        </label>
        <div
          class="deposit-amount-container"
          data-section="depo-amount"
        >
          <div data-section="depo-input">
            <div
              data-field="amount"
              class="deposit-amount"
              data-currency="idr"
            >
              <input
                type="text"
                class="form-control !text-left"
                readonly
                :value="user.bank_account"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Deposit Amount -->
      <div class="form-group deposit-form-group">
        <label for="Amount">
          {{ t("deposit.Amount") }}
          <span data-section="asterisk">*</span>
        </label>
        <div
          class="deposit-amount-container"
          data-section="depo-amount"
        >
          <div data-section="depo-input">
            <div
              data-field="amount"
              class="deposit-amount"
              data-currency="idr"
            >
              <div class="currency-label">
                {{ t("New.Currency") }}
              </div>
              <CurrencyInput
                class="form-control form-control-solid text-right"
                name="amount"
                :placeholder="$t('deposit.AmountCheck')"
                v-model="amount"
              />
              <div class="currency-suffix">.00,-</div>
            </div>
          </div>
          <div class="fv-plugins-message-container w-full">
            <div class="fv-help-block text-danger w-full text-right">
              <ErrorMessage name="amount" />
            </div>
          </div>
        </div>
      </div>

      <!-- Set Amount -->
      <div class="w-full mb-6">
        <div class="flex flex-wrap justify-center" style="gap: 5px">
          <button
            type="button"
            @click="setAmount(10000)"
            class="px-4 py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-br from-[#4f4f4f] via-[#5a5a5a] to-[#4f4f4f] hover:from-[#5a5a5a] hover:via-[#656565] hover:to-[#5a5a5a] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 min-w-[90px] sm:min-w-[110px] transform hover:-translate-y-0.5"
          >
            {{ $t("deposit.10K") }}
          </button>
          <button
            type="button"
            @click="setAmount(50000)"
            class="px-4 py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-br from-[#4f4f4f] via-[#5a5a5a] to-[#4f4f4f] hover:from-[#5a5a5a] hover:via-[#656565] hover:to-[#5a5a5a] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 min-w-[90px] sm:min-w-[110px] transform hover:-translate-y-0.5"
          >
            {{ $t("deposit.50K") }}
          </button>
          <button
            type="button"
            @click="setAmount(100000)"
            class="px-4 py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-br from-[#4f4f4f] via-[#5a5a5a] to-[#4f4f4f] hover:from-[#5a5a5a] hover:via-[#656565] hover:to-[#5a5a5a] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 min-w-[90px] sm:min-w-[110px] transform hover:-translate-y-0.5"
          >
            {{ $t("deposit.100K") }}
          </button>
          <button
            type="button"
            @click="setAmount(500000)"
            class="px-4 py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-br from-[#4f4f4f] via-[#5a5a5a] to-[#4f4f4f] hover:from-[#5a5a5a] hover:via-[#656565] hover:to-[#5a5a5a] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 min-w-[90px] sm:min-w-[110px] transform hover:-translate-y-0.5"
          >
            {{ $t("deposit.500K") }}
          </button>
          <button
            type="button"
            @click="setAmount(1000000)"
            class="px-4 py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-br from-[#4f4f4f] via-[#5a5a5a] to-[#4f4f4f] hover:from-[#5a5a5a] hover:via-[#656565] hover:to-[#5a5a5a] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 min-w-[90px] sm:min-w-[110px] transform hover:-translate-y-0.5"
          >
            {{ $t("deposit.1M") }}
          </button>
          <button
            type="button"
            @click="setAmount(0)"
            class="px-4 py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-br from-[#4f4f4f] via-[#5a5a5a] to-[#4f4f4f] hover:from-[#5a5a5a] hover:via-[#656565] hover:to-[#5a5a5a] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 min-w-[90px] sm:min-w-[110px] transform hover:-translate-y-0.5"
          >
            {{ $t("deposit.Others") }}
          </button>
        </div>
      </div>

      <div class="standard-button-group">
        <input
          :disabled="isLoading"
          type="submit"
          class="btn btn-primary"
          :value="t('header.DepositRequest')"
        />
      </div>
    </Form>
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
  name: "DepositRequest",
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
        .test("", t("deposit.DepositDivCheck"), (value) => value % 10000 === 0),
    });

    const user = computed(() => authStore.user);
    const amount = ref(0);
    const setAmount = (amt: number) =>
      amt > 0 ? (amount.value = Number(amount.value) + Number(amt)) : (amount.value = 0);

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
          Swal.fire(t("header.DepositRequest"), t("deposit.Success"), "success");
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
      t,
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

<style lang="scss">
.deposit-container {
  .deposit-form-group {
    background-color: transparent;
    padding: 10px 0;
    margin-bottom: 0;
    border-radius: 5px;
  }

  .deposit-gap {
    margin: 20px 0 5px 0;
    height: 1px;
    border: none;
    background: linear-gradient(to right, transparent, #fff, transparent);
  }

  .deposit-amount-container {
    background-color: transparent;
    color: #fff;
    border-radius: 5px;

    [data-section="depo-input"] {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    input[type="text"] {
      background-color: #12021e;
      color: inherit;
      border-radius: 5px;
      border: 1px solid #320050;
    }

    [data-field="amount"] {
      flex-basis: 100%;
    }

    input {
      width: 100%;
    }
  }

  .deposit-amount {
    position: relative;
    display: flex;
    align-items: center;
    line-height: normal;

    input.form-control {
      font-size: inherit;
      text-align: right;
      padding-right: 18px;
    }

    &[data-currency="idr"] input.form-control {
      padding-right: 45px;
    }

    .currency-label {
      position: absolute;
      left: 12px;
    }

    .currency-suffix {
      position: absolute;
      right: 12px;
      pointer-events: none;
    }
  }

  .standard-button-group {
    margin-top: 15px;

    .btn-primary {
      width: 300px;
    }
  }
}
</style>
