### 缺点
1. pure, 为了保持纯粹,通过使用middleware来处理副作用。衍生出:redux-thunk, redux-saga, redux-observable。
2. 啰嗦,  一个action处理散落在最少三处地方(actionType, action, reducer, components)。
3. 不是分形的, 状态存储在顶层的一颗树。通过connect 和组件连接在一起,单个业务组件无法独立工作,但是在分形的架构中, 组件内部有自己的状态机制,单个组件可以独立工作。在非分形的架构中,视图可以复用,状态可以复用,但是很难将二者作为一个整体的组件来复用。