<script setup>

import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue'

const emit = defineEmits(['addRow']);

</script>


<template>
    <div class="add-row">
        <div class="add-row__btn" v-on:click="emit('addRow')">
            Добавить строку
        </div>
    </div>
</template>
<style scoped >
.add-row {
    margin: 25px 0;
    width: 100%;
    padding: 20px 25px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
    border: solid 1px #eeeff1;
}

.add-row__btn {
    width: 146px;
    height: 35px;
    padding: 10px;
    background-color: #2f8cff;
    border-radius: 5px;
    font-size: 14px;
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    cursor: pointer;
}
.add-row__btn::before {
    content: '+';
}
</style>
