### 和flux区别
1. redux没有dispather的概念,原因是它依赖于纯函数来替代事件处理器。但是和flux一样都是表述为(state,action) => state。 (TODO 理解)
2. redux和flux一个重要的区别的是: redux永远不会改动你的数据。应该在reducer中返回一个新的对象来更新state,使用immutable。

### immutable -> redux-immutablejs
1. 使用immutable为什么比深拷贝更加高效?


### reselect?


### redux-actions


### 定义
1. action 把数据从应用(view,服务器响应，用户输入等)到store的有效载荷
```
  {
    type: ADD_TODO,
    text: SHOW_COMPLETED
  }
```
2. action creater
```
function addTODO(text) {
  return {
    text,
    type: ADD_TODO,
  }
}
```
3. reducer
  action 只是描述事情发生的事实,但是没有指明具体如何更新state。这正是reducer需要做的事情。
4. store 把action和reducers联系到一起的对象。
  (1) 维持应用的state
  (2) 提供 getState() 方法获取state;
  (3) 提供 dispatch(action)更新state;
  (4) 通过 subscribe(listener) 注册监听器;
  (5) 通过 subscribe(listener) 返回的函数注销监听器;



