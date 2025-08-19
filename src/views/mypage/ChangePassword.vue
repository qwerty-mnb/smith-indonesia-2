<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6 col-offset-4 m-password">
        <div class="change-wrapper">
        </div>
        <Form class="form" @submit="onChangePass" :validation-schema="rules">
          <div class="box-container row">
            <div class="col-4">
              {{ $t("password.CurrentPassword") }}
            </div>
            <div class="col-8 transaction-item">
              <Field
                class="form-control"
                type="password"
                name="password"
                :placeholder="$t('password.CurrentPassword')"
                autocomplete="off"
              />
              <!-- Error -->
              <div class="fv-plugins-message-container">
                <div class="fv-help-block text-danger">
                  <ErrorMessage name="password" />
                </div>
              </div>
            </div>
          </div>
          <div class="box-container row">
            <div class="col-4">
              {{ $t("password.NewPassword") }}
            </div>
            <div class="col-8 transaction-item">
              <Field
                class="form-control"
                type="password"
                name="new_pass"
                :placeholder="$t('password.NewPassword')"
                autocomplete="off"
              />
              <!-- Error -->
              <div class="fv-plugins-message-container">
                <div class="fv-help-block text-danger">
                  <ErrorMessage name="new_pass" />
                </div>
              </div>
            </div>
          </div>
          <div class="box-container row">
            <div class="col-4">
              {{ $t("password.VerifyPassword") }}
            </div>
            <div class="col-8 transaction-item">
              <Field
                class="form-control"
                type="password"
                name="confirm_pass"
                :placeholder="$t('password.VerifyPassword')"
                autocomplete="off"
              />
              <!-- Error -->
              <div class="fv-plugins-message-container">
                <div class="fv-help-block text-danger">
                  <ErrorMessage name="confirm_pass" />
                </div>
              </div>
            </div>
          </div>
        <div class="box-container pt-4">
          <div class="col-12 form-footer dflex-ac-jc">
            <button class="btn btn-black-bg w-100 text-white">
              {{ $t("password.ChangePassword") }}
            </button>
          </div>
        </div>
        </Form>
      </div>
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
          Swal.fire(
            t("password.ChangePassword"),
            t("password.ResetPassword"),
            "success"
          )
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
      rules,
      onChangePass,
    };
  },
});
</script>

