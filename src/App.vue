<script setup>

import { ref } from 'vue';
import data from './../data.json';
import { arraySortig, moveElementToPosition } from './utils';

const columns = ref([
  { key: 'number', label: 'Номер', view: true, width: 48 },
  { key: 'action', label: 'Дeйствие', view: true, width: 23 },
  { key: 'name', label: 'Наименование еденицы', view: true, width: 624 },
  { key: 'price', label: 'Цена', view: true, width: 217 },
  { key: 'count', label: 'Кол-во', view: true, width: 218 },
  { key: 'title', label: 'Название товара', view: true, width: 170 },
  { key: 'weight', label: 'Вес', view: false, width: 'auto' },
  { key: 'pledgedDelivery', label: 'Заложено на доставку', view: false, width: 'auto' },
  { key: 'delivery', label: 'Цена доставки, руб', view: false, width: 'auto' },
  { key: 'capacity', label: 'Max грузоподъемность, кг', view: false, width: 'auto' },
  { key: 'sum', label: 'Итого', view: true, width: 'auto' },
]);

const rows = ref([{ key: 21, count: 12 }, { key: 55, count: 1 }, { key: 51, count: 1 }, { key: 11, count: 1 }]);

const columnMoving = (column1, column2) => {
  columns.value = arraySortig(columns.value, column1, column2);
}
const rowsMoving = (row1, row2) => {
  rows.value = moveElementToPosition([...rows.value], row1, row2);
};

const resizeColumn = (key, width) => {
  const newColumn = [...columns.value];
  newColumn.forEach((column, index) => {
    if (column.key === key) {
      column.width = width;
    }
  })
  columns.value = newColumn;
}


const addRow = () => rows.value.push({ key: null, count: 0 });

const selectedProduct = (index, id) => {
  console.log(index);
  console.log(id);
  const newRows = [...rows.value];
  newRows.forEach((item, key) => {
    if (key === index) {
      item.count = 1;
      item.key = id;
    }
  })
  rows.value = newRows;
  // fetch('www.data.ru'.{
  //   method: 'POST',
  //   body: rows.value
  // })
}

const deleteRow = (index) => {
  const newRows = [...rows.value];
  newRows.forEach((item, key) => { if (key === index) item.count = 0 })
  rows.value = newRows.filter((item, key) => key !== index);
  // fetch('www.data.ru'.{
  //   method: 'POST',
  //   body: rows.value
  // })
}

</script> 

<template>
  <Header />
  <AddRow @addRow="addRow" />
  <div class="wrapper">
    <TableSettings :columns="columns" />
    <table class="table">
      <TableHead @columnMoving="columnMoving" @resizeColumn="resizeColumn" :columns="columns" />
      <TableBody @rowsMoving="rowsMoving" @deleteRow="deleteRow" @selectedProduct="selectedProduct" :rows="rows"
        :columns="columns" :data="data" />
    </table>
    <Results :rows="rows" :columns="columns" :data="data" />
  </div>
</template>

<style >
@font-face {
  font-family: "MyriadPro";
  src: url('./assets/MYRIADPRO-REGULAR.OTF');
}

#app {
  font-family: 'MyriadPro', sans-serif;
  color: black;
  padding: 1rem;
  width: 100%;
  max-width: 1449px;
  font-size: 16px;
  margin: auto;
  padding: 25px;
  background-color: #fbfcfd;

}

#app * {
  box-sizing: border-box;
}

.wrapper {
  width: 100%;
  overflow-x: hidden;
  padding: 8px 0 25px 0;
  border-radius: 10px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.07);
  border: solid 1px #eeeff1;
  background-color: #fff;
}

table {
  table-layout: fixed;
  width: 100%;
  border-spacing: 0;
}



@media (max-width: 1200px) {
}
@media (max-width: 992px) {
  #app {
    padding: 10px;
  }
  .wrapper {
    box-shadow:none;
    background-color: none;
    border: none;
    padding: 0;
  }
  #app * {
    touch-action:initial!important;
  }
}


</style>