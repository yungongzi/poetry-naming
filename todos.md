# 引诗为名 · 古诗词起名系统

## 设计方向
青绿山水 + 苹果液态玻璃 (Liquid Glass)。鎏金 + 朱砂印章点缀。霞鹜文楷 / 马善政书法体。

## Todos
- [x] 字体与 layout 元数据
- [x] 设计系统 globals.css（玻璃材质、配色、动画、背景）
- [x] 数据：名字卡片库（诗经/楚辞/唐诗/宋词/典籍，103 张）
- [x] 数据：姓氏声调表 + 智能荐名算法（寓意 + 音律 + 性别）
- [x] 组件：动态山水背景 Background
- [x] 组件：GlassCard 玻璃卡片基元
- [x] 组件：顶部导航 (玻璃药丸)
- [x] 组件：Hero 主视觉（引诗为名）
- [x] 组件：求名台 + 抽签（控制项 + 签筒动画 + 名字卡）
- [x] 组件：智能荐名（最佳组合）
- [x] 组件：名典（全库浏览 + 筛选 + 详情）
- [x] 组件：珍藏（localStorage 收藏）
- [x] 组件：页脚
- [x] 整合到 page.tsx
- [x] Lint + 版本 + 截图检查

## 已修复的工程问题
- 移除 tsconfig 中错误的 `jsxImportSource: same-runtime/dist`（会破坏 JSX 编译）
- 移除 package.json 中 `react-grab`、`same-runtime` 等 Same 建站工具污染依赖
- 移除 layout.tsx 中从 unpkg 加载的外部脚本
- 修正 lint 脚本为 pnpm
- 原项目 page.tsx 为空，已完整重建整个应用

## 运行
```bash
cd yinshi-naming
pnpm install
pnpm dev   # http://localhost:3000
pnpm build # 生产构建
```
