<script setup>

import { ref, defineEmits } from 'vue'

let { key, data, label } = defineProps({
    key: Array,
    label: String,
    data: Array
})


const emit = defineEmits(['onClick']);


const productsMenu = ref(false);

const openMenuClick = ({ target }) => {
    productsMenu.value = !productsMenu.value;
    if (productsMenu.value) {
        const listener = (e) => {
            if (productsMenu.value && e.target !== target) {
                productsMenu.value = false;
                document.body.removeEventListener('click',listener);

            }
        }
        document.body.addEventListener('click',listener)
    }
}


const menuHandleClick = (id) => {
    emit('onClick', id);
}

</script>


<template>
    <div class="table__col-value selected">
        <div v-on:click="openMenuClick" v-text="label || '...'" class="selected__btn"></div>
        <ul v-if="productsMenu" class="selected__list">
            <template v-for="({ name, id }, index) in data" :key="`product-${id}-${index}`">
                <li v-on:click="menuHandleClick(id)" v-text="name"></li>
            </template>
        </ul>
    </div>
</template>
<style scoped >
.selected {
    cursor: pointer;
}

.selected__btn {
    min-height: 100%;
}

.selected__list {
    position: absolute;
    list-style-type: none;
    background-color: white;
    width: inherit;
    z-index: 2;
    border-radius: 5px;
    border: solid 1px #ccc;
    padding:7px 10px;
    overflow: hidden;
    width: calc(100% - 20px);
    left: 10px;
    top: 50px;
    box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items:  flex-start;
    flex-direction: column;
    gap:17px;
}
@media (max-width: 992px) {
    .selected__list {
        width: 100%;
    left: 0;
    top: 60px;
    }
}

</style>
