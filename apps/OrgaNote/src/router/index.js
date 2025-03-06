import { createRouter, createWebHistory } from 'vue-router'
import { useToken } from '@/core/auth.js'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ClubView from '@/views/ClubView.vue'
import ProfileView from '@/views/ProfileView.vue'

const { token, user } = useToken()

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
            beforeEnter: (to, from, next) => {
                if (!token.value) {
                    next({ name: 'login' })
                } else {
                    next()
                }
            },
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/club',
            name: 'club',
            component: ClubView,
            beforeEnter: (to, from, next) => {
                if (!token.value) {
                    next({ name: 'login' })
                } else {
                    next()
                }
            },
        },
    ],
})

export default router
