<template>
  <!--begin::Statistics Widget 5-->
  <a href="#" :class="[widgetClasses, `bg-${color}`]" class="card hoverable">
    <!--begin::Body-->
    <div class="card-body">
      <span v-if="iconColor" :class="`svg-icon-${iconColor}`" class="svg-icon svg-icon-3x mx-n1">
      </span>
      <div :class="`text-inverse-${color}`" class="fw-bold fs-2 mb-2 mt-4 text-white">
        {{ title }}
      </div>
      <div :class="`text-inverse-${color}`" class="fw-semobold fs-7 text-white">
        {{ description }}
      </div>
    </div>
    <!--end::Body-->
  </a>
  <!--end::Statistics Widget 5-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "kt-widget-5",
  props: {
    widgetClasses: String,
    color: String,
    iconColor: String,
    svgIcon: String,
    title: String,
    description: String,
  },
  components: {},
});
</script>
