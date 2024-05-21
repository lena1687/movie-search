<template>
  <nav>
    <Tabs :tabs="tabs" :activeTab="activeTab" @tabChanged="handleTabChanged" />
  </nav>
</template>

<script setup lang="ts">
import GenreList from '@components/GenreList.vue'
import CountryList from '@components/CountryList.vue'
import Tabs from '@components/Tabs.vue'
import { ref } from 'vue'

const tabs = [
  { name: 'Tab 1', component: GenreList },
  { name: 'Tab 2', component: CountryList }
]

const activeTab = ref<string>(tabs[0].name)

const handleTabChanged = (tabName: string) => {
  activeTab.value = tabName
}
</script>
