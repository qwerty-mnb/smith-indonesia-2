<template>
  <div class="modal-overlay">
    <div class="modal-dialog" bis_skin_checked="1">
      <div class="modal-content simple-modal" bis_skin_checked="1">
        <div class="modal-header" bis_skin_checked="1">
          <button type="button" class="close" @click="$emit('close')" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title text-white">MASUK</h4>
        </div>
        <hr />
        <div class="modal-body" bis_skin_checked="1">
          <div class="form-group" bis_skin_checked="1">
            <div
              class="alert-danger"
              id="register_alert"
              hidden
              bis_skin_checked="1"
            ></div>
            <div
              class="alert-success"
              id="register_success_alert"
              hidden
              bis_skin_checked="1"
            ></div>
          </div>

          <Form class="form" @submit="onLogin" :validation-schema="rules">
            <div class="form-group" bis_skin_checked="1">
              <label for="UserName">Nama Pengguna</label>
              <!-- <input
                class="form-control"
                type="text"
                name="Username"
                placeholder="Nama Pengguna"
                v-model="form.username"
                required
              /> -->
              <Field
                class="form-control form-control-solid"
                type="text"
                name="username"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block text-danger">
                  <ErrorMessage name="username" />
                </div>
              </div>
            </div>
            <div class="form-group" bis_skin_checked="1">
              <label for="UserName">Kata Sandi</label>
              <div class="standard-password-field" bis_skin_checked="1">
                <Field
                  class="form-control form-control-solid"
                  type="password"
                  name="password"
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
            <div class="form-group text-right hidden-xs" bis_skin_checked="1">
              <a href="#" class="forgot-password-link" id="forgot_password_link">
                Lupa Kata Sandi?
              </a>
            </div>
            <div class="form-group text-right visible-xs" bis_skin_checked="1">
              <a href="/mobile/forgot-password" class="forgot-password-link">
                Lupa Kata Sandi?
              </a>
            </div>
            <div class="standard-button-group form-group" bis_skin_checked="1">
              <button
                class="standard-secondary-button btn btn-primary"
                id="login_submit_button"
                type="submit"
                :disabled="isLoading"
              >
                <span v-if="isLoading">Loading...</span>
                <span v-else>Masuk</span>
              </button>
            </div>
            <div class="form-group text-center" bis_skin_checked="1">
              Belum punya akun?
              <a href="/register" class="register-button"> Daftar Sekarang </a>
            </div>
          </Form>
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
  emits: ['close'],
  setup(props, { emit }) {
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
    async function onLogin(values: any, { resetForm }: any) {
      isLoading.value = true;
      const resp = await authStore.login(values);

      console.log(resp)


      if (!resp.success) {
        Swal.fire(t("auth.Login"), t("notif." + resp.msg), "error");
        // get new captcha
        authStore.getCaptcha();
        resetForm();
        isLoading.value = false;
        return false;
      } else {
        await authStore.connectSocket()
      }
      
      isLoading.value = false;
      // close modal
      emit('close');
      // reload page
      // window.location.reload();
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-dialog {
  width: 483px;
  margin: 0 auto;
}

/* The modal-content, modal-header, modal-body, and form styles are now handled by your existing stylesheet */
/* All the Bootstrap classes like .form-control, .btn, .form-group, etc. are already styled */

/* Center the modal header content */
.modal-header {
  position: relative;
  text-align: center;
}

.modal-header .close {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
}

.modal-header .modal-title {
  margin: 0;
  text-align: center;
  width: 100%;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .modal-dialog {
    width: 100%;
    margin: 20px;
  }
}

.modal-header hr {
  margin: 10px 0 0 0;
  height: 1px;
  border: none;
  width: 100%;
  background: -webkit-gradient(
    linear,
    0 0,
    100% 0,
    from(transparent),
    to(transparent),
    color-stop(50%, #fff)
  );
}
</style>
