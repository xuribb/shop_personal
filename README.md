<h2 style="color:#ff2e63">警告：项目流产</h2>
<div style="color:#ff2e63;font-weight:bold;">
项目存在以下问题，导致项目停止
<ol>
    <li>用户端和管理端在同一个前端项目里，应该拆分出来，项目追求小而精，方便管理维护和部署，追求模块化服务</li>
    <li>用户端因该采用Nuxt.js来开发，方便SEO和搜索引擎爬取。而Vue.js不利于SEO</li>
    <li>项目也没有充分发挥Pinia的能力，而是采用的sessionStorage</li>
    <li>前后端分离项目也没有采用Token-Based（令牌机制）,还是采用传统的cookie和session搭配的方式，导致跨域配置起来很复杂</li>
</ol>

<hr>

<h3>由此，现在启动商城第二版开发，本项目停止开发维护</h3>
项目地址：<a href="https://github.com/xuribb/shop_personal_v2">https://github.com/xuribb/shop_personal_v2</a>
</div>
<br>

# shop_personal（商城独立站）

这是项目的前端部分。项目内容为商城独立站，适合商家个体私有商城线上运营。

## 后端部分

<https://github.com/xuribb/shop_personal_backend>


## 技术栈
- Vue3
- Vue Router
- Pinia



## 部署教程
- vite.config.js 中配置代理地址
- utils文件夹config文件中配置domain(跨域配置"/api",不跨域填写"")
- main.js文件中配置domain(跨域配置"/api",不跨域填写"")

- 启动打包编译项目
```sh
npm install       #安装依赖包
npm run dev       #启动本地开发环境（本地开发使用）
npm run build     #打包编译，之后可将编译好的代码上传服务器
```

