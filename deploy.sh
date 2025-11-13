#!/bin/bash

# Script Graph 文档部署脚本
# 用于手动部署文档到 Cloudflare Pages

set -e

echo "🚀 开始部署 Script Graph 文档到 Cloudflare Pages..."

# 检查是否安装了 wrangler
if ! command -v wrangler &> /dev/null; then
    echo "❌ 错误: 未找到 wrangler CLI"
    echo "请先安装: npm install -g wrangler"
    exit 1
fi

# 检查是否已登录
if ! wrangler whoami &> /dev/null; then
    echo "📝 请先登录 Cloudflare..."
    wrangler login
fi

# 进入文档目录
cd "$(dirname "$0")"

echo "📦 准备部署文件..."

# 部署到 Cloudflare Pages
echo "🌐 部署到 Cloudflare Pages..."
wrangler pages deploy . --project-name=script-graph-docs

echo "✅ 部署完成！"
echo "📖 访问文档: https://script-graph-docs.pages.dev"

