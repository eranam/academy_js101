function createMultiplier(num){
    var retval = function multiplire(multiplierNum){
        return num * multiplierNum;
    };
    retval.multiplyBy = num;
    return retval;
}

function createAllOfFilter(arr){
    return function filter() {
        if (!arr) {
            return true;
        }
        for (var i = 0; i < arr.length; i++) {
            if (typeof(arr[i]) == 'function') {
                var func = arr[i];
                var callResult = func.apply(null, arguments);
                if (!callResult) {
                    return false;
                }
            }
        }
        return true;
    }
}

function passAll(element, filtersArr){
    for(var i=0; i<filtersArr.length; i++){
        if (filtersArr[i](element) != true){
            return false;
        }
    }
    return true;
}

function transformArray(originalArr, filtersArr, modifierFunc){
    var retval = [];
    for( var i=0; i<originalArr.length; i++){
        var elem = originalArr[i];
        if(passAll(elem, filtersArr)){
            if (modifierFunc){
                elem = modifierFunc(elem);
            }
            retval.push(elem);
        }
    }
    return retval;
}
