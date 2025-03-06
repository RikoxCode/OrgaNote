<script setup>
import { defineProps, ref, watchEffect } from 'vue'

const props = defineProps(['src', 'alt'])
const url = ref('')

// Funktion zur Umwandlung von ArrayBuffer oder Uint8Array in eine Base64-Data-URL
const convertToBase64 = (buffer) => {
    const bytes = new Uint8Array(buffer)
    let binary = ''
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    return `data:image/png;base64,${window.btoa(binary)}`
}
</script>

<template>
    <img v-if="src" :src="convertToBase64(src)" :alt="alt" />
</template>

<style scoped></style>
