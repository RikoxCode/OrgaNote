<script setup lang="ts">
import { useToken } from '@/core/auth.js'
import { getUserClubs } from '@/core/request.js'
import { onMounted, ref } from 'vue'
import Icon from '@/components/Icon.vue'

const { user } = useToken()
const clubs = ref([])
const isLoading = ref(false)

onMounted(async () => {
    isLoading.value = true
    clubs.value = await getUserClubs()
    clubs.value.push(clubs.value[0])
    isLoading.value = false
})
</script>

<template>
    <div class="flex md:flex-col lg:flex-row h-full">
        <div
            class="flex-1 bg-blue-500 hidden lg:flex items-center justify-center dark:bg-gray-600"
        >
            <div class="text-center text-white dark:text-gray-300">
                <h1 class="text-4xl font-bold">Innovate with Us</h1>
                <p class="mt-2"></p>
                <RouterLink
                    to="/projects"
                    class="mt-4 inline-block bg-white text-blue-500 py-2 px-4 rounded dark:bg-gray-800 dark:text-white"
                >
                    Visit latest Project
                </RouterLink>
            </div>
        </div>
        <div class="flex-1">
            <div
                v-if="clubs.length === 0 && !isLoading && false"
                class="flex items-center justify-center h-full"
            >
                <div class="text-center">
                    <h1
                        class="text-4xl font-bold mb-6 text-gray-600 text-shadow dark:text-gray-400"
                    >
                        Your Clubs
                    </h1>
                    <p class="mt-2 dark:text-gray-300">
                        You are not part of any club yet.
                    </p>
                    <RouterLink
                        to="/clubs/create"
                        class="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded dark:bg-gray-800"
                    >
                        Create a Club
                    </RouterLink>
                </div>
            </div>
            <div v-else-if="isLoading">
                <div
                    class="flex flex-col mx-auto items-center justify-between max-w-4xl w-full p-6"
                >
                    <h1
                        class="text-4xl font-bold mb-6 text-gray-600 text-shadow dark:text-gray-400"
                    >
                        Your Clubs
                    </h1>

                    <!-- Create a list of all Clubs -->
                    <div class="flex-col flex-wrap">
                        <div
                            v-for="club in [1, 2]"
                            :key="club"
                            class="p-4 rounded m-4"
                        >
                            <div
                                class="block w-56 h-5 mb-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit animate-pulse dark:bg-gray-700"
                            ></div>
                            <div
                                class="block w-16 h-8 mb-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit animate-pulse dark:bg-gray-700"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <div
                    class="flex flex-col mx-auto items-center justify-between max-w-4xl w-full p-6"
                >
                    <h1
                        class="text-4xl font-bold mb-6 text-gray-600 text-shadow dark:text-gray-400"
                    >
                        Your Clubs
                    </h1>

                    <!-- Club List -->
                    <div class="w-full space-y-4">
                        <!-- Club Cards -->
                        <div class="p-4">
                            <TransitionGroup
                                name="club-fade"
                                tag="div"
                                appear
                                class="space-y-4"
                            >
                                <div
                                    v-for="(club, index) in clubs"
                                    :key="club.id"
                                    :style="{
                                        animationDelay: `${index * 0.2}s`,
                                    }"
                                    class="flex flex-col sm:flex-row justify-between bg-white p-5 rounded-2xl shadow-lg w-full border border-gray-200 hover:shadow-xl transition dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <div
                                        class="w-full sm:w-3/4 flex flex-col sm:flex-row items-center justify-start gap-4"
                                    >
                                        <div>
                                            <img
                                                src="https://www.jungmusik-rottal.ch/clubdesk/w_jungmusik-rottal/fileservlet?inline=true&type=image&id=1000093&s=djEt4czuUiAA8bjlbpM9snixEtv5bhP5-CQHp991RoJdumo=&imageFormat=_512x512"
                                                alt="club.name"
                                                class="w-22 h-22 sm:w-10 sm:h-10 object-cover rounded-full"
                                            />
                                        </div>
                                        <div>
                                            <h2
                                                class="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-300"
                                            >
                                                {{ club.name }}
                                            </h2>
                                            <div
                                                class="flex items-center gap-2 text-sm md:text-md text-gray-600 mt-1 dark:text-gray-300"
                                            >
                                                <Icon
                                                    icon="home"
                                                    class="text-gray-500"
                                                />
                                                <p>{{ club.location }}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        class="flex items-center justify-end w-full sm:w-1/4 mt-4 sm:mt-0"
                                    >
                                        <RouterLink
                                            :to="'/clubs/' + club.id"
                                            class="text-blue-600 font-medium flex items-center gap-1 hover:text-blue-800 transition dark:text-blue-400 dark:hover:text-blue-500"
                                        >
                                            Visit Club
                                            <Icon
                                                icon="arrow_right"
                                                class="text-xl"
                                            />
                                        </RouterLink>
                                    </div>
                                </div>
                            </TransitionGroup>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.club-fade-enter-from {
    opacity: 0;
}

.club-fade-enter-to {
    opacity: 0;
}

.club-fade-enter-active {
    animation: fadeInUp 0.5s ease-out;
}
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
