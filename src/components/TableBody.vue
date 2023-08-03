<script setup>

import {  defineProps, defineEmits } from 'vue'

const emit = defineEmits(['rowsMoving', 'deleteRow', 'selectedProduct']);

let { columns, rows, data } = defineProps({
    rows: Array,
    columns: Array,
    data: Array
})

const moveAt = (pageX, pageY, block) => {
    block.style.left = pageX + 'px';
    block.style.top = pageY - block.offsetHeight / 2 + 'px';
}

const handlePointerDown = (e, index) => {
    const tr = e.target.closest('tr');
    const columns = tr.querySelectorAll('td');
    const left = tr.getBoundingClientRect().left + document.body.scrollLeft;
    columns.forEach(td => td.style.width = td.offsetWidth + 'px');
    const emptyEl = document.createElement('tr');
    emptyEl.innerHTML = Array(columns.length).fill('<td></td>').join('');
    emptyEl.style.height = `${tr.offsetHeight}px`;
    emptyEl.classList = 'tr-emty';
    tr.after(emptyEl);
    tr.style.width = `${tr.offsetWidth}px`;
    tr.style.position = 'absolute';
    tr.style.zIndex = '0';
    tr.style.display = 'flex';
    tr.style.alignItems = 'center';
    document.querySelector('.table__tbody').classList.add('table__tbody_moved');
    document.body.append(tr);

    moveAt(left, e.pageY, tr);

    const onPointerMove = (event) => {
        console.log(event.target.closest('tr[data-index]'));
        const elem = event.target.closest('tr[data-index]');
        const currentIndex = Number(elem?.dataset?.index);
        if (elem && elem !== tr) {
            const middleCheck = elem.offsetTop + elem.offsetHeight / 1.5 < event.pageY;
            if (middleCheck) {
                elem.after(emptyEl);
                document.querySelector(`td[data-index="${currentIndex}"]`)?.after(elem);
            } else {
                elem.before(emptyEl);
                document.querySelector(`td[data-index="${currentIndex}"]`)?.before(elem);
            }
        }
        moveAt(left, event.pageY, tr);
    }

    const onPointerUp = (e) => {
        const newIndex = Number(emptyEl?.nextElementSibling?.dataset?.index ?? rows.length - 1);
        const prevIndex = Number(emptyEl?.previousElementSibling?.dataset?.index ?? 0);
        console.log(newIndex);
        console.log(prevIndex);
        document.removeEventListener('pointermove', onPointerMove);
        tr.style = '';
        emptyEl.after(tr);
        emptyEl.remove();
        document.querySelector('.table__tbody').classList.remove('table__tbody_moved');

        document.removeEventListener('pointerup', onPointerUp);
        emit('rowsMoving', Number(index), Number(index > prevIndex ? newIndex : prevIndex));
    }

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);

}
</script>


<template>
    <tbody class="table__tbody">
        <template v-for="(row, index) in rows" :key="`row-${row.key+index}`">
            <tr v-bind:data-index=index class="table__row table__row_body ">
                <template v-for="column in columns">
                    <TableCol :column="column" :row="row" :data="data" :index="index" :handlePointerDown="handlePointerDown"
                        @deleteRow="emit('deleteRow', index)" @selectedProduct="(key) => emit('selectedProduct', index, key)" />
                </template>

            </tr>
        </template>
    </tbody>
</template>
<style >
.draggble {
    background-color: wheat;
}



.table__tbody_moved .table__row {
    position: relative;
}

tbody {
    touch-action: none;

}

tr {
    touch-action: none;
    z-index: 10;

}




.tr-emty td {
    aspect-ratio: 1;
    position: relative;
}

.tr-emty td::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 2px 0px;
    background:
        repeating-conic-gradient(#a6b7d4 0 25%, white 0 50%) 0 0/17px 17px round;
    -webkit-mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
}

.tr-emty td:first-child::before {
    padding-left: 2px;

}

.tr-emty td:last-child::before {
    padding-right: 2px;
}


@media (max-width: 992px) {
    .table__tbody {
        display: block;
    }

    .table__row_body {
        display: grid;
        align-items: start;
        grid-gap: 15px;
        margin-bottom: 5px;
        padding: 15px 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
        border: solid 1px #eeeff1;
        background-color: #fff;
    }
}
</style>
