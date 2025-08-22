<template>
  <Field ref="inputRef" type="text" name="amount" autocomplete="off" />
</template>
<script>
import { defineComponent, watch } from "vue";
import { Field } from "vee-validate";
import { useCurrencyInput } from "vue-currency-input";

export default defineComponent({
  name: "CurrencyInput",
  props: {
    modelValue: Number,
  },
  components: {
    Field,
  },
  setup(props) {
    const { inputRef, setValue } = useCurrencyInput({
      currency: "KRW",
      currencyDisplay: "hidden",
    });

    watch(
      () => props.modelValue,
      (value) => {
        setValue(value);
      }
    );

    return { inputRef };
  },
});
</script>
