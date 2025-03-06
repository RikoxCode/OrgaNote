<script setup>
import { format } from 'date-fns'
import { useToken } from '@/core/auth.js'
import ProfileImage from '@/components/ProfileImage.vue'

const { token, user, clearToken } = useToken()

const formatDate = (date) => format(new Date(date), 'PPpp')
</script>

<template>
    <div class="container mx-auto p-6 max-w-lg rounded-lg">
        <div class="flex items-center gap-4">
            <ProfileImage
                :src="user.avatar.data"
                :alt="user.username"
                class="w-32 h-32 rounded-full"
            />
            <div class="mt-5">
                <h1 class="text-2xl font-bold">{{ user.realname }}</h1>
                <p class="text-gray-600">{{ user.username }}</p>
                <p class="mt-5 text-gray-600">{{ user.email }}</p>
                <div class="w-full">
                    <p class="text-sm text-gray-500">
                        Created: {{ formatDate(user.created_at) }}
                    </p>
                    <p class="text-sm text-gray-500">
                        Last Updated: {{ formatDate(user.updated_at) }}
                    </p>
                    <p class="text-sm text-gray-500">
                        Last Login: {{ formatDate(user.logged_in_at) }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
