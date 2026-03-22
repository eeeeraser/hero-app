# Netlify 部署步骤

## 第一步：登录 Netlify

1. 打开浏览器，访问 **https://www.netlify.com**
2. 点击 **Sign up** 或 **Log in**
3. 选择 **Sign up with GitHub** 或 **Log in with GitHub**（使用 GitHub 账号登录）

---

## 第二步：导入项目

1. 登录后，点击 **Add new site** → **Import an existing project**
2. 选择 **Deploy with GitHub**
3. 授权 Netlify 访问你的 GitHub（如未授权）
4. 在仓库列表中找到 **eeeeraser/hero-app**
5. 点击 **Import**

---

## 第三步：配置构建设置

Netlify 会自动检测 Next.js 项目，通常无需修改。确认以下设置：

- **Build command:** `npm run build`（自动填充）
- **Publish directory:** 留空或 `.next`（Netlify 自动处理）
- **Base directory:** 留空（项目在仓库根目录）

点击 **Deploy site**

---

## 第四步：等待部署

- 部署约需 2–5 分钟
- 完成后会显示 **Site is live** 和你的站点地址
- 例如：`https://随机名称.netlify.app`

---

## 第五步：自定义域名（可选）

1. 在站点设置中点击 **Domain settings**
2. 可修改为 `hero-app.netlify.app` 等自定义子域名
3. 或绑定自己的域名

---

## 自动部署

每次推送到 GitHub 的 `main` 分支，Netlify 会自动重新部署，无需额外操作。
