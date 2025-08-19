<template>
    <!-- Inquiry Body -->
    <div class="mx-4">
        <div class="row h-100">
            
        </div>
        <div class="modal-body-center">
            <div class="row form-choices">
                <div class="panel">
                    <div class="d-flex">
                        <button
                            type="button"
                            class="btn-transaction btn-basic-tab nav-bet"
                            :class="{ active: selectedHistory === 'LIVE' }"
                            @click="getDataHistory('LIVE')"
                        >
                            {{ $t("history.BaccaraGame") }}
                        </button>
                        <button
                            type="button"
                            class="btn-transaction btn-basic-tab nav-bet"
                            :class="{ active: selectedHistory === 'SLOT' }"
                            @click="getDataHistory('SLOT')"
                        >
                            {{ $t("header.CustomerSupport") }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <!-- Tabs -->
                <div class="col-md-7"></div>
                <!-- Date picker -->
                <div class="col-md-5 pt-2">
                    <span>
                        <Datepicker v-model="date" :allowedDates="allowedDates" :format="format" range dark />
                    </span>
                </div>
            </div>
            <div class="table-history">
                <table class="bs-table" style="text-align: center; margin-top: 25px; cursor: pointer">
                    <thead>
                        <tr>
                            <th v-for="col in columns" :key="col">{{ $t(col) }}</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white">
                        <tr v-for="(item, idx) in histories" :key="idx">
                            <td>{{ $t("history." + item.type) }}</td>
                            <td>
                                <div>{{ item.game }}</div>
                                <div>{{ item.roomno }}</div>
                            </td>
                            <td>{{ item.roomorder }}</td>
                            <td>{{ $n(parseInt(item.betamount), "currency") }}</td>
                            <td>
                                <div v-if="item.type == 'BET'">
                                    <span v-if="item.status == 0 || item.status == 2 || item.status > 2">
                                        {{ $t("status." + item.status) }}
                                    </span>
                                    <span :class="[
                                        parseInt(item.amount) - parseInt(item.betamount) > 0
                                            ? 'win-color'
                                            : 'lose-color',
                                    ]" v-if="item.status == 1">
                                        {{
                                            parseInt(item.amount) - parseInt(item.betamount) > 0
                                            ? $t("status.win")
                                            : $t("status.lose")
                                        }}
                                    </span>
                                </div>
                            </td>
                            <td>{{ $n(parseInt(item.amount), "currency") }}</td>
                            <td>
                                <span :class="[
                                    parseInt(item.amount) - parseInt(item.betamount) > 0
                                        ? 'win-color'
                                        : 'lose-color',
                                ]">{{
                                    $n(
                                        parseInt(item.amount) - parseInt(item.betamount),
                                        "currency"
                                    )
                                }}</span>
                            </td>
                            <td>{{ $n(parseInt(item.pre_acc), "currency") }}</td>
                            <td>
                                <span v-if="item.status !== 3">{{
                                    $n(
                                        parseInt(item.pre_acc) +
                                        parseInt(item.amount) -
                                        parseInt(item.betamount),
                                        "currency"
                                    )
                                }}</span>
                                 <span v-if="item.status === 3">{{ $n(
                                        parseInt(item.pre_acc),
                                        "currency"
                                    )}}</span>
                            </td>
                            <td>{{ item.createdAt }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pager-div">
                <ul class="Pagination">
                    <li class="PaginationControl" v-for="index in pages" :key="index">
                        <button @click="getHistory(index)" :class="{ 'Page-active': currentPage === index }"
                            :style="{ 'background-color': currentPage === index ? 'rgb(220, 237, 255)' : 'transparent' }"
                            class="Page" type="button">{{ index }}</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import moment from "moment";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import CloseModal from "@/components/CloseModal.vue";
import PopupModal from "../popup/PopupModal.vue";
import ApiService from "@/services/ApiService";

export default defineComponent({
    name: "BetHistory",
    components: {
        Datepicker,
        PopupModal,
        CloseModal,
    },
    created: function () {
        this.moment = moment;
    },
    setup() {
        const todaysDate = new Date();
        const weekStart = ref();
        const weekEnd = ref();
        const histories = ref([]);
        const allowedDates = ref();
        const pages = ref(1);
        const currentPage = ref(1);
        const columns = [
            "depWid.Type",
            "history.Game",
            "history.GameRound",
            "history.BetAmount",
            "depWid.State",
            "history.WinningAmount",
            "history.Result",
            "history.AmountBefore",
            "history.AmountAfter",
            "depWid.Date",
        ];
        /**
         * Get History
         *
         */
        const selectedHistory = ref("LIVE");
        const getDataHistory = (type: any) => {
            selectedHistory.value = type;
            getHistory(currentPage.value);
        };

        const getHistory = async (idx: number) => {
            currentPage.value = idx
            const records = await ApiService.get(
                `/tran/bet/history?type=${selectedHistory.value}&page=${currentPage.value}&start=${weekStart.value}&end=${weekEnd.value}`
            )
                .then((res) => res.data)
                .catch(() => [{ histories: [], rows: 0 }]);
            histories.value = records.histories;
            pages.value = Math.ceil(Number(records.rows) / 50);
        };

        const date = ref();
        const format = (date: any) => {
            weekStart.value = moment(date[0]).format("YYYY-MM-DD");
            weekEnd.value = moment(date[1]).format("YYYY-MM-DD");

            getHistory(currentPage.value);
            return `${moment(date[0]).format("YYYY-MM-DD")} - ${moment(
                date[1]
            ).format("YYYY-MM-DD")}`;
        };

        /**
         * Get the first and last day of the week
         *
         */
        const getCurrentWeek = () => {
            weekStart.value = moment(todaysDate).startOf("isoWeek");
            weekEnd.value = moment(todaysDate).endOf("isoWeek");
            date.value = [weekStart.value, weekEnd.value];
            const tmpStartDate = moment().subtract(1, "months");
            const dates: string[] = [];
            while (tmpStartDate <= moment()) {
                dates.push(String(tmpStartDate.format("YYYY-MM-DD")));
                tmpStartDate.add(1, "days");
            }
            allowedDates.value = dates;
        };

        onMounted(() => {
            getCurrentWeek();
            // getHistory();
        });
        return {
            allowedDates,
            columns,
            date,
            format,
            histories,
            pages,
            currentPage,
            moment,
            getHistory,
            getDataHistory,
            selectedHistory,
        };
    },
});
</script>
<style>
.delete-btn {
    height: 33px !important;
}
</style>
