<template>
  <!--begin::List Widget 1-->
  <div :class="widgetClasses" class="card">
    <!--begin::Body-->
    <div class="card-body p-0">
      <!--begin::Header-->
      <div
        :class="`bg-${widgetColor}`"
        class="px-9 pt-7 card-rounded h-200px w-100"
      >
        <!--begin::Heading-->
        <div class="d-flex flex-stack">
          <h3 class="m-0 text-white fw-bolder fs-3">{{ title }}</h3>
        </div>
        <!--end::Heading-->

        <!--begin::Balance-->
        <div
          class="d-flex text-center flex-column text-white pt-8"
          style="margin-top: -30px"
        >
          <span class="fw-bold fs-7">{{ totalTitle }}</span>
          <span class="fw-bolder fs-2x pt-1">{{ $n(Number(total)) }}</span>
        </div>
        <!--end::Balance-->
      </div>
      <!--end::Header-->

      <!--begin::Items-->
      <div
        class="shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-body"
        style="margin-top: -100px"
      >
        <template v-for="(item, index) in items" :key="index">
          <!--begin::Item-->
          <div
            :class="[index !== items.length && 'mb-7']"
            class="d-flex align-items-center"
          >
            <!--begin::Symbol-->
            <div class="symbol symbol-45px w-40px me-5">
              <span class="symbol-label bg-lighten">
                <span class="fas fa-2x text-dark" :class="item.icon" />
              </span>
            </div>
            <!--end::Symbol-->

            <!--begin::Description-->
            <div class="d-flex align-items-center flex-wrap w-100">
              <!--begin::Title-->
              <div class="mb-1 pe-3 flex-grow-1">
                <a
                  :href="item.url"
                  class="fs-5 text-gray-800 text-hover-primary fw-bolder"
                  >{{ item.title }}</a
                >
                <div class="text-gray-400 fw-bold fs-7">
                  {{ item.description }}
                </div>
              </div>
              <!--end::Title-->

              <!--begin::Label-->
              <div class="d-flex align-items-center">
                <div class="fw-bolder fs-5 text-gray-800 pe-1">
                  {{ $n(item.stats) }}
                </div>
              </div>
              <!--end::Label-->
            </div>
            <!--end::Description-->
          </div>
          <!--end::Item-->
        </template>
      </div>
      <!--end::Items-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::List Widget 1-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "widget-1",
  props: {
    widgetClasses: String,
    widgetColor: String,
    chartHeight: Number,
    items: Array,
    title: String,
    totalTitle: String,
    total: Number,
  },
});
</script>
