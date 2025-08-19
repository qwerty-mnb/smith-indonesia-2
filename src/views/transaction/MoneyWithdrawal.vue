<template>
  <!-- Withdrawal Form -->
  <div class="transaction-wrap">
    <div class="transaction-container">
      <Form class="form" @submit="onWithdraw" :validation-schema="rules">
        <div>
          <div class="row">
            <div class="col-md-10 col-9">
              <!-- Bank Name -->
              <div class="sub-container">
                <div class="transaction-item">
                  {{ $t("withdraw.BankName") }}
                </div>
                <div class="transaction-item item-input">
                  <input
                    class="form-control form-control-solid"
                    readonly
                    type="text"
                    :value="user.bank_name"
                  />
                </div>
              </div>

              <!-- Bank Account Name -->
              <div class="sub-container">
                <div class="transaction-item">
                  {{ $t("withdraw.BankAccountName") }}
                </div>
                <div class="transaction-item item-input">
                  <input
                    class="form-control form-control-solid"
                    readonly
                    type="text"
                    :value="user.bank_account_name.includes('[') ? user.bank_account_name.substring(0, user.bank_account_name.indexOf('[')) : user.bank_account_name"
                  />
                </div>
              </div>

              <!-- Bank Account Name -->
              <div class="sub-container">
                <div class="transaction-item">
                  {{ $t("withdraw.BankAccount") }}
                </div>
                <div class="transaction-item item-input">
                  <input
                    class="form-control form-control-solid"
                    readonly
                    type="text"
                    :value="user.bank_account"
                  />
                </div>
              </div>

              <!-- Balance -->
              <div class="sub-container">
                <div class="transaction-item">
                  {{ $t("withdraw.Balance") }}
                </div>
                <div class="transaction-item item-input">
                  <input
                    class="form-control form-control-solid"
                    readonly
                    type="text"
                    :value="$n(Number(user.wallet))"
                  />
                </div>
              </div>

              <!-- Rolling -->
              <div class="sub-container" v-if="rolling">
                <div class="transaction-item">
                  {{ $t("withdraw.CheckRollingLastDep") }}<br>
                  {{  $t("withdraw.CheckRollingLastDep1") }}
                </div>
                <div class="transaction-item item-input">
                  <input
                    class="form-control form-control-solid"
                    readonly
                    type="text"
                    :value="`${$n(Number(rolling.rolling))}(${$n(Number(rolling.percentage))}%)`"

                  />
                </div>
              </div>

              <!-- Amount -->
              <div class="sub-container">
                <div class="transaction-item">
                  {{ $t("withdraw.Amount") }} <label style="color: red">*</label>
                </div>
                <div class="transaction-item item-input">
                  <CurrencyInput
                    class="form-control form-control-solid text-right"
                    name="amount"
                    :placeholder="$t('withdraw.AmountCheck')"
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
              <button type="submit" :disabled="isLoading" class="btn-gradient-blue">
              {{ $t("header.WithdrawRequest") }}
              </button>
            </div>
          
          </div>
        </div>

        <!-- Submit -->
        <div class="transaction-footer">
          <div class="form-footer dflex-ac-jc">
            
          </div>
        </div>


      </Form>
    </div>
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
  name: "MoneyWithdrawal",
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
    const { t } = useI18n();
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
        .test("", t("withdraw.WithdrawDivCheck"), value => value % 10000 === 0)
    });
    const amount = ref(0);

    const closeModal = () => appStore.openModal("");
    const isLoading = ref(false);
    const rolling = ref("");

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
      rolling.value = await ApiService.get("/tran/check-rolling")
        .then((res) => res.data)
        .catch(() => []);
    };

    const withdrawGameMoney = async () => {

      const balance = await ApiService.get(`/game/snow/money-transfer/balance`)
          .then((res) => res.data.balance);

        if(balance > 0){
          // Withdraw
          await ApiService.post(
            `/game/snow/money-transfer/withdrawal`,
            null
          )
            .then((res) => res.data);
        }
    }

    onMounted(() => {
      checkRolling()
      if(settings.value.ENABLE_MONEY_TRANSFER_GAME  === "true") {
        withdrawGameMoney();
      }
    });

    return {
      amount,
      user,
      rules,
      isLoading,
      setAmount,
      onWithdraw,
      closeModal,
      rolling
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
  text-align: initial;
  line-height: 2em;
  margin-left: 0.5em;
}
</style>
