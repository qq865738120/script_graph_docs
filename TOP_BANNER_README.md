# Top Banner 插件使用说明

## 概述

本项目集成了自定义的 `docsify-top-banner-plugin`，采用游戏像素风格，与 Script Graph 项目整体风格统一。

## 文件说明

-   `docsify-top-banner-custom.js` - 插件核心逻辑
-   `docsify-top-banner-custom.css` - 像素风样式文件
-   `index.html` - 已集成插件的配置

## 配置选项

在 `index.html` 的 `window.$docsify` 配置中添加 `topBanner` 配置项：

```javascript
window.$docsify = {
    // ... 其他配置
    topBanner: {
        content: '横幅内容（支持 Markdown 语法）',
        position: 'fixed', // 可选：'fixed' 或 'relative'，默认 'fixed'
        zIndex: '9999', // 可选：z-index 值，默认 '9999'
        textAlign: 'center', // 可选：文本对齐方式，默认 'center'
        closeable: true, // 可选：是否显示关闭按钮，默认 true
        defaultTag: 'div', // 可选：HTML 标签，默认 'div'
        autoCloseDuration: 8000, // 可选：自动关闭时间（毫秒），默认 8000（8秒），设为 0 或负数则不自动关闭
    },
};
```

## 配置示例

### 基础示例

```javascript
topBanner: {
  content: '欢迎使用 Script Graph！',
  closeable: true
}
```

### 带链接的横幅

```javascript
topBanner: {
  content: '🎮 **新版本发布！** [查看更新日志](#changelog) 或 [立即下载](#download)',
  textAlign: 'center'
}
```

### 重要通知（不可关闭，不自动关闭）

```javascript
topBanner: {
  content: '⚠️ **系统维护通知**：服务器将于今晚 22:00-24:00 进行维护',
  closeable: false,
  position: 'fixed',
  autoCloseDuration: 0  // 不自动关闭
}
```

### 快速提示（3秒后自动关闭）

```javascript
topBanner: {
  content: '💡 **提示**：记得定期保存您的工作',
  closeable: true,
  autoCloseDuration: 3000  // 3秒后自动关闭
}
```

### 相对定位横幅

```javascript
topBanner: {
  content: '📢 限时优惠活动进行中！',
  position: 'relative',
  zIndex: '-1'  // 当有 repo 配置时推荐使用
}
```

## 样式特点

### 像素风设计

-   ✅ 使用 Ark Pixel 像素字体
-   ✅ 像素化图片渲染
-   ✅ 禁用字体平滑
-   ✅ 网格背景纹理
-   ✅ 像素风边框和阴影

### 配色方案

-   主色调：`#34d399`（绿色）
-   强调色：`#60a5fa`（蓝色）
-   背景：渐变 + 网格纹理
-   文字：`#e0e0e0`（浅灰）

### 交互效果

-   入场动画：从顶部滑入
-   退出动画：淡出并上移
-   悬停效果：链接发光
-   按钮效果：像素风按压

### 自定义鼠标指针

-   普通状态：使用 `images/cusor.png`
-   可点击元素：使用 `images/cusor-pointer.png`

## 响应式设计

插件已针对移动端进行优化：

-   平板/手机：自动调整内边距和字体大小
-   关闭按钮：在小屏幕上缩小尺寸

## 使用建议

### 内容编写

1. **简洁明了**：横幅内容应简短，一行为佳
2. **使用 Emoji**：增强视觉吸引力（如 🎮 📢 ⚠️ ✨）
3. **突出重点**：使用 `**粗体**` 强调关键信息
4. **添加链接**：引导用户进行下一步操作

### 最佳实践

```javascript
// ✅ 推荐：简洁、有吸引力
topBanner: {
  content: '🎮 **新功能上线！** 支持自定义节点类型 [了解更多](#features)',
  closeable: true
}

// ❌ 不推荐：内容过长
topBanner: {
  content: '欢迎使用 Script Graph 脚本图编辑器，这是一个基于 Cocos Creator 的可视化脚本编辑工具...',
  closeable: true
}
```

### 位置选择

-   **固定定位（fixed）**：适合重要通知，始终可见
-   **相对定位（relative）**：适合一般信息，不遮挡内容

### 关闭按钮

-   **可关闭（closeable: true）**：适合一般通知、活动信息
-   **不可关闭（closeable: false）**：适合重要系统通知

## 自定义样式

如需进一步自定义样式，可以在 `docsify-top-banner-custom.css` 中修改：

```css
/* 修改背景色 */
.pixel-top-banner {
    background: linear-gradient(90deg, rgba(255, 0, 0, 0.15) 0%, rgba(0, 0, 255, 0.15) 100%);
}

/* 修改边框颜色 */
.pixel-top-banner {
    border-bottom-color: #ff0000;
}

/* 修改字体大小 */
.pixel-top-banner {
    font-size: 1rem;
}
```

## 注意事项

1. **内容格式**：支持 Markdown 语法，但建议保持简单
2. **链接行为**：点击链接后横幅会自动关闭（除非链接有实际 href）
3. **z-index**：默认为 9999，确保横幅在最上层
4. **兼容性**：已测试主流浏览器，支持 Chrome、Firefox、Safari、Edge

## 故障排除

### 横幅不显示

1. 检查 `topBanner` 配置是否正确
2. 确认 CSS 和 JS 文件路径正确
3. 查看浏览器控制台是否有错误

### 样式异常

1. 确认 CSS 文件在 JS 文件之前加载
2. 检查是否有其他样式冲突
3. 清除浏览器缓存后重试

### 字体显示问题

1. 确认像素字体文件路径正确
2. 检查字体文件是否加载成功
3. 查看 Network 面板确认字体请求状态

## 更新日志

-   **v1.0.0** (2025-01-14)
    -   ✨ 初始版本
    -   ✨ 像素风样式设计
    -   ✨ 支持关闭按钮
    -   ✨ 入场/退出动画
    -   ✨ 响应式设计
