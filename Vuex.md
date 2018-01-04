### vuex 和redux对比
1. vuex 中state的数据是可以更改的,redux 需要返回一个新的数据。所以需要用到immutable。
2. commit和dispatch 区别
3. 不适合的场景:
    3.1 复杂的dialog弹框