// 2016-12-06 
// author heimanba  --TAG: 脏值检测demo
// http://teropa.info/build-your-own-angular/ 
function Scope() {
  this.$$watchers = [];
}

Scope.prototype.$watch = function(watchFn, listenerFn) {
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn || function() {}
  };
  this.$$watchers.push(watcher);
};

Scope.prototype.$$digestOnce = function() {
  var self = this;
  var dirty;
  this.$$watchers.forEach(function(watch) {
    var newValue = watch.watchFn(self);
    var oldValue = watch.last;
    if (newValue !== oldValue) {
      watch.listenerFn(newValue, oldValue, self);
      dirty = true;
      watch.last = newValue;
    }
  });
  return dirty;
};

Scope.prototype.$digest = function() {
  var dirty;
  do {
    dirty = this.$$digestOnce();
  } while (dirty);
};

var scope = new Scope();
scope.firstName = 'Joe';

scope.$watch(
  function(scope) {
    return scope.firstName;
  },
  function(newValue, oldValue, scope) {
    console.log(newValue, oldValue);
  }
);

// After the first digest the counter is 1

setTimeout(function() {
  scope.firstName = 'Jane';
  scope.$digest();
}, 200);

// scope.$digest();

// On the next change the counter becomes two, and the other watch listener is also run because of the dirty check
/*scope.firstName = 'Jane';
scope.$digest();
console.log(scope.counter === 2);
console.log(scope.counterIsTwo);*/