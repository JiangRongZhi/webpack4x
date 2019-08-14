import './static/style/normalize.css'
import './static/style/main.css'
// import './static/style/app.less'
// import test from './static/js/test'

import Vue from 'vue'
import App from './views/App.vue'

new Vue({
    render: h => h(App)
}).$mount('#app')
