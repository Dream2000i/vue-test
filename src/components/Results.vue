<script setup>

import {  defineProps,  computed } from 'vue'

let { columns, rows, data } = defineProps({
    rows: Array,
    columns: Array,
    data: Array
})

const getSumOrder = () => {
    const currentRows = [...rows];
    let sum = 0;
    currentRows.forEach(({ key, count }) => {
        const price = Number(data.find((item) => item.id === key)?.price ?? 0);
        sum += price * count;
    })
    return sum;
}
const getWeightCalc = computed(() => {
    let weightFull = 0;
    rows.forEach(({ key, count }) => {
        const weight = Number(data.find((item) => item.id === key)?.weight ?? 0);
        weightFull += weight * count;
    })
    return weightFull;
})

const getCounts = computed(() => {
    let counts = 0;
    rows.forEach(({ count }) => counts += count)
    return counts;
});
</script>


<template>
    <div class="results">
        <div class="results__top">
            <div class="results__sum">Сумма:</div>
            <div class="results__value results__sum_value" v-text="getSumOrder() + 'руб'"></div>
            <div class="results__counts">Кол-во:</div>
            <div class="results__value results__counts_value">{{ getCounts }} шт</div>
            <div class="results__weight">Общий вес:</div>
            <div class="results__value results__weight_value"> {{ getWeightCalc }} кг</div>
        </div>
        <div class="results__bottom">
            <div class="results__result">Общая сумма:</div>
            <div class="results__value results__result_value" v-text="getSumOrder() + 'руб'"> </div>
        </div>
    </div>
</template>
<style scoped >
.results {
    margin: 15px 15px 0 auto;
    width: max-content;
    font-size: 14px;
}

.results__top {
    color: #8f8f8f;
    padding: 15px;
    padding-top: 12px;
    border-radius: 5px;
    border: solid 1px #eeeff1;
    background-color: #fbfcfd;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 5px;
    grid-gap: 13px;
    grid-column-gap: 134px;
}
.results__bottom {
    padding: 15px;
    padding-top: 11px;
    border-radius: 5px;
    border: solid 1px #eeeff1;
    background-color: #fbfcfd;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-weight: 600;
    grid-column-gap: 50px;

}
.results__value  {
    text-align: right;
}
.results__result_value {
}
@media (max-width: 992px) {
    .results {
        width: 100%;
    }
}
</style>
