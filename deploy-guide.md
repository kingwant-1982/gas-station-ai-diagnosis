# 部署指南

## GitHub Pages 部署步骤

### 1. 准备工作
- 注册 GitHub 账号
- 安装 Git（可选，也可以直接用网页操作）

### 2. 创建仓库
1. 登录 GitHub
2. 点击右上角的 "+" → "New repository"
3. 仓库名称：`gas-station-ai-diagnosis`（或其他名称）
4. 设置为 Public
5. 勾选 "Add a README file"
6. 点击 "Create repository"

### 3. 上传文件
**方法A：网页直接上传**
1. 在仓库页面点击 "uploading an existing file"
2. 拖拽以下文件到页面：
   - index.html
   - styles.css
   - script.js
   - README.md
3. 填写提交信息，点击 "Commit changes"

**方法B：使用Git命令**
```bash
git clone https://github.com/你的用户名/gas-station-ai-diagnosis.git
cd gas-station-ai-diagnosis
# 复制项目文件到这个目录
git add .
git commit -m "添加加油站AI诊断助手"
git push origin main
```

### 4. 启用 GitHub Pages
1. 在仓库页面点击 "Settings"
2. 滚动到 "Pages" 部分
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "main"
5. 点击 "Save"

### 5. 访问网站
- 几分钟后可通过以下地址访问：
- `https://你的用户名.github.io/gas-station-ai-diagnosis/`

## 其他部署选项

### Vercel 部署
1. 访问 vercel.com
2. 连接 GitHub 账号
3. 选择刚创建的仓库
4. 自动部署

### Netlify 部署
1. 访问 netlify.com
2. 连接 GitHub 或直接拖拽文件
3. 自动生成访问链接

### 云服务器部署
如果需要更多控制权，可以使用：
- 阿里云
- 腾讯云
- AWS
- 服务器上搭建 Nginx

## 自定义域名（可选）

### GitHub Pages 自定义域名
1. 购买域名（如：your-domain.com）
2. 在仓库根目录创建 `CNAME` 文件
3. 文件内容写入域名：`your-domain.com`
4. 在域名管理后台添加 CNAME 记录指向：`你的用户名.github.io`

### 免费域名选项
- Freenom（.tk, .ml, .ga 等）
- 或使用提供的免费子域名

## 移动端访问优化

### PWA 支持（可选）
如果想让应用更像原生APP，可以添加：

1. **manifest.json**（Web App清单）
2. **Service Worker**（离线支持）
3. **图标文件**

## 测试访问
部署完成后，可以通过以下方式测试：
- 电脑浏览器
- 手机浏览器
- 微信内置浏览器
- 其他移动设备

## 注意事项
- 免费托管通常有带宽限制
- GitHub Pages 仅支持静态网站
- 如需后端功能，需要使用云函数或API服务
- 定期备份重要文件 