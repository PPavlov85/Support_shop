import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import Home from '../views/Home.vue'
import Product from "@/views/Product";
import Category from "@/views/Category";
import Search from "@/views/Search";
import Cart from "@/views/Cart";
import Register from "@/views/Register";
import Login from "@/views/Login";
import MyAccount from "@/views/MyAccount";


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/log-in',
        name: 'Login',
        component: Login
    },
    {
        path: '/my-account',
        name: 'MyAccount',
        component: MyAccount,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/:category_slug/:product_slug',
        name: 'Product',
        component: Product
    },
    {
        path: '/:category_slug',
        name: 'Category',
        component: Category
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
        next({name: 'Login', query:{to: to.path}})
    } else {
        next()
    }
})

export default router
