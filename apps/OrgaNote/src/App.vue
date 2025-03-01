<script setup>
import { RouterView } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
</script>

<template>
    <div class="h-screen w-screen bg-slate-200 p-3 flex">
        <div>
            <Sidebar title="OrgaNote" />
        </div>
        <main class="w-full h-full p-5">
            <RouterView />
        </main>
    </div>
</template>

<style scoped></style>
