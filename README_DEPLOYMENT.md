# 📚 文档部署快速指南

## 🎯 三步完成自动部署

### 第一步：配置 Cloudflare 凭证

1. **获取 API Token**
   - 访问: https://dash.cloudflare.com/profile/api-tokens
   - 点击 "Create Token"
   - 选择 "Edit Cloudflare Workers" 模板
   - 确保权限包含: `Account.Cloudflare Pages:Edit`
   - 复制生成的 Token

2. **获取 Account ID**
   - 访问: https://dash.cloudflare.com/
   - 进入 "Workers & Pages"
   - 在右侧找到 "Account ID"
   - 复制 Account ID

3. **配置 GitHub Secrets**
   - 进入 GitHub 仓库
   - Settings → Secrets and variables → Actions
   - 点击 "New repository secret"
   - 添加两个 Secrets:
     - 名称: `CLOUDFLARE_API_TOKEN`, 值: 步骤1的Token
     - 名称: `CLOUDFLARE_ACCOUNT_ID`, 值: 步骤2的ID

### 第二步：创建 Cloudflare Pages 项目

1. 访问 https://dash.cloudflare.com/
2. 进入 "Workers & Pages"
3. 点击 "Create application"
4. 选择 "Pages" → "Upload assets"
5. 项目名称输入: `script-graph-docs`
6. 点击创建（暂时不上传文件）

### 第三步：推送代码触发部署

```bash
# 提交所有更改
git add .
git commit -m "feat: 添加 Cloudflare Pages 自动部署"

# 推送到 main 或 master 分支
git push origin main
```

## ✅ 验证部署

1. **查看 GitHub Actions**
   - 进入仓库的 "Actions" 标签页
   - 查看 "Deploy Docs to Cloudflare Pages" 工作流
   - 等待部署完成（约1-2分钟）

2. **访问文档**
   - 部署成功后访问: https://script-graph-docs.pages.dev
   - 或在 Cloudflare Dashboard 中查看部署状态

## 🚀 日常使用

### 自动部署（推荐）

修改文档后，只需推送到 main/master 分支：

```bash
# 修改文档
vim packages/docs/README.md

# 提交推送
git add packages/docs/
git commit -m "docs: 更新文档内容"
git push origin main

# 自动触发部署，无需其他操作
```

### 手动部署

如需手动部署，可使用以下命令：

```bash
# 方式1: 使用 npm 脚本
npm run docs:deploy

# 方式2: 直接运行脚本
cd packages/docs
./deploy.sh

# 方式3: 使用 wrangler 命令
cd packages/docs
wrangler pages deploy . --project-name=script-graph-docs
```

### 本地预览

```bash
# 启动本地预览服务器
npm run docs:dev

# 访问 http://localhost:3000
```

## 📖 详细文档

- **完整部署指南**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **快速开始**: [QUICK_START.md](./QUICK_START.md)
- **文档系统说明**: [README_DOCS.md](./README_DOCS.md)

## 🔧 常见问题

### 部署失败怎么办？

1. 检查 GitHub Secrets 是否正确配置
2. 检查 Cloudflare Pages 项目名称是否为 `script-graph-docs`
3. 查看 GitHub Actions 日志获取详细错误信息
4. 参考 [DEPLOYMENT.md](./DEPLOYMENT.md) 的故障排查部分

### 如何配置自定义域名？

1. 在 Cloudflare Pages 项目设置中
2. 进入 "Custom domains"
3. 添加你的域名
4. 按照提示配置 DNS 记录

### 如何手动触发部署？

1. 进入 GitHub 仓库的 "Actions" 标签页
2. 选择 "Deploy Docs to Cloudflare Pages" 工作流
3. 点击 "Run workflow"
4. 选择分支并运行

## 📁 相关文件

```
.github/workflows/
└── deploy-docs.yml              # GitHub Actions 自动部署配置

packages/docs/
├── DEPLOYMENT.md                # 详细部署指南
├── QUICK_START.md               # 快速开始
├── README_DEPLOYMENT.md         # 本文档
├── wrangler.toml                # Cloudflare 配置
└── deploy.sh                    # 手动部署脚本
```

## 🎉 完成！

配置完成后，每次修改 `packages/docs/` 目录下的文件并推送到 main/master 分支，都会自动部署到 Cloudflare Pages！

---

**祝使用愉快！** 🚀

