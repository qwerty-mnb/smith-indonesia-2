<template>
<div class="site-content-container" data-container-background="general" style="--image-src: url(//d2rzzcn1jnr24x.cloudfront.net/Images/~normad-alpha/dark-purple/desktop/backgrounds/general.jpg?v=20250528);" bis_skin_checked="1">
    <div class="container" bis_skin_checked="1">
        <div class="row" bis_skin_checked="1">
            <div class="col-md-12" bis_skin_checked="1">
                <div class="standard-form-container register-page" bis_skin_checked="1">
                    <div class="row" bis_skin_checked="1">
                        <div class="col-md-4 text-center" bis_skin_checked="1">
                                <img src="https://api2-bd3.imgnxa.com/images/r96QGwANso/register_bbd08d87-902a-45a6-992b-bb22d082eff6_1753926985993.jpg" alt="Register">
                        </div>
                        <div class="col-md-8" bis_skin_checked="1">
                            <div class="standard-form-title" bis_skin_checked="1">Buat Akun</div>
                            <div class="standard-form-content" bis_skin_checked="1">


                                


<form action="/Register/RegisterSubmit?Length=8" data-ajax="true" data-ajax-begin="onAjaxRequestBegin" data-ajax-complete="onAjaxRequestComplete" data-ajax-method="POST" data-ajax-success="onRegisterAjaxRequestSuccess" data-copied-text="Disalin" id="register_form" method="post" novalidate="novalidate"><input name="__RequestVerificationToken" type="hidden" value="CituTOknoumA3Ex1BEt_gOMgpevImrgd5sqMK4eMUoP1qD38jnvv7hq0-MIoPfaS7i5OBR-syKq-gb0eV3Dh9XHlsGw1">    <div class="standard-sub-section" bis_skin_checked="1">
        <div class="form-group" bis_skin_checked="1">
            <div class="alert-danger" id="register_alert" hidden="" bis_skin_checked="1"></div>
        </div>
        <div class="form-group" bis_skin_checked="1">
            <div class="alert-success" id="register_success_alert" hidden="" bis_skin_checked="1"></div>
        </div>
    </div>
    <div class="standard-sub-section" bis_skin_checked="1">
        <div class="standard-form-title" bis_skin_checked="1">
            Informasi Pribadi
        </div>
        <div class="standard-form-content form_subcategory" bis_skin_checked="1">
            <div class="standard-inline-form-group" bis_skin_checked="1">
                <label for="UserName">Nama Pengguna</label>
                <div data-section="asterisk" bis_skin_checked="1">*</div>
                <div data-section="input" bis_skin_checked="1">
                    <input maxlength="12" autocomplete="off" class="form-control lowercase" data-val="true" data-val-regex="Harap masukkan antara 3 - 12 karakter dalam alfanumerik.&lt;br&gt;Nama pengguna tidak boleh memiliki spasi." data-val-regex-pattern="^[0-9a-zA-Z]{3,12}$" data-val-remote="'UserName' is invalid." data-val-remote-additionalfields="*.UserName" data-val-remote-url="/validate/username" data-val-required="Harap masukkan antara 3 - 12 karakter dalam alfanumerik.&lt;br&gt;Nama pengguna tidak boleh memiliki spasi." id="username_field" name="UserName" placeholder="Nama Pengguna Anda" type="text" value="">
                    <span class="field-validation-valid standard-required-message" data-valmsg-for="UserName" data-valmsg-replace="true"></span>
                </div>
            </div>
            <div class="standard-inline-form-group" bis_skin_checked="1">
                <label for="Password">Kata Sandi</label>
                <div data-section="asterisk" bis_skin_checked="1">*</div>
                <div data-section="input" class="standard-password-field" bis_skin_checked="1">
                    <input maxlength="20" class="form-control" data-val="true" data-val-regex="The field Password must match the regular expression '^(?=.{8,20}$)[A-Za-z0-9!@#$%^*()_+=\[\]{}|:;&quot;',.?/~`\\-]+$'." data-val-regex-pattern="^(?=.{8,20}$)[A-Za-z0-9!@#$%^*()_+=\[\]{}|:;&quot;',.?/~`\\-]+$" data-val-required="The Password field is required." id="password_field" name="Password" placeholder="Kata Sandi Anda" type="password">
                    <span class="standard-required-message">Kata Sandi harus terdiri dari 8-20 karakter, harus mengandung huruf dan angka, dan tidak boleh mengandung simbol &amp;, &lt;, atau &gt;.</span>
                    <div class="password-validations" id="password_validations" style="display: none;" bis_skin_checked="1">
    <div id="password_username_validation" style="color: green;" bis_skin_checked="1">
        <i class="glyphicon glyphicon-ok" style="color: green;"></i>
        Kata sandi tidak boleh mengandung nama pengguna.
    </div>
    <div id="password_symbol_validation" style="color: green;" bis_skin_checked="1">
        <i class="glyphicon glyphicon-ok" style="color: green;"></i>
        Kata sandi tidak boleh mengandung simbol &amp;, &lt;, atau &gt;
    </div>
    <div id="password_length_validation" style="color: red;" bis_skin_checked="1">
        <i class="glyphicon glyphicon-exclamation-sign" style="color: red;"></i>
        Terdiri dari 8-20 karakter.
    </div>
    <div id="password_alphanumeric_validation" style="color: red;" bis_skin_checked="1">
        <i class="glyphicon glyphicon-exclamation-sign" style="color: red;"></i>
        Mengandung 1 angka dan 1 huruf.
    </div>
