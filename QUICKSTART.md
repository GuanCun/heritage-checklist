# 快速开始 - PWA 版世界遗产打卡

## 🚀 立即使用

### 开发环境
```bash
npm install
npm run dev
```

### 生产构建（含 PWA）
```bash
npm run build
npm run preview  # 在 http://localhost:4173 预览
```

### 部署到 Vercel
推送到 GitHub → Vercel 导入 → 自动部署 ✨

## 📱 PWA 功能

- ✅ 离线访问（首次访问后无需网络）
- ✅ 安装到桌面/主屏幕
- ✅ 自动更新
- ✅ 解决 Vercel 访问不稳定问题

## 🔧 主要改动

| 文件 | 说明 |
|------|------|
| `vite.config.js` | 添加 PWA 插件配置 |
| `index.html` | 添加 PWA meta 标签 |
| `vercel.json` | 配置部署和 Service Worker |
| `public/icon.svg` | 应用图标（可替换） |

## 📚 文档

- **[PWA_GUIDE.md](./PWA_GUIDE.md)** - 详细功能说明和微信小程序兼容性
- **[DEPLOY.md](./DEPLOY.md)** - 部署流程和验证方法
- **[SUMMARY.md](./SUMMARY.md)** - 完整改造总结

## ⚡ 测试离线功能

1. 访问网站（让浏览器缓存资源）
2. 开发者工具 → Application → Service Workers
3. 勾选 "Offline"
4. 刷新页面 → 仍然可用！

## 🎯 未来规划

想做小程序？当前的 PWA 方案不会增加迁移成本：
- PWA 功能完全通过插件实现，业务代码无侵入
- 迁移时只需移除 `VitePWA` 插件
- 建议使用 uni-app 实现一套代码多端运行

查看 [PWA_GUIDE.md](./PWA_GUIDE.md#微信小程序兼容性考虑) 了解详情。

## ❓ 常见问题

**Q: 开发时看不到 PWA 功能？**  
A: PWA 默认仅在生产构建中启用。运行 `npm run build && npm run preview`

**Q: 如何更新图标？**  
A: 替换 `public/icon.svg`，或使用 PNG 格式，查看 `public/icon-guide.md`

**Q: Vercel 无法访问怎么办？**  
A: 首次成功访问后，PWA 会缓存所有资源，后续即使 Vercel 挂掉也能正常使用

---

**需要帮助？** 查看详细文档或提交 Issue
