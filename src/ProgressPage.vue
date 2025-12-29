<template>
  <div class="page">
    <div class="navbar">
      <div class="navbar-title">我的进度</div>
    </div>

    <div class="container" style="padding-top: 56px;">
      <!-- 总进度 -->
      <div class="stats-card">
        <div class="stats-number">{{ completedCount }} / 60</div>
        <div class="stats-label">已打卡</div>
      </div>

      <!-- 成就列表 -->
      <div class="achievement-list">
        <div
          v-for="achievement in achievements"
          :key="achievement.id"
          class="achievement-item"
          :class="{ unlocked: achievement.unlocked }"
        >
          <div class="achievement-icon">{{ achievement.icon }}</div>
          <div class="achievement-info">
            <div class="achievement-title">{{ achievement.title }}</div>
            <div class="achievement-desc">{{ achievement.desc }}</div>
          </div>
          <div class="achievement-status">
            {{ achievement.unlocked ? '已解锁' : '未解锁' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const completedCount = ref(0)

const achievements = computed(() => [
  {
    id: 1,
    title: '初次打卡',
    desc: '去过 1 个世界遗产',
    icon: '🎯',
    unlocked: completedCount.value >= 1
  },
  {
    id: 2,
    title: '探索者',
    desc: '去过 5 个世界遗产',
    icon: '🏃',
    unlocked: completedCount.value >= 5
  },
  {
    id: 3,
    title: '旅行达人',
    desc: '去过 20 个世界遗产',
    icon: '✈️',
    unlocked: completedCount.value >= 20
  },
  {
    id: 4,
    title: '完美收集',
    desc: '去过全部 60 个世界遗产',
    icon: '🏆',
    unlocked: completedCount.value >= 60
  }
])

function loadProgress() {
  const stored = localStorage.getItem('heritage-checklist')
  if (stored) {
    try {
      const checkedIds = JSON.parse(stored)
      completedCount.value = checkedIds.length
    } catch (e) {
      completedCount.value = 0
    }
  }
}

// 监听 storage 变化（跨页面同步）
function handleStorageChange() {
  loadProgress()
}

onMounted(() => {
  loadProgress()
  window.addEventListener('storage', handleStorageChange)
  
  // 定时刷新进度（应对同页面更新）
  const timer = setInterval(loadProgress, 500)
  
  return () => {
    window.removeEventListener('storage', handleStorageChange)
    clearInterval(timer)
  }
})
</script>
