<template>
  <div class="page">
    <div class="navbar">
      <div class="navbar-title">世界遗产打卡</div>
    </div>

    <div class="container" style="padding-top: 56px;">
      <!-- 进度展示 -->
      <div class="progress-section">
        <div class="progress-header">
          <div class="progress-text">
            <span>已完成 {{ completedCount }} / {{ total }}</span>
            <span>{{ progressPercent }}%</span>
          </div>
          <!-- 地图按钮 -->
          <button class="map-btn" @click="showMap = true" aria-label="查看地图">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
            </svg>
          </button>
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

    <!-- 地图悬浮层 -->
    <transition name="fade">
      <div v-if="showMap" class="map-overlay" @click="showMap = false">
        <div class="map-container" @click.stop>
          <!-- 关闭按钮 -->
          <button class="close-btn" @click="showMap = false">✕</button>
          
          <!-- 地图图片（支持双指缩放） -->
          <img 
            src="/heritage-map-china.jpg" 
            alt="中国世界遗产分布图"
            class="map-image"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import heritageData from '../data.json'

const total = 60
const searchText = ref('')
const checkedIds = ref([])
const showMap = ref(false)

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
<style scoped>
/* 进度区域优化 */
.progress-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
}

.progress-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.progress-text {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #666;
}

/* 地图按钮 */
.map-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.map-btn:hover {
  background: #e0e0e0;
  color: #07c160;
}

.map-btn:active {
  transform: scale(0.95);
}

/* 进度条 */
.progress-bar {
  background-color: #e5e5e5;
  border-radius: 10px;
  height: 8px;
  overflow: hidden;
}

.progress-fill {
  background-color: #07c160;
  height: 100%;
  transition: width 0.3s;
}

/* ==================== 地图悬浮层 ==================== */

.map-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 关键：允许图片溢出以支持缩放 */
  overflow: auto;
  /* iOS Safari 平滑滚动 */
  -webkit-overflow-scrolling: touch;
}

.close-btn {
  position: fixed;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  z-index: 1001;
  transition: background 0.2s;
  backdrop-filter: blur(10px);
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.close-btn:active {
  transform: scale(0.95);
}

/* 地图图片 - 支持双指缩放 */
.map-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: block;
  
  /* 关键：启用触摸缩放 */
  touch-action: pinch-zoom;
  
  /* 防止图片被选中 */
  user-select: none;
  -webkit-user-select: none;
  
  /* 图片渲染优化 */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* 淡入淡出动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .map-overlay {
    background: rgba(0, 0, 0, 0.95);
  }
  
  .close-btn {
    top: 12px;
    right: 12px;
    width: 44px;
    height: 44px;
    font-size: 22px;
  }
}
</style>