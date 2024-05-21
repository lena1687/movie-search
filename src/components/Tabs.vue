<template>
  <div>
    <ul class="tabs">
      <li
        v-for="tab in tabs"
        :key="tab.name"
        :class="{ active: tab.name === activeTab }"
        @click="selectTab(tab.name)"
      >
        {{ tab.name }}
      </li>
    </ul>
    <div class="tab-content">
      <Tab v-for="tab in tabs" :key="tab.name" :name="tab.name" :activeTab="activeTab">
        <component :is="tab.component" />
      </Tab>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, defineComponent } from 'vue'
import Tab from '@components/Tab.vue'

interface Tab {
  name: string
  component: ReturnType<typeof defineComponent>
}

const props = defineProps<{ tabs: Tab[]; activeTab: string }>()

const activeTab = ref<string>(props.activeTab)

const selectTab = (tabName: string) => {
  activeTab.value = tabName
  const instance = getCurrentInstance()
  instance?.emit('tabChanged', tabName)
}
</script>

<style scoped lang="sass">
@import '@styles/vars/typo.sass'
@import '@styles/vars/colors.sass'

.tabs
  list-style: none
  display: flex
  padding: 0
  margin: 0
  border-bottom: 2px solid $tab_border
  li
    padding: 10px 20px
    cursor: pointer
    border: 1px solid $bg-color
    border-bottom: none
    &.active
      background-color: $bg-color
      border-bottom: 2px solid $tab_border-active
      font-weight: bold

.tab-content
  border: 1px solid $bg-color
  padding: 10px
</style>
