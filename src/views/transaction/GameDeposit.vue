<template>
  <PopupModal title="history.SLOT_DEPOSIT" type="money">
    <template v-slot:header>
      <div class="modal-title">
        <div class="title-panel">
          <span class="title">{{ $t("history.SLOT_DEPOSIT") }}</span>
          <span class="sub w-mob-title">GAME DEPOSIT</span>
        </div>
      </div>
    </template>

    <template v-slot:body>
      <Form class="form form-container" @submit="onGameDeposit" :validation-schema="rules">
        <div class="transaction-container">
          <!-- Current Balance -->
          <div class="sub-container">
            <div class="transaction-item">
              <span>{{ $t("withdraw.Balance") }}</span>
            </div>
            <div class="transaction-item item-input">
              <input
                class="form-control"
                readonly
                type="text"
                :placeholder="$t('deposit.NameCheck')"
                :value="$n(Number(user.wallet))"
              />
            </div>
          </div>

          <!-- Amount -->
          <div class="sub-container">
            <div class="transaction-item">
              <span>{{ $t("deposit.Amount") }}</span>
            </div>
            <div class="transaction-item item-input">
              <CurrencyInput
                class="form-control form-control-solid"
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
        <!-- Submit -->
        <div class="modal-footer">
          <div class="form-footer dflex-ac-jc">
            <button type="button" class="btn btn-danger" @click="closeModal()">
              {{ $t("Close") }}
            </button>
            <button type="submit" class="btn btn-primary">
              {{ $t("history.SLOT_DEPOSIT") }}
            </button>
          </div>
        </div>
      </Form>
    </template>
  </PopupModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { ErrorMessage, Form } from "vee-validate";
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import CurrencyInput from "@/components/CurrencyInput.vue";
import ApiService from "@/services/ApiService";
import PopupModal from "../popup/PopupModal.vue";

export default defineComponent({
  name: "GameDepositModal",
  components: {
    PopupModal,
    Form,
    ErrorMessage,
    CurrencyInput,
  },
  props: {
    provider: {
      type: String,
      required: false,
    },
    currentWallet: {
      type: Number,
      required: false,
    },
  },
  setup(props, { emit }) {
    // vue
    const authStore = useAuthStore();
    const appStore = useAppStore();
    const { t } = useI18n();
    // page
    const amount = ref(0);
    const wallet = ref(props.currentWallet);
    const user = computed(() => authStore.user);

    const setAmount = (amt: number) => {
      if (amt > 1) {
        amount.value =
          amt + amount.value < Number(user.value.wallet)
            ? amount.value + amt
            : Math.floor(user.value.wallet / 10000) * 10000;
      } else {
        amount.value = 0;
      }
    };

    const closeModal = () => {
      emit("closeModal", false);
    };

    const rules = Yup.object().shape({
      amount: Yup.number()
        .typeError(t("gameTransfer.DepositCheck"))
        .positive()
        .transform((o, v) => parseFloat(v.replace(/,/g, "")))
        .required(t("deposit.AmountCheck"))
        .min(10000, t("gameTransfer.DepositCheck")),
    });
    /**
     * Submit Deposit
     *
     */
    async function onGameDeposit() {
      if (amount.value > user.value.wallet)
        return Swal.fire({
          icon: "error",
          title: t("gameTransfer.Deposit"),
          text: t("gameTransfer.DepositCheck"),
          confirmButtonColor: "#FF0000",
          confirmButtonText: t("notif.Close"),
        });

      try {
        await ApiService.post(
          `/game/snow/money-transfer/deposit`,
          {
            amount: amount.value,
          }
        ).then((res) => res.data);
        appStore.openModal("widephistory");
        Swal.fire({
          icon: "success",
          title: t("gameTransfer.Deposit"),
          text: t("gameTransfer.DepositSuccess", { amount: amount.value }),
          confirmButtonColor: "#FF0000",
          confirmButtonText: t("notif.Close"),
        });
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: t("gameTransfer.Deposit"),
          text: t("notif.ErrorOccured"),
          confirmButtonColor: "#FF0000",
          confirmButtonText: t("notif.Close"),
        });
      }
      // refresh wallet and the amount
      emit("refresh");
      amount.value = 0;
    }

    return {
      amount,
      user,
      rules,
      onGameDeposit,
      setAmount,
      closeModal,
      wallet,
    };
  },
});
</script>
