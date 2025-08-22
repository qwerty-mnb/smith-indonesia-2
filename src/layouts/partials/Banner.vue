<template>
    <div class="section-banner">
        <div class="annouce-banner">
            <i class="fa-sharp fa-solid fa-bullhorn"></i>
            <div class="marquee">
                <span>언제나 노력하는 하이카지노가 되겠습니다.</span>
            </div>
        </div>
        <div class="main-banner"></div>
    </div>
</template>
    
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useAppStore } from "@/stores/app";

export default defineComponent({
    name: "Banner",
    setup() {

        // vue
        const appStore = useAppStore();
        const settings = computed(() => appStore.settings);

        return {
            settings
        };

    },
});

</script>