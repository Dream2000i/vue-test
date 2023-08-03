

<script setup>

import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue'
import { moveElementToPosition } from '../utils';

const emit = defineEmits(['deleteRow', 'selectedProduct']);

let { column, row, data, index, handlePointerDown } = defineProps({
    row: Object,
    column: Object,
    data: Array,
    index: Number,
    handlePointerDown: Function,
    selectedProduct: Function,
    deleteRow: Function,
})



const getRowData = (id, key) => {
    const find = data.find(item => id === item.id);
    if (!find) return '';
    if (key === 'sum') {
        return row.count * find['price'];
    }
    return find[key] || '';
};


</script>


<template>
    <td v-if="column.view" :key="`column-${row.key}-${column.key}`"
        v-bind:class="`table__col table__col_body table__col_${column.key}`">
        <div class="table__col-wrap">
            <div class="table__col-name">
                {{ column.label }}
            </div>
            <template v-if="column.key === 'number'">
                <div v-on:pointerdown="(e) => { handlePointerDown(e, index) }" v-text="index + 1"
                    class="table__col-value col__number" />
            </template>
            <template v-else-if="column.key === 'action'">
                <ActionRow @deleteRow="emit('deleteRow')" />
            </template>
            <template v-else-if="column.key === 'name'">
                <SelectedProduct :index="index" :label="getRowData(row.key, column.key, index)" :data="data" :key=row.key
                    @onClick="(key) => emit('selectedProduct', key)" />
            </template>
            <template v-else-if="column.key === 'count'">
                <div class="table__col-value">
                    <input type="number" v-model="row.count">
                </div>
            </template>
            <template v-else="">
                <div v-if="column.view" v-text="getRowData(row.key, column.key, index)" class="table__col-value" />
            </template>
        </div>
    </td>
</template>
<style >
.table__col_body {
    padding: 4px 10px;
    line-height: 77%;
    touch-action: none;
    white-space: nowrap;
    position: relative;
}

.table__col_action {
    padding: 4px 0px;

}

.table__col_action .table__col-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
}


.table__col-name {
    display: none;
}

.table__col-wrap {
    border-radius: 5px;
    border: solid 1px #ccc;
    overflow: hidden;
    min-height: 34px;
    position: relative;
}

.table__col_number .table__col-wrap,
.table__col_action .table__col-wrap {
    border: 0;
    padding: 0;
    position: initial;
}

.table__col_name .table__col-wrap {
    position: initial;
}

.table__col-value {
    margin: 10px 15px;
}

.table__col_body input {
    border: none;
}

.table__col_body input:active {
    border: none;

}

.table__col_body .col__number {
    border: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
}

.table__col_body .col__number::before {
    content: '';
    display: block;
    min-width: 11px;
    min-height: 12px;
    background: url('./../assets/dragableclick.png') no-repeat center;
    background-size: contain;
}

@media (max-width: 1200px) {

    .table__col_body {
        padding: 4px;
    }
}

@media (max-width: 992px) {
    .table__col_body {
        padding: 0;
    }

    .table__col-name {
        display: block;
        color: #8f8f8f;
        font-size: 10px;
        margin-bottom:5px ;
    }

    .table__col-wrap {
        border: none;
        min-height: 34px;
        position: relative;
    }

    .table__col-value {
        border: solid 1px #ccc;
        border-radius: 5px;
        margin: 0;
        padding: 10px 15px;
    }

    .table__col_action .table__col-wrap {
        display: block;
    }

    .table__col_number {
        display: none;
    }
}
</style>

