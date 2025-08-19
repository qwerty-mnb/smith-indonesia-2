<template>
  <div
    class="joinModal modal fade"
    tabindex="-1"
    role="dialog"
    id="staticBackdrop"
  >
    <div class="modal-dialog modal-dialog-centered login-modal" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            data-bs-dismiss="modal"
            class="modal-close-btn w-ba"
            id="kt_close"
          ></button>
          <div class="modal-banner">
            <div class="modal-title">
              <div class="title-panel">
                <span class="title">{{ $t("auth.Register") }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <div class="login-body">
            <a href="javascript:void(0);" class="modal-logo">
              <img class="w-40" src="/img/logo/logo.webp" />
            </a>
            <div class="container-fluid px-md-3 pt-md-5 px-0">
              <Form
                class="form"
                @submit="onSubmit"
              >
                <div class="row">
                  <div class="col-12">
                    <div class="form-container">
                      <!-- ID -->
                      <div class="form-group">
                        <div class="labels w-ba">
                          <span>{{ $t("register.ID") }}</span>
                        </div>
                        <div class="infos">
                          <div class="input-container">
                            <input
                              v-model="usernameValue"
                              class="form-control form-control-solid"
                              type="text"
                              name="username"
                              :placeholder="$t('register.IDCheck')"
                              autocomplete="off"
                            />
                          </div>
                          <!-- Error -->
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block text-danger">
                              <span>{{ errors.username }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Password -->
                      <div class="form-group">
                        <div class="labels w-ba">
                          <span>{{ $t("register.Password") }}</span>
                        </div>
                        <div class="infos">
                          <div class="input-container">
                            <input
                              v-model="passwordValue"
                              class="form-control form-control-solid"
                              type="password"
                              name="password"
                              autocomplete="off"
                            />
                          </div>
                          <!-- Error -->
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block text-danger">
                              <span>{{ errors.password }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Confirm Password -->
                      <div class="form-group">
                        <div class="labels w-ba">
                          <span>{{ $t("register.ConfirmPass") }}</span>
                        </div>
                        <div class="infos">
                          <div class="input-container">
                            <input
                              v-model="confirm_passValue"
                              class="form-control form-control-solid"
                              type="password"
                              name="confirm_pass"
                              :placeholder="$t('register.PassCheck')"
                              autocomplete="off"
                            />
                          </div>
                          <!-- Error -->
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block text-danger">
                              <span>{{ errors.confirm_pass }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Nickname -->
                      <div class="form-group">
                        <div class="labels w-ba">
                          <span>{{ $t("register.Nickname") }}</span>
                        </div>
                        <div class="infos">
                          <div class="input-container">
                            <input
                              v-model="nameValue"
                              class="form-control form-control-solid"
                              type="text"
                              name="name"
                              :placeholder="$t('register.NicknameCheck')"
                              autocomplete="off"
                            />
                          </div>
                          <!-- Error -->
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block text-danger">
                              <span>{{ errors.name }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Phone -->
                      <div class="form-group">
                        <div class="labels w-ba">
                          <span>{{ $t("register.Phone") }}</span>
                        </div>
                        <div class="infos">
                          <div class="input-container">
                            <input
                              v-model="mobileValue"
                              class="form-control form-control-solid"
                              type="text"
                              name="mobile"
                              :placeholder="$t('register.PhoneCheck')"
                              autocomplete="off"
                            />
                          </div>
                          <!-- Error -->
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block text-danger">
                              <span>{{ errors.mobile }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-container">
                      <!-- Bank Name -->
                      <div class="form-group">
                        <div class="labels w-ba">
                          <span>{{ $t("register.BankName") }}</span>
                        </div>
                        <div class="infos">
                          <div class="input-container">
                            <select
                              v-model="bank_nameValue"
                              class="form-control form-control-solid"
                              name="bank_name"
                              as="select"
                              autocomplete="off"
                              :value="banks[0]"
                            >
                              <option
                                v-for="(item, i) in banks"
                                :key="i"
                                :value="item"
                              >
                                {{ item }}
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <!-- Bank Account Name -->
                      <div class="form-group">
                        <div class="labels w-ba">
                          <span>{{ $t("register.BankAccountName") }}</span>
                        </div>
                        <div class="infos">
                          <div class="input-container">
                            <input
                              v-model="bank_account_nameValue"
                              class="form-control form-control-solid"
                              type="text"
                              name="bank_account_name"
                              autocomplete="off"
                            />
                          </div>
                          <!-- Error -->
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block text-danger">
                              <span>{{ errors.bank_account_name }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Bank Account -->
                      <div class="form-group">
                        <div class="labels w-ba">
                          <span>{{ $t("register.BankAccount") }}</span>
                        </div>
                        <div class="infos">
                          <div class="input-container">
                            <input
                              v-model="bank_accountValue"
                              class="form-control form-control-solid"
                              type="text"
                              name="bank_account"
                              :placeholder="$t('register.BankAccountCheck')"
                              autocomplete="off"
                            />
                          </div>
                          <!-- Error -->
                          <div class="fv-plugins-message-container">
                            <div class="fv-plugins-message-container">
                              <div class="fv-help-block text-danger">
                                <span>{{ errors.bank_account }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Recommand -->
                      <div class="form-group">
                        <div class="labels w-ba">
                          <span>{{ $t("register.Recommand") }}</span>
                        </div>
                        <div class="infos">
                          <div class="input-container">
                            <input
                              v-model="recommandValue"
                              class="form-control form-control-solid"
                              type="text"
                              name="recommand"
                              :placeholder="$t('register.RecommandCheck')"
                              autocomplete="off"
                            />
                          </div>
                          <!-- Error -->
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block text-danger">
                              <span>{{ errors.recommand }}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Captcha -->
                      <!---<div class="form-group">
                        <div class="labels w-ba">
                          <span>{{ $t("auth.Captcha") }}</span>
                        </div>
                        <span class="mx-12" v-html="authStore.cvalue" />
                        <div class="infos mt-4">
                          <div class="input-container">
                            <input
                              v-model="captchaValue"
                              class="form-control form-control-solid"
                              type="text"
                              name="captcha"
                              autocomplete="off"
                            />
                          </div>
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block text-danger">
                              <span>{{ errors.captcha }}</span>
                            </div>
                          </div>
                        </div>
                      </div>-->
                    </div>
                  </div>
                </div>
                <div class="form-footer dflex-ac-jc">
                  <button type="submit" :disabled="isLoading" class="btn btn-primary btn-black-bg">
                    {{ $t("auth.Register") }}
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { ErrorMessage, Field, Form, useForm, useField } from "vee-validate";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";

interface IRegForm {
  username: string;
  password: string;
  confirm_pass: string;
  name: string;
  mobile: number;
  bank_name: string;
  bank_account_name: string;
  bank_account: number;
  recommand: string;
  captcha: number;
}

export default defineComponent({
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    // vue variables
    const appStore = useAppStore();
    const authStore = useAuthStore();
    const { t } = useI18n();

    const isLoading = ref(false);
    // page
    const banks = [
      "KB국민은행",
      "신한은행",
      "우리은행",
      "KEB하나은행",
      "카카오뱅크",
      "카카오증권",
      "KDB산업은행",
      "IBK기업은행",
      "NH농협은행",
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
      "미래애셋",
      "SC제일은행",
      "케이뱅크",
    ];

    const rules = Yup.object().shape({
      username: Yup.string()
        .min(3, t("register.IDCheck"))
        .max(7, t("register.IDCheck"))
        .required(t("register.IDCheck"))
        .trim()
        .matches(/^[a-z0-9]+$/i, t("register.IDCheck")),
      password: Yup.string().min(5).required(t("register.PassCheck")),
      confirm_pass: Yup.string()
        .required(t("register.PassCheck"))
        .oneOf([Yup.ref("password")], t("register.PassCheck")),
      name: Yup.string().min(2).max(7, t("register.NicknameMaxCheck")).required(t("register.NicknameCheck")),
      mobile: Yup.string()
        .min(8, t("register.PhoneCheck"))
        .max(12)
        .required(t("register.PhoneCheck"))
        .matches(/^[0-9]+$/i, t("register.PhoneCheck")),
      bank_name: Yup.string().required(t("register.Select")),
      bank_account_name: Yup.string()
        .required(t("register.BankAccountCheck"))
        .trim()
        .matches(/[^0-9.]/g, t("register.IDCheck")),
      bank_account: Yup.string()
        .required(t("register.PhoneCheck"))
        .min(10)
        .matches(/^[0-9]+$/i, t("register.PhoneCheck")),
      recommand: Yup.string().required(t("register.RecommandCheck")),
     // captcha: Yup.number().required(t("auth.CaptchaCheck")).typeError(t("Partner.Validation.Numeric", { field: "Captcha" })),
    });

    const { errors, handleSubmit, resetForm  } = useForm({
      validationSchema: rules,
      initialValues: {
        username: '',
        password: '',
        confirm_pass: '',
        name: '',
        mobile: '',
        bank_name: '',
        bank_account_name: '',
        bank_account: '',
        recommand: '',
        captcha: '',
      },
    });

    const { value: usernameValue } = useField('username');
    const { value: passwordValue } = useField('password');
    const { value: confirm_passValue } = useField('confirm_pass');
    const { value: nameValue } = useField('name');
    const { value: mobileValue } = useField('mobile');
    const { value: bank_nameValue } = useField('bank_name');
    const { value: bank_account_nameValue } = useField('bank_account_name');
    const { value: bank_accountValue } = useField('bank_account');
    const { value: recommandValue } = useField('recommand');
    const { value: captchaValue } = useField('captcha');

    function onSuccess(values) {
      onRegister(values);
      resetForm();
    }

    function onInvalidSubmit({ values, errors, results }) {
      var error_messages = "";
      const labels = {
        username: t("register.ID"),
        password: t("register.Password"),
        confirm_pass: t("register.ConfirmPass"),
        bank_account_name: t("register.BankAccountName"),
        bank_name: t("register.BankName"),
        name: t("register.Nickname"),
        mobile: t("register.Phone"),
        bank_account: t("register.BankAccount"),
        recommand: t("register.Recommand"),
        captcha: t("auth.Captcha")
      }

      for (const key in errors) {
        let key_val: any = key;
        let key_label = labels[key_val]; 
        error_messages += `<b style='color:#545454'>${key_label}</b>: ${errors[key]}. `+"<br/>";
      }
      
      Swal.fire({
        icon: 'error',
        title: t("auth.Register"),
        html: "<p style='text-align:justify; color:#f27474; padding-left: 1rem'>"+error_messages+"</p>"
      });
    }

    const onSubmit = handleSubmit(onSuccess, onInvalidSubmit);

    /**
     * Register
     *
     */
    async function onRegister(data: IRegForm) {
      isLoading.value = true;
      const resp = await authStore.register(data);

      if (!resp.success) {
        Swal.fire(t("auth.Register"), t("notif." + resp.msg), "error");
        // get new captcha
        // authStore.getCaptcha();
        isLoading.value = false;
        resetForm();
        return false;
      }
      isLoading.value = false;
      Swal.fire(t("auth.Register"), t("register.Success"), "success");

      appStore.openModal("");
    }

    return {
      authStore,
      appStore,
      banks,
      isLoading,
      onSubmit,
      errors,
      usernameValue,
      passwordValue,
      confirm_passValue,
      nameValue,
      mobileValue,
      bank_nameValue,
      bank_account_nameValue,
      bank_accountValue,
      recommandValue,
      captchaValue,
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

@media (min-width: 100px) and (max-width: 1160px) {
  .container-fluid {
    height: 600px;
    overflow: auto;
  }
}
</style>
