### Adapter
1. call
source:
```
  const call = (key, ...args) => context => context[key](...args);
```
没有call包装情况:
```
Promise.resolve([1, 2, 3])
.then(res => res.map(item => item * 2)).then(console.log);
```
使用call包装情况:
```
Promise.resolve([1, 2, 3])
  .then(call('map', x => 2 * x))
  .then(console.log); //[ 2, 4, 6 ]

或者:
const map = call.bind(null, 'map');
Promise.resolve([1, 2, 3])
  .then(map(x => 2 * x))
  .then(console.log); //[ 2, 4, 6 ]
```