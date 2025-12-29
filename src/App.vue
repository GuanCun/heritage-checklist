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
        <div class="tabbar-icon">✓</div>
        <div>打卡</div>
      </div>
      <div
        class="tabbar-item"
        :class="{ active: currentTab === 'progress' }"
        @click="switchTab('progress')"
      >
        <div class="tabbar-icon">📊</div>
        <div>进度</div>
      </div>
      <div
        class="tabbar-item"
        :class="{ active: currentTab === 'about' }"
        @click="switchTab('about')"
      >
        <div class="tabbar-icon">ℹ️</div>
        <div>关于</div>
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
