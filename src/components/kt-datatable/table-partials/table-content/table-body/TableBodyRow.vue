<template>
  <tbody class="fw-semibold text-center"
   :class="{'accordion accordion-flush': isAccordion}"
   id="accordionFlush"
  >
    <template v-for="(item, i) in data" :key="i">
      <tr
        :class="[gameNameClass(data[i]?.game_name),{'accordion-button collapsed': isAccordion}]"
        data-bs-toggle="collapse"
        :data-bs-target="`#flush-collapse${i}`"
        aria-expanded="false"
        :aria-controls="`flush-collapse${i}`"
        @click="getSelectedRow(i)"
      >
        <td v-if="checkboxEnabled">
          <div
            class="form-check form-check-sm form-check-custom form-check-solid"
          >
            <input
              class="form-check-input"
              type="checkbox"
              :value="row[checkboxLabel]"
              v-model="selectedItems"
              @change="onChange"
            />
          </div>
        </td>
        <!-- Is Accordion -->
        <td v-if="isAccordion">
          <div>
            <i class="fa-solid fa-chevron-down" v-if="i != selectedRow"></i>
            <i class="fa-solid fa-chevron-right" v-else></i>
          </div>
        </td>
        <template v-for="(cell, j) in header" :key="j">
          <td>
            <!-- Member Column -->
            <span v-if="cell.key === 'member'">
              <a
                href="javascript:void(0);"
                @click="openMemberInfo(item['member_id'])"
                >{{ item[cell.key] }}</a
              >
              </span>

            <!-- Agent Column -->
            <span v-if="cell.key === 'agent'">
              <a :href="`/member/${item['agent_id']}`" target="_blank">{{
                item[cell.key]
              }}</a></span
            >
            <!-- Gmaster Column -->
            <span v-if="cell.key === 'gmaster'">
              <a :href="`/member/${item['gmaster_id']}`" target="_blank">{{
                item[cell.key]
              }}</a></span
            >
            <!-- Rolling Type -->
            <span v-if="cell.key === 'rolling_type'">
              <span
                :class="rollingTypeClass(item[cell.key])"
                class="text-white"
              >
                {{ $t("Agents.RollingType." + item[cell.key]) }}
              </span>
            </span>
            <!-- Losing Type -->
            <span v-if="cell.key === 'losing_type'">
              <span :class="losingTypeClass(item[cell.key])" class="text-white">
                {{ $t("Agents.LosingType." + item[cell.key]) }}
              </span>
            </span>
            <!-- Currency Column -->
            <span v-if="cell.currency"> {{ $n(Number(item[cell.key])) }}</span>
            <!-- Text column -->
            <span v-if="cell.text"> {{ item[cell.key] }}</span>
            <!-- Profit Column -->
            <template v-if="cell.profit">
              <span class="text-success" v-if="Number(item[cell.key]) >= 0">
                {{ $n(Number(item[cell.key])) }}
              </span>
              <span class="text-danger" v-else-if="Number(item[cell.key]) < 0">
                {{ $n(Number(item[cell.key])) }}
              </span>
            </template>
            <!-- Date Column -->
            <template v-if="cell.key === 'createdAt'">
              <span>
                {{ item[cell.key] }}
              </span>
            </template>
            <template v-if="cell.key === 'updatedAt'">
              <span v-if="item['state'] !== 0">
                {{ item[cell.key] }}
              </span>
            </template>
            <slot v-if="cell.customslot" :name="`cell-${cell.key}`" :row="item">
              {{ item }}
            </slot>
          </td>
        </template>
      </tr>
      <tr
        class="accordion-collapse collapse text-center w-100"
        :id="`flush-collapse${i}`"
        :aria-labelledby="`flush-heading${i}`"
        data-bs-parent="#accordionFlush"
        v-if="isAccordion"
      >
        <!-- COLSPAN -->
        <td colspan="10" class="accordion-body">
          <slot :name="`table-sub${i}`"> </slot>
        </td>
      </tr>
    </template>
    <!-- Sum -->
    <tr v-if="columnSum">
      <template v-for="(cell, i) in header" :key="i">
        <td class="text-end">
          <span
            v-if="cell.currency && cell.columnSum"
            :class="cell.columnSumColor"
            class="font-weight-boldest"
            ><i
              v-if="cell.columnSumIcon"
              class="fas"
              :class="cell.columnSumIcon"
            />
            {{ $n(sumColumn(data, cell.key)) }}</span
          >
        </td>
      </template>
    </tr>
    <!-- Sum Custom -->
    <tr v-if="customColumnSum">
      <template v-for="(cell, i) in header" :key="i">
        <td>
          <slot
            v-if="cell.customColumnSum"
            :name="`columnsum-${cell.key}`"
            :items="data"
          >
          </slot>
        </td>
      </template>
    </tr>
  </tbody>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { array } from "yup";

