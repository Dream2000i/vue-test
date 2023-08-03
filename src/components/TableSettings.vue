<script setup>

import { ref,  defineProps } from 'vue'

const { columns } = defineProps({
    columns: Array,
})

const menu = ref(false);
const submenu = ref(false);

const openMenuClick = ({ target }) => {
    menu.value = !menu.value;
    if (menu.value) {
        const listener = (e) => {
            if (menu.value && e.target !== target && !e.target.closest('.table-settings__menu')) {
                menu.value = false;
                document.body.removeEventListener('click',listener);

            }
        }
        document.body.addEventListener('click',listener)
    }
}

const getColumChange = (key) => {
    if (key !== 'number' && key !== 'action' && key !== 'sum' && key !== 'name' && key !== 'price') return true;
    return false;
}


</script>


<template>
    <div class="table-settings">
        <div v-on:click="openMenuClick" class="table-settings__btn"></div>
        <ul v-if="menu" class="table-settings__menu">
            <li v-on:click="submenu = !submenu" class="table-settings__menu-point" v-bind:class="submenu?'active':''">
                Отображение столбцов
            </li>
            <ul v-if="submenu" class="table-settings__submenu">
                <template v-for="(column, key) in columns" :key="`column-${column.key}`">
                    <li v-if="getColumChange(column.key)" class="table-settings__submenu-point">
                        <label class="table-settings__submenu-label">
                            <input type="checkbox" v-model="column.view"> {{ column.label }}
                        </label>
                    </li>
                </template>
            </ul>
        </ul>

    </div>
</template>
<style scoped >
.table-settings {
    position: relative;
    margin-right: 17px;
}

.table-settings__btn {
    display: block;
    margin-bottom: 8px;
    margin-left: auto;
    width: 15px;
    height: 15px;
    background: url('./../assets/settings.png') no-repeat center;
    background-size: contain;
    cursor: pointer;
}

.table-settings__menu {
    position: absolute;
    top: 18px;
    right: 0;
    cursor: pointer;
    padding: 7px 10px;
    z-index: 15;
    list-style-type: none;
    border-radius: 5px;
    box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
    background-color: #fff;
    font-size: 14px;
}
.table-settings__menu-point {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    cursor: pointer;

}
.table-settings__menu-point.active {
    font-weight: 600;
    flex-direction: row-reverse;
}
.table-settings__menu-point::after {
    font-weight: 600;
    transform: rotate(180deg);
}
.table-settings__menu-point::after {
    content: '';
    width: 4px;
    height: 9px;
    display: block;
    background: url('./../assets/arrow-left.png') no-repeat center;
    background-size: contain;
}

.table-settings__submenu {
    margin-top: 14px;
    cursor: pointer;
    padding: 7px 10px;
    z-index: 15;
    list-style-type: none;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    font-size: 14px;
}
.table-settings__submenu-point {
    cursor: pointer;
    width: 100%;
}
.table-settings__submenu-label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
}

@media (max-width: 992px) {
    .table-settings {
        display: none;
    }
}
</style>
