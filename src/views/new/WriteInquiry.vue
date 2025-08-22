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
      <span class="text-[14px]">{{ $t("inquiry.Title") }}</span>
        </div>
        <div class="infos">
          <div class="input-container">
            <Field
              class="form-control form-control-solid h-[40px]"
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
     <span class="text-[14px] mb-2">{{ $t("inquiry.Body") }}</span>
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
       class="form-footer"
       v-if="showInquiryForm"
     >
       <button type="button" class="action-button back-button" @click="goBack()">
         <i class="fas fa-reply"></i>
         {{ $t("inquiry.List") }}
       </button>
       <button type="submit" :disabled="isLoading" class="action-button submit-button">
         <i class="fa-solid fa-paper-plane"></i>
         {{ $t("inquiry.Submit") }}
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
      t, // Add the translation function to the return object
      rules,
      isLoading,
      onWriteInquiry,
      goBack,
    };
     },
 });
 </script>

<style lang="scss" scoped>
.standard-form-content .form-group {
  background: none !important
}
</style>

<style lang="scss">
.form-container {
  padding: 30px;
  border-radius: 8px;
  border: 1px solid #320050;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 25px;
  
  .labels {
    margin-bottom: 10px;
    
    span {
      font-weight: 600;
      font-size: 14px;
    }
  }
  
  .infos {
    .input-container {
      .form-control {
        background-color: rgba(26, 3, 45, 0.6);
        border: 1px solid rgba(50, 0, 80, 0.3);
        color: #fff;
        padding: 12px 15px;
        border-radius: 5px;
        width: 100%;
        transition: all 0.3s ease;
        
        &:focus {
          outline: none;
          border-color: rgba(173, 216, 230, 0.5);
          box-shadow: 0 0 5px rgba(173, 216, 230, 0.2);
        }
        
        &::placeholder {
          color: #999;
        }
      }
      
      textarea.form-control {
        resize: vertical;
        min-height: 120px;
      }
    }
  }
}

.fv-plugins-message-container {
  margin-top: 8px;
  
  .fv-help-block {
    color: #ff6b6b;
    font-size: 13px;
    margin: 0;
  }
}

.form-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  padding: 20px 0;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  min-width: 140px;
  justify-content: center;
  
  i {
    font-size: 16px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
}

.back-button {
  background: #4a4a4a;
  color: #fff;
  
  &:hover {
    background: #666;
  }
}

.submit-button {
  background: linear-gradient(to bottom, #e4ff23 0%, #9db20a 100%);
  border: 2px solid #e4ff23;
  color: #000;
  
  &:hover {
    background: linear-gradient(to bottom, #f0ff4a 0%, #b0c20a 100%);
    border-color: #f0ff4a;
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .form-container {
    padding: 20px;
  }
  
  .form-footer {
    flex-direction: column;
    gap: 15px;
    
    .action-button {
      min-width: 200px;
    }
  }
}
</style>
