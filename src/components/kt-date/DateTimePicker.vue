<template>
  <!-- Date Time Picker -->
  <el-date-picker
    class="col-12"
    v-model="date"
    type="datetime"
    unlink-panels
    :placeholder="$t('Date')"
    :shortcuts="shortcuts"
    :change="emitSelectedDates()"
    :clearable="false"
    style="z-index: 999999"
  >
  </el-date-picker>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import moment from "moment";

export default defineComponent({
  name: "kt-date/DateTimePicker.vue",
  emits: ["changedatetime"],
  props: {
    initial: { type: String },
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const date = ref(new Date());

    if (props.initial) {
      if (props.initial === "month")
        date.value = moment().startOf("month").toDate();
      else if (props.initial === "tomorrow")
        date.value = moment().add(1, "day").toDate();
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
      const start = moment(selectedDates[0]).format("YYYY-MM-DD HH:mm:ss");
      emit("changedatetime", start);
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
</style>
