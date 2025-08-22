<template>
    <PopupModal title="Partner.PointMoneyTransfer" type="tran" class="partner-wrapper">
      <template v-slot:close>
        <CloseModal />
      </template>
      <template v-slot:header>
        <div class="modal-title">
          <div class="title-panel">
            <span class="title">
              {{ $t(`Partner.PointMoneyTransfer${type}`) }}
            </span>
          </div>
        </div>
      </template>
      <template v-slot:body>
        <Form class="form" @submit="onPointTransfer">
          <div class="form-container">
            <!-- Current Point Balance -->
            <div class="form-group">
              <div class="labels w-ba text-dark">
                <span>{{ $t("Partner.Point") }}</span>
              </div>
              <div class="infos">
                <div class="input-container">
                  <input
                    class="form-control form-control-solid"
                    readonly
                    type="text"
                    :value="$n(Number(user.wallet_point))"
                  />
                </div>
              </div>
            </div>
            <!-- Receiver -->
            <div class="form-group">
              <div class="labels w-ba text-dark">
                <span>{{ $t("Partner.ReceiverMember") }}</span>
              </div>
              <div class="infos">
                <div class="input-container">
                  <input
                    class="form-control form-control-solid"
                    readonly
                    type="text"
                    :value="receiver.username"
                  />
                </div>
              </div>
            </div>
  
            <!-- Amount -->
            <div class="form-group">
              <div class="labels text-dark">
                <span>{{ $t("Partner.TranAmount") }}</span>
              </div>
              <div class="infos">
                <div class="input-container">
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
            </div>
          </div>
  
          <!-- Submit -->
          <div class="modal-footer">
            <div class="form-footer dflex-ac-jc">
              <button type="button" class="btn btn-danger" @click="openModal('')">
                {{ $t("Close") }}
              </button>
              <button type="submit" class="btn btn-primary">
                {{ type == "ADD" ? $t("Partner.Add") : $t("Partner.Subtract") }}
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
  import { Form, Field, ErrorMessage } from "vee-validate";
  import Swal from "sweetalert2";
  
  import { useAuthStore } from "@/stores/auth";
  import CurrencyInput from "@/components/CurrencyInput.vue";
  import { useAppStore } from "@/stores/app";
  
  import PopupModal from "@/views/popup/PopupModal.vue";
  import CloseModal from "@/components/CloseModal.vue";
  
  import ApiService from "@/services/ApiService";
  
  export default defineComponent({
    name: "PointMoneyTransfer",
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
  
      const amount = ref(0);
  
      const onPointTransfer = async () => {
        if (Number(amount.value) <= 1000)
          return Swal.fire(
            t(`Partner.PointMoneyTransfer${props.type}`),
            t("notif.INVALID_AMOUNT"),
            "error"
          );
  
        await ApiService.post("/partner/point/transfer", {
          type: props.type,
          receiver_id: props.receiver.id,
          amount: Number(amount.value),
        })
          .then(() =>
            Swal.fire(
              t(`Partner.PointMoneyTransfer${props.type}`),
              t("notif.PointMoneyTransferSuccess"),
              "success"
            )
          )
          .catch((e) =>
            Swal.fire(
              t(`Partner.PointMoneyTransfer${props.type}`),
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
        onPointTransfer,
      };
    },
  });
  </script>