export default defineComponent({
  name: "table-body-row",
  props: {
    header: { type: Array, required: true },
    data: { type: Array, required: true },
    currentlySelectedItems: { type: Array, required: false, default: () => [] },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    checkboxLabel: { type: String, required: false, default: "id" },
    columnSum: { type: Boolean, default: false },
    customColumnSum: { type: Boolean, default: false },
    isAccordion: { type: Boolean, required: false, default: false },
  },
  emits: ["on-select"],
  setup(props, { emit }) {
    const selectedRow: any = ref(-1);
    //eslint-disable-next-line
    const selectedItems = ref<Array<any>>([]);

    watch(
      () => [...props.currentlySelectedItems],
      (currentValue) => {
        if (props.currentlySelectedItems.length !== 0) {
          selectedItems.value = [
            ...new Set([...selectedItems.value, ...currentValue]),
          ];
        } else {
          selectedItems.value = [];
        }
      }
    );

    const onChange = () => {
      emit("on-select", selectedItems.value);
    };

    const getSelectedRow = (row: number) => {
      if (selectedRow.value === row) return (selectedRow.value = -1);
      selectedRow.value = row;
    };

    /**
     * Sum
     *
     */
    const sumColumn = (items: any, column: string) =>
      items.reduce((a, b) => +a + +Number(b[column]), 0);

    /**
     * For Rolling and Losing type badges
     */
    const rollingTypeClass = (type: number) => {
      const badgeColor = {
        0: "badge bg-primary",
        1: "badge bg-info",
        2: "badge bg-success",
      };

      return badgeColor[type];
    };

    const losingTypeClass = (type: number) => {
      const badgeColor = {
        0: "badge bg-success",
        1: "badge bg-warning",
        2: "badge bg-info",
        3: "badge bg-primary",
        4: "badge bg-secondary",
        5: "badge bg-danger",
        6: "badge bg-light text-secondary",
        7: "badge bg-dark text-secondary",
        8: "badge bg-white text-secondary",
      };

      return badgeColor[type];
    };

    const gameNameClass = (game: string) => {
      const { t } = useI18n();

      let rowColor: Array<{}> = [];
      rowColor[t("header.Casino")] = "bg-row-blue";
      rowColor[t("header.Slot")] = "bg-row-blue";
      rowColor[t("header.Hotel")] = "bg-row-orange";
      rowColor[t("header.Sport")] = "bg-row-red";

      return rowColor[game];
    }

    const openMemberInfo = (id: string) => {
      window.open(`/partner/member/${id}`, '_blank', 'noreferrer;height=700;width=1200')
    }

    return {
      selectedRow,
      selectedItems,
      getSelectedRow,
      onChange,
      sumColumn,
      rollingTypeClass,
      losingTypeClass,
      openMemberInfo,
      gameNameClass
    };
  },
});
</script>

<style scoped>
.bg-row-blue {
  background-color: #0A002F;
}
.bg-row-orange {
  background-color: #692D00;
}
.bg-row-red {
  background-color: #530F22;
}

</style>