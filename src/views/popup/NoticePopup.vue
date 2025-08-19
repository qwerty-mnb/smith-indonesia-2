<template>
  <div class="hd_pops" v-if="isAuthenticated">
    <div
      class="popup_window"
      :class="`popup${x}`"
      style="display: flex"
      v-for="(notice, x) in notices"
      :key="x"
      :id="`popup${x}`"
    >
      <table width="100%" height="100%">
        <tbody style="vertical-align: middle">
          <tr>
            <td>
              <div class="hd_pops_con">
                <div>
                  <div class="title">
                    <p style="margin-left: 15px;padding-right: 1.5em;" :style="{'color': x === (notices.length - 1) ? '#ff4040':''}">
                      {{ notice.title }}
                    </p>
                  </div>
                  <button
                    type="button"
                    class="btn-default btn-pop-close"
                    @click="closePopup(x, notice.id, false)"
                  >
                    X
                  </button>
                </div>
                <div class="hd_pops_body">
                  <QuillEditor
                    toolbar="#my-toolbar"
                    :content="notice.body"
                    readonly="true"
                    theme="snow"
                    class="quillview-height"
                    :key="notice.id"
                    v-if="notice.type === 'TEXT'"
                  ></QuillEditor>
                  <div id="my-toolbar" v-if="notice.type === 'TEXT'">
                    <button class="ql-bold"></button>
                    <button class="ql-italic"></button>
                  </div>
                  <img
                    v-if="notice.type === 'IMAGE'"
                    class="img img-responsive notice-img"
                    :src="notice.imgsrc"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="hd_footer">
              <div class="hd_pops_footer">
                <button
                  type="button"
                  class="btn-default btn-footer text-white btn-purple-bg"
                  @click="closePopup(x, notice.id, true)"
                >
                  {{ $t("notice.CloseToday") }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import moment from "moment";
import ApiService from "@/services/ApiService";
import { useAuthStore } from "@/stores/auth";

export default defineComponent({
  name: "NoticePopup",
  components: {
    QuillEditor,
    // Moveable,
  },
  setup() {
    // vue
    const authStore = useAuthStore();
    const isAuthenticated = computed(() => authStore.isAuthenticated);
    // page
    const notices = ref([]);
    const hideToday: any = ref([]);

    const isMobile: any = ref(false);

    if (localStorage.getItem("noticePopupDate") !== moment().format("L")) {
      localStorage.setItem("noticePopup", JSON.stringify([]));
    }
    if (localStorage.getItem("noticePopup")) {
      hideToday.value = JSON.parse(
        localStorage.getItem("noticePopup") as string
      );
    }

    const moveable = ref({
      target: [".moveable"],
      draggable: true,
      throttleDrag: 1,
      resizable: false,
      throttleResize: 1,
      keepRatio: false,
      scalable: true,
      throttleScale: 0.01,
      rotatable: true,
      throttleRotate: 0.2,
      pinchable: true,
      origin: false,
    });

    const handleDrag = (e: any) => (e.target.style.transform = e.transform);

    /**
     * Get Notices
     *
     */
    async function getNotices() {
      const noticeArr = await ApiService.get("/site/notices")
        .then((res) => res.data)
        .catch((e) => e.response.data);
      // set notices only those popup is true
      notices.value = noticeArr.filter((r: any) => r.popup);

      if (hideToday.value)
        hideToday.value.filter((x: any) => {
          removeItem(x.id);
        });
    }

    onMounted(() => {
      getNotices();
    });

    const closePopup = (idx: any, x: any, isToday: boolean) => {
      if (isToday) {
        // check if the id is on the array
        const posToday = hideToday.value.findIndex(
          (item: any) => item.id === x
        );
        if (posToday < 0) {
          hideToday.value.push({ id: x });
        }
        localStorage.setItem("noticePopupDate", moment().format("L"));
        localStorage.setItem("noticePopup", JSON.stringify(hideToday.value));
        removeItem(x);
      } else {
        removeItem(x);
      }
    };

    const mobileCheck = () => {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    };

    isMobile.value = mobileCheck();

    const removeItem = (x: any) => {
      const pos = notices.value.findIndex((item: any) => item.id === x);
      notices.value.splice(pos, 1);
    };

    return {
      notices,
      isAuthenticated,
      handleDrag,
      moveable,
      closePopup,
      isMobile,
    };
  },
});
</script>
<style>
.ql-hidden {
  display: none;
}
.rCS19atnxs {
  --moveable-color: unset !important;
}
.rCS19atnxs .moveable-control.moveable-origin {
  display: none !important;
}
#my-toolbar {
  display: none !important;
}
</style>
<style scoped>
.notice-img {
  position: absolute;
  top: 0px;
  width: 100%;
  left: -1px;
  height: 647px;
}
.modal-btn {
  padding-right: 5px;
  padding-left: 5px;
  box-shadow: unset !important;
  margin-left: 0.8em;
}
.btn-pop-close {
  z-index: 100;
}
</style>
