<template>
  <div>
    <h2>{{ name }}</h2>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['info'])
const { id, name, genres, url, type, premiered, weight, img, summary, country } = props.info
</script>
