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
        return _.every(arr, invokeFuncWithBoundedArgs(arguments));
    }
}

function combineMultipleFilters(filters){
    return function (val){
        return _.every(filters, function (filter){
            return filter(val);
        });
    };
}

function transformArray(originalArr, filtersArr, modifierFunc){
    var combinedFilter = combineMultipleFilters(filtersArr);
    var filteredArr = _.filter(originalArr, combinedFilter);
    return _.map(filteredArr, modifierFunc);
}
