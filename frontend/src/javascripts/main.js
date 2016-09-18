import Vue from 'vue'
import Router from 'vue-router'
import App from './containers/App.vue'
import ChartView from './containers/ChartView.vue'

// install router
Vue.use(Router)

// routing
var router = new Router()

router.map({
  '/chart': {
    component: ChartView
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  '*': '/chart'
})

router.start(App, '#app')
