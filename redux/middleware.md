### 概念: middleware是dispatch 函数的加工厂(洋葱模型)
1. 形式:
    request -> middleware -> response
2. 用途:
   2.1 异步的action
   2.2 action过滤
   2.3 日志输出
   2.4 异常报告
3. 简单实例
```
    const logger = (store) => next => action => {
        console.log('[logger1]: dispatching', action);
        let result = next(action);
        console.log('[logger1]: next state = ', getState());
        return result;
    }
```

4. 使用Monkeypatching的hacking方式
```
    let next = store.dispatch;
    const logger = (store, next) => {
        return action => {
            console.log('dispatching', action);
            const result = next(action);
            console.log('next state', store.getState());

            return result;
        };
    };

    const applyMiddlewareByMonkeypatching = (store, middlewares) => {
        middlewares = middlewares.slice();
        middlewares.reverse();

        middlewares.forEach(middleware => {
            store.dispatch = middleware(store);
        });
    };

    applyMiddlewareByMonkeypatching(store, [logger]);
```


