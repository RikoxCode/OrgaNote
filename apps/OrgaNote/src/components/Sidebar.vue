<script setup>
import { ref, defineProps, watch } from 'vue'
import { useRoute } from 'vue-router'
import Icon from '@/components/Icon.vue'
import { useToken } from '@/core/auth.js'
import ProfileImage from '@/components/ProfileImage.vue'

const { token, user, clearToken } = useToken()
const props = defineProps({
    title: String,
})

const isAccordionOpen = ref(true)
const menuOpen = ref(false)
const route = useRoute()
const activeTab = ref(route.path)

const toggleAccordion = () => {
    isAccordionOpen.value = !isAccordionOpen.value
}

const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
}

watch(
    () => route.path,
    (newPath) => {
        activeTab.value = newPath
    }
)
</script>

<template>
    <div class="relative h-full w-full">
        <!-- Hamburger Menu Button -->
        <button @click="toggleMenu" class="md:hidden p-4 dark:text-gray-300">
            <Icon icon="menu" class="h-6 w-6" />
        </button>

        <!-- Sidebar -->
        <div
            :class="menuOpen ? 'translate-x-0' : '-translate-x-full'"
            class="fixed top-0 left-0 md:relative h-full w-64 p-4 shadow-xl bg-white shadow-blue-gray-900/5 rounded-lg transition-transform md:translate-x-0 dark:bg-slate-700"
        >
            <button
                @click="toggleMenu"
                class="md:hidden p-4 dark:text-gray-300"
            >
                <Icon icon="menu" class="h-6 w-6" />
            </button>

            <div class="mb-2 p-4">
                <RouterLink
                    to="/"
                    class="text-2xl font-bold text-gray-700 dark:text-gray-300"
                >
                    {{ title }}
                </RouterLink>
            </div>

            <div class="flex flex-col justify-between h-[85%] overflow-scroll">
                <div>
                    <div>
                        <RouterLink
                            to="/dashboard"
                            class="flex justify-start w-full p-3 border-b-0 hover:bg-gray-200 rounded-lg cursor-pointer dark:text-gray-300 dark:hover:bg-gray-800"
                            :class="{ 'font-bold': activeTab === '/dashboard' }"
                        >
                            <Icon icon="dashboard" />
                            <span class="ml-2">Dashboard</span>
                        </RouterLink>
                        <button
                            @click="toggleAccordion"
                            class="flex justify-between w-full p-3 border-b-0 hover:bg-gray-200 rounded-lg cursor-pointer dark:text-gray-300 dark:hover:bg-gray-800"
                            :class="{ '': isAccordionOpen }"
                        >
                            <div class="flex">
                                <Icon icon="workspaces" />
                                <span class="ml-2">Communities</span>
                            </div>
                            <Icon
                                icon="chevron_right"
                                class="h-4 w-4 mb-2 transition-transform"
                                :class="{ 'rotate-90': isAccordionOpen }"
                            />
                        </button>

                        <div v-if="isAccordionOpen" class="flex-col pl-6">
                            <RouterLink
                                to="/club"
                                class="flex p-2 hover:text-blue-500 cursor-pointer dark:text-gray-300"
                                :class="{
                                    'text-blue-400 font-bold':
                                        activeTab === '/club',
                                }"
                            >
                                <Icon icon="groups" class="h-3 w-5" />
                                <span class="ml-4">Clubs Overview</span>
                            </RouterLink>
                        </div>
                    </div>
                </div>

                <div v-if="token">
                    <RouterLink
                        to="/profile"
                        class="flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer dark:text-gray-300 dark:hover:bg-gray-800"
                        :class="{
                            'text-blue-400 font-bold': activeTab === '/profile',
                        }"
                    >
                        <ProfileImage
                            :src="user.avatar.data"
                            alt="profile image"
                            class="h-6 w-6 rounded-full shadow-xl"
                        />
                        <span class="ml-2">Profile</span>
                    </RouterLink>

                    <RouterLink
                        to="/settings"
                        class="flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer dark:text-gray-300 dark:hover:bg-gray-800"
                        :class="{
                            'text-blue-400 font-bold':
                                activeTab === '/settings',
                        }"
                    >
                        <Icon icon="settings" />
                        <span class="ml-2">Settings</span>
                    </RouterLink>

                    <div
                        @click="clearToken"
                        class="flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        <Icon icon="logout" />
                        <span class="ml-2">Log Out</span>
                    </div>
                </div>

                <div v-else>
                    <RouterLink
                        to="/login"
                        class="flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer dark:text-gray-300 dark:hover:bg-gray-800"
                        :class="{
                            'text-blue-400 font-bold': activeTab === '/login',
                        }"
                    >
                        <Icon icon="login" />
                        <span class="ml-2">Login</span>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>
