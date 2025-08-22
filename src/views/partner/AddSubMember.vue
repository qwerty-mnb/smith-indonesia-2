<template>
  <PopupModal title="history.SLOT_DEPOSIT" type="tran" class="partner-wrapper">
    <template v-slot:close>
      <CloseModal />
    </template>
    <template v-slot:body>
      <Form class="form" @submit="createSubMember" :validation-schema="getValidationSchema(isshop)">
        <div class="card mb-4">
          <!-- Basic Info -->
          <div class="card-header">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bold fs-3 mb-1 text-white"><i class="fas fa-user-tie fa-lg"></i>&nbsp;&nbsp;{{
                $t("Partner.Tab.AddSubMember")
              }}</span>
            </h3>
          </div>
          <div class="row g-5 g-xl-12 card-body">
            <div class="col-xl-12 input-group-sm text-left">
              <label class="form-label fs-6 fw-bold">{{
                $t("Partner.Type")
              }}</label>
              <div class="form-check form-check-custom form-check-solid  mb-4 mt-2">
                <span v-for="(item, x) in userType" :key="x" class="mx-3">
                  <input class="form-check-input" type="radio" :value="item.value" v-model="isshop" name="isshop" />

                  <label class="form-check-label mg-right" for="flexRadioDefault">
                    {{ item.label }}
                  </label>
                </span>
              </div>
            </div>
            <!-- Field: Username -->
            <div class="col-xl-3 input-group-sm">
              <label class="form-label fs-6 fw-bold">{{
                $t("register.ID")
              }}</label>
              <Field class="form-control form-control-lg" type="text" name="username" value="" />
              <!-- Error -->
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="username" />
                </div>
              </div>
            </div>
            <!-- Field: Nickname -->
            <div class="col-xl-3 input-group-sm">
              <label class="form-label fs-6 fw-bold">{{
                $t("register.Nickname")
              }}</label>
              <Field class="form-control form-control-lg" type="text" name="nickname" value="" autocomplete="off" />
              <!-- Error -->
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="nickname" />
                </div>
              </div>
            </div>
            <!-- Field: Password -->
            <div class="col-xl-3 input-group-sm">
              <label class="form-label fs-6 fw-bold">{{
                $t("register.Password")
              }}</label>
              <Field class="form-control form-control-lg" type="password" name="password" value="" autocomplete="off" />
              <!-- Error -->
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="password" />
                </div>
              </div>
            </div>
            <template v-if="!isshop">
              <!-- Field: Telephone -->
              <div class="col-xl-3 input-group-sm">
                <label class="form-label fs-6 fw-bold">{{
                  $t("register.Phone")
                }}</label>
                <Field class="form-control form-control-lg" type="text" name="telno" value="" autocomplete="off" />
                <!-- Error -->
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="telno" />
                  </div>
                </div>
              </div>
              <!-- Field: Bank Name -->
              <div class="col-xl-4 input-group-sm">
                <label class="form-label fs-6 fw-bold">{{
                  $t("register.BankName")
                }}</label>
                <Field class="form-control form-control-lg" name="bank_name" as="select" autocomplete="off"
                  value="KB국민은행">
                  <option v-for="(item, k) in banks" :key="k" :value="item">
                    {{ item }}
                  </option>
                </Field>
                <!-- Error -->
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="bank_name" />
                  </div>
                </div>
              </div>
              <!-- Field: Bank Account Name -->
              <div class="col-xl-4 input-group-sm">
                <label class="form-label fs-6 fw-bold">{{
                  $t("register.BankAccountName")
                }}</label>
                <Field class="form-control form-control-lg" type="text" name="bank_account_name" value="" />
                <!-- Error -->
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="bank_account_name" />
                  </div>
                </div>
              </div>
              <!-- Field: Bank Account -->
              <div class="col-xl-4 input-group-sm">
                <label class="form-label fs-6 fw-bold">{{
                  $t("register.BankAccount")
                }}</label>
                <Field class="form-control form-control-lg" type="number" name="bank_account" value="" />
                <!-- Error -->
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="bank_account" />
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <!-- Commission Settings -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bold fs-3 mb-1 text-white"><i class="fas fa-user-tie fa-lg"></i>&nbsp;&nbsp;{{
                $t("Commission.Settings")
              }}</span>
            </h3>
          </div>
          <div class="row g-5 g-xl-12 card-body">
            <!-- Field: Rolling Type -->
            <div class="col-xl-4 input-group-sm">
              <label class="form-label fs-6 fw-bold">{{
                $t("Commission.TypeRolling")
              }}</label>
              <Field class="form-control" name="type_rolling" as="select" disabled autocomplete="off"
                v-model="masterSettlement.type_roll">
                <option v-for="item in rollingType" :key="item.value" :value="item.value">
                  {{ item.label }}
                </option>
              </Field>
              <!-- Error -->
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="type_rolling" />
                </div>
              </div>
            </div>
            <!-- Field: Casino Rolling Fee -->
            <div class="col-xl-4 input-group-sm">
              <label class="form-label fs-6 fw-bold">{{
                $t("Commission.CasinoRollingPercent")
              }}</label>
              <Field class="form-control" type="number" name="pct_roll_casino"
                v-model="masterSettlement.pct_roll_casino" />
              <!-- Error -->
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="pct_roll_casino" />
                </div>
              </div>
            </div>
            <!-- Field: Slot Rolling Fee -->
            <div class="col-xl-4 input-group-sm">
              <label class="form-label fs-6 fw-bold">{{
                $t("Commission.SlotRollingPercent")
              }}</label>
              <Field class="form-control" type="number" name="pct_roll_slot" v-model="masterSettlement.pct_roll_slot" />
              <!-- Error -->
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="pct_roll_slot" />
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end m-4">
            <button type="submit" ref="submitButton" class="btn btn-black-bg text-white">
              <i class="fas fa-user-plus" />
              {{ $t("Partner.Tab.AddSubMember") }}
            </button>
          </div>
        </div>
      </Form>
    </template>
  </PopupModal>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Form, Field, ErrorMessage } from "vee-validate";
