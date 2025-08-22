<template>
  <!-- Data table-->
  <div class="dataTables_wrapper dt-bootstrap4 no-footer">
    <TableContent
      @on-items-select="onItemSelect"
      @on-sort="onSort"
      :header="tableHeader"
      :data="dataToDisplay"
      :checkboxEnabled="checkboxEnabled"
      :checkboxLabel="checkboxLabel"
      :empty-table-text="emptyTableText"
      :sort-label="sortLabel"
      :sort-order="sortOrder"
      :loading="loading"
      :column-sum="columnSum"
      :custom-column-sum="customColumnSum"
      :isAccordion="isAccordion"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="{ row: item }">
        <slot :name="name" :row="item" />
      </template>
    </TableContent>

    <TableFooter
      @page-change="pageChange"
      :current-page="currentPage"
      v-model:itemsPerPage="itemsInTable"
      :count="totalItems"
      :items-per-page-dropdown-enabled="enableItemsPerPageDropdown"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import TableContent from "./table-partials/table-content/TableContent.vue";
import TableFooter from "./table-partials/TableFooter.vue";
import type Sort from "./table-partials/models";

export default defineComponent({
  name: "KTDataTable",
  props: {
    tableHeader: { type: Array, required: true },
    tableData: { type: Array, required: true },
    rowsPerPage: { type: Number, default: 50 },
    enableItemsPerPageDropdown: {
      type: Boolean,
      required: false,
      default: true,
    },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    checkboxLabel: { type: String, required: false, default: "id" },
    total: { type: Number, required: false },
    loading: { type: Boolean, required: false, default: false },
    sortLabel: { type: String, required: false, default: null },
    sortOrder: {
      type: String as () => "asc" | "desc",
      required: false,
      default: "asc",
    },
    emptyTableText: { type: String, required: false, default: "No data found" },
    currentPage: { type: Number, required: false, default: 1 },
    columnSum: { type: Boolean, default: false },
    customColumnSum: { type: Boolean, default: false },
    isAccordion: { type: Boolean, default: false },
  },
  emits: [
    "current-change",
    "on-sort",
    "on-items-select",
    "items-per-page-change",
  ],
  components: {
    TableContent,
    TableFooter,
  },
  setup(props, { emit }) {
    const currentPage = ref(props.currentPage);
    const itemsInTable = ref<number>(props.rowsPerPage);

    watch(
      () => itemsInTable.value,
      (val) => {
        currentPage.value = 1;
        emit("items-per-page-change", val);
      }
    );

    const pageChange = (page: number) => {
      currentPage.value = page;
      emit("current-change", page);
    };

    const dataToDisplay = computed(() => {
      if (props.tableData) {
        if (props.tableData.length <= itemsInTable.value) {
          return props.tableData;
        } else {
          let sliceFrom = (currentPage.value - 1) * itemsInTable.value;
          return props.tableData.slice(
            sliceFrom,
            sliceFrom + itemsInTable.value
          );
        }
      }
      return [];
    });

    const totalItems = computed(() => {
      if (props.tableData) {
        if (props.tableData.length <= itemsInTable.value) {
          return props.total;
        } else {
          return props.tableData.length;
        }
      }
      return 0;
    });

    const onSort = (sort: Sort) => {
      emit("on-sort", sort);
    };

    //eslint-disable-next-line
    const onItemSelect = (selectedItems: any) => {
      emit("on-items-select", selectedItems);
    };

    return {
      pageChange,
      dataToDisplay,
      onSort,
      onItemSelect,
      itemsInTable,
      totalItems,
    };
  },
});
</script>

<style lang="scss">
table {
  clear: both;
  margin-top: 6px !important;
  margin-bottom: 6px !important;
  max-width: none !important;
  border-collapse: separate !important;
  border-spacing: 0;
}

table.dataTable > thead {
  th.sorting {
    position: relative;
  }
  .sorting:after {
    position: absolute;
  }
}

.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background: none;
  border-radius: 0.475rem;
  font-weight: 500;
  font-size: 1.075rem;
  font-family: Poppins, Helvetica, sans-serif, Moneygraphy;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #009ef7;
}

table.dataTable td.dataTables_empty,
table.dataTable th.dataTables_empty {
  text-align: center;
}

div.dataTables_wrapper div.dataTables_processing {
  position: absolute;
  top: 50%;
  left: 50%;
}
.table.table-row-dashed tr td {
  background-color: #151517;
  border: 1px solid #2d2d2f;
  color: #a6a6a6;
}

.table.table-row-dashed tr td input {
  border: none;
  border-radius: 2px;
  color: white;
  background-color: #515151;
}
</style>
