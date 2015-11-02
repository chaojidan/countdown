countdown
=========

一个倒计时程序


特点：
-  可以指定一个标准的初始时间，通常这个时间是从服务器获取的，这样可以避免客户端本地时间不准确造成的问题
-  提供两个事件回调，每次倒计时时的回调（intervalCallback）和倒计时结束以后的回调（endCallback）
-  本程序仅提供逻辑实现，倒计时呈现样式需自行设计

使用方法：
```javascript
var countdown = new Countdown({
    standardTime : '2012/08/01 20:00:00',  //服务器当前时间，如不指定则使用客户端当前时间
    targetTime : '2013/12/01 23:59:59',  //倒计时结束时间
    intervalCallback : function(str, arr) {  //str是一个格式化的倒计时字符串，arr是以数组形式存储的剩余时间
        $('#timer').text(str);
    },
    endCallback : function() {
        $('#timer').text('时间到');
    }
});
countdown.start();
```
