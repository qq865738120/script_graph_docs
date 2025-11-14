# Top Banner 插件快速开始

## 🚀 5 分钟快速集成

### 步骤 1：添加样式文件

在 `index.html` 的 `<head>` 部分添加样式引用：

```html
<!-- Top Banner 插件样式 -->
<link rel="stylesheet" href="./docsify-top-banner-custom.css" />
```

### 步骤 2：添加脚本文件

在 `index.html` 的 `</body>` 前添加脚本引用：

```html
<!-- Top Banner 插件 -->
<script src="./docsify-top-banner-custom.js"></script>
```

### 步骤 3：配置横幅

在 `window.$docsify` 配置中添加 `topBanner` 配置：

```javascript
window.$docsify = {
    // ... 其他配置
    topBanner: {
        content: '🎮 **新版本发布！** [查看更新](#)',
        closeable: true,
    },
};
```

### 步骤 4：预览效果

打开浏览器访问你的文档站点，即可看到顶部横幅！

## 📝 常用配置示例

### 新版本通知

```javascript
topBanner: {
  content: '🎮 **Script Graph v2.0 发布！** 支持更多节点类型 [查看详情](#changelog)',
  closeable: true
}
```

### 系统维护通知

```javascript
topBanner: {
  content: '⚠️ **系统维护**：今晚 22:00-24:00 服务可能中断',
  closeable: false
}
```

### 活动推广

```javascript
topBanner: {
  content: '📢 **限时优惠**！专业版 7 折优惠中 [立即购买](#buy)',
  closeable: true
}
```

### 重要提醒

```javascript
topBanner: {
  content: '💡 **提示**：记得及时保存您的工作',
  closeable: true
}
```

## 🎨 样式预览

横幅采用游戏像素风格设计，特点包括：

-   ✅ Ark Pixel 像素字体
-   ✅ 绿色/蓝色渐变背景
-   ✅ 网格纹理效果
-   ✅ 像素风边框和阴影
-   ✅ 滑入/淡出动画
-   ✅ 自定义像素鼠标指针

## 🧪 测试页面

打开 `test/top-banner-test.html` 可以测试各种配置效果。

## 📚 完整文档

查看 `TOP_BANNER_README.md` 了解所有配置选项和高级用法。

## ⚙️ 配置选项速查

| 选项                | 类型    | 默认值     | 说明                                      |
| ------------------- | ------- | ---------- | ----------------------------------------- |
| `content`           | String  | -          | 横幅内容（支持 Markdown）                 |
| `position`          | String  | `'fixed'`  | 定位方式（fixed/relative）                |
| `zIndex`            | String  | `'9999'`   | 层级                                      |
| `textAlign`         | String  | `'center'` | 文本对齐（left/center/right）             |
| `closeable`         | Boolean | `true`     | 是否可关闭                                |
| `defaultTag`        | String  | `'div'`    | HTML 标签                                 |
| `autoCloseDuration` | Number  | `8000`     | 自动关闭时间（毫秒），0或负数则不自动关闭 |

## 💡 使用技巧

1. **内容简洁**：一行为佳，不超过两行
2. **使用 Emoji**：增强视觉吸引力
3. **突出重点**：用 `**粗体**` 强调关键信息
4. **添加链接**：引导用户操作
5. **合理关闭**：重要通知设为不可关闭

## 🐛 常见问题

**Q: 横幅不显示？**

-   检查配置是否正确
-   确认文件路径正确
-   查看浏览器控制台错误

**Q: 样式不对？**

-   确认 CSS 在 JS 之前加载
-   清除浏览器缓存
-   检查是否有样式冲突

**Q: 字体显示异常？**

-   确认字体文件路径正确
-   检查字体文件是否加载成功

## 📞 获取帮助

如有问题，请查看：

-   完整文档：`TOP_BANNER_README.md`
-   测试页面：`test/top-banner-test.html`
-   项目文档：`README_DOCS.md`
