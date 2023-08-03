import TableHead from './TableHead.vue';
import TableBody from './TableBody.vue';
import TableSettings from './TableSettings.vue';
import AddRow from './AddRow.vue';
import Results from './Results.vue';
import ActionRow from './ActionRow.vue';
import Header from './Header.vue';
import SelectedProduct from './SelectedProduct.vue';
import TableCol from './TableCol.vue';

const components = [
    { name: 'TableCol', component: TableCol },
    { name: 'SelectedProduct', component: SelectedProduct },
    { name: 'Header', component: Header },
    { name: 'ActionRow', component: ActionRow },
    { name: 'Results', component: Results },
    { name: 'AddRow', component: AddRow },
    { name: 'TableSettings', component: TableSettings },
    { name: 'TableBody', component: TableBody },
    { name: 'TableHead', component: TableHead },
];


export default {
    install(app) {
        components.forEach(({ name, component }) => {
            app.component(name, component);
        });
    }
}