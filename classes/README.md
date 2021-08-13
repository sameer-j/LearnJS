# Classes <!-- omit in toc -->

[Home](../README.md)

<!-- omit in toc -->
## Topics
- [Class basic syntax](#class-basic-syntax)
  - [class](#class)
  - [Class Expression](#class-expression)
  - [Getter/Setter](#gettersetter)
  - [Computed props](#computed-props)
  - [Class fields](#class-fields)
  - [To pass around object functions, keeping this](#to-pass-around-object-functions-keeping-this)
- [Inheritance](#inheritance)
  - [Example](#example)
- [Static properties and Methds](#static-properties-and-methds)
  - [Intro](#intro)
  - [Static properties](#static-properties)
  - [Inheritance of static properties and methods](#inheritance-of-static-properties-and-methods)
- [Private and protected properties and methods](#private-and-protected-properties-and-methods)
  - [Protected](#protected)
  - [Private](#private)
- [Class checking: "instanceof"](#class-checking-instanceof)
- [Mixins](#mixins)

## Class basic syntax
[Home](../README.md) | [Jump to Top](#topics)

### class
[Home](../README.md) | [Jump to Top](#topics)

```js
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// proof: User is a function
alert(typeof User); // function
```
What class User {...} construct really does is:

- Creates a function named User, that becomes the result of the class declaration. The function code is taken from the constructor method (assumed empty if we don’t write such method).
- Stores class methods, such as sayHi, in User.prototype.

```js
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// class is a function
alert(typeof User); // function

// ...or, more precisely, the constructor method
alert(User === User.prototype.constructor); // true

// The methods are in User.prototype, e.g:
alert(User.prototype.sayHi); // the code of the sayHi method

// there are exactly two methods in the prototype
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```
```js
// --------------- same using functions constructor ----------
function User2(name) {
  this.name = name;
}

User2.prototype.sayHi = function () { alert(this.name); }

// class is a function
alert(typeof User2); // function

// ...or, more precisely, the constructor method
alert(User2 === User2.prototype.constructor); // true

// The methods are in User.prototype, e.g:
alert(User2.prototype.sayHi); // the code of the sayHi method
let user2 = new User2("hero");
user2.sayHi();

// there are exactly two methods in the prototype
alert(Object.getOwnPropertyNames(User2.prototype)); // constructor, sayHi
```

### Class Expression
[Home](../README.md) | [Jump to Top](#topics)

- like function expression, can be passed around
- Example:
  ```js
  let User = class {
    sayHi() {
      alert("Hello");
    }
  };
  ```
- Named:
  ```js
  // "Named Class Expression"
  // (no such term in the spec, but that's similar to Named Function Expression)
  let User = class MyClass {
    sayHi() {
      alert(MyClass); // MyClass name is visible only inside the class
    }
  };
  
  new User().sayHi(); // works, shows MyClass definition
  
  alert(MyClass); // error, MyClass name isn't visible outside of the class
  ```
- Dynamically:
  ```js
  function makeClass(phrase) {
    // declare a class and return it
    return class {
      sayHi() {
        alert(phrase);
      }
    };
  }
  
  // Create a new class
  let User = makeClass("Hello");
  
  new User().sayHi(); // Hello
  ```

### Getter/Setter
[Home](../README.md) | [Jump to Top](#topics)

```js
class User {

  constructor(name) {
    // invokes the setter
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Name is too short.
```

### Computed props
[Home](../README.md) | [Jump to Top](#topics)

```js

class User {

  ['say' + 'Hi']() {
    alert("Hello");
  }

}

new User().sayHi();
```

### Class fields
[Home](../README.md) | [Jump to Top](#topics)

```js
class User {
  name = "John";
  lastname = prompt("Name, please?", "John");

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}
new User().sayHi(); // Hello, John!
let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

### To pass around object functions, keeping this
[Home](../README.md) | [Jump to Top](#topics)

Use arrow function for class functions

```js
class Button {
  constructor(value) {
    this.value = value;
  }
  click = () => {
    alert(this.value);
  }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
```

## Inheritance
[Home](../README.md) | [Jump to Top](#topics)

- To extend a class: `class Child extends Parent`:
  - That means Child.prototype.\_\_proto__ will be Parent.prototype, so methods are inherited.
- When overriding a constructor:
  - We must call parent constructor as `super()` in Child constructor before using `this`.
- When overriding another method:
  - We can use `super.method()` in a Child method to call Parent method.
- Arrow functions don’t have their own `this` or `super`, so they transparently fit into the surrounding context.
- Internals:
  - Methods remember their class/object in the internal `[[HomeObject]]` property. That’s how super resolves parent methods.
  - So it’s not safe to copy a method with super from one object to another.

- **Overriding class fields**
  ```js
  class Animal {
    name = 'animal';
  
    constructor() {
      alert(this.name); // (*)
    }
  }
  
  class Rabbit extends Animal {
    name = 'rabbit';
  }
  
  new Animal(); // animal
  new Rabbit(); // animal
  ```
  **In other words, parent constructor always uses its own field value, not the overridden one.**
  ```js
  class Animal {
    showName() {  // instead of this.name = 'animal'
      alert('animal');
    }
  
    constructor() {
      this.showName(); // instead of alert(this.name);
    }
  }
  
  class Rabbit extends Animal {
    showName() {
      alert('rabbit');
    }
  }
  
  new Animal(); // animal
  new Rabbit(); // rabbit
  ```
  Well, the reason is in the field initialization order. The class field is initialized:
  - Before constructor for the base class (that doesn’t extend anything),
  - Immediately after super() for the derived class.
- Dont create functions in function expression style
  ```js
  let animal = {
    eat: function() { // intentionally writing like this instead of eat() {...
      // ...
    }
  };
  
  let rabbit = {
    __proto__: animal,
    eat: function() {
      super.eat();
    }
  };
  
  rabbit.eat();  // Error calling super (because there's no [[HomeObject]])
  ```
  Use this way instead:
  ```js
  let animal = {
    eat () {
      alert("animal eats");
    }
  };
  
  let rabbit = {
    __proto__: animal,
    eat () {
      super.eat();
      alert("rabbit eats");
    }
  };
  
  rabbit.eat();  // animal eats // rabbit eats
  ```
### Example
https://javascript.info/class-inheritance#extended-clock

## Static properties and Methds
[Home](../README.md) | [Jump to Top](#topics)

### Intro

- Class level
- Usually, static methods are used to implement functions that belong to the class, but not to any particular object of it.

```js
class User {
  static staticMethod() {
    alert(this === User);
  }
}

User.staticMethod(); // true
```
OR

```js
class User { }

User.staticMethod = function() {
  alert(this === User);
};

User.staticMethod(); // true
```

- Example: To compare article objs:
  ```js
  class Article {
    constructor(title, date) {
      this.title = title;
      this.date = date;
    }
  
    static compare(articleA, articleB) {
      return articleA.date - articleB.date;
    }
  }
  
  // usage
  let articles = [
    new Article("HTML", new Date(2019, 1, 1)),
    new Article("CSS", new Date(2019, 0, 1)),
    new Article("JavaScript", new Date(2019, 11, 1))
  ];
  
  articles.sort(Article.compare);
  
  alert( articles[0].title ); // CSS
  ```
- Example: Factory method of creating objects
  ```js
  class Article {
    constructor(title, date) {
      this.title = title;
      this.date = date;
    }
  
    static createTodays() {
      // remember, this = Article
      return new this("Today's digest", new Date());
    }
  }
  
  let article = Article.createTodays();
  
  alert( article.title ); // Today's digest
  ```

### Static properties
[Home](../README.md) | [Jump to Top](#topics)

```js
class Article {
  static publisher = "Ilya Kantor";
}

alert( Article.publisher ); // Ilya Kantor
```
OR
```js
Article.publisher = "Ilya Kantor";
```

### Inheritance of static properties and methods
[Home](../README.md) | [Jump to Top](#topics)

Static properties and methods are inherited.

## Private and protected properties and methods
[Home](../README.md) | [Jump to Top](#topics)

### Protected
[Home](../README.md) | [Jump to Top](#topics)

- emulated, not direct syntax support
- are inherited
- Protected properties are usually prefixed with an underscore _.
- ```js
  // ============== protecting invalid value =========
  class CoffeeMachine {
    _waterAmount = 0;
  
    set waterAmount(value) {
      if (value < 0) {
        value = 0;
      }
      this._waterAmount = value;
    }
  
    get waterAmount() {
      return this._waterAmount;
    }
  
    constructor(power) {
      this._power = power;
    }
  
  }
  
  // create the coffee machine
  let coffeeMachine = new CoffeeMachine(100);
  
  // add water
  coffeeMachine.waterAmount = -10; // _waterAmount will become 0, not -10
    ```
- ```js
  // ================== read only =============
  class CoffeeMachine {
    // ...
  
    constructor(power) {
      this._power = power;
    }
  
    get power() {
      return this._power;
    }
  
  }
  
  // create the coffee machine
  let coffeeMachine = new CoffeeMachine(100);
  
  alert(`Power is: ${coffeeMachine.power}W`); // Power is: 100W
  
  coffeeMachine.power = 25; // Error (no setter)
    ```
  OR
  ```js
  class CoffeeMachine {
    _waterAmount = 0;
  
    setWaterAmount(value) {
      if (value < 0) value = 0;
      this._waterAmount = value;
    }
  
    getWaterAmount() {
      return this._waterAmount;
    }
  }
  
  new CoffeeMachine().setWaterAmount(100);
  ```

### Private
[Home](../README.md) | [Jump to Top](#topics)

- Syntax support using `#`
- Can't be inherited, but can be accessed why getter/setter in derived class
- ```js
  class CoffeeMachine {
  
    #waterAmount = 0;
  
    get waterAmount() {
      return this.#waterAmount;
    }
  
    set waterAmount(value) {
      if (value < 0) value = 0;
      this.#waterAmount = value;
    }
  }
  
  let machine = new CoffeeMachine();
  
  machine.waterAmount = 100;
  // alert(machine.#waterAmount); // Error
  alert(machine.waterAmount); // 100
  ```

## Extending built-in classes
[Home](../README.md) | [Jump to Top](#topics)

```js
// add one more method to it (can do more)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// Array function invoked, but returns PowerArray object instead
let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```


## Class checking: "instanceof"
[Home](../README.md) | [Jump to Top](#topics)

https://javascript.info/instanceof

## Mixins
[Home](../README.md) | [Jump to Top](#topics)

https://javascript.info/mixins