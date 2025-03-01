<script setup>
import { ref, defineProps } from 'vue'
import Icon from '@/components/Icon.vue'

const props = defineProps({
    title: String,
})

const open = ref(0)
const toggleAccordion = (value) => {
    open.value = open.value === value ? 0 : value
}
</script>

<template>
    <div
        class="h-[calc(100vh-2rem)] w-full h-full min-w-[15rem] max-w-[20rem] p-4 shadow-xl bg-white shadow-blue-gray-900/5 rounded-lg"
    >
        <div class="mb-2 p-4">
            <RouterLink to="/" class="text-2xl font-bold text-gray-700">{{
                title
            }}</RouterLink>
        </div>
        <div
            class="flex flex-col justify-between h-[70%] md:h-[85%] lg:h-[90%] overflow-scroll"
        >
            <div>
                <div>
                    <button
                        @click="toggleAccordion(1)"
                        class="flex justify-between w-full p-3 border-b-0 hover:bg-gray-200 rounded-lg cursor-pointer"
                    >
                        <div class="flex">
                            <Icon icon="dashboard" />
                            <span class="ml-2">Dashboard</span>
                        </div>
                        <Icon
                            icon="chevron_right"
                            class="h-4 w-4 mb-2 transition-transform text-center"
                            :class="{ 'rotate-90': open === 1 }"
                        />
                    </button>
                    <div v-if="open === 1" class="flex-col pl-6">
                        <div
                            class="flex p-2 hover:text-blue-500 cursor-pointer"
                        >
                            <Icon icon="chevron_right" class="h-3 w-5" />
                            <span class="ml-2">Analytics</span>
                        </div>
                        <div
                            class="flex p-2 hover:text-blue-500 cursor-pointer"
                        >
                            <Icon icon="chevron_right" class="h-3 w-5" />
                            <span class="ml-2">Reporting</span>
                        </div>
                        <div
                            class="flex p-2 hover:text-blue-500 cursor-pointer"
                        >
                            <Icon icon="chevron_right" class="h-3 w-5" />
                            <span class="ml-2">Projects</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        @click="toggleAccordion(2)"
                        class="flex justify-between items-center w-full p-3 border-b-0 hover:bg-gray-200 rounded-lg cursor-pointer"
                    >
                        <div class="flex">
                            <Icon icon="shopping_cart" />
                            <span class="ml-2 flex-grow">E-Commerce</span>
                        </div>
                        <Icon
                            icon="chevron_right"
                            class="h-4 w-4 mb-2 transition-transform"
                            :class="{ 'rotate-90': open === 2 }"
                        />
                    </button>
                    <div v-if="open === 2" class="flex-col pl-6">
                        <div
                            class="flex p-2 hover:text-blue-500 cursor-pointer"
                        >
                            <Icon icon="chevron_right" class="h-3 w-5" />
                            <span class="ml-2">Orders</span>
                        </div>
                        <div
                            class="flex p-2 hover:text-blue-500 cursor-pointer"
                        >
                            <Icon icon="chevron_right" class="h-3 w-5" />
                            <span class="ml-2">Products</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div
                    class="flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
                >
                    <Icon icon="inbox" />
                    <span class="ml-2 flex-grow">Inbox</span>
                    <span
                        class="px-2 py-1 text-sm bg-blue-gray-200 rounded-full"
                        >14</span
                    >
                </div>
                <div
                    class="flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
                >
                    <Icon icon="people" />
                    <span class="ml-2">Profile</span>
                </div>
                <div
                    class="flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
                >
                    <Icon icon="settings" />
                    <span class="ml-2">Settings</span>
                </div>
                <div
                    class="flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer"
                >
                    <Icon icon="logout" />
                    <span class="ml-2">Log Out</span>
                </div>
            </div>
        </div>
    </div>
</template>
