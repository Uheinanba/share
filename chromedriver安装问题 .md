node版本从v4.2更新到v6.3之后chromedriver就一直安装不上,
按照npm方法设置chromedriver_cdnurl也是无效的

npm 官网上设置
```
npm install chromedriver --chromedriver_cdnurl=http://npm.taobao.org/mirrors/chromedriver
```
也是无效的。


后来在 vue-router 的issues中找到：

```
npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver

```
亲测有效。