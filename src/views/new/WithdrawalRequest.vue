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
        <div class="deposit-amount-container" data-section="depo-amount">
          <div data-section="depo-input">
            <div data-field="amount" class="deposit-amount" data-currency="idr">
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
        <div class="deposit-amount-container" data-section="depo-amount">
          <div data-section="depo-input">
            <div data-field="amount" class="deposit-amount" data-currency="idr">
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
      <div class="form-group deposit-form-group" bis_skin_checked="1">
        <label for="Amount">
          {{ t("withdraw.BankAccount") }}
          <span data-section="asterisk">*</span>
        </label>
        <div
          class="deposit-amount-container"
          data-section="depo-amount"
          bis_skin_checked="1"
        >
          <div data-section="depo-input" bis_skin_checked="1">
            <div
              data-field="amount"
              class="deposit-amount"
              data-currency="idr"
              bis_skin_checked="1"
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

      <!-- Balance -->
      <div class="form-group deposit-form-group" bis_skin_checked="1">
        <label for="Amount">
          {{ t("withdraw.Balance") }}
          <span data-section="asterisk">*</span>
        </label>
        <div
          class="deposit-amount-container"
          data-section="depo-amount"
          bis_skin_checked="1"
        >
          <div data-section="depo-input" bis_skin_checked="1">
            <div
              data-field="amount"
              class="deposit-amount"
              data-currency="idr"
              bis_skin_checked="1"
            >
              <input
                type="text"
                class="form-control !text-left"
                readonly
                :value="n(Number(user.wallet))"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Rolling -->
      <div class="form-group deposit-form-group" bis_skin_checked="1">
        <label for="Amount">
          {{ t("withdraw.CheckRollingLastDep") }}
          <span class="text-xs text-gray-500 mx-2">{{
            t("withdraw.CheckRollingLastDep1")
          }}</span>
          <span data-section="asterisk">*</span>
        </label>
        <div
          class="deposit-amount-container"
          data-section="depo-amount"
          bis_skin_checked="1"
        >
          <div data-section="depo-input" bis_skin_checked="1">
            <div
              data-field="amount"
              class="deposit-amount"
              data-currency="idr"
              bis_skin_checked="1"
            >
              <input
                type="text"
                class="form-control !text-left"
                readonly
                :value="`${n(Number(rolling?.rolling || 0))}(${n(
                  Number(rolling?.percentage || 0)
                )}%)`"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Withdraw Amount -->
      <div class="form-group deposit-form-group" bis_skin_checked="1">
        <label for="Amount">
          {{ t("withdraw.Amount") }}
          <span data-section="asterisk">*</span>
        </label>
        <div
          class="deposit-amount-container"
          data-section="depo-amount"
          bis_skin_checked="1"
        >
          <div data-section="depo-input" bis_skin_checked="1">
            <div data-field="amount" class="deposit-amount" data-currency="idr">
              <div class="currency-label">
                {{ t("New.Currency") }}
              </div>
              <CurrencyInput
                class="form-control form-control-solid text-right"
                name="amount"
                :placeholder="$t('withdraw.AmountCheck')"
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
import { useI18n } from "vue-i18n";
import { ErrorMessage, Form } from "vee-validate";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
import { useAppStore } from "@/stores/app";
import CurrencyInput from "@/components/CurrencyInput.vue";
import PopupModal from "../popup/PopupModal.vue";
import CloseModal from "@/components/CloseModal.vue";
import ApiService from "@/services/ApiService";

export default defineComponent({
  name: "WithdrawalRequest",
  components: {
    Form,
    ErrorMessage,
    PopupModal,
    CloseModal,
    CurrencyInput,
  },
  setup() {
    // vue variables
    const authStore = useAuthStore();
    const appStore = useAppStore();
    const { t, n } = useI18n();
    // page variables
    const user = computed(() => authStore.user);
    const settings = computed(() => appStore.settings);
    const rules = Yup.object().shape({
      amount: Yup.number()
        .typeError(t("withdraw.WithdrawCheck"))
        .positive()
        .required()
        .transform((o, v) => parseFloat(v.replace(/,/g, "")))
        .min(10000, t("withdraw.WithdrawCheck"))
        .test("", t("withdraw.WithdrawDivCheck"), (value) => value % 10000 === 0),
    });
    const amount = ref(0);

    const closeModal = () => appStore.openModal("");
    const isLoading = ref(false);
    const rolling = ref({ rolling: 0, percentage: 0 });

    const setAmount = (amt: number) => {
      amount.value =
        amt === -1 || amt == 0
          ? 0
          : amt + amount.value < Number(user.value.wallet)
          ? amount.value + amt
          : Math.floor(Number(user.value.wallet) / 10000) * 10000;
    };
    /**
     * Submit Withdraw
     *
     */
    async function onWithdraw() {
      try {
        if (amount.value > Number(user.value.wallet))
          return Swal.fire({
            icon: "error",
            title: t("header.WithdrawRequest"),
            text: t("notif.AMOUNT_GT_WALLET"),
            confirmButtonColor: "#FF0000",
            confirmButtonText: t("notif.Close"),
          });

        isLoading.value = true;

        const resp = await ApiService.post("/tran/withdraw", {
          amount: amount.value,
        })
          .then((res) => res.data)
          .catch((e) => e.response.data);

        if (resp.message !== "WITHDRAW_CREATED") {
          isLoading.value = false;
          return Swal.fire({
            icon: "error",
            title: t("header.WithdrawRequest"),
            text: t("notif." + resp.message),
            confirmButtonColor: "#FF0000",
            confirmButtonText: t("notif.Close"),
          });
        }

        Swal.fire({
          icon: "success",
          title: t("header.WithdrawRequest"),
          text: t("withdraw.Success"),
          confirmButtonColor: "#FF0000",
          confirmButtonText: t("notif.Close"),
        });
        // reset fields
        setAmount(0);
        isLoading.value = false;
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: t("header.WithdrawRequest"),
          text: t("notif.ErrorOccured"),
          confirmButtonColor: "#FF0000",
          confirmButtonText: t("notif.Close"),
        });
        isLoading.value = false;
      }
    }

    const checkRolling = async () => {
      try {
        const response = await ApiService.get("/tran/check-rolling");
        rolling.value = response.data || { rolling: 0, percentage: 0 };
      } catch (error) {
        rolling.value = { rolling: 0, percentage: 0 };
      }
    };

    const withdrawGameMoney = async () => {
      const balance = await ApiService.get(`/game/snow/money-transfer/balance`).then(
        (res) => res.data.balance
      );

      if (balance > 0) {
        // Withdraw
        await ApiService.post(`/game/snow/money-transfer/withdrawal`, null).then(
          (res) => res.data
        );
      }
    };

    onMounted(() => {
      checkRolling();
      if (settings.value.ENABLE_MONEY_TRANSFER_GAME === "true") {
        withdrawGameMoney();
      }
    });

    return {
      t,
      n,
      amount,
      user,
      rules,
      isLoading,
      setAmount,
      onWithdraw,
      closeModal,
      rolling,
    };
  },
});
</script>
