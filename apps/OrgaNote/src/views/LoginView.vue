<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToken } from '@/core/auth.js'
import { login } from '@/core/request.js'

const { setToken, setUser } = useToken()
const email = ref('')
const password = ref('')
const router = useRouter()
const isValid = computed(() => {
    if (!email.value != '' || !password.value != '') {
        return false
    }

    // Check if email is valid
    if (email.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email.value)) {
            return false
        }
    }

    // Check if password is valid
    if (password.value) {
        if (password.value.length < 8 || password.value.length > 100) {
            return false
        }
    }

    return true
})

const signIn = async () => {
    try {
        const response = await login(email.value, password.value)

        // If login is successful, redirect to home page
        if (response) {
            setToken(response.token)
            setUser(response.user)
            router.push('/')
        }
    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <!-- component -->
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
                Sign In
            </h2>

            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                        >Email</label
                    >
                    <input
                        type="email"
                        v-model="email"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="your@email.com"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                        >Password</label
                    >
                    <input
                        type="password"
                        v-model="password"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    @click.prevent="signIn"
                    :disabled="!isValid"
                    class="w-full bg-gray-700 hover:bg-gray-500 text-white font-medium py-2.5 rounded-lg transition-colors"
                    :class="{ 'cursor-not-allowed bg-gray-500': !isValid }"
                >
                    Sign In
                </button>
            </form>

            <div class="mt-6 text-center text-sm text-gray-600">
                Don't have an account?
                <a
                    href="#"
                    class="text-blue-700 hover:text-blue-600 font-medium"
                    >Sign up</a
                >
            </div>
        </div>
    </div>
</template>

<style scoped></style>
