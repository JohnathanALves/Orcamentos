import Home from './Home.vue';
import Cotacao from './Cotacao.vue';

export const routes = [
    { name: 'home', path: '', component: Home, titulo: 'Home' },
    { name: 'cotacaoNova', path: '/cotacao', component: Cotacao, titulo: 'Cotacao' },
    { name: 'cotacaoExistente', path: '/cotacao/:id', component: Cotacao, titulo: 'Cotacao', props: true },
];