module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1629001614412, function(require, module, exports) {
const StrategyFrom = require("./src/fromTest/StrategyFromTest"),
    MathTool = require('./src/mathTool/MathTool'),
    Calendar = require('./src/calendar/Calendar'),
    // MyStorage = require('./src/webStorage'),
    MyEvent = require('./src/myEvent/MyEvent'),
    DebounceAndThrottle = require('./src/debounceAndThrottle/DebounceAndThrottle');
module.exports = {
    StrategyFrom,
    MathTool,
    Calendar,
    // MyStorage,
    MyEvent,
    DebounceAndThrottle
}
}, function(modId) {var map = {"./src/fromTest/StrategyFromTest":1629001614413,"./src/mathTool/MathTool":1629001614416,"./src/calendar/Calendar":1629001614417,"./src/myEvent/MyEvent":1629001614418,"./src/debounceAndThrottle/DebounceAndThrottle":1629001614419}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629001614413, function(require, module, exports) {
const FromTest = require('./FromTest'),
    MyTool = require('../tool');
/**
 * 调用表单校验策略类
 * @class
 */
class StrategyFromTest {
    constructor(FromTest) {
        this.FromTest = FromTest;
        this.cacheTest = [];
    }

    _clearCache() {
        this.cacheTest.length = 0;
    }

    _triggerErrorFn(fn) {
        this._clearCache();
        fn();
        return false;
    }

    _moreConfig(dataSource, config) {
        for (const conf of config) {
            this._oneConfig(dataSource, conf);
        }
    }

    _oneConfig(dataSource, config) {
        let { description, errorFn = function () { } } = config,
            [methodName, value] = description.split(":");
        //传入value优先级比截取高
        value = config.value ? config.value : value;
        this.cacheTest.push({ dataSource, methodName, value, errorFn });
    }

    /**
     * 开始校验表单
     * @returns Boolean
     */
    start() {
        if (!this.cacheTest.length) return;
        while (this.cacheTest.length) {
            let test = this.cacheTest.shift(),
                { dataSource, methodName, value, errorFn } = test,
                isHaveMehtod = methodName in this.FromTest;
            if (isHaveMehtod) {
                if (!this.FromTest[methodName](dataSource, value)) {
                    return this._triggerErrorFn(errorFn);
                }
            } else {
                this._clearCache();
                return MyTool._warn(`${methodName}访方法不存在`);
            }
        }
        return true;
    }

    /**
     * 表单校验添加至缓存区
     * @param {any} dataSource 需要校验表单值
     * @param {Object | [Object]} config 表单需要满足的要求
     */
    addCacheTest(dataSource, config) {
        let isArr = Array.isArray(config);
        isArr ? this._moreConfig(dataSource, config) : this._oneConfig(dataSource, config);
    }
}

module.exports = new StrategyFromTest(FromTest);
}, function(modId) { var map = {"./FromTest":1629001614414,"../tool":1629001614415}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629001614414, function(require, module, exports) {
const MyTool = require('../tool'),
    telReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
    emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
/**
 * 表单校验方法类
 * @class
 */
class FromTest {
    /**
     * 数组长度不为0
     * @param {Array} dataSource 值 
     * @returns Boolean
     */
    islengthNoZero(dataSource) {
        let isArr = Array.isArray(dataSource);
        if (isArr) {
            return dataSource.length !== 0;
        }
        MyTool._warn(`${dataSource}不是Array类型`)
        return false;
    }

    /**
     * 值不为空
     * @param {String|Number} dataSource 值
     * @returns Boolean
     * 
     */
    isValueNoEmpty(dataSource) {
        return dataSource === '' ? false : this.isValueNoUndefined(dataSource);
    }

    /**
     * 
     * @param {any} dataSource 
     * @returns Boolean
     */
    isValueNoUndefined(dataSource) {
        let type = typeof dataSource;
        return type !== "undefined";
    }

    /**
     * 电话号码是否符合正确的格式
     * @param {String} dataSource 电话号码 
     * @returns Boolean
     */
    isQualifiedTel(dataSource) {
        return telReg.test(dataSource);
    }

    /**
     * 电子邮件是否符合正确的格式
     * @param {String} dataSource 邮箱 
     * @returns Boolean 
     */
    isQualifiedEmail(dataSource) {
        return emailReg.test(dataSource);
    }

    /**
     * 值是否相同
     * @param {String | number} dataSource 表单实际值
     * @param {String | number} value 比较大小的目标值 
     * @returns Boolean
     */
    isEqualsValue(dataSource, value) {
        return dataSource === value ? true : false;
    }

    /**
    * 校验表单是否小于某个值
    * @param {String | Number} dataSource 表单实际值
    * @param {String | Number} value 比较大小的目标值 
    */
    isLessThenValue(dataSource, value) {
        return dataSource < value;
    }

    /**
     * 校验表单是否大于某个值
     * @param {String | Number} dataSource 表单实际值
     * @param {String | Number} value 比较大小的目标值 
     * @returns 
     */
    isGreaterThanValue(dataSource, value) {
        return dataSource > value;
    }

    /**
     * 校验密码长度
     * @param {String | Number} dataSource 密码值 
     * @param {Number} value 密码需要的最小长度
     */
    isPaddWordMinLen(dataSource, value) {
        let len = Number(value),
            isNan = Number.isNaN(len),
            isDataSourceLessThenValue = String(dataSource).length < value;
        return isNan ? MyMyTool._warn('传入值无法转化成Number类型,请检查!') : !isDataSourceLessThenValue;
    }


}
module.exports = new FromTest();
}, function(modId) { var map = {"../tool":1629001614415}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629001614415, function(require, module, exports) {
module.exports = {
    isValueNoEmpty: { description: 'isValueNoEmpty' },
    _warn(msg) {
        console.warn(msg);
        return false;
    },
    _error(msg) {
        console.error(msg);
        return false;
    },

}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629001614416, function(require, module, exports) {
/**处理数字转换常用类
 * @class 
 */
class MathTool {
    /**
     * 随机获取一个范围内的值
     * @param {Number} min 最小值
     * @param {Number} max 最大值 
     * @returns Number
     */
    getRangeNumber(min, max) {
        return Math.round((Math.random() * (max - min)) + min);
    }

    /**
     * 返回一个两位数的字符串,传入的数字小于10进行拼接
     * @param {Number} num 传入的数字
     * @returns String
     */
    getUseTwoNumberToString(num) {
        let absNum = Math.abs(num);
        return absNum < 10 ? `0${absNum}` : String(absNum);
    }

    /**
     * 将数字转换成一个千位符并返回
     * @param {Number} num 传入数字 
     * @param {String} char 千位字符
     * @returns String
     */
    getThousandsChar(num, char = ',') {
        if (num < 1000) {
            return String(num);
        }
        //Number.prototype.toLocaleString 可实现千位符
        //去除小数点后面的数
        let numStrs = String(num).split('.'),
            thousandsChar = numStrs[0].replace(/(\d)(?=(\d{3})+$)/g, ($1) => {
                return $1 + char;
            })
        return numStrs[1] ? [thousandsChar, numStrs[1]].join('.') : thousandsChar;
    }
}

module.exports = new MathTool();
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629001614417, function(require, module, exports) {
const MathTool = require('../mathTool/MathTool'),
    StrategyFromTest = require('../fromTest/StrategyFromTest'),
    MyTool = require('../tool'),
    ymdReg = /^(YY).(MM).(DD).?$/,
    hmsReg = /^(hh).(mm).(ss).?$/,
    dateReg = /^(YY).(MM).(DD).?\s(hh).(mm).?(ss)?.?$/,
    formatTimeReg = /^(\d{4})(?:\D(\d{1,2})\D?)?(?:\D(\d{1,2})\D?)?(?:\s+(?:(\d{1,2})\D?)(?:\D(\d{1,2})\D?)?(?:\D(\d{1,2}))?\D?)?$/;
class Calendar {

    _getCurDate() {
        return new Date();
    }

    getMonth() {
        const month = this.CurDate ? this.CurDate.getMonth() : this._getCurDate().getMonth();
        return month + 1;
    }

    _createYMDArray() {
        return [this.CurDate.getFullYear(), this.getMonth(), this.CurDate.getDate()];
    }

    _createHMSArray() {
        return [this.CurDate.getHours(), this.CurDate.getMinutes(), this.CurDate.getSeconds()];
    }

    _createArray(format, captures) {
        let date = null;
        if (captures.length === 6) {
            date = [].concat(this._createYMDArray(), this._createHMSArray());
        } else {
            date = ymdReg.test(format) ? this._createYMDArray() : this._createHMSArray();
        }
        return captures.map((val, index) => {
            return { key: val, value: MathTool.getUseTwoNumberToString(date[index]) };
        })
    }

    _warn(text) {
        console.warn(text);
    }

    /**
     * 获取返回时间格式对应的时间字符串
     * @param {*} format 时间格式
     * @param {*} reg 正则
     * @returns String
     */
    _getReplaceFormat(format, reg) {
        if (!reg) {
            this._warn(`${format}格式不正确`);
            return
        }
        return format.replace(reg, (match, ...captures) => {
            captures.splice(-2);
            const strs = this._createArray(format, captures);
            return strs.map((str) => {
                const { key, value } = str;
                match = match.replace(key, value);
                return match;
            }).pop();
        })
    }

    /**
     * 
     * @param {*} dateTime 时间
     * @param {*} format 时间格式  默认时间格式YY.MM.DD hh:mm:ss 可选YY.MM.DD或hh:mm:ss
     * @returns String
     */
    getStringCalender(dateTime, format = 'YY.MM.DD hh:mm:ss') {
        this.CurDate = dateTime ? new Date(dateTime) : this._getCurDate();
        const regs = [ymdReg, hmsReg, dateReg];
        return this._getReplaceFormat(format, regs.find(reg => reg.test(format)));
    }

    //校验日历值是否与实际情况一致
    _test({ months, days, hours, minutes, seconds }) {
        const CurDate = this._getCurDate(),
            oneDayTime = 1000 * 60 * 60 * 24;
        CurDate.setMonth(months);
        CurDate.setDate(1);
        const maxData = new Date(CurDate.getTime() - oneDayTime).getDate();
        StrategyFromTest.addCacheTest(months, { description: "isLessThenValue", value: 13, errorFn: () => MyTool._warn('月份不应超出12个月!') });
        StrategyFromTest.addCacheTest(days, [
            { description: "isLessThenValue", value: 32, errorFn: () => MyTool._warn('日期不应大于31号!') },
            //该校验日期不应大于当月的最大日期
            { description: "isLessThenValue", value: maxData + 1, errorFn: () => MyTool._warn(`日期不应大于${months}月最大日期${maxData}!`) }
        ]);
        StrategyFromTest.addCacheTest(hours, { description: "isLessThenValue", value: 24, errorFn: () => MyTool._warn('小时不应超过24!') });
        StrategyFromTest.addCacheTest(minutes, { description: "isLessThenValue", value: 60, errorFn: () => MyTool._warn('分钟不应超出60分钟!') });
        StrategyFromTest.addCacheTest(seconds, { description: "isLessThenValue", value: 60, errorFn: () => MyTool._warn('秒不应超出60秒!') });
        return StrategyFromTest.start();
    }

    _dealWith([year, months = 1, days = 1, hours = 0, minutes = 0, seconds = 0]) {
        const curDate = this._getCurDate();
        if (this._test({ months, days, hours, minutes, seconds })) {
            curDate.setFullYear(year);
            curDate.setMonth(Number(months - 1));
            curDate.setDate(days);
            curDate.setHours(hours);
            curDate.setMinutes(minutes);
            curDate.setSeconds(seconds);
        }
        return curDate.getTime();
    }

    _replace(dataSource) {
        return dataSource.replace(formatTimeReg, (match, ...arg) => {
            arg.splice(-2);
            return this._dealWith(arg);
        })
    }

    _stringToTime(dataSource) {
        return formatTimeReg.test(dataSource) ? Number(this._replace(dataSource)) : this._warn('时间格式错误!');
    }

    getTime(dataSource) {
        return dataSource ? this._stringToTime(dataSource.trim()) : this._getCurDate().getTime();
    }
}

module.exports = new Calendar();
}, function(modId) { var map = {"../mathTool/MathTool":1629001614416,"../fromTest/StrategyFromTest":1629001614413,"../tool":1629001614415}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629001614418, function(require, module, exports) {
const StrategyFromTest = require('../fromTest/StrategyFromTest'),
    { isValueNoEmpty, _warn } = require('../tool')
class MyEvent {
    constructor() {
        this.event = {};
    }

    _isHaveKey(key) {
        StrategyFromTest.addCacheTest(key, Object.assign(isValueNoEmpty, { errorFn: () => _warn('事件名不能为空') }));
        return StrategyFromTest.start();
    }

    _isHaveKeyAndValue(key, value) {
        const isHaveKey = this._isHaveKey(key);
        StrategyFromTest.addCacheTest(value, Object.assign(isValueNoEmpty, { errorFn: () => _warn('事件事件不能为空') }))
        return isHaveKey && StrategyFromTest.start();
    }

    _isTypeFunc(value) {
        let type = Object.prototype.toString.call(value);
        return /Function/.test(type);
    }

    _addEvent(key, value, once = false) {
        if (this._isHaveKeyAndValue(key, value)) {
            once && this._isTypeFunc(value) ? value.once = true : null;
            if (this.event.hasOwnProperty(key)) {
                this.event[key].includes(value) ? null : this.event[key].push(value);
                return;
            }
            this.event[key] = [value];
        }
    }

    on(key, value) {
        this._addEvent(key, value);
    }

    once(key, value) {
        this._addEvent(key, value, true);
    }

    _deleteKey(key) {
        StrategyFromTest.addCacheTest(this.event[key], { description: 'islengthNoZero' });
        StrategyFromTest.start() ? null : delete this.event[key];
    }

    trigger(key) {
        let values = this.event[key];
        if (!this._isHaveKey(key) || !values) return;
        values.forEach((value, index) => {
            this._isTypeFunc(value) ? value() : null;
            value.once ? this.event[key].splice(index, 1)&&this._deleteKey(key) : null;
        })
    }

    remove(key) {
        this._isHaveKey(key) ? delete this.event[key] : null;
    }
}

module.exports = new MyEvent();

}, function(modId) { var map = {"../fromTest/StrategyFromTest":1629001614413,"../tool":1629001614415}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1629001614419, function(require, module, exports) {
/**
 * 防抖:n秒后执行,如果n秒内再次触发，则重新计算执行时间
 * 节流:n秒内只执行一次
 */
class DebounceAndThrottle {
    constructor() {
        this.debounceTime = null;
        this.throttleTime = null;
    }
    /**
     * 防抖
     * @param {*} fn 回调函数
     * @param {*} wait 等待时间
     * @param {*} immediate 是否立即执行
     */
    debounce(fn, wait = 1000, immediate = false) {
        let self = this;
        //立即执行
        immediate ? fn.call(this) : null;
        return function () {
            self.debounceTime && clearTimeout(self.debounceTime);
            self.debounceTime = setTimeout(() => {
                fn.apply(this, arguments);
            }, wait)
        }
    }

    /**
     * 取消防抖执行事件
     */
    cancelDebounce() {
        this.debounceTime && clearTimeout(this.debounceTime);
        this.debounceTime = null;
    }



    /**
     * 节流
     * @param {*} fn 回调函数 
     * @param {*} wait 等待时间
     */
    throttle(fn, wait = 1000, immediate = false) {
        let self = this;
        immediate ? fn() : null;
        return function () {
            if (self.throttleTime) return;
            self.throttleTime = setTimeout(() => {
                self.throttleTime = null;
                fn.apply(this, arguments);
            }, wait)
        }
    }

    /**
     * 取消节流执行事件
     */
    cancelThrottle() {
        this.throttleTime && clearTimeout(this.throttleTime);
        this.throttleTime = null;
    }
}

module.exports = new DebounceAndThrottle();
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1629001614412);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map