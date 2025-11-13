# Script Graph 文档系统使用说明

## 📦 已完成的工作

### 1. 文档框架搭建

-   ✅ 创建 docsify 基础结构
-   ✅ 配置像素风主题
-   ✅ 设置封面页（带动画效果）
-   ✅ 简化侧边栏导航
-   ✅ 复制 logo 到 docs 仓库

### 2. 像素风设计

**配色方案：**

-   主色：`#34d399`（绿色）
-   强调色：`#60a5fa`（蓝色）
-   背景：`#0a0a0a`（深黑）
-   侧边栏：`#1a1a1a`（浅黑）

**设计特点：**

-   使用 Press Start 2P 像素字体（标题）
-   Courier New 等宽字体（正文）
-   像素化图片渲染
-   阴影和边框效果
-   复古游戏风格

**视觉增强：**

-   网格背景（封面和主体）
-   Logo 浮动动画
-   标题发光动画
-   标题前缀图标（▶ ■ ▸）
-   闪烁光标效果
-   像素风滚动条
-   代码块装饰标签
-   表格像素风格化
-   列表项自定义标记

### 3. 文件结构

```
packages/docs/
├── index.html          # Docsify 配置（像素风主题）
├── README.md           # 首页内容
├── _coverpage.md       # 封面页（带 logo）
├── _sidebar.md         # 侧边栏导航
├── .nojekyll          # GitHub Pages 配置
├── README_DOCS.md      # 本文档
├── DEPLOYMENT.md       # 部署指南
├── wrangler.toml       # Cloudflare Pages 配置
├── deploy.sh           # 部署脚本
├── images/             # 静态资源目录
│   └── logo.png       # 项目 logo
├── advanced/           # 高级主题（空）
├── dev/               # 开发文档（空）
├── guide/             # 用户指南（空）
└── reference/         # 参考资料（空）
```

## 🚀 使用方法

### 本地预览

```bash
# 在项目根目录运行
npm run docs:dev

# 或者
npm run docs:preview
```

访问 http://localhost:3000（端口可能不同）

### 编辑文档

1. 编辑 `packages/docs/README.md` 修改首页内容
2. 编辑 `packages/docs/_coverpage.md` 修改封面
3. 编辑 `packages/docs/_sidebar.md` 修改侧边栏
4. 添加新的 Markdown 文件并在侧边栏中引用

### 添加新页面

1. 在 `packages/docs/` 下创建新的 `.md` 文件
2. 在 `_sidebar.md` 中添加链接
3. 保存后刷新浏览器

### 部署到 Cloudflare Pages

详见 [DEPLOYMENT.md](./DEPLOYMENT.md) 文档，支持三种部署方式：

1. **自动部署**（推荐）：通过 GitHub Actions 自动部署
2. **手动部署**：使用 `deploy.sh` 脚本或 `wrangler` 命令
3. **Dashboard 上传**：通过 Cloudflare Dashboard 手动上传

```bash
# 快速手动部署
cd packages/docs
./deploy.sh
```

## 🎨 自定义主题

所有样式都在 `index.html` 的 `<style>` 标签中，可以修改：

-   CSS 变量（颜色、字体等）
-   组件样式（标题、链接、代码块等）
-   封面样式

## 🔗 相关链接

-   Docsify 官方文档：https://docsify.js.org/
-   Press Start 2P 字体：https://fonts.google.com/specimen/Press+Start+2P

---

**文档框架已搭建完成，可以开始添加内容了！** 🎮
