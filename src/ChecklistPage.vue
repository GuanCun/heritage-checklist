<template>
  <div class="page">
    <div class="navbar">
      <div class="navbar-title">世界遗产打卡</div>
    </div>

    <div class="container" style="padding-top: 56px;">
      <!-- 进度展示 -->
      <div class="progress-section">
        <div class="progress-text">
          <span>已完成 {{ completedCount }} / {{ total }}</span>
          <span>{{ progressPercent }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>

      <!-- 搜索框 -->
      <div class="search-box">
        <input
          type="text"
          class="search-input"
          placeholder="搜索遗产名称或省份"
          v-model="searchText"
        />
      </div>

      <!-- 清单列表 -->
      <div class="heritage-list">
        <div
          v-for="item in filteredList"
          :key="item.id"
          class="heritage-item"
          :class="{ checked: isChecked(item.id) }"
          @click="toggleCheck(item.id)"
        >
          <div class="heritage-checkbox" :class="{ checked: isChecked(item.id) }"></div>
          <div class="heritage-info">
            <div class="heritage-name">{{ item.name }}</div>
            <div class="heritage-meta">{{ item.type }} · {{ item.province }}</div>
          </div>
        </div>

        <div v-if="filteredList.length === 0" class="empty-state">
          没有找到相关遗产
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import heritageData from '../data.json'

const total = 60
const searchText = ref('')
const checkedIds = ref([])

// 计算属性
const completedCount = computed(() => checkedIds.value.length)
const progressPercent = computed(() => Math.round((completedCount.value / total) * 100))

const filteredList = computed(() => {
  if (!searchText.value) return heritageData
  const keyword = searchText.value.toLowerCase()
  return heritageData.filter(
    item =>
      item.name.toLowerCase().includes(keyword) ||
      item.province.toLowerCase().includes(keyword)
  )
})

// 方法
function isChecked(id) {
  return checkedIds.value.includes(id)
}

function toggleCheck(id) {
  const index = checkedIds.value.indexOf(id)
  if (index > -1) {
    checkedIds.value.splice(index, 1)
  } else {
    checkedIds.value.push(id)
  }
  saveToStorage()
}

function loadFromStorage() {
  const stored = localStorage.getItem('heritage-checklist')
  if (stored) {
    try {
      checkedIds.value = JSON.parse(stored)
    } catch (e) {
      checkedIds.value = []
    }
  }
}

function saveToStorage() {
  localStorage.setItem('heritage-checklist', JSON.stringify(checkedIds.value))
}

onMounted(() => {
  loadFromStorage()
})
</script>
