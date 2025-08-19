<template>
  <Form class="form" @submit="onWriteInquiry" :validation-schema="rules">
    <!-- Write inquiry form -->
    <div
      class="form-container"
      v-if="showInquiryForm"
      style="max-width: 100% !important"
    >
      <div class="form-group">
        <div class="labels">
          <i class="fas fa-caret-right" aria-hidden="true"></i
          ><span>{{ $t("inquiry.Title") }}</span>
        </div>
        <div class="infos">
          <div class="input-container">
            <Field
              class="form-control form-control-solid"
              type="text"
              name="title"
              autocomplete="off"
            />
            <!-- Error -->
            <div class="fv-plugins-message-container">
              <div class="fv-help-block text-danger">
                <ErrorMessage name="title" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="labels">
          <i class="fas fa-caret-right" aria-hidden="true"></i
          ><span>{{ $t("inquiry.Body") }}</span>
        </div>
        <div class="infos">
          <div class="input-container">
            <Field
              class="form-control form-control-solid"
              as="textarea"
              name="body"
              autocomplete="off"
              style="width: 100%; height: 300px"
            />
          </div>
        </div>
        <!-- Error -->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block text-danger">
            <ErrorMessage name="body" />
          </div>
        </div>
      </div>
    </div>
    <!-- Submit and back button -->
    <div
      class="modal-footer text-right form-footer dflex-ac-jc"
      v-if="showInquiryForm"
    >
      <button type="button" class="btn btn-danger" @click="goBack()">
        <i class="fas fa-reply" aria-hidden="true" style="padding-top: 4px"></i
        >{{ $t("inquiry.List") }}
      </button>
      <button type="submit" :disabled="isLoading" class="btn btn-primary">
        <i
          class="fa-solid fa-paper-plane"
          aria-hidden="true"
          style="padding-top: 4px"
        ></i
        >{{ $t("inquiry.Submit") }}
      </button>
    </div>
  </Form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as Yup from "yup";
import Swal from "sweetalert2";

import ApiService from "@/services/ApiService";

interface Inquiry {
  title: string;
  body: string;
}

export default defineComponent({
  name: "Write",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    showInquiryForm: { type: Boolean },
    showInquiry: { type: Boolean },
    showInquiryDetail: { type: Boolean },
  },
  emits: ["writeField"],
  setup(props, { emit }) {
    // vue variables
    const { t } = useI18n();

    const rules = Yup.object().shape({
      title: Yup.string().required(t("inquiry.TitleCheck")),
      body: Yup.string().required(t("inquiry.BodyCheck")),
    });

    const isLoading = ref(false);

    /**
     * submit Inquiry
     *
     */
    const onWriteInquiry = async (data: Inquiry) => {
      try {
        isLoading.value = true;
        const resp = await ApiService.post("/inquiry", data)
          .then((res) => res.data)
          .catch((e) => e.response.data);

        if (resp.message !== "MESSAGE_SENT") {
          isLoading.value = false;
          return Swal.fire({
            icon: "error",
            title: t("header.Inquiry"),
            text: t("notif." + resp.message),
            confirmButtonColor: "#FF0000",
            confirmButtonText: t("notif.Close"),
          });
        }
        Swal.fire({
          icon: "success",
          title: t("header.Inquiry"),
          text: t("inquiry.InquirySent"),
          confirmButtonColor: "#FF0000",
          confirmButtonText: t("notif.Close"),
        });
        // return to list
        goBack();
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: t("header.DepositRequest"),
          text: t("notif.ErrorOccured"),
          confirmButtonColor: "#FF0000",
          confirmButtonText: t("notif.Close"),
        });
      }
      isLoading.value = false;
    };

    /**
     *
     * Go back to list
     **/
    const goBack = () => emit("writeField", false);
    return {
      rules,
      isLoading,
      onWriteInquiry,
      goBack,
    };
  },
});
</script>
