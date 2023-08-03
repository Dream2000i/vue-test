<script setup>


</script>


<template>
    <header class="header">
        <h1 class="header__title">Проведение ТО и мелкий ремонт</h1>
        <div class="header__tabs tabs">
            <div class="tabs__item">Общее</div>
            <div class="tabs__item active">Товар списания</div>
            <div class="tabs__item">Доп.расходы</div>
        </div>

    </header>
</template>
<style scoped >
.header__title {
    font-size: 30px;
    margin-bottom: 20px;
}

.tabs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 23px;
}

.tabs__item {
    color: #1253a2;
    font-weight: 600;
}

.tabs__item.active {

    color: black;
}

@media (max-width: 992px) {
    .header__title {
        margin-bottom: 16px;
    }
}
</style>
