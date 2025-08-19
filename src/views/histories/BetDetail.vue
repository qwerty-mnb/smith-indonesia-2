<template>
  <div>
    <iframe
      :src="iframeurl"
      frameborder="0"
      scrolling="no"
      style="
        overflow: hidden;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
      "
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "BetDetail",
  props: {
    item: {
      type: Object,
    },
  },
  components: {},
  setup() {
    // vue variables
    const route = useRoute();

    const iframeurl = ref("");

    /**
     * On Mounted
     *
     */
    onMounted(() => {
      let url = `https://agent.defensilx918.com/results/${route.params.id}`;
      if (route.params.provider === "api") {
        url = `https://agent.snowplay11.com/results/${route.params.id}`;
      }
      iframeurl.value = url;
    });

    return {
      iframeurl,
    };
  },
});
</script>
