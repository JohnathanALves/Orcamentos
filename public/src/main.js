import Vue from 'vue'
import App from './App.vue'

var VueResource = require('vue-resource');

Vue.use(VueResource);

new Vue({
    el: '#app',
    http: {
        root: '127.0.0.1:3000/'
    },
    render: h => h(App)
})