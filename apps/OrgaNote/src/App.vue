<script setup>
import { RouterView } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
    <div class="h-screen w-screen bg-slate-200 p-1 sm:p-3 flex dark:bg-slate-800">
        <div class="w-1 md:w-64 h-full">
            <Sidebar title="OrgaNote" />
        </div>
        <main class="w-full h-full p-4 pt-12 md:pt-3">
            <RouterView />
        </main>
    </div>
</template>

<style scoped></style>
