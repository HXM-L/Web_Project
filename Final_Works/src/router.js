import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'


import Login from './components/Login.vue'
import Index from './components/Index.vue'
import ShopCart from './components/ShopCart.vue'
import Favorites from './components/Favorites.vue'
import PerCenter from './components/PerCenter.vue'
import DailyRecom from './components/index/DailyRecom.vue'
import IndexedDB from './components/IndexedDB.vue'
import Register from './components/Register.vue'

Vue.use(Router)
Vue.use(ElementUI);

// 模拟token
const auth = {
	islogin() {
		// return false
		return true
	}
}

 
const router = new Router({
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login,
		},
		{
			// '/Index/:name'中的name是需要传递的参数username
			path: '/Index/:name',
			name: 'Index',
			component: Index,
			children:[
				{
					path:'DailyRecom',
					name:'DailyRecom',
					component:DailyRecom
				}
			]
		},
		{
			path: '/ShopCart/:name',
			name: 'ShopCart',
			component: ShopCart,
		},
		{
			path: '/Favorites/:name',
			name: 'Favorites',
			component: Favorites,
		},
		{
			path: '/PerCenter/:name',
			name: 'PerCenter',
			component: PerCenter,
		},
		{
			path: '/IndexedDB',
			name: 'IndexedDB',
			component: IndexedDB,
		},
		,
		{
			path: '/Register',
			name: 'Register',
			component: Register,
		},
		{ //路由重定向
			path: '*',
			name: 'any', // 名字在“命名路由”中使用，但是不介绍
			redirect: '/login'
		},
	]
})
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
export default router
