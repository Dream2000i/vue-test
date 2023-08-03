

<script setup>

import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue'
import { widhtCalcPrecent } from '../utils';

const { columns } = defineProps({
    columns: Array,
})

const emit = defineEmits(['columnMoving', 'resizeColumn']);

const isDraggbleColumn = ref(null)


const sort = (column2) => {
    if (!isDraggbleColumn.value || column2 == isDraggbleColumn.value) return;
    emit('columnMoving', isDraggbleColumn.value, column2);
}

const clearDraggble = () => {
    isDraggbleColumn.value = null
}

onMounted(() => {
    document.onpointerup = clearDraggble
})

onBeforeUnmount(() => {
    document.removeEventListener('onpointerup', clearDraggble)
})




const handleClickResize = (e, key) => {
    e.stopPropagation();
    const th = e.target.closest('th');
    const { x: left, width } = th.getBoundingClientRect();
    const nextTh = th.nextElementSibling;
    if (!nextTh) return;
    const { width: widthSibling } = nextTh.getBoundingClientRect();
    const maxWidth = widthSibling + width;
    th.style.width = widhtCalcPrecent(width) + '%';

    const onPointerMove = (e) => {
        const { x } = th.getBoundingClientRect();
        const newWidth = e.pageX - x;
        const nextElemWidth = maxWidth - newWidth;
        if (nextElemWidth < 0||nextElemWidth>maxWidth) return;
        emit('resizeColumn', nextTh.dataset.colIndex, nextElemWidth);
        emit('resizeColumn', key, newWidth);
    };
    const onPointerup = () => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerMove);
    }
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerup);
}

</script>


<template>
    <thead class="table__thead">
        <tr class="table__row table__row_head">
            <template v-for="(column, key) in columns" :key="`column-${column.key}`">
                <th v-if="column.view" 
                    v-bind:data-col-index="column.key"
                    :class="[isDraggbleColumn == column.key ? 'draggble' : '']"
                    class="table__col table__col_head" v-on:pointerdown="isDraggbleColumn = column.key"
                    v-on:pointerover="sort(column.key)" v-on:pointerup="clearDraggble"
                    v-bind:style="{ width: widhtCalcPrecent(column.width) + '%' }">
                    {{ column.label }}
                    <span class="table__col_resize-btn" v-on:pointerdown="(e) => handleClickResize(e, column.key)"></span>
                </th>
            </template>
        </tr>
    </thead>
</template>
<style scoped >
.draggble {
    background-color: silver;
}

.table__col_head {

    font-weight: 600;
    white-space: nowrap;
    border: 1px solid #eeeff1;
    text-align: left;
    height: 100%;
    padding: 12px 8px;
    padding-right: 0;
    cursor: move;
    user-select: none;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
}

.table__col_head span {
    position: absolute;
    display: block;
    width: 10px;
    height: 100%;
    right: 0;
    top: 0;
    cursor: col-resize;
}


@media (max-width: 992px) {
    .table__thead {
        display: none;
    }
}
</style>

