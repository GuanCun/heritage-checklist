<template>
  <div id="app">
    <!-- 页面内容 -->
    <component :is="currentPage" />

    <!-- TabBar 导航 -->
    <div class="tabbar">
      <div
        class="tabbar-item"
        :class="{ active: currentTab === 'checklist' }"
        @click="switchTab('checklist')"
      >
        <svg class="tabbar-icon" viewBox="0 0 24 24" width="22" height="22">
          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        <div class="tabbar-label">打卡</div>
      </div>
      <div
        class="tabbar-item"
        :class="{ active: currentTab === 'progress' }"
        @click="switchTab('progress')"
      >
        <svg class="tabbar-icon" viewBox="0 0 24 24" width="22" height="22">
          <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
        <div class="tabbar-label">进度</div>
      </div>
      <div
        class="tabbar-item"
        :class="{ active: currentTab === 'about' }"
        @click="switchTab('about')"
      >
        <svg class="tabbar-icon" viewBox="0 0 24 24" width="22" height="22">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
        <div class="tabbar-label">关于</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ChecklistPage from './ChecklistPage.vue'
import ProgressPage from './ProgressPage.vue'
import AboutPage from './AboutPage.vue'

const currentTab = ref('checklist')

const currentPage = computed(() => {
  switch (currentTab.value) {
    case 'checklist':
      return ChecklistPage
    case 'progress':
      return ProgressPage
    case 'about':
      return AboutPage
    default:
      return ChecklistPage
  }
})

function switchTab(tab) {
  currentTab.value = tab
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
