# 如何把你的网站上线到 Cloudflare Pages（小白完整版）

> 目标：把你电脑上的网站代码，免费部署到互联网，并绑定你自己的域名 `lige.cc`
>
> 全程不需要付费，不需要懂编程，大约需要 30 分钟。

---

## 先理解几个概念（读完就懂）

| 术语 | 用大白话解释 |
|------|------------|
| **GitHub** | 一个免费的"代码仓库"网站，就像网盘，但专门存代码。Cloudflare 需要从这里读取你的代码来部署网站。 |
| **部署（Deploy）** | 就是把你电脑上的代码，变成别人能访问的网站的过程。 |
| **构建（Build）** | 你的代码是用 Next.js 写的，需要先"编译"一下才能变成网页文件。Cloudflare 会自动帮你做这步。 |
| **DNS** | 域名系统。就是告诉互联网"输入 `lige.cc` 就去找我的网站"的设置。你的域名在 Cloudflare 买的，所以这步很简单。 |
| **仓库（Repository / Repo）** | 在 GitHub 上存放你一个项目代码的地方，就像一个文件夹。 |

---

## 第一阶段：把代码上传到 GitHub

### 第 1 步：注册 GitHub 账号

1. 打开浏览器，访问 **https://github.com**
2. 点右上角 **Sign up**（注册）
3. 填写邮箱、用户名、密码，完成注册
4. 去邮箱验证一下邮件

> ✅ 完成后你有了一个 GitHub 账号

---

### 第 2 步：安装 Git（代码上传工具）

"Git" 是一个安装在你电脑上的小程序，用来把文件上传到 GitHub。

**检查你是否已经安装了 Git：**
- 打开终端（Mac：按 `Command + 空格` 搜索"终端"；Windows：搜索"cmd"）
- 输入以下命令，按回车：
  ```
  git --version
  ```
- 如果显示 `git version 2.x.x`，说明已安装，**跳过此步**
- 如果显示"找不到命令"，需要安装：

**安装 Git：**
- Mac：访问 https://git-scm.com/download/mac，按提示安装
- Windows：访问 https://git-scm.com/download/win，下载后双击安装，一路点"Next"即可

---

### 第 3 步：在 GitHub 上创建一个新仓库

1. 登录 GitHub，点右上角的 **+** 号，选 **New repository**
2. 填写仓库名，比如 `urbino-platform`
3. 选择 **Private**（私有，别人看不到你的代码）
4. **不要**勾选任何初始化选项（README、.gitignore 等都不选）
5. 点 **Create repository**（创建仓库）
6. 页面会显示一串命令，**先不用管，等下用到**

---

### 第 4 步：把代码上传到 GitHub

打开终端，逐行输入以下命令（每行输完按回车，等它执行完再输下一行）：

**第一步：进入你的项目文件夹**
```bash
cd 你的项目文件夹路径
```
> 💡 怎么找路径？在 Finder（Mac）或文件管理器（Windows）里，找到项目文件夹，然后：
> - Mac：把文件夹拖入终端窗口，路径会自动填入
> - Windows：在文件夹地址栏点一下，复制路径，粘贴到 `cd ` 后面

例如：
```bash
cd /Users/你的名字/Documents/0822-一级页面基本完工
```

**第二步：初始化 Git**
```bash
git init
```

**第三步：把所有文件添加进去**
```bash
git add .
```

**第四步：创建第一个"存档点"**
```bash
git commit -m "first commit"
```

**第五步：连接到你刚才创建的 GitHub 仓库**
```bash
git remote add origin https://github.com/你的GitHub用户名/urbino-platform.git
```
> ⚠️ 把 `你的GitHub用户名` 和 `urbino-platform` 替换成你实际的用户名和仓库名

**第六步：上传代码**
```bash
git push -u origin main
```
> 这里可能会弹出窗口要求你登录 GitHub，按提示操作即可

> ✅ 完成后，刷新 GitHub 仓库页面，你应该能看到所有代码文件

---

## 第二阶段：在 Cloudflare Pages 上部署网站

### 第 5 步：登录 Cloudflare 并找到 Pages

1. 打开 **https://dash.cloudflare.com**，用你购买域名时的账号登录
2. 在左侧菜单找到 **Workers & Pages**，点击它
3. 点 **Create**（创建）
4. 选择 **Pages** 标签页
5. 点 **Connect to Git**（连接到 Git）

