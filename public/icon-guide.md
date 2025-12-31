# 应用图标说明

## 临时图标
当前使用的是 SVG 临时图标。在生产环境中，建议使用真实的 PNG 图标。

## 生成图标的方法

### 方法1：使用在线工具
1. 访问 https://www.pwabuilder.com/imageGenerator
2. 上传你的 logo（建议 512x512 以上）
3. 下载生成的图标包
4. 将 icon-192.png 和 icon-512.png 放到 public/ 目录

### 方法2：使用设计工具
使用 Figma、Photoshop 等工具设计：
- icon-192.png (192x192)
- icon-512.png (512x512)

## 小程序兼容性说明
这些图标仅用于 PWA。迁移到微信小程序时：
- 小程序有自己的图标系统（在 project.config.json 中配置）
- 这些 PWA 图标不会影响小程序迁移
- 可以复用同样的图标设计，只需调整尺寸为小程序要求的规格
