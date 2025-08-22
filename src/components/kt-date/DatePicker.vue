<template>
  <!-- Date Range Picker -->
  <el-date-picker
    class="col-12"
    v-model="date"
    type="date"
    unlink-panels
    :placeholder="$t('Date')"
    :shortcuts="shortcuts"
    :change="emitSelectedDates()"
    :clearable="false"
    style="width: 180px !important"
  >
  </el-date-picker>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import moment from "moment";

export default defineComponent({
  name: "DatePicker",
  emits: ["changedate"],
  props: {
    initial: { type: String },
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const date = ref(new Date());

    if (props.initial) {
      if (props.initial === "month")
        date.value = moment().startOf("month").toDate();
    }

    const shortcuts = ref([
      {
        text: t("DateRange.Today"),
        value: new Date(),
      },
      {
        text: t("DateRange.Yesterday"),
        value: (() => {
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
          return start;
        })(),
      },
      {
        text: t("DateRange.LastWeek"),
        value: (() => {
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          return start;
        })(),
      },
    ]);
    const emitSelectedDates = () => {
      const selectedDates: any = date.value;
      const start = moment(selectedDates).format("YYYY-MM-DD");
      emit("changedate", start);
    };

    return {
      date,
      shortcuts,
      emitSelectedDates,
    };
  },
});
</script>
<style>
.el-input__icon {
  width: 37px !important;
}
.el-range-editor.el-input__wrapper {
  display: block;
  height: 100%;
}
.el-date-editor.el-input__wrapper {
  display: block;
}
</style>
