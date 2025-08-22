<template>
  <PopupModal title="Partner.StoreMoneyAdd" type="tran" class="partner-wrapper">
    <template v-slot:close>
      <CloseModal />
    </template>
    <template v-slot:header>
      <div class="modal-title">
        <div class="title-panel">
          <span class="title">
            {{ $t(`Partner.StoreMoney${type}`) }}
          </span>
        </div>
      </div>
    </template>
    <template v-slot:body>
      <!-- Deposit Form -->
      <div class="transaction-wrap" style="display: flex;justify-content: center;">
        <div class="transaction-container">
          <Form class="form" @submit="onShopTransaction" :validation-schema="rules">
            <div>
              <!-- Nickname -->
              <div class="sub-container">
                <div class="transaction-item">
                  {{ $t("PartnerMenu.Member") }}
                </div>
                <div class="transaction-item item-input">
                  <input
                    class="form-control"
                    readonly
                    type="text"
                    :value="user.username"
                  />
                </div>
              </div>

              <!-- Store Member -->
              <div class="sub-container">
                <div class="transaction-item">
                  {{ $t("Partner.StoreMember") }}
                </div>
                <div class="transaction-item item-input">
                  <input
                    class="form-control"
                    readonly
                    type="text"
                    :value="receiver.username"
                  />
                </div>
              </div>

              <!-- Shop Member Balance -->
              <div class="sub-container">
                <div class="transaction-item">
                  {{ $t("Partner.ShopMemberBalance") }}
                </div>
                <div class="transaction-item item-input">
                  <input
                    class="form-control"
                    readonly
                    type="text"
                    :value="type === 'ADD' ?  $n(Number(authStore.user.wallet)) : $n(Number(receiver.wallet)) "
                  />
                </div>
              </div>

              <!--Transaction -->
              <div class="sub-container">
                <div class="transaction-item">
                  {{ $t("Partner.Transaction") }}
                </div>
                <div class="transaction-item item-input">
                  <input
                    class="form-control"
                    readonly
                    type="text"
                    :value="(type === 'ADD' ? `${$t('Partner.Add')}`: `${$t('Partner.Subtract')}`)"
                  />
                </div>
              </div>
              <!--Transaction Amount-->
              <div class="sub-container">
                <div class="transaction-item">
                  {{ $t("Partner.TranAmount") }}
                </div>
                <div class="transaction-item item-input">
                  <CurrencyInput
                    class="form-control form-control-solid text-right"
                    name="amount"
                    :placeholder="$t('Partner.ShopTransferNotifAnyAmount')"
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
                    <button type="button" @click="setAmount(1000)">
                      {{ $t("deposit.1K") }}
                    </button>
                    <button type="button" @click="setAmount(10000)">
                      {{ $t("deposit.10K") }}
                    </button>
                    <button type="button" @click="setAmount(100000)">
                      {{ $t("deposit.100K") }}
                    </button>
                    <button type="button" @click="setAmount(500000)">
                      {{ $t("deposit.500K") }}
                    </button>
                    <button type="button" @click="setAmount(1000000)">
                      {{ $t("deposit.1M") }}
                    </button>
                    <button type="button" class="btn-clear" @click="setAmount(0)">
                      {{ $t("deposit.Others") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- Submit -->
            <div class="transaction-footer">
              <div class="form-footer dflex-ac-jc">
                <button type="submit" class="btn-primary login-btn w-100" :disabled="isLoading">
                  {{ type === 'ADD' ? $t('Partner.Add') : $t('Partner.Subtract')}}
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </template>
  </PopupModal>
</template>


  
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { Form, Field, ErrorMessage } from "vee-validate";
import Swal from "sweetalert2";

import { useAuthStore } from "@/stores/auth";
import CurrencyInput from "@/components/CurrencyInput.vue";
import { useAppStore } from "@/stores/app";

import PopupModal from "@/views/popup/PopupModal.vue";
import CloseModal from "@/components/CloseModal.vue";

import ApiService from "@/services/ApiService";
import * as Yup from "yup";

export default defineComponent({
  name: "ShopMoneyTransaction",
  components: {
    Form,
    Field,
    ErrorMessage,
    PopupModal,
    CloseModal,
    CurrencyInput,
  },
  props: {
    receiver: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  emits: ["refresh"],
  setup(props, { emit }) {
    // vue
    const { t } = useI18n();
    const authStore = useAuthStore();
    const store = useAppStore();

    const isLoading = ref(false);
    const amount = ref(0);
    const setAmount = (amt: number) =>
      amt > 0
        ? (amount.value = Number(amount.value) + Number(amt))
        : (amount.value = 0);

    // page variables
    const rules = Yup.object().shape({
      amount: Yup.number()
        .typeError(t("Partner.ShopTransferNotifAnyAmount"))
        .positive()
        .transform((o, v) => parseFloat(v.replace(/,/g, "")))
        .required(t("Partner.ShopTransferNotifAnyAmount"))
        .min(1, t("Partner.ShopTransferNotifAnyAmount"))
    });

    const onShopTransaction = async () => {

      // check user wallet 
      if (props.type === 'ADD' && user.value.wallet < amount.value) {
        return Swal.fire(
          t(`Partner.StoreMoney${props.type}`),
          t("notif.AMOUNT_GT_WALLET"),
          "error"
        );
      } 
      else if (props.type === 'DEDUCT' && props.receiver.wallet < amount.value) {
        return Swal.fire(
          t(`Partner.StoreMoney${props.type}`),
          t("notif.AMOUNT_GT_WALLET"),
          "error"
        );
      }

      isLoading.value = true;
      await ApiService.post("/partner/shop/transaction", {
        type: props.type,
        receiver_id: props.receiver.id,
        amount: Number(amount.value),
      })
        .then(() => {
          Swal.fire(
            t(`Partner.StoreMoney${props.type}`),
            t("notif.StoreMoneySuccess"),
            "success"
          );
          isLoading.value = false;
        })
        .catch((e) =>
          Swal.fire(
            t(`Partner.StoreMoney${props.type}`),
            t(`notif.${e.response.data.message}`),
            "error"
          )
        );
      // close
      store.openModal("");
      emit("refresh");
    };

    const openModal = (modal: string) => store.openModal(modal);
    const activeTab = computed(() => store.activeTab);
    const user = computed(() => authStore.user);

    return {
      user,
      amount,
      activeTab,
      openModal,
      onShopTransaction,
      setAmount,
      rules,
      isLoading,
      authStore
    };
  },
});
</script>