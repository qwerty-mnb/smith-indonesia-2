<template>
  <iframe v-if="iframeSrc" :src="iframeSrc" class="full-size-iframe"></iframe>
  <div class="centered" v-else>Game is loading...</div>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import { defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";

export default defineComponent({
  name: "KplaySlotLaunch",
  setup() {
    const route = useRoute();
    const iframeSrc = ref("");
    const { t } = useI18n();

    const startLaunch = async () => {
      try {
        ApiService.setHeader();
        const launchResp = await ApiService.post("/game/kp", {
          game: String(route.params.product_id),
          game_id: String(route.params.type),
          ismobile:
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            ),
        }).then((res) => res.data);

        if (launchResp === "") return window.close();
        iframeSrc.value = launchResp;
      } catch (e: any) {
        Swal.fire({
          title: t("notif.Alarm"),
          text: t("notif.AUTO_LOGGED_OUT"),
          icon: 'error'
        }).then((result) => {
          if (result.isConfirmed) {
            window.close();
          }
        });
      }
    };

    onMounted(() => startLaunch());

    return { iframeSrc };
  },
});
</script>

<style scoped>
.full-size-iframe {
  width: 100vw;
  height: 100vh;
  border: none;
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
