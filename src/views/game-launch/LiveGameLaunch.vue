<template>
  <iframe v-if="iframeSrc" :src="iframeSrc" class="full-size-iframe" allowfullscreen></iframe>
  <div class="centered" v-else>조금만 기다려주세요...</div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";

export default defineComponent({
  name: "LiveGameLaunch",
  setup() {
    const route = useRoute();
    const iframeSrc = ref("");
    const { t } = useI18n();

    const allowedProviders = ["snow", "SNOW_LIVE", "SNOW_SNOW2", "SNOW_SNOW3", "SNOW_SLOT", "SNOW_KSLOT", "KP", "KH", "HONORLINK"];

    const startLaunch = async () => {
      try {
        ApiService.setHeader();
        if (!allowedProviders.includes(String(route.params.provider))) return window.close();

        let launchResp = "";

        switch (String(route.params.provider)) {
          case "snow":
          case "SNOW_LIVE":
          case "HONORLINK":
          case "SNOW_SLOT":
          case "KP": {
            launchResp = await ApiService.post("/game/live", {
              game: String(route.params.code),
              ismobile:
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  navigator.userAgent
                ),
            }).then((res) => res.data);          
            break;
            
          }
          case "SNOW_SNOW2":
          case "KH":  {
            launchResp = await ApiService.post(
              `/game/snow/money-transfer/launch`,
              {
                game: String(route.params.code),
              }
            ).then((res) => res.data);
            break;
          }
          default: {
            window.close();
            break;
          }
        }
        location.href = launchResp;
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
