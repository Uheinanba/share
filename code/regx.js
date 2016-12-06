// 正则表达式
var str = 'var a = "2";/*set a--*/a="1*/";/*reset a*/';
str.replace(/\/\*.*?\*\//g, '');// 非贪婪匹配

'asdsa34324fgdg'.replace(/\d/g, '[$&]'); // 匹配全文

'hi nice him history'.match(/\bhi\b/g);

// border-bottom-color -> borderBottomColor

'border-bottom-color'.replace(/-([\w])/g, function($0, $1) {
  return $1.toUpperCase();
})


'2324234245'.replace(/\d{3}$/g, ',')

var str = '  dfdf  ';
str.replace(/^\s+/,'').replace(/\s*$/,'')
