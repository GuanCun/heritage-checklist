# PWA 功能说明

## 已添加的 PWA 功能

### 1. 离线访问
- 应用的所有静态资源（HTML、CSS、JS、图片等）会被缓存
- 即使在没有网络的情况下也能正常使用
- 数据存储在浏览器本地，不依赖服务器

### 2. 安装到桌面
- 在支持 PWA 的浏览器中，可以"添加到主屏幕"
- 安装后可以像原生应用一样使用
- 从主屏幕启动时有独立的窗口，不显示浏览器地址栏

### 3. 自动更新
- 应用会自动检测新版本
- 发现更新后自动下载并在下次访问时应用

## 如何测试 PWA 功能

### 在本地开发环境测试
```bash
# 构建生产版本
npm run build

# 预览生产版本（PWA 功能仅在生产构建中启用）
npm run preview
```

### 在移动设备上测试
1. 部署到 Vercel（已经配置好）
2. 在 Chrome/Safari 中打开网站
3. Chrome: 点击菜单 → "添加到主屏幕"
4. Safari (iOS): 点击分享按钮 → "添加到主屏幕"

### 验证离线功能
1. 首次访问网站（让浏览器缓存资源）
2. 打开浏览器开发者工具
3. 切换到 "Application" 标签 → "Service Workers"
4. 勾选 "Offline" 模拟离线状态
5. 刷新页面，应用应该仍然可以正常工作

## 技术实现

### 使用的技术栈
- **vite-plugin-pwa**: 自动生成 Service Worker 和 manifest
- **Workbox**: 提供离线缓存策略

### 缓存策略
- **静态资源**: Cache First（优先使用缓存）
- **图片资源**: Cache First + 30天过期
- **自动更新**: 检测到新版本时自动更新

## 微信小程序兼容性考虑

### 为什么这个 PWA 方案对小程序迁移友好？

1. **核心逻辑独立**
   - PWA 功能由 Vite 插件自动生成
   - 不需要修改 Vue 组件代码
   - Service Worker 是独立的，不影响业务逻辑

2. **配置式实现**
   - PWA 配置都在 `vite.config.js` 中
   - 迁移时只需移除插件配置即可
   - 不会在代码中引入 PWA 特定的 API

3. **数据存储兼容**
   - 如果使用 localStorage/IndexedDB 存储数据
   - 小程序也有对应的 `wx.setStorage`/`wx.createBufferedStore`
   - 迁移时只需封装一个存储适配层

4. **网络请求兼容**
   - 使用标准的 fetch/axios
   - 小程序使用 `wx.request`
   - 迁移时封装一个请求适配层即可

### 迁移到小程序时需要做什么？

1. **移除 PWA 配置**
   ```javascript
   // vite.config.js - 移除 VitePWA 插件
   import { defineConfig } from 'vite'
   import vue from '@vitejs/plugin-vue'
   // import { VitePWA } from 'vite-plugin-pwa' // 移除这行
   
   export default defineConfig({
     plugins: [vue()] // 只保留 vue 插件
   })
   ```

2. **使用适配框架**
   - 推荐使用 uni-app 或 Taro
   - 可以同时编译为 H5 和小程序
   - 一套代码多端运行

3. **封装平台 API**
   ```javascript
   // utils/storage.js
   export const storage = {
     set(key, value) {
       if (typeof wx !== 'undefined') {
         wx.setStorageSync(key, value) // 小程序
       } else {
         localStorage.setItem(key, JSON.stringify(value)) // PWA
       }
     },
     get(key) {
       if (typeof wx !== 'undefined') {
         return wx.getStorageSync(key) // 小程序
       } else {
         return JSON.parse(localStorage.getItem(key)) // PWA
       }
     }
   }
   ```

## 常见问题

### Q: 为什么开发时看不到 PWA 功能？
A: PWA 功能默认只在生产构建中启用。如需在开发时测试，可以在 `vite.config.js` 中设置 `devOptions.enabled: true`

### Q: 如何强制刷新缓存？
A: 
- 开发者: 在浏览器开发者工具中手动清除 Service Worker
- 用户: 清除浏览器缓存，或者等待自动更新

### Q: Vercel 访问不稳定怎么办？
A: PWA 的离线功能正是为了解决这个问题。首次成功访问后，后续即使 Vercel 无法访问，应用仍然可以从本地缓存运行。

### Q: 数据会丢失吗？
A: 使用 localStorage 或 IndexedDB 存储的数据会持久保存在用户设备上，不会因为网络问题丢失。

## 进一步优化建议

1. **添加更新提示**
   - 检测到新版本时提示用户
   - 让用户选择是否立即更新

2. **离线状态提示**
   - 显示当前网络状态
   - 提示用户数据未同步

3. **数据同步**
   - 在线时同步本地数据到服务器
   - 支持多设备数据同步

4. **使用 uni-app 重构**
   - 如果确定要做小程序版本
   - 建议直接用 uni-app 重构
   - 可以同时部署 H5 PWA 和小程序
