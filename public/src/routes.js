import Home from './Home.vue';
import Cotacao from './Cotacao.vue';

export const routes = [
    { path: '', component: Home, titulo: 'Home'},
    { path: '/cotacao', component: Cotacao, titulo: 'Cotacao'}
];