import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { routes } from './routes';
import VueResource from 'vue-resource'

const router = new VueRouter({
    routes,
    mode: 'history'
});

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'http://127.0.0.1:3000';

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

