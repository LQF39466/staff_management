## 人员管理系统相关说明
---
### UI设计思路
- 整体框架采用顶部 header 加上侧边导航栏的方式构造，内容区域位于右下角
- 内容区域使用圆角卡片式布局，视觉上有更好的一致性
- 内容区域的卡片与按钮均添加适当的阴影，营造质感

### 特殊功能与设计
- ”关于” 页面会从服务端拉取相应的 about.md 文件，并利用 react-markdown 及其相关插件将 markdown 渲染成 HTML 呈现
- 用户列表提供多种排序与筛选方式
- 服务端使用 TypeScript 编写

### 使用相关
服务端安装依赖项，假设当前文件夹为 final，在终端输入：
```js
cd server
npm install
```
服务端编译 TypeScript，在终端输入: 
```js
npm start
```
客户端安装依赖项，假设当前文件夹为 final，在终端输入
```js
cd fe
npm install
```
客户端 build
```js
npm run build
```
找到 `server/dist/server.js`，在 VSCode 中打开，按 F5 运行

浏览器访问 `localhost:3001` 即可打开网页

server 中编写了 10 条数据用于测试功能

管理员账号：`admin` 密码: `1234`

头像 URL 可以使用 [https://joeschmoe.io/api/v1/:seed]("https://joeschmoe.io") 提供的头像，seed 参数可以是任意字符