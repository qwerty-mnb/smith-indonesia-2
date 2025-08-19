<template>
  <div class="mobile-login align-items-start" v-if="!authStore.isAuthenticated">
    <Form class="form" @submit="onLogin" :validation-schema="rules">

      <div class="row">
        <div class="col-8 col-md-8">
          <div class="form-container pt-3 pl-2">
            <!-- ID -->
            <div class="form-group">
              <div class="infos">
                <div class="input-container">
                  <Field
                    class="form-control form-control-solid"
                    type="text"
                    name="username"
                    autocomplete="off"
                    :placeholder="$t('auth.ID')"
                  />
                  <div class="fv-help-block text-danger">
                    <ErrorMessage name="username" />
                  </div>
                </div>
              </div>
            </div>
            <!-- Password -->
            <div class="form-group">
              <div class="infos">
                <div class="input-container">
                    
                  <Field
                    class="form-control form-control-solid"
                    type="password"
                    name="password"
                    autocomplete="off"
                    :placeholder="$t('auth.Password')"
                  />
                  <div class="fv-help-block text-danger">
                    <ErrorMessage name="password" />
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          <div class="form-container pl-2">
            <!-- Captcha -->
            <!---<div class="form-group">
              <div class="infos">
                
                <div class="input-container" style="display: flex;">
                  <span class="mx-12 captcha" style="width: 50%;" v-html="authStore.cvalue" />
                  <Field
                    style="width: 50%;"
                    class="form-control form-control-solid "
                    type="number"
                    name="captcha"
                    autocomplete="off"
                    :placeholder="$t('auth.Captcha')"
                  />
                </div>
              </div>
            </div>-->
          </div>

        </div>
        <div class="col-4 col-md-4">
          <div class="form-group">
              <div class="form-footer">
                  <button type="submit" :disabled="isLoading" class="btn btn-black2 pl-0 btn-purple-bg">
                  {{ $t("auth.Login") }}
                  </button>
                  <button
                  @click="authStore.getCaptcha"
                  type="button"
                  class="btn-black2 pl-0 btn-black-bg"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  {{ $t("auth.Register") }}
                </button>
              </div>
            </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12 col-md-12">
            <div class="fv-help-block text-danger captcha-danger">
            <ErrorMessage name="captcha" />
            </div>
        </div>
      </div>

    </Form>

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
  name: "MobileLogin",
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

    // authStore.getCaptcha();

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