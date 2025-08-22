<template>
  <!-- Date Range Picker -->
  <el-date-picker
    style="width: 100%"
    v-model="daterange"
    type="daterange"
    unlink-panels
    range-separator="~"
    :start-placeholder="$t('DateRange.Start')"
    :end-placeholder="$t('DateRange.End')"
    :shortcuts="shortcuts"
    :change="emitSelectedDates()"
  >
  </el-date-picker>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import moment from "moment";

export default defineComponent({
  name: "DateRangePicker",
  emits: ["changedate"],
  props: {
    initial: { type: String },
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const daterange = ref([new Date(), new Date()]);

    if (props.initial) {
      if (props.initial === "month") {
        daterange.value = [
          moment().startOf("month").toDate(),
          moment().toDate(),
        ];
      } else if (props.initial == "week") {
        daterange.value = [
          moment().subtract(7, "days").toDate(),
          moment().toDate(),
        ];
      } else if (props.initial === "monthyesterday") {
        if (Number(moment().format("D")) === 1) {
          daterange.value = [
            moment()
              .subtract(1, "month")
              .startOf("month")
              .add(15, "day")
              .toDate(),
            moment().subtract(1, "day").toDate(),
          ];
        } else {
          daterange.value = [
            moment().startOf("month").toDate(),
            moment().subtract(1, "day").toDate(),
          ];
        }
      }
    }

    const shortcuts = ref([
      {
        text: t("DateRange.Today"),
        value: (() => {
          const end = new Date();
          const start = new Date();
          return [start, end];
        })(),
      },
      {
        text: t("DateRange.Yesterday"),
        value: (() => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
          return [start, end];
        })(),
      },
      {
        text: t("DateRange.LastWeek"),
        value: (() => {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          return [start, end];
        })(),
      },
    ]);
    const emitSelectedDates = () => {
      const selectedDates = daterange.value;
      const start = moment(selectedDates[0]).format("YYYY-MM-DD");
      const end = moment(selectedDates[1]).format("YYYY-MM-DD");
      emit("changedate", { start, end });
    };

    return {
      daterange,
      shortcuts,
      emitSelectedDates,
    };
  },
});
</script>
<style>
.el-range-editor.el-input__wrapper {
  display: block;
}
</style>
