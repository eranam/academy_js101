'use strict';

function createMultiplier(num){
    var retval = function multiplire(multiplierNum){
        return num * multiplierNum;
    };
    retval.multiplyBy = num;
    return retval;
}


function invokeFuncWithBoundedArgs(args){
    return function (func){
        return (typeof func == 'function')? func.apply(null, args) : true;
    };
}


function createAllOfFilter(arr){
    return function filter() {
        return (!arr)? true : arr.every(invokeFuncWithBoundedArgs(arguments));
    }
}

function combineMultipleFilters(filters){
    return function (val){
        return filters.every(function (filter){
            return filter(val);
        });
    };
}

function transformArray(originalArr, filtersArr, modifierFunc){
    var combinedFilter = combineMultipleFilters(filtersArr);
    var filteredArr = originalArr.filter(combinedFilter);
    return (typeof modifierFunc == 'undefined')? filteredArr : filteredArr.map(modifierFunc);
}