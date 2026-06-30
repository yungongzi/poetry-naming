# 引诗为名

> **取千年诗韻，賜一生嘉名**
>
> 从《诗经》《楚辞》到唐宋诗词，为新生儿寻一个有根基的名字。

<p align="center">
  <em>引文为骨 · 释义为肉 · 寓意为魂 · 音律为韵</em>
</p>

---

## 一、项目缘起

孩子降生，命名是第一件郑重之事。

然今人起名，或翻字典、或求算命，多失之于浅；
纵有引经据典者，亦常断章取义，不知所出。

**引诗为名** 汇辑《诗经》《楚辞》以迄唐宋诗词、四书五典，
凡百余嘉名，皆注明出处、原文、释义与寓意，
愿天下父母得一名，亦得一段文脉之承继。

## 二、系统特色

### 📚 古籍诗词库 · 一百零三张嘉名

覆盖七部典籍，每张名字卡片完整收录：

| 字段 | 说明 |
|------|------|
| **引文** | 取名所据的诗句或原文 |
| **原文** | 引文所在的完整上下文段落 |
| **释义** | 引文的现代白话翻译 |
| **寓意** | 作为名字寄托的精神内涵 |
| **字解** | 名字每个字的单独释义 |
| **出处** | 朝代 · 作者 · 篇目全称 |
| **标签** | 气质标签（如「温婉」「高远」「坚毅」） |

典籍分布：

| 典籍 | 数量 | 选录代表 |
|------|------|----------|
| 《诗经》 | 22 | 灼华、婉清、徽音、穆清、景行 |
| 《楚辞》 | 12 | 灵均、正则、怀瑾、望舒、杜若 |
| 唐诗 | 18 | 浩然、云帆、落霞、秋水、明月 |
| 宋词 | 16 | 婵娟、玉宇、晴方、暗香、锦书 |
| 四书 | 14 | 至善、明德、笃行、弘毅、慎独 |
| 道经易 | 13 | 若水、希声、扶摇、逍遥、乾元 |
| 典籍 | 8 | 协和、俊德、惟馨、致远、大雅 |

### 🎋 抽签求名 · 缘落何签

仿古制签筒之仪，**按名类（男名 / 女名 / 不限）抽签**，
签筒摇动、签条飞出，落于一张有缘嘉名之上。
每张名字卡皆附 **「再抽一签」** 按钮，可反复求取直至称心。

### 🧠 智能荐名 · 因姓量声

综合三个维度，从全库中筛选最佳名字组合：

- **寓意契合 35%**：匹配用户所选的气质偏好标签
- **音律平仄 30%**：基于姓氏声调，评估平仄搭配是否朗朗上口
- **性别契合 35%**：男名 / 女名 / 通名 三类适配

并内置 **多样性去重**（同典籍不超过 2 张），保证推荐组合丰富不雷同。
收录 100+ 常见姓氏及复姓的声调表，覆盖李王张刘陈等大宗。

### 🏛 名典全库 · 浏览检索

支持按 **典籍来源 · 性别 · 标签** 三维筛选，
并有关键词全文检索（名字 / 出处 / 引文 / 寓意）。
卡片可展开查看原文上下文。

### ❤️ 珍藏夹 · 本机保存

心仪之名可一键珍藏，使用 `localStorage` 本机持久保存，
无需登录、无需后端，关浏览器不丢，可慢慢比较取舍。

## 三、设计美学

| 维度 | 实现 |
|------|------|
| **视觉风格** | 苹果液态玻璃（Liquid Glass）—— 三级玻璃材质（glass / glass-strong / glass-subtle），blur + saturate 双重滤镜 |
| **配色基调** | 青绿山水夜色 —— 深青墨（ink）为底，玉青（jade）为脉，鎏金（gold）为饰，朱砂（cinnabar）点睛 |
| **背景层次** | 多层 SVG 山峦 + 流云漂移 + 萤火光点，纯 CSS 动画驱动，60fps 无卡顿 |
| **字体体系** | 霞鹜文楷（LXGW WenKai）正文 · 马善政书法体（Ma Shan Zheng）标题 · ZCOOL 小薇副标题 |
| **点睛之笔** | 朱砂印章（诗 · 名）、鎏金渐变文字、琉璃分割线 |
| **交互动效** | 签筒摇动飞签 · 卡片弹性入场 · Framer Motion 进出场编排 · 玻璃悬浮微抬起 |

## 四、技术栈

| 层 | 选型 |
|----|------|
| 框架 | Next.js 15（App Router + Turbopack） |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS 3 + CSS Variables 主题令牌 |
| 动效 | Framer Motion 12 |
| 图标 | Lucide React |
| 通知 | Sonner |
| 存储 | 浏览器 localStorage（珍藏夹） |
| 包管理 | pnpm 10 |
| 代码规范 | Biome（格式化） + ESLint 9（next/core-web-vitals） |

## 五、目录结构

```
yinshi-naming/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 根布局 · 字体加载 · 元数据
│   │   ├── page.tsx            # 首页入口
│   │   ├── ClientBody.tsx      # 客户端主体 · 组装各组件
│   │   └── globals.css         # 设计系统 · 玻璃材质 · 动画
│   ├── components/
│   │   ├── Background.tsx      # 青绿山水动态背景
│   │   ├── Navbar.tsx          # 顶部玻璃药丸导航
│   │   ├── Hero.tsx            # 主视觉「引诗为名」
│   │   ├── DrawingHall.tsx     # 求名台 · 抽签
│   │   ├── SmartMatch.tsx      # 智能荐名 · 姓氏+偏好
│   │   ├── Library.tsx         # 名典 · 全库浏览筛选
│   │   ├── NameCardView.tsx    # 名字卡片 · 引文/原文/释义/寓意
│   │   ├── Favorites.tsx       # 珍藏夹
│   │   ├── Footer.tsx          # 页脚
│   │   └── ui/                 # shadcn/ui 基础组件
│   ├── hooks/
│   │   └── useFavorites.ts     # 珍藏夹 localStorage Hook
│   └── lib/
│       ├── types.ts            # 类型定义 · 典籍分类元数据
│       ├── poetry-data.ts      # 名字卡片库（103 张）
│       ├── surnames.ts         # 姓氏声调表 + 荐名算法
│       └── utils.ts            # 工具函数
├── tailwind.config.ts          # Tailwind 主题令牌
├── biome.json                  # Biome 格式化配置
├── eslint.config.mjs           # ESLint 配置
└── package.json
```

## 六、环境准备

### 1. 安装 Node.js

需 Node.js 18.18+ 或 20+，推荐使用 LTS 版本。

### 2. 安装 pnpm

```bash
npm install -g pnpm
```

### 3. 安装项目依赖

```bash
cd yinshi-naming
pnpm install
```

## 七、启动与管理

### 开发模式

```bash
pnpm dev
```

启动后访问 `http://localhost:3000` 即可。
开发模式默认开启 Turbopack 加速，支持热更新。

如需在局域网内访问（手机预览），默认绑定 `0.0.0.0`，
同网段设备访问 `http://你的本机IP:3000` 即可。

### 生产构建

```bash
pnpm build
```

构建产物输出至 `.next/` 目录，首屏 JS 约 102KB（gzip 后更小）。

### 生产预览

```bash
pnpm start
```

以生产模式启动，验证构建产物效果。

### 代码检查

```bash
pnpm lint
```

依次执行 TypeScript 类型检查（`tsc --noEmit`）与 Next.js ESLint 校验。

### 代码格式化

```bash
pnpm format
```

使用 Biome 一键格式化全部 TypeScript / TSX 文件。

## 八、命令速查

| 命令 | 作用 |
|------|------|
| `pnpm dev` | 启动开发服务器（含热更新 + Turbopack） |
| `pnpm build` | 生产构建 |
| `pnpm start` | 以生产模式启动 |
| `pnpm lint` | 类型检查 + ESLint 校验 |
| `pnpm format` | Biome 格式化 |

## 九、扩展名字库

名字卡片数据集中在 `src/lib/poetry-data.ts`，按以下结构添加：

```typescript
{
  id: "sj-xxx",              // 唯一 ID，前缀按典籍
  name: "灼华",               // 名字（不含姓），2-3 字
  chars: [                    // 逐字释义
    { char: "灼", meaning: "鲜明、繁盛" },
    { char: "华", meaning: "花、光彩" }
  ],
  category: "shijing",        // 典籍分类
  source: "《诗经·周南·桃夭》", // 出处全称
  dynasty: "西周",             // 朝代
  author: "佚名",              // 作者
  citation: "桃之夭夭，灼灼其华。", // 引文
  originalText: "...",         // 原文上下文
  interpretation: "...",       // 释义（白话）
  meaning: "...",              // 寓意（寄托）
  gender: "female",            // male | female | unisex
  tags: ["明艳", "吉祥"]       // 气质标签
}
```

`category` 可选值：`shijing` / `chuci` / `tangshi` / `songci` / `sishu` / `daojing` / `dianji`。
新增卡片后无需改其他文件，抽签、荐名、名典、搜索均自动纳入。

## 十、部署

### 静态部署（推荐）

本项目为纯前端应用，可直接静态导出：

```bash
pnpm build
```

部署至 Vercel / Netlify / Cloudflare Pages 等任意静态托管平台即可。
`netlify.toml` 已配置好 Netlify 部署规则。

### 自托管

```bash
pnpm build
pnpm start
```

默认监听 3000 端口，可通过 `PORT=xxxx pnpm start` 修改。

## 十一、致谢

本系统所辑名字皆出自先贤之手：
三百篇之质朴，屈宋骚赋之瑰丽，
李杜元白之气象，苏黄辛李之情致，
孔孟老庄之玄远，尚书礼记之典重。

千年以降，文字不灭，文脉不绝。
谨以此致敬每一位曾执笔写下的诗人与先贤。

> 取千年诗韻 · 賜一生嘉名
>
> 引诗为名 · 谨制
