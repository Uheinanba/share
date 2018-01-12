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

### react-redux
1. <Provider>组件
```
import { Provider } from 'react-redux'
import { createStore } from 'redux'
let store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
原理是通过react组件的context属性
```
  class Provider extends Component {
    getChildContext() {
      return {
        store: this.props.store
      };
    }
    render() {
      return this.props.children;
    }
  }

  Provider.childContextTypes = {
    store: React.PropTypes.object
  }
```

上面代码中，store放在了上下文对象context上面。然后，子组件就可以从context拿到store

```
class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
    // ...
  }
}

VisibleTodoList.contextTypes = {
  store: React.PropTypes.object
}
```
React-Redux 的connect的高阶组件就是利用 
```
  Connect.childContextTypes = childContextTypes
  Connect.contextTypes = contextTypes
```
就类似上面这样，从而拿到store。

2. connect([mapStateToProps], [mapDispatchToProps],[mergeProps], [options]);
  1.1 mapStateToProps(state, [ownProps])
    如果定义该参数，组件将会监听Redux store变化。任何时候，只要 Redux store发生改变,mapStateProps 函数会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的props合并。如果忽略这个参数,你的组件将不会监听redux store。如果指定了该回调函数的第二个参数ownprops,则该函数的值为传递到组件的props,而且只要组件 接收新的props,mapStateToProps也会被调用。
  1.2 mapDispatchToProps(dispatch, [ownProps])
  1.3 mergeProps(stateProps, dispatchProps, ownProps)

3.  把action creator 作为actions属性注入到组件中
```
  import * as actionCreators from './actionCreators';
  import { bindActionCreators } from 'redux';

  function mapStateToProps(state) {
    return { todos: state.todos };
  }

  function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
  }

  export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
```

