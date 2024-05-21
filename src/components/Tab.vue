<template>
  <div v-if="isActive">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface TabProps {
  name: string
  activeTab: string
}

const props = defineProps<TabProps>()

const isActive = computed(() => props.name === props.activeTab)
</script>
