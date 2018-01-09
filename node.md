## 异步I/O


### 单线程
1.  web workers 创建工作线程来进行计算，解决javacript大计算阻塞UI渲染的问题。工作线程为了不阻塞主线程，通过消息传递的方式来传递运行结果，使得工作线程不能访问主线程的UI。
2. node 采用和web worker相同的思路:child_process。

### 非阻塞
假设业务场景中有一组互不相关的任务需要完成,主流以下两种方法:
1. 单线程串行完成。(执行任务方式符合编程人员思维方式，缺点在于性能，任意一个的任务导致后续任务会导致执行代码被阻塞)
2. 多线程并行完成。(创建线程和进程切换的开销比较大, 复杂业务中面临锁，状态等同步问题)

node采用方案: 利用单线程，远离多线程死锁，状态同步等问题；利用异步I/O，让单线程原理阻塞，以便更好使用CPU。

### 事件循环
进程启动时,Node便会创建一个类似while(true)的模型，每次执行一次循环体称为tick,每个tick过程则是查看是否有事件待处理， 如果有则取出事件以及相关回调函数。如果存在回调函数则执行它们，然后进入下个tick,如果不再有事件处理，则退出流程。

### 非I/O 的异步API
http://www.ruanyifeng.com/blog/2014/10/event-loop.html

https://www.zhihu.com/question/23028843
```
const process = require('process');
process.nextTick(() => {
  console.log('nextTick 延迟执行1');
});

process.nextTick(() => {
  console.log('nextTick 延迟执行2');
});

setImmediate(() => {
  console.log('setImmediate延迟执行1');
  process.nextTick(() => {
    console.log('强势插入');
  });
});

setImmediate(() => {
  console.log('setImmediate延迟执行2');
});

console.log('正常执行');


==>
正常执行
nextTick 延迟执行1
nextTick 延迟执行2
setImmediate延迟执行1
setImmediate延迟执行2
强势插入
```