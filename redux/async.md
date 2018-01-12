// https://zhuanlan.zhihu.com/p/24337401
1. redux-thunk
```
    const thunk = ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument);
        }
        return next(action);
    };
```
缺点: 最大的缺点就是模版代码太多。