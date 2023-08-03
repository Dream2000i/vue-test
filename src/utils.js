export const moveElementToPosition = (arr, fromIndex, toIndex) => {
    console.log(fromIndex, toIndex);
    const newArr = [...arr];
    const element = newArr[fromIndex];
    newArr.splice(fromIndex, 1);
    newArr.splice(toIndex, 0, element);
    return newArr;
}

export const arraySortig = (arr, isDraggbleColumn, column2) => {
    let columnsData = [...arr]
    let indexColumn1 = columnsData.findIndex(column => column.key == isDraggbleColumn)
    let test = { ...columnsData[indexColumn1] };
    columnsData.splice(indexColumn1, 1)
    let indexColumn2 = columnsData.findIndex(column => column.key == column2)
    let append = (indexColumn1 == indexColumn2) ? 1 : 0;
    columnsData.splice(indexColumn2 + append, 0, test);
    return columnsData;
}


export const widhtCalcPrecent = (value) => {
    const widthTable = document.querySelector('#app').getBoundingClientRect().width - 50;
    return value / (widthTable / 100);
};