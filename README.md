# vue-app

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 1. webpack的path和public path
>   https://segmentfault.com/a/1190000005089993
>   “path”仅仅告诉Webpack结果存储在哪里，然而“publicPath”项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值。
>   如设置为public path后，主脚本插入的路径变由默认的./app.js变为/aaa/app.js,又如当设置public path为不同的值以后，使用style-loader插入的style脚本内，路径都会自动加上public path前缀（过于小的图片由于使用url-loader因此直接内联在样式中url(data:image/png)）直接写在html模版文件里的url则不做转换。
