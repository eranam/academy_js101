'use strict';

function EventEmitter() {
    this.recurringListeners = {};
    this.onceListeners = {}
}

function addCallbacksToDest(dest, eventName, func) {
    if (eventName in dest) {
        dest[eventName].push(func);
    } else {
        dest[eventName] = [func];
    }
}

EventEmitter.prototype.addListener = function addListener(eventName, func) {
    addCallbacksToDest(this.recurringListeners, eventName, func);
};

EventEmitter.prototype.once = function once(eventName, func) {
    addCallbacksToDest(this.onceListeners, eventName, func);
};

EventEmitter.prototype.emit = function emit(eventName, data) {
    var that = this;

    function callbacksRunner(callbacks) {
        var funcArr = (callbacks || []).slice();
        funcArr.forEach(function invokator(func) {
            func.call(that, data);
        })
    }

    callbacksRunner(that.onceListeners[eventName]);
    callbacksRunner(that.recurringListeners[eventName]);
    delete that.onceListeners[eventName];
};

function removeElementFromArray(arr, element) {
    if (arr) {
        var indx = arr.indexOf(element);
        delete arr[indx];
    }
}

EventEmitter.prototype.removeListener = function removeListener(eventName, func) {
    removeElementFromArray(this.recurringListeners[eventName], func);
    removeElementFromArray(this.onceListeners[eventName], func);
};

function ApproxyPi() {
    this.pi = 0;
    this.precision = 0;
    this.iterationNum = 0;
}

ApproxyPi.prototype = new EventEmitter();
ApproxyPi.prototype.constructor = ApproxyPi;

ApproxyPi.getSeriesItem = function getSeriesItem(itemIndex) {
    return 4.0 * Math.pow(-1, itemIndex) / (1 + 2 * itemIndex);
};

ApproxyPi.prototype.calc = function calcPi(precisionDigitIndex) {
    var that = this;
    var maxPrecision = Math.pow(10, -precisionDigitIndex);

    function calcSingleBulk() {
        var absIncrement = 1,
            currPrecision = Math.pow(10, -that.precision);

        for (var i = 0; i < 1000 && absIncrement >= maxPrecision; i++) {
            var increment = ApproxyPi.getSeriesItem(that.iterationNum);
            that.pi += increment;
            that.iterationNum++;

            absIncrement = Math.abs(increment);
            while (absIncrement < currPrecision) {
                that.precision++;
                currPrecision = Math.pow(10, -that.precision);
            }
        }

        if (that.precision < precisionDigitIndex) {
            that.emit('progress');
            setTimeout(calcSingleBulk, 1);
        } else {
            that.emit('done');
        }

    }

    this.emit('start');
    calcSingleBulk();
};

