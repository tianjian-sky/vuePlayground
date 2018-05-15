# vue ssr
[vue ssr 参考链接](https://ssr.vuejs.org/zh/structure.html)
[express 参考链接](http://www.expressjs.com.cn/guide/routing.html)

步骤
    1.安装express
    2.安装vue-ssr
    3.编写启动脚本启动服务器
    4.node 运行启动脚本

e.g.
```javascript
const Vue = require('vue')
var express = require('express')
const vueSSR = require('vue-server-renderer')
var app = express()
// serve as server
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// })

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
})

// vue ssr
app.get('*', (req, res) => {
    // vue 组件
    const app = new Vue({
        data: {
        url: req.url
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
    })
    // vue ssr将组件变为html，然后作为responsetext返回
    vueSSR.createRenderer().renderToString(app, (err, html) => {
        if (err) {
        res.status(500).end('Internal Server Error')
        return
        }
        res.end(`
        <!DOCTYPE html>
        <html lang="en">
            <meta charset="utf-8">
            <head><title>Hello</title></head>
            <body>${html}</body>
        </html>
        `)
    })
})
```