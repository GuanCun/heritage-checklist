# 世界遗产打卡 - 部署指南

## Vercel 部署

### 一键部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. Vercel 会自动检测到 Vite 项目并使用正确的构建命令
4. 部署完成！

### 手动配置（如需要）

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## PWA 功能验证

部署完成后，访问你的网站并验证 PWA 功能：

### Chrome 开发者工具
1. 打开网站
2. 按 F12 打开开发者工具
3. 切换到 "Application" 标签
4. 检查以下项目：
   - **Manifest**: 应该能看到应用名称、图标等信息
   - **Service Workers**: 应该显示为 "activated and running"
   - **Cache Storage**: 应该能看到缓存的资源

### 测试离线功能
1. 访问网站（确保所有资源已加载）
2. 在 Application → Service Workers 中勾选 "Offline"
3. 刷新页面
4. 页面应该仍然可以正常显示

### 测试安装功能

#### 桌面端 (Chrome)
- 地址栏右侧会出现安装图标 ⊕
- 点击即可安装到桌面

#### 移动端 (Chrome/Android)
- 菜单 → "添加到主屏幕"
- 或者自动弹出安装提示

#### iOS Safari
- 分享按钮 → "添加到主屏幕"
- 注意：iOS Safari 对 PWA 的支持有限

## 更新部署

每次推送到 GitHub，Vercel 会自动构建和部署。PWA 会自动检测新版本并在后台更新。

## Vercel 访问问题解决

如果遇到 Vercel 无法访问的情况：

1. **首次访问成功后**：即使 Vercel 后续无法访问，应用也能从缓存中加载
2. **完全离线**：应用的所有功能都可以正常使用（因为是纯前端应用）
3. **备用方案**：可以考虑使用 Cloudflare Pages 或 Netlify 作为备用部署平台

## 监控和分析

### Lighthouse 审计
在 Chrome 开发者工具中运行 Lighthouse 审计：
```
开发者工具 → Lighthouse → 选择 "Progressive Web App" → Generate report
```

应该能获得较高的 PWA 分数。

## 故障排除

### Service Worker 未注册
- 检查是否使用 HTTPS（Vercel 自动提供）
- 清除浏览器缓存后重试
- 查看控制台是否有错误信息

### 缓存未生效
- 确保首次访问时所有资源都加载成功
- 检查 Network 标签，离线时资源应该显示 "(from ServiceWorker)"

### 图标不显示
- 确保 public/icon.svg 文件存在
- 检查 manifest.webmanifest 中的图标路径
- 可以使用 PNG 格式的图标以获得更好的兼容性

## 性能优化建议

1. **压缩资源**: Vite 会自动压缩，无需额外配置
2. **图片优化**: 建议使用 WebP 格式
3. **延迟加载**: 对大型组件使用 Vue 的 defineAsyncComponent
4. **缓存策略**: 已在 vite.config.js 中配置，可根据需要调整
