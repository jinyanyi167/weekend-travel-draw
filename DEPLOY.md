# 长期公开链接部署

这个网页是纯静态站点，适合部署到 GitHub Pages、Netlify、Vercel、阿里云 OSS 或腾讯云 COS。

## 最快方式：Netlify Drop

1. 打开 https://app.netlify.com/drop
2. 登录 Netlify。
3. 把项目压缩包 `travel-draw-site.zip` 拖进去。
4. Netlify 会生成一个长期公开网址。
5. 后续如果要绑定自己的域名，可以在 Netlify 的 Site settings 里设置。

## GitHub Pages

1. 在 GitHub 新建仓库，例如 `weekend-travel-draw`。
2. 上传这些文件和目录：
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
   - `DEPLOY.md`
   - `.nojekyll`
   - `assets/`
   - `data/`
   - `scripts/`
   - `tests/`
3. 进入仓库的 Settings -> Pages。
4. Source 选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/root`。
6. 保存后等待 GitHub 生成公开链接。

## Vercel

1. 打开 https://vercel.com/new
2. 导入 GitHub 仓库，或上传静态项目。
3. Framework Preset 选择 `Other`。
4. Build Command 留空。
5. Output Directory 留空或填 `.`。

## 备注

- 公开链接需要平台账号授权；本地的 `127.0.0.1` 链接只能你自己访问。
- 这个项目运行时不依赖网络，部署后所有核心功能都在浏览器本地执行。
