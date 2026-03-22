# Encaik World

「Hello Encaik World」—— 一个安放热爱与探索的角落 🌟

一个基于 Next.js 16 + React 19 的个人技术博客，主打技术分享，同时提供实用的在线工具。

## 技术栈

- **框架**: Next.js 16 (App Router) + React 19
- **语言**: TypeScript 5
- **UI**: Ant Design 5 + Tailwind CSS 4
- **内容**: MDX (Markdown + JSX)
- **工具**: Fabric.js, Simplex Noise, WebGPU
- **包管理**: pnpm

## 项目结构

```
src/
├── app/
│   ├── blogs/          # 技术博客（48篇文章）
│   ├── tools/          # 在线工具
│   │   ├── picframe    # 照片边框工具
│   │   ├── photo-curve # 照片调色工具
│   │   ├── map-generator # 地图生成器
│   │   └── webgpu      # WebGPU 实验
│   ├── repo/           # 项目仓库展示
│   ├── leecode/        # LeetCode 刷题记录
│   ├── note/           # 学习笔记
│   └── road/           # 学习路线
├── components/         # 共享组件
└── mdx-components.tsx  # MDX 组件配置
```

## 功能特性

- 📝 技术博客系统（支持 MDX）
- 🛠️ 在线工具集（图片处理、地图生成等）
- 📚 学习笔记和路线
- 💻 LeetCode 刷题记录
- 🎨 响应式设计，支持深色模式

## 开发指南

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

打开 http://localhost:3000 查看效果。

### 构建生产版本

```bash
pnpm build
```

### 代码检查

```bash
pnpm lint
```

## 部署

项目可以部署到 Vercel、Netlify 等平台。

## 许可证

MIT
