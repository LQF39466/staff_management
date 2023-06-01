### 使用说明
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

账号：`admin`

密码: `1234`

server 中编写了 10 条数据用于测试功能

头像 URL 可以使用 [https://joeschmoe.io/api/v1/:seed]("https://joeschmoe.io") 提供的头像，seed 参数是随机种子，可以是任意字符