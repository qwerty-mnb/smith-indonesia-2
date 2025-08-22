<template>
  <iframe v-if="iframeSrc" :src="iframeSrc" class="full-size-iframe" allowfullscreen></iframe>
  <div class="centered" v-else>Game is loading...</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import ApiService from "@/services/ApiService";

export default defineComponent({
  name: "SlotGameLaunch",
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
          case "SNOW_SNOW3":
          case "SNOW_KSLOT":
          case "SNOW_LIVE":
          case "SNOW_SLOT":
          case "HONORLINK":
          case "KP":
            {
              launchResp = await ApiService.post("/game/live", {
                game: String(route.params.game),
                game_id: String(route.params.game_id),
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
                game: String(route.params.game),
                game_id: String(route.params.game_id),
              }
            ).then((res) => res.data);

            console.log(launchResp)
            break;
          }
          default: {
            // window.close();
            break;
          }
        }

        if (launchResp === "") return alert("unable to launch");

        location.href = launchResp;

        // iframeSrc.value = launchResp;
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
