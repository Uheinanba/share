function baseCreate(prots) {
  var Ctor = function() {};
  Ctor.prototype = prots;
  var result = new Ctor(); 
  Ctor.prototype = null;
  return result; 
}

function every(obj, predicate) {
  var keys = Object.keys(obj);
  var len = keys.length;
  var i = 0; 
  while(i < len) {
    if( !predicate.call(obj, obj[keys[i]], keys[i])) {
      return false;
    }
    i++;
  }
  return true;
}

every({
  a: 11,
  b: 22
}, function(every) {
  return every > 20;
})



