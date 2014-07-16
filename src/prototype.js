"use strict";

function Animal(name){
    if (name) {
        this.name = name;
    }
}
Animal.prototype.name = 'Default';
Animal.prototype.legs_num = 100;
Animal.prototype.voice = 'Kukukuchoo';
Animal.prototype.repr = 'an animal';
Animal.prototype.speak = function(){
    return this.voice;
};
Animal.prototype.toString = function(){
    return this.name + ' is ' + this.repr + ' with ' + this.legs_num + ' legs that says "' + this.speak() + '"';
};


function Mammal(name){
    Animal.call(this, name);
}
Mammal.prototype = new Animal();
Mammal.prototype.constructor = Mammal;
Mammal.prototype.legs_num = 4;
Mammal.prototype.repr = 'a mammal';

function Dog(name){
    Mammal.apply(this, arguments);
}
Dog.prototype = new Mammal();
Dog.prototype.constructor = Dog;
Dog.prototype.repr = 'a dog';
Dog.prototype.voice = 'Woof';

