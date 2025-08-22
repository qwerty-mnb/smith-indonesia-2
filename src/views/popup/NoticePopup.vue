<template>
  <div class="hd_pops" v-if="isAuthenticated">
    <div
      class="popup_window"
      :class="`popup${x}`"
      v-for="(notice, x) in notices"
      :key="x"
      :id="`popup${x}`"
    >
      <div class="hd_pops_con">
        <div class="popup-header">
          <div class="title">
            <p :style="{'color': x === (notices.length - 1) ? '#ff4040':''}">
              {{ notice.title }}
            </p>
          </div>
          <button
            type="button"
            class="btn-pop-close"
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
            class="notice-img"
            :src="notice.imgsrc"
          />
        </div>
        <div class="hd_pops_footer">
          <button
            type="button"
            class="btn-footer"
            @click="closePopup(x, notice.id, true)"
          >
            {{ $t("notice.CloseToday") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import moment from "moment";
import ApiService from "@/services/ApiService";
import { useAuthStore } from "@/stores/auth";

interface Notice {
  id: number;
  title: string;
  body: string;
  type: string;
  imgsrc?: string;
  popup: boolean;
}

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
    const notices = ref<Notice[]>([]);
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
      notices.value = noticeArr.filter((r: Notice) => r.popup);

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
      const pos = notices.value.findIndex((item: Notice) => item.id === x);
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
<style lang="scss">
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
.hd_pops {
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    width: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
    z-index: 9999;
    flex-wrap: wrap;
}

.popup_window {
    width: 410px;
    height: 650px;
    background-color: #0f0f0f;
    margin: 0 10px 20px 10px;
    display: flex;
    flex-direction: column;
}

.hd_pops_con {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.popup-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #0f0f0f;
    min-height: 60px;
}

.hd_pops_con .title {
    background-color: transparent;
    padding: 0;
    box-shadow: none;
    margin-bottom: 0;
    height: auto;
    font-size: 16px;
    width: 100%;
    color: #fff;
    text-align: left;
    font-family: 'Moneygraphy';
    margin: 0;
    line-height: 1.3;
    font-weight: 500;
}

.hd_pops_con .btn-pop-close {
    position: relative;
    color: #fff;
    font-size: 1.2rem;
    background-color: transparent;
    border: none;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    flex-shrink: 0;
}

.hd_pops_con .btn-pop-close:hover {
    color: #e4ff23;
}

.hd_pops_body {
    height: 280px;
    overflow-y: auto;
    background-color: #0f0f0f;
    padding: 15px;
    color: #fff;
    text-align: left;
    flex: 1;
    font-size: 14px;
    line-height: 1.4;
}

.hd_pops_footer {
    color: white;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 15px 20px;
}

.btn-footer {
    background-color: rgba(50, 0, 80, 0.8);
    color: #fff;
    border: 1px solid #320050;
    border-radius: 6px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 120px;
    width: 100%;
}

.btn-footer:hover {
    background-color: rgba(80, 0, 128, 0.8);
    border-color: #e4ff23;
}

.notice-img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  object-fit: cover;
  margin-bottom: 10px;
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

/* Responsive adjustments */
@media (max-width: 1200px) {
  .popup_window {
    width: 280px;
    height: 380px;
    margin: 0 8px;
  }
  
  .hd_pops_body {
    height: 260px;
    padding: 12px;
  }
}

@media (max-width: 768px) {
  .hd_pops {
    padding-top: 80px;
  }
  
  .popup_window {
    width: 90%;
    max-width: 350px;
    height: 350px;
    margin: 0 5px 10px 5px;
  }
  
  .hd_pops_body {
    height: 230px;
    padding: 12px;
  }
  
  .popup-header {
    padding: 12px 15px;
    min-height: 50px;
  }
  
  .hd_pops_footer {
    padding: 12px 15px;
  }
  
  .btn-footer {
    min-width: 100px;
    padding: 8px 16px;
    font-size: 13px;
  }
}
</style>
