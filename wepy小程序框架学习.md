### 更新wepy框架
  由于 wepy和wepy-cli是耦合的关系，所以必须同时更新wepy-cli的框架。
  * npm i wepy-cli -g
  * npm i wepy --save
  * wepy build --no-cache
  
再执行 wepy new  demo

wepy build --no-cache 命令作用
.wepycache 文件中有这个文件会对npm包进行缓存编译的过程，no-chache 会删除这个文件

## setDate的思路

$apply调用时机,自定义的时候需要调用，异步处理的时候也需要调用