import CurrencyInput from "@/components/CurrencyInput.vue";
import ApiService from "@/services/ApiService";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";
import PopupModal from "../popup/PopupModal.vue";
import CloseModal from "@/components/CloseModal.vue";

interface IAddSubMember {
  username: string;
  nickname: string;
  password: string;
  telno: number;
  bank_name: string;
  bank_account_name: string;
  bank_account: number;
  pct_roll_casino: number;
  pct_roll_slot: number;
  pct_lose_casino: number;
  pct_lose_slot: number;
  type_rolling: number;
  type_losing: number;
}

export default defineComponent({
  name: "AddSubMember",
  components: {
    PopupModal,
    Form,
    Field,
    ErrorMessage,
    CurrencyInput,
    CloseModal,
  },
  setup() {
    const authStore = useAuthStore();

    const { t } = useI18n();

    const userType = [
      { value: false, label: t("Partner.NormalMember") },
      { value: true, label: t("Partner.ShopMember") },
    ];

    const isshop = ref(false);

    // Filter
    const banks = [
      "KB국민은행",
      "KB증권",
      "신한은행",
      "우리은행",
      "KEB하나은행",
      "케이뱅크",
      "카카오뱅크",
      "카카오증권",
      "KDB산업은행",
      "IBK기업은행",
      "NH농협은행",
      "NH증권",
      "수협은행",
      "대구은행",
      "BNK부산은행",
      "BNK경남은행",
      "광주은행",
      "전북은행",
      "제주은행",
      "농·축협",
      "농협",
      "축협",
      "새마을금고",
      "우체국",
      "신용협동조합",
      "산림조합",
      "HSBC은행",
      "한국씨티은행",
      "한국스탠다드차타드은행",
      "신한금융투자",
      "하나금융투자",
      "DB금융투자",
      "유안타증권",
      "유진투자증권",
      "한국투자증권",
      "상호저축은행",
      "상호저축은행중앙회",
      "미래애셋",
      "삼성증권",
      "SC제일은행",
    ];

    const losingType = [{ value: 0, label: t("Partner.LosingType.0") }];

    const rollingType = [
      { value: 4, label: t("Partner.RollingType.4") },
      { value: 2, label: t("Partner.RollingType.2") },
      { value: 1, label: t("Partner.RollingType.1") },
    ];

    const getValidationSchema = (isShopMember: any) => {
      return Yup.object().shape({
        username: Yup.string()
          .min(3, 'IDCheck')
          .required('IDCheck')
          .trim()
          .matches(/^[a-z0-9]+$/i, 'IDCheck'),
        nickname: Yup.string().required('NicknameCheck'),
        password: Yup.string().min(5).required('PassCheck'),
        telno: isShopMember ? Yup.string() : Yup.string()
          .min(8, 'PhoneCheck')
          .required('PhoneCheck')
          .matches(/^[0-9]+$/i, 'PhoneCheck'),
        bank_name: isShopMember ? Yup.string() : Yup.string().required('Select'),
        bank_account_name: isShopMember ? Yup.string() : Yup.string()
          .required('BankAccountCheck')
          .trim()
          .matches(/[^0-9]/g, 'BankAccountCheck'),
        bank_account: isShopMember ? Yup.string() : Yup.string()
          .required('PhoneCheck')
          .matches(/^[0-9]+$/i, 'PhoneCheck'),
        pct_roll_casino: Yup.number()
          .min(0)
          .required('Partner.Validation.Required')
          .typeError('Partner.Validation.Numeric', { field: "Casino Rolling" }),
        pct_roll_slot: Yup.number()
          .min(0)
          .required('Partner.Validation.Required')
          .typeError('Partner.Validation.Numeric', { field: "Slot Rolling" }),
      });
    }

    /**
     * Settlement variables
     *
     */
    const masterSettlement = ref({
      type_roll: 1,
      type_lose: 0,
      pct_roll_casino: 0,
      pct_roll_slot: 0,
      pct_lose_casino: 0,
      pct_lose_slot: 0,
    });
    const getMasterSettlementTypes = async () => {
      if (authStore.user.id) {
        masterSettlement.value = await ApiService.get(
          `/partner/member/settlement-type/${authStore.user.id}`
        ).then((res: { data: any; }) => res.data);
      }
    };

    /**
     * Create Sub Member
     *
     */
    const createSubMember = async (data: IAddSubMember) => {

      await ApiService.post("/partner/sub", {
        upper_id: authStore.user.id,
        username: data.username,
        password: data.password,
        name: data.nickname,
        mobile: isshop.value ? Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join('') : data.telno,
        bank_name: isshop.value ? "카카오방크" : data.bank_name,
        bank_account_name: isshop.value ? Math.random().toString(36).substring(2, 9) : data.bank_account_name,
        bank_account: isshop.value ? Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join('') : data.bank_account,
        pct_roll_casino: Number(data.pct_roll_casino),
        pct_roll_slot: Number(data.pct_roll_slot),
        pct_lose_casino: 0,
        pct_lose_slot: 0,
        isshop: isshop.value
      })
        .then(() => {
          Swal.fire(
            t("Partner.Tab.AddSubMember"),
            t("Partner.AddSubSuccess"),
            "success"
          );
        })
        .catch((e: { response: { data: { message: string; }; }; }) =>
          Swal.fire(
            t("Partner.Tab.AddSubMember"),
            t("Partner." + e.response.data.message),
            "error"
          )
        );
    };

    onMounted(() => getMasterSettlementTypes());

    return {
      // Settlement Type for viewing
      masterSettlement,
      // Filter
      banks,
      losingType,
      rollingType,
      // create agent
      createSubMember,
      userType,
      isshop,
      getValidationSchema
    };
  },
});
</script>
<style>
.modal {
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.fv-help-block {
  color: red;
  font-size: 0.8em;
  margin-top: 0.4em;
}
</style>
  