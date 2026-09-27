# Web

Next.js 静态站点，读取仓库 Markdown，不改学习内容。

```bash
cd web
npm install
npm run dev
```

`npm run build` 会先生成 `src/content/catalog.json`，再导出到 `out/`。catalog 由脚本生成，不要手改。

页面：`/` `/roadmap` `/knowledge` `/resources` `/challenges` `/notebook` `/progress` `/specializations` `/about`。

进度和积累本存在浏览器 localStorage。没有账号。
