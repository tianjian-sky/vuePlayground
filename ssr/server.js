const Vue = require('vue')
var express = require('express')
const vueSSR = require('vue-server-renderer')
var app = express()

// serve as server
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// })

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
})

// vue ssr
app.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
    })
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
