// 2016-12-06 
// author heimanba  --TAG: 一些面试的逻辑题目

// 回文
function ispalindrome(str) {
  return str === str.split('').reverse().join('');
}

ispalindrome('noon');

// 数组去重 (利用object 对象来实现/利用indexOf也可以)
function unique(arr) {
  let obj = {};
  let tmpArr = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    let item = arr[i];
    if (!obj[item]) {
      obj[item] = item;
      tmpArr.push(item);
    }
  }
  return tmpArr;
}

unique([1, 2, 0, 2, 3, 3, 7])

// 统计重复次数最多的字符
function findMaxDuplicateChar(str) {
  var len = str.length;
  var strObj = {};
  if (len <= 1) {
    return str;
  }

  for (var i = 0; i < len; i++) {
    let item = str.charAt(i);

    if (!strObj[item]) {
      strObj[item] = 1;
    } else {
      strObj[item] += 1;
    }
  }

  let maxKey = 0;
  let maxVal = 0;
  for (var prop in strObj) {
    if ({}.hasOwnProperty.call(strObj, prop)) {
      if (strObj[prop] > maxVal) {
        maxVal = strObj[prop];
        maxKey = prop;
      }
    }
  }

  return maxKey;
}

findMaxDuplicateChar('abbbcbbbdsdsd');

//使用正则(先排序)
function findMaxDuplicateChar2(str) {
  str = (str.split('')).sort().join(''); // 排序完成
  var reg = /(\w)\1+/g; // 这里\1代表
  var maxVal = 0;
  var maxKey = 1;
  str.replace(reg, function($0, $1) {
    if ($0.length > maxVal) {
      maxVal = $0.length;
      maxKey = $1;
    }
  })
  return maxKey;
}

findMaxDuplicateChar2('erhjiehrihifseessssdsddd');

// 排序算法(冒泡) 往上冒泡
function bubbleSort(arr) {
  for (var i = 0, l = arr.length; i < l - 1; i++) {
    for (var j = i + 1; j < l; j++) { //相邻的两个值
      if (arr[i] > arr[j]) { // 从小到大排序
        var item = arr[j];
        arr[j] = arr[i];
        arr[i] = item;
      }
    }
  }
}

bubbleSort([2, 23, 34, 3, 44, 54, 5, 4]);

// 字符串转为驼峰 border-bottom-color -> borderBottomColor
function toCamel1(str) {
  var reg = /-(\w)/g;
  return str.replace(reg, function($0, $1) {
    return $1.toUpperCase();
  })
}
toCamel1('border-bottom-color')

function toCamel2(str) {
  var arr = str.split('-');
  for (var i = 1, len = arr.length; i < len; i++) {
    var item = arr[i];
    arr[i] = (item.slice(0, 1)).toUpperCase() + item.slice(1);
  };
  return arr.join('');
}

toCamel2('border-bottom-color');


function parseUrl(str) {
  str = str.replace(/.*?\?/, '') //非贪婪捕获
  var obj = {};
  str.replace(/([^&\?=]+)={0,1}([^&\?=]*)/g, function(rs, $1, $2) {
    // 记得需要 转义下
    $1 = decodeURIComponent($1);
    $2 = decodeURIComponent($2);
    obj[$1] = $2;
    console.log($1, $2)
    return rs;
  })
  console.log(obj)
}
parseUrl('http://www.baidu.com?aa=111&bb=222&cc');

// jsonp 的构造
function jsonp(config) {
  var options = config || {}; // 需要配置url, success, time, fail四个属性
  var callbackName = ('jsonp_' + Math.random()).replace(".", "");
  var oHead = document.getElementsByTagName('head')[0];
  var oScript = document.createElement('script');
  oHead.appendChild(oScript);
  window[callbackName] = function(json) { //创建jsonp回调函数
    oHead.removeChild(oScript);
    clearTimeout(oScript.timer);
    window[callbackName] = null;
    options.success && options.success(json); //先删除script标签，实际上执行的是success函数
  };
  oScript.src = options.url + '?' + callbackName; //发送请求
  if (options.time) { //设置超时处理
    oScript.timer = setTimeout(function() {
      window[callbackName] = null;
      oHead.removeChild(oScript);
      options.fail && options.fail({ message: "超时" });
    }, options.time);
  }
};
// 使用方法：
jsonp({
  url: '/b.json',
  success: function(d) {
    //数据处理
  },
  time: 5000,
  fail: function() {
    //错误处理
  }
});


'JAVASCRIPT'.replace(/A-G/, function($0) {
  return $0.toLowerCase();
})