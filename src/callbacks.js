function EventEmitter(){
    this.listeners = {};
}

EventEmitter.prototype.emit = function emit(eventName){
    var callbacks = this.listeners[eventName];
    arguments.shift(); // remove the eventName from the argument list
    if (callbacks){
        for(var i=0; i<callbacks.length; i++){

        }
    }
};