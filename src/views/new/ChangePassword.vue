<template>
  <div class="tab-content-container" bis_skin_checked="1">
    <div class="standard-form-title" bis_skin_checked="1">
      {{ t("password.ChangePassword") }}
    </div>
    <div class="standard-form-content" bis_skin_checked="1">
      <div class="standard-form-note" bis_skin_checked="1">
        <span>Catatan:</span>
        <ol>
          <li>Kata Sandi harus terdiri dari 8-20 karakter.</li>
          <li>Kata Sandi harus mengandung huruf dan angka.</li>
          <li>Kata Sandi tidak boleh mengandung username.</li>
          <li>Kata Sandi tidak boleh mengandung simbol &amp;, &lt;, atau &gt;</li>
        </ol>
      </div>
      <Form class="form" @submit="onChangePass" :validation-schema="rules">
        <div class="standard-inline-form-group" bis_skin_checked="1">
          <label for="OldPassword">{{ t("password.CurrentPassword") }}</label>
          <div data-section="asterisk" bis_skin_checked="1">*</div>
          <div data-section="input" bis_skin_checked="1">
            <Field
              class="form-control"
              type="password"
              name="password"
              :placeholder="t('password.CurrentPassword')"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block text-danger">
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>
        </div>
        <!-- New Password -->
        <div class="standard-inline-form-group" bis_skin_checked="1">
          <label for="OldPassword">{{ t("password.NewPassword") }}</label>
          <div data-section="asterisk" bis_skin_checked="1">*</div>
          <div data-section="input" bis_skin_checked="1">
            <Field
              class="form-control"
              type="password"
              name="new_pass"
              :placeholder="t('password.NewPassword')"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block text-danger">
                <ErrorMessage name="new_pass" />
              </div>
            </div>
          </div>
        </div>

        <!-- New Password -->
        <div class="standard-inline-form-group" bis_skin_checked="1">
          <label for="OldPassword">{{ t("password.VerifyPassword") }}</label>
          <div data-section="asterisk" bis_skin_checked="1">*</div>
          <div data-section="input" bis_skin_checked="1">
            <Field
              class="form-control"
              type="password"
              name="confirm_pass"
              :placeholder="t('password.VerifyPassword')"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block text-danger">
                <ErrorMessage name="confirm_pass" />
              </div>
            </div>
          </div>
        </div>

        <hr class="otp-hr" />

        <div class="standard-button-group" bis_skin_checked="1">
          <input type="submit" class="btn btn-primary" :value="t('password.ChangePassword')" />
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { Form, ErrorMessage, Field } from "vee-validate";
import Swal from "sweetalert2";
import * as Yup from "yup";
import ApiService from "@/services/ApiService";

interface IChangePass {
  password: string;
  new_pass: string;
  confirm_pass: string;
}

export default defineComponent({
  name: "ChangePassword",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    // vue variables
    const { t } = useI18n();

    // page variables
    const rules = Yup.object().shape({
      password: Yup.string().min(5).required(),
      new_pass: Yup.string().min(5).required(),
      confirm_pass: Yup.string().min(5).required(),
    });

    async function onChangePass(data: IChangePass) {
      await ApiService.post("/auth/change-pass", {
        password: data.password,
        new_pass: data.new_pass,
        confirm_pass: data.confirm_pass,
      })
        .then(() =>
          Swal.fire(t("password.ChangePassword"), t("password.ResetPassword"), "success")
        )
        .catch((e) =>
          Swal.fire(
            t("password.ChangePassword"),
            t(`password.${e.response.data.message}`),
            "error"
          )
        );
    }

    return {
      t,
      rules,
      onChangePass,
    };
  },
});
</script>