</div>

                    <i class="glyphicon glyphicon-eye-close password_input_trigger"></i>
                </div>
            </div>
            <div class="standard-inline-form-group" bis_skin_checked="1">
                <label for="ConfirmedPassword">Ulangi Kata Sandi</label>
                <div data-section="asterisk" bis_skin_checked="1">*</div>
                <div data-section="input" class="standard-password-field" bis_skin_checked="1">
                    <input maxlength="20" class="form-control" data-val="true" data-val-equalto="'ConfirmedPassword' and 'Password' do not match." data-val-equalto-other="*.Password" data-val-required="The ConfirmedPassword field is required." id="ConfirmedPassword" name="ConfirmedPassword" placeholder="Ulangi Kata Sandi Anda" type="password">
                    <span class="standard-required-message">Konfirmasi kata sandi tidak cocok!</span>
                    <i class="glyphicon glyphicon-eye-close password_input_trigger"></i>
                </div>
            </div>
                                                    <div class="standard-inline-form-group" bis_skin_checked="1">
                    <label for="Email">Email</label>
                    <div data-section="input" bis_skin_checked="1">
<input maxlength="100" autocomplete="off" class="form-control" data-val="true" data-val-email="Email salah." data-val-remote="'Email' is invalid." data-val-remote-additionalfields="*.Email" data-val-remote-url="/validate/email" id="Email" name="Email" placeholder="Email@contoh.com" type="text" value="">                        <span class="field-validation-valid standard-required-message" data-valmsg-for="Email" data-valmsg-replace="true"></span>
                    </div>
                </div>
                <div class="standard-inline-form-group" bis_skin_checked="1">
                    <div data-section="input" bis_skin_checked="1">
                        Silakan masukkan email yang aktif untuk tujuan reset kata sandi
                    </div>
                </div>
                                        <div class="standard-inline-form-group" bis_skin_checked="1">
                    <label for="Whatsapp">WhatsApp</label>
                    <div data-section="input" bis_skin_checked="1">
<input class="form-control format_phone" data-val="true" data-val-regex="Harap masukkan numerik saja" data-val-regex-pattern="^(?=.*[0-9])[0-9\-]+$" data-val-remote="'WhatsApp' is invalid." data-val-remote-additionalfields="*.WhatsApp" data-val-remote-url="/validate/whatsapp" id="WhatsApp" inputmode="decimal" name="WhatsApp" placeholder="Nomor WhatsApp" type="text" value="" maxlength="16">                        <span class="field-validation-valid standard-required-message" data-valmsg-for="WhatsApp" data-valmsg-replace="true"></span>
                    </div>
                </div>
                                                                                        <div class="standard-inline-form-group referral-glyphicon-container" bis_skin_checked="1">
                    <div class="referral-code-header" id="referral_code_header" bis_skin_checked="1">
                        <span>Kode Referral</span>
                        <span class="toggler" id="referral_code_detail_toggler">
                            <i class="glyphicon glyphicon-chevron-right"></i>
                        </span>
                    </div>
                    <div data-section="input" class="referral-code-content" id="referral_code_content" bis_skin_checked="1">
<input autocomplete="off" class="form-control referral-code-input" id="ReferrerCode" name="ReferrerCode" placeholder="Kode Referral" readonly="true" type="text" value="makemoney">                    </div>
                </div>
        </div>
    </div>
        <div class="standard-sub-section" id="bank_account_section" bis_skin_checked="1">
            <div class="standard-form-title" bis_skin_checked="1">
                Informasi Pembayaran
            </div>
            <div class="standard-form-content form_subcategory" bis_skin_checked="1">
                <div class="standard-inline-form-group" bis_skin_checked="1">
                    <label for="SelectedBank">Metode Pembayaran</label>
                    <div data-section="input" class="payment-method-container" bis_skin_checked="1">
                        <label>
                            <input type="radio" name="bank_section_radio_group" value="bank" checked="">
                            BANK
                        </label>
                    </div>
                </div>
                <div class="standard-inline-form-group" bis_skin_checked="1">
                    <label for="SelectedBank">Bank</label>
                        <div data-section="asterisk" bis_skin_checked="1">*</div>
                    <div data-section="input" bis_skin_checked="1">
<select class="form-control" data-val="true" data-val-required="Bank harus diisi." id="selected_bank_select" name="SelectedBank"><option value="">-- Pilih Bank --</option>
<option value="e1bab23f-dda6-4835-b3ce-d5039f28546c">BCA</option>
<option value="3d30334c-d871-46fb-80b3-0fcb12f99b87">BNI</option>
<option value="a458ab91-91a3-49ac-98b3-1bfc5d1966bd">BRI</option>
<option value="d97905f0-ef0d-4e31-ad96-f4dc69dedbe5">BSI</option>
<option value="a54b63b0-4aee-49bc-b65d-21a61dd50e0f">CIMB</option>
<option value="60a8bb30-c0d8-4fd2-9646-5d79cca114ec">DANA</option>
<option value="67568e69-ca77-43c8-bf9b-df628bc3b2d6">DANAMON</option>
<option value="f3a032d6-dd8e-4652-978c-6678addbf211">GOPAY</option>
<option value="5991bbaf-9b29-4523-89e5-2ab8fd5ccbc7">JAGO</option>
<option value="6faf0720-db16-459e-904d-09d64d7c2483">LINKAJA</option>
<option value="ec4427ff-2e6e-4657-a2fe-b3702bc15e7c">MANDIRI</option>
<option value="97b7b74f-ed25-4483-b697-8e97fb5692a4">OVO</option>
<option value="3201c5d4-316a-4c64-a536-4282c716a57b">QRIS AUTO</option>
<option value="c3c024bc-e8e6-41b4-beba-103b109c7221">SEABANK</option>
</select>                        <span class="field-validation-valid standard-required-message" data-valmsg-for="SelectedBank" data-valmsg-replace="true"></span>
                    </div>
                </div>
                <div class="standard-inline-form-group" bis_skin_checked="1">
                    <label for="BankAccountNumber">Nomor Rekening</label>
                        <div data-section="asterisk" bis_skin_checked="1">*</div>
                    <div data-section="input" bis_skin_checked="1">
<input maxlength="24" autocomplete="off" class="form-control format_account_number" data-val="true" data-val-regex="The field BankAccountNumber must match the regular expression '^[0-9\-]+$'." data-val-regex-pattern="^[0-9\-]+$" data-val-required="Nomor rekening bank diperlukan (hanya nomor yang diperbolehkan)." id="bank_account_number_input" name="BankAccountNumber" placeholder="Nomor rekening anda" type="text" value="">                        <span class="field-validation-valid standard-required-message" data-valmsg-for="BankAccountNumber" data-valmsg-replace="true"></span>
                    </div>
                </div>
                <div class="standard-inline-form-group" bis_skin_checked="1">
                    <label for="BankAccountName">Nama Lengkap</label>
                        <div data-section="asterisk" bis_skin_checked="1">*</div>
                    <div data-section="input" bis_skin_checked="1">
<input maxlength="100" autocomplete="off" class="form-control" data-val="true" data-val-equal-to="Nama rekening harus sama dengan nama lengkap Anda." data-val-regex="The field BankAccountName must match the regular expression '^[\u4e00-\u9fa5\u0E00-\u0E7F\u0400-\u04FF\u00C0-\u00FF\u0100-\u017F\u0180-\u024Fa-zA-Z0-9\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\u0905-\u097F\u3000 ]+$'." data-val-regex-pattern="^[\u4e00-\u9fa5\u0E00-\u0E7F\u0400-\u04FF\u00C0-\u00FF\u0100-\u017F\u0180-\u024Fa-zA-Z0-9\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\u0905-\u097F\u3000 ]+$" data-val-required="Silakan masukkan nama lengkap yang valid (hanya karakter alfanumerik yang diperbolehkan)." id="bank_account_name_input" name="BankAccountName" placeholder="Nama Lengkap Anda" type="text" value="">                        <span class="standard-required-message">Nama lengkap hanya boleh berisi karakter alfanumerik.</span>
                    </div>
                </div>
            </div>
        </div>
    <div class="standard-sub-section" bis_skin_checked="1">
        <div class="standard-form-title" bis_skin_checked="1">
            Lainnya
        </div>
        <div class="standard-form-content form_subcategory" bis_skin_checked="1">
                <div class="standard-inline-form-group" bis_skin_checked="1">
                    <label for="SelectedSourceInformation">Bagaimana Anda mengetahui situs kami?</label>
                        <div data-section="asterisk" bis_skin_checked="1">*</div>
                    <div data-section="input" bis_skin_checked="1">
<select class="form-control" id="SelectedSourceInformation" name="SelectedSourceInformation" required="required"><option value="">-- Pilih Sumber Informasi --</option>
<option value="Google">Google</option>
<option value="Facebook">Facebook</option>
<option value="Instagram">Instagram</option>
<option value="TikTok">TikTok</option>
<option value="Youtube">Youtube</option>
<option value="Teman">Teman</option>
</select>                        <span class="standard-required-message">Tolong pilih sumber informasi!</span>
                    </div>
                </div>
                            <div class="standard-inline-form-group" bis_skin_checked="1">
                    <label for="VerificationCode">Kode Verifikasi</label>
                    <div data-section="asterisk" bis_skin_checked="1">*</div>
                    <div data-section="input" class="captcha-input" bis_skin_checked="1">
                        <input autocomplete="off" class="form-control" data-val="true" data-val-required="The VerificationCode field is required." id="VerificationCode" name="VerificationCode" placeholder="Kode Verifikasi" type="text" value="">
                        <span class="standard-required-message">Silakan masukkan CAPTCHA!</span>
                        <div class="captcha-container" bis_skin_checked="1">
                            <i class="glyphicon glyphicon-refresh refresh-captcha-button" id="refresh_captcha_button"></i>
                            <img id="captcha_image" src="/captcha" alt="Capthca">
                        </div>
                    </div>
                </div>
        </div>
    </div>
    <div class="standard-button-group" bis_skin_checked="1">
        <input type="submit" class="btn btn-primary" id="register_submit_button" value="DAFTAR!">
    </div>
</form>

                                <div class="register-page-reminder" bis_skin_checked="1">
                                    Dengan klik tombol DAFTAR, saya menyatakan bahwa saya berumur diatas 18 tahun. Saya telah membaca dan menyetujui Syarat dan Ketentuan dari BD303.
                                </div>
                                <div class="register-page-link" bis_skin_checked="1">
                                    <a href="javascript:window.openPopup('/desktop/terms-of-use','T&amp;C-Page')" bis_skin_checked="1">
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