---

### 第 6 步：授权 Cloudflare 访问你的 GitHub

1. 点 **Connect GitHub**
2. 浏览器会跳转到 GitHub，要求你授权
3. 点 **Authorize Cloudflare Pages**（授权）
4. 选择 **Only select repositories**（只选择特定仓库）
5. 在下拉菜单选择你刚才创建的 `urbino-platform` 仓库
6. 点 **Install & Authorize**

---

### 第 7 步：配置构建设置

回到 Cloudflare，选择你的仓库后，进入配置页面：

| 设置项 | 填写内容 |
|--------|---------|
| **Project name**（项目名） | `urbino-platform`（随意，这会成为临时域名的一部分） |
| **Production branch**（生产分支） | `main` |
| **Framework preset**（框架预设） | 选 **Next.js (Static HTML Export)** |
| **Build command**（构建命令） | `npm run build` |
| **Build output directory**（输出目录） | `out` |

> 💡 如果 Cloudflare 自动识别了 Next.js，上面的命令可能已经自动填好了，检查一下对不对就行

点 **Save and Deploy**（保存并部署）

---

### 第 8 步：等待部署完成

Cloudflare 会开始自动构建，大约需要 **2～5 分钟**。

你会看到一个进度页面，显示各个步骤：
- `Cloning repository` → 正在复制代码
- `Installing dependencies` → 正在安装依赖
- `Building` → 正在构建
- `Deploying` → 正在部署

全部变成 ✅ 绿色后，部署完成！

Cloudflare 会给你一个临时网址，格式类似：
`https://urbino-platform.pages.dev`

点击访问，看看网站是否正常显示。

> ✅ 如果网站能正常打开，进入第三阶段绑定你的域名

---

## 第三阶段：绑定你的域名 `lige.cc`

因为你的域名是在 Cloudflare 购买的，这步**非常简单**，不需要改任何 DNS 设置！

### 第 9 步：添加自定义域名

1. 在你的 Cloudflare Pages 项目页面，点 **Custom domains**（自定义域名）标签
2. 点 **Set up a custom domain**（设置自定义域名）
3. 输入 `lige.cc`，点 **Continue**
4. Cloudflare 会自动检测到这个域名在你的账号下
5. 点 **Activate domain**（激活域名）

**就这样！** 因为域名和 Pages 都在同一个 Cloudflare 账号下，它会自动配置好 DNS，无需任何手动操作。

等待约 **1～2 分钟**，访问 `https://lige.cc`，你的网站就上线了！

---

## 常见问题

**Q：构建失败了怎么办？**
A：点击失败的构建，查看错误日志。最常见的错误是 TypeScript 类型错误。可以在 `next.config.ts` 里临时加一行忽略错误：
```js
typescript: {
  ignoreBuildErrors: true,
},
```
然后重新推送代码，Cloudflare 会自动重新构建。

**Q：网站打开了但图片不显示？**
A：图片来自 Readdy 的 API，如果 Readdy 关闭了服务，图片就会消失。这时候需要把图片替换成别的来源（可以找我帮你处理）。

**Q：我更新了代码，网站怎么更新？**
A：每次你修改代码后，在终端运行：
```bash
git add .
git commit -m "更新说明"
git push
```
Cloudflare 会自动检测到 GitHub 有新代码，自动重新部署，通常 3 分钟内生效。

**Q：`lige.cc` 域名已经过期了，需要先续费吗？**
A：是的，域名过期后需要先在 Cloudflare 的 **Domain Registration** 里续费，才能正常使用。续费费用大约每年 $10～$15 美元。

---

## 整个流程总结

```
你的代码文件夹
    ↓  (git push)
GitHub 仓库（免费存储代码）
    ↓  (自动触发)
Cloudflare Pages（免费构建+托管）
    ↓  (自动绑定)
lige.cc（你的域名，需要续费）
```

**费用总结：**
- GitHub：免费
- Cloudflare Pages 托管：免费
- 域名 `lige.cc`：每年约 $10～15 美元（这是唯一需要付费的部分）

---

> 如果在任何步骤遇到问题，把错误信息截图或复制给我，我来帮你解决！
