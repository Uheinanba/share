## js中对象的枚举方法有
  * for in
  * Object.keys
  * Object.getOwnPropertyNames

```
  var parent = Object.create(Object.prototype, {
    a: {
      value: 1,
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  var child = Object.create(parent, {
    b: {
      value: 2,
      writable: true,
      enumerable: true,
      configurable: true
    },
    c: {
      value: 3,
      writable: true,
      enumerable: false,
      configurable: true
    }
  });

```

### 遍历对象

* for in => a, b
* for in + hasOwnPrototype => b
* object.keys() 等价于 for in + hasOwnPrototype
* Object.getOwnPropertyNames => b, c

### 总结

for in/Object.keys 都不能遍历 enumerable为false的对象

Object.getOwnPropertyNames和Object.keys 都只能遍历自身的属性，不能遍历原型链prototype的值
但是Object.getOwnPropertyNames 能够遍历  enumerable为false的对象。

