<script setup>

import { ref, defineEmits } from 'vue'

const emit = defineEmits(['deleteRow']);

const actionMenu = ref(false);

const openMenuClick = ({ target }) => {
    actionMenu.value = !actionMenu.value;
    if (actionMenu.value) {
        const listener = (e) => {
            if (actionMenu.value && e.target !== target) {
                actionMenu.value = false;
                document.body.removeEventListener('click',listener);

            }
        }
        document.body.addEventListener('click',listener)
    }
}

</script>


<template>
    <div class="table__col-value action-row">
        <div v-on:click="openMenuClick" class="action-row__btn"></div>
        <div v-if="actionMenu" v-on:click="emit('deleteRow')" class="action-row__delete">Удалить</div>
    </div>
</template>
<style scoped >

.action-row {
    padding: 0;
    border: 0;
    margin: 0;
    cursor: pointer;
    overflow: visible;
    width: 100%;
}

.action-row__btn {
    width: 3px;
    height: 13px;
    background: url('./../assets/action.png') no-repeat center;
    background-size: contain;
    width: 100%;
}

.action-row__delete {
    position: absolute;
    top:75%;
    min-width: 180px;
    font-size: 14px;
    z-index: 2;
    border-radius: 5px;
    box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
    background-color: #fff;
    padding:9px;
    color: #ae0a0a;
    left: 10px;
}
@media (max-width: 992px) {
    .action-row__btn {
    width: 3px;
    }
    .action-row__delete {
        top: 95%;
        left: 0;
    }
}
</style>
