<template>
  <div class="joinModal modal fade" tabindex="-1" role="dialog" id="loginModal">
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
                <span class="title">{{ $t("auth.Login") }} </span>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal -->
        <div class="modal-body">
          <!-- Login Body -->
          <div class="login-body">
            <a href="javascript:void(0);" class="modal-logo">
              <img class="w-40" src="/img/logo/logo.webp" />
            </a>
            <div class="container-fluid px-md-3 pt-md-5 px-0">
              <Form class="form" @submit="onLogin" :validation-schema="rules">
                <div class="row">
                  <div class="col-12 col-md-12">
                    <div class="form-container">
                      <!-- ID -->
                      <div class="form-group">
                        <div class="labels w-ba">
                          <span>{{ $t("auth.ID") }} </span>
                        </div>
                        <div class="infos">
                          <div class="input-container">
                            <Field
                              class="form-control form-control-solid"
                              type="text"
                              name="username"
                              autocomplete="off"
                            />
                          </div>
                          <!-- Error -->
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block text-danger">
                              <ErrorMessage name="username" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- Password -->
                      <div class="form-group">
                        <div class="labels w-ba">
                          <span>{{ $t("auth.Password") }}</span>
                        </div>
                        <div class="infos">
                          <div class="input-container">
                            <Field
                              class="form-control form-control-solid"
                              type="password"
                              name="password"
                              autocomplete="off"
                            />
                          </div>
                          <!-- Error -->
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block text-danger">
                              <ErrorMessage name="password" />
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
                            <Field
                              class="form-control form-control-solid"
                              type="number"
                              name="captcha"
                              autocomplete="off"
                            />
                          </div>
                          <div class="fv-plugins-message-container">
                            <div class="fv-help-block text-danger">
                              <ErrorMessage name="captcha" />
                            </div>
                          </div>
                        </div>
                      </div>-->
                    </div>
                  </div>
                </div>
                <div class="form-footer dflex-ac-jc">
                  <button type="submit" :disabled="isLoading" class="btn btn-primary btn-purple-bg">
                    {{ $t("auth.Login") }}
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
import { defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
import { useAppStore } from "@/stores/app";

interface ILogin {
  username: string;
  password: string;
  captcha: number;
}

export default defineComponent({
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    // vue variable
    const appStore = useAppStore();
    const authStore = useAuthStore();
    const { t } = useI18n();

    const isLoading = ref(false);

    // page
    const rules = Yup.object().shape({
      username: Yup.string().required(t("auth.UsernameCheck")),
      password: Yup.string().min(5).required(t("auth.PasswordCheck")),
      // captcha: Yup.number().required(t("auth.CaptchaCheck")).typeError(t("Partner.Validation.Numeric", { field: "Captcha" })),
    });
    /**
     * Login
     *
     */
    async function onLogin(data: ILogin, { resetForm }) {
      isLoading.value = true;
      const resp = await authStore.login(data);

      if (!resp.success) {
        Swal.fire(t("auth.Login"), t("notif." + resp.msg), "error");
        // get new captcha
        // authStore.getCaptcha();
        resetForm();
        isLoading.value = false;
        return false;
      }
      isLoading.value = false;
      // reload page
      window.location.reload();
      // close modal
      appStore.openModal("");

      const close = document.getElementById("kt_close");
      if (close) close.click();
    }

    return {
      authStore,
      appStore,
      rules,
      onLogin,
      isLoading,
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
