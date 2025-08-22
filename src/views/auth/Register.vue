<template>
  <div
    class="site-content-container"
    data-container-background="general"
    style="
      --image-src: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/backgrounds/general.jpg?v=20250528);
    "
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="standard-form-container register-page">
            <div class="row">
              <div class="col-md-4 text-center">
                <img
                  src="https://api2-bd3.imgnxa.com/images/r96QGwANso/register_bbd08d87-902a-45a6-992b-bb22d082eff6_1753926985993.jpg"
                  alt="Register"
                />
              </div>
              <div class="col-md-8">
                <div class="standard-form-title">Buat Akun</div>
                <div class="standard-form-content">
                  <Form class="form" @submit="onSubmit">
                    <!-- <input
                      name="__RequestVerificationToken"
                      type="hidden"
                      value="CituTOknoumA3Ex1BEt_gOMgpevImrgd5sqMK4eMUoP1qD38jnvv7hq0-MIoPfaS7i5OBR-syKq-gb0eV3Dh9XHlsGw1"
                    />
                    <div class="standard-sub-section" bis_skin_checked="1">
                      <div class="form-group" bis_skin_checked="1">
                        <div
                          class="alert-danger"
                          id="register_alert"
                        ></div>
                      </div>
                      <div class="form-group" bis_skin_checked="1">
                        <div
                          class="alert-success"
                          id="register_success_alert"
                        ></div>
                      </div>
                    </div> -->
                    <div class="standard-sub-section">
                      <div class="standard-form-title">Informasi Pribadi</div>
                      <div class="standard-form-content form_subcategory">
                        <div class="standard-inline-form-group">
                          <label>{{ $t("register.ID") }}</label>
                          <div data-section="asterisk">*</div>
                          <div data-section="input">
                            <input
                              v-model="usernameValue"
                              class="form-control lowercase h-[40px]"
                              type="text"
                              name="username"
                              :placeholder="t('register.IDCheck')"
                              autocomplete="off"
                            />
                            <div class="fv-plugins-message-container">
                              <div class="fv-help-block text-danger">
                                <span class="text-[12px]">{{ errors.username }}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- Password -->
                        <div class="standard-inline-form-group">
                          <label>{{ t("register.Password") }}</label>
                          <div data-section="asterisk">*</div>
                          <div data-section="input">
                            <input
                              v-model="passwordValue"
                              class="form-control lowercase h-[40px]"
                              type="password"
                              name="password"
                            />
                            <!-- Error -->
                            <div class="fv-plugins-message-container">
                              <div class="fv-help-block text-danger">
                                <span class="text-[12px]">{{ errors.password }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- Confirm Password -->
                        <div class="standard-inline-form-group">
                          <label>{{ t("register.ConfirmPass") }}</label>
                          <div data-section="asterisk">*</div>
                          <div data-section="input">
                            <input
                              v-model="confirm_passValue"
                              class="form-control lowercase h-[40px]"
                              type="password"
                              name="confirm_pass"
                            />
                            <!-- Error -->
                            <div class="fv-plugins-message-container">
                              <div class="fv-help-block text-danger">
                                <span class="text-[12px]">{{ errors.confirm_pass }}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- Nickname -->
                        <div class="standard-inline-form-group">
                          <label>{{ t("register.Nickname") }}</label>
                          <div data-section="asterisk">*</div>
                          <div data-section="input">
                            <input
                              v-model="nameValue"
                              class="form-control lowercase h-[40px]"
                              type="text"
                              name="name"
                              :placeholder="t('register.NicknameCheck')"
                              autocomplete="off"
                            />
                            <!-- Error -->
                            <div class="fv-plugins-message-container">
                              <div class="fv-help-block text-danger">
                                <span class="text-[12px]">{{ errors.name }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- Phone -->
                        <div class="standard-inline-form-group">
                          <label>{{ t("register.Phone") }}</label>
                          <div data-section="asterisk">*</div>
                          <div data-section="input">
                            <input
                              v-model="mobileValue"
                              class="form-control lowercase h-[40px]"
                              type="text"
                              name="mobile"
                              :placeholder="t('register.PhoneCheck')"
                              autocomplete="off"
                            />
                            <!-- Error -->
                            <div class="fv-plugins-message-container">
                              <div class="fv-help-block text-danger">
                                <span class="text-[12px]">{{ errors.mobile }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="standard-sub-section">
                      <div class="standard-form-title">Informasi Pembayaran</div>
                      <div class="standard-form-content form_subcategory">
                        <!-- Bank Account Name -->
                        <div class="standard-inline-form-group">
                          <label>{{ t("register.BankName") }}</label>
                          <div data-section="asterisk">*</div>
                          <div data-section="input">
                            <select
                              v-model="bank_nameValue"
                              class="form-control lowecase h-[40px]"
                              name="bank_name"
                              autocomplete="off"
                            >
                              <option v-for="(item, i) in banks" :key="i" :value="item">
                                {{ item }}
                              </option>
                            </select>
                          </div>
                        </div>

                        <!-- Bank Account Name -->
                        <div class="standard-inline-form-group">
                          <label>{{ t("register.BankAccountName") }}</label>
                          <div data-section="asterisk">*</div>
                          <div data-section="input">
                            <input
                              v-model="bank_account_nameValue"
                              class="form-control lowercase h-[40px]"
                              type="text"
                              name="bank_account_name"
                              autocomplete="off"
                            />
                            <!-- Error -->
                            <div class="fv-plugins-message-container">
                              <div class="fv-help-block text-danger">
                                <span class="text-[12px]">{{
                                  errors.bank_account_name
                                }}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- Bank Account -->
                        <div class="standard-inline-form-group">
                          <label>{{ t("register.BankAccount") }}</label>
                          <div data-section="asterisk">*</div>
                          <div data-section="input">
                            <input
                              v-model="bank_accountValue"
                              class="form-control lowercase h-[40px]"
                              type="text"
                              name="bank_account"
                              :placeholder="$t('register.BankAccountCheck')"
                              autocomplete="off"
                            />
                            <!-- Error -->
                            <div class="fv-plugins-message-container">
                              <div class="fv-help-block text-danger">
                                <span class="text-[12px]">{{ errors.bank_account }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="standard-sub-section">
                      <div class="standard-form-title">Recommand</div>
                      <div class="standard-form-content form_subcategory">
                        <!-- Recommand -->
                        <div class="standard-inline-form-group">
                          <label>{{ t("register.Recommand") }}</label>
                          <div data-section="asterisk">*</div>
                          <div data-section="input">
                            <input
                              v-model="recommandValue"
                              class="form-control lowercase h-[40px]"
                              type="text"
                              name="recommand"
                              :placeholder="$t('register.RecommandCheck')"
                            />
                            <!-- Error -->
                            <div class="fv-plugins-message-container">
                              <div class="fv-help-block text-danger">
                                <span class="text-[12px]">{{ errors.recommand }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- Captcha -->
                        <!-- <div class="standard-inline-form-group">
                          <label>{{ t("auth.Captcha") }}</label>
                          <div data-section="asterisk">*</div>
                          <div data-section="input">
                            <span class="mx-12" v-html="authStore.cvalue" />
                            <input
                              v-model="captchaValue"
                              class="form-control lowercase h-[40px]"
                              type="text"
                              name="captcha"
                              :placeholder="$t('register.RecommandCheck')"
                            />
                   
                            <div class="fv-plugins-message-container">
                              <div class="fv-help-block text-danger">
                                <span class="text-[12px]">{{ errors.captcha }}</span>
                              </div>
                            </div>
                          </div>
                        </div> -->
                      </div>
                    </div>
                   
                    <div class="standard-button-group" bis_skin_checked="1">
                      <input
                        type="submit"
                        :disabled="isLoading"
                        class="btn btn-primary"
                        value="DAFTAR!"
                      />
                    </div>
                  </Form>

                  <div class="register-page-reminder" bis_skin_checked="1">
                    Dengan klik tombol DAFTAR, saya menyatakan bahwa saya berumur diatas
                    18 tahun. Saya telah membaca dan menyetujui Syarat dan Ketentuan dari
                    BD303.
                  </div>
                  <div class="register-page-link" bis_skin_checked="1">
                    <a
                      href="javascript:window.openPopup('/desktop/terms-of-use','T&amp;C-Page')"
                      bis_skin_checked="1"
                    >
                      SYARAT &amp; KETENTUAN
                    </a>
                  </div>
                </div>
              </div>
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
      name: Yup.string()
        .min(2)
        .max(7, t("register.NicknameMaxCheck"))
        .required(t("register.NicknameCheck")),
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

    const { errors, handleSubmit, resetForm } = useForm({
      validationSchema: rules,
      initialValues: {
        username: "",
        password: "",
        confirm_pass: "",
        name: "",
        mobile: "",
        bank_name: "",
        bank_account_name: "",
        bank_account: "",
        recommand: "",
        captcha: "",
      },
    });

    const { value: usernameValue } = useField("username");
    const { value: passwordValue } = useField("password");
    const { value: confirm_passValue } = useField("confirm_pass");
    const { value: nameValue } = useField("name");
    const { value: mobileValue } = useField("mobile");
    const { value: bank_nameValue } = useField("bank_name");

    // Set default value to first bank
    if (banks.length > 0) {
      bank_nameValue.value = banks[0];
    }

    const { value: bank_account_nameValue } = useField("bank_account_name");
    const { value: bank_accountValue } = useField("bank_account");
    const { value: recommandValue } = useField("recommand");
    const { value: captchaValue } = useField("captcha");

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
        captcha: t("auth.Captcha"),
      };

      for (const key in errors) {
        let key_val: any = key;
        let key_label = labels[key_val];
        error_messages +=
          `<b style='color:#545454'>${key_label}</b>: ${errors[key]}. ` + "<br/>";
      }

      Swal.fire({
        icon: "error",
        title: t("auth.Register"),
        html:
          "<p style='text-align:justify; color:#f27474; padding-left: 1rem'>" +
          error_messages +
          "</p>",
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
      t,
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
/* Input field focus styling */
.form-control:focus {
  background-color: #18041c !important;
  border: 1px solid rgba(173, 216, 230, 0.5) !important;
  box-shadow: 0 0 3px rgba(173, 216, 230, 0.2), 
              0 0 6px rgba(173, 216, 230, 0.1) !important;
  outline: none !important;
  transition: all 0.3s ease;
}

/* Base input styling */
.form-control {
  background-color: transparent;
  transition: all 0.3s ease;
}

/* Hover effect */
.form-control:hover {
  background-color: transparent;
}
</style>