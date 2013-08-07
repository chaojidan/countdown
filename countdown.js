/**
 * Created with JetBrains PhpStorm.
 * User: wanghui
 * Date: 13-8-4
 * Time: 下午10:38
 * To change this template use File | Settings | File Templates.
 */
(function(global, undefined) {
    "use strict";
    //倒计时
    var Class = function() {
        var klass = function() {
            this.init.apply(this, arguments);
        };
        klass.fn = klass.prototype;
        klass.fn.init = function() {};
        return klass;
    };

    var Countdown = new Class;

    Countdown.fn.init = function(options) {
        this.interval = parseInt(options.interval, 10) > 0 ? parseInt(options.interval, 10) : 1000;
        this.timer = 0;
        this._getDiffTime(options.standardTime);
        this._getTargetTime(options.targetTime);
        this.intervalCallback = options.intervalCallback;
        this.endCallback = options.endCallback;
    };

    Countdown.fn.start = function() {
        var self = this;
        if (self.timer === 0) {
            self._countdown();
            self.timer = setInterval(function() {
                self._countdown();
            }, self.interval);
        }
    };

    Countdown.fn.stop = function() {
        var self = this;
        clearInterval(self.timer);
        self.timer = 0;
    };

    Countdown.fn.end = function() {
        var self = this;
        self.stop();
        if (typeof self.endCallback === 'function') {
            self.endCallback();
        }
    };

    Countdown.fn._getTargetTime = function(_targetTime) {
        if (_targetTime instanceof Date) {
            this.targetTime = options.targetTime;
        } else {
            this.targetTime = new Date(_targetTime);
        }
        if (utils.isValidDate(this.targetTime)) {
            if (this.targetTime < new Date().getTime()) {
                throw new Error('Countdown : Target time can not be less than the current time');
            }
        } else {
            throw new Error('Countdown : Invalid Date of "options.targetTime"');
        }
    };

    Countdown.fn._getDiffTime = function(_standardTime) {
        this.diffTime = 0;
        if (_standardTime !== undefined) {
            var standardTime;
            if (_standardTime instanceof Date) {
                standardTime = _standardTime;
            } else {
                standardTime = new Date(_standardTime);
            }
            if (utils.isValidDate(standardTime)) {
                this.diffTime = standardTime.getTime() - new Date().getTime();
                this.diffTime = Math.floor(this.diffTime / 1000) * 1000;
                //console.log('diffTime:' + this.diffTime);
            } else {
                throw new Error('Countdown : Invalid Date of "options.standardTime"');
            }
        }
    };

    Countdown.fn._countdown = function() {
        var self = this;
        var currTime = new Date().getTime() + self.diffTime;
        //console.log(currTime);
        if (currTime < self.targetTime) {
            var leftMTime = self.targetTime - currTime, //剩余毫秒
                leftTime = utils.getLeftTime(leftMTime),
                strLeftTime = utils.getStrLeftTime(leftTime);
            //console.log('剩余', leftMTime);
            if (typeof self.intervalCallback === 'function') {
                self.intervalCallback(strLeftTime, leftTime);
            }
        } else {
            self.end();
        }
    };

    var utils = {
        getStrLeftTime : function(leftTime) {
            var str_hour   = leftTime.h < 10 ? "0" + leftTime.h : leftTime.h,
                str_minute = leftTime.m < 10 ? "0" + leftTime.m : leftTime.m,
                str_second = leftTime.s < 10 ? "0" + leftTime.s : leftTime.s,
                text = str_hour + ":" + str_minute + ":" + str_second;
            if (leftTime.d > 0) {
                text = leftTime.d + "天 " + text;
            }
            return text;
        },
        getLeftTime : function(mtime) {
            var ms_per_day = 86400000, //24 * 60 * 60 * 1000
                e_days_left = mtime / ms_per_day,
                days_left = Math.floor(e_days_left),  //剩余天数
                e_hours_left = (e_days_left - days_left) * 24,
                hours_left = Math.floor(e_hours_left), //剩余小时
                e_minutes_left = (e_hours_left - hours_left) * 60,
                minutes_left = Math.floor(e_minutes_left), //剩余分钟
                seconds_left = Math.floor((e_minutes_left - minutes_left) * 60); //剩余秒
            return {
                d : days_left,
                h : hours_left,
                m : minutes_left,
                s : seconds_left
            }
        },
        isValidDate : function(d) {
            if ( Object.prototype.toString.call(d) !== "[object Date]" )
                return false;
            return !isNaN(d.getTime());
        }
    };

    global.MfwCountdown = Countdown;
})(this);
