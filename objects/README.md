# Objects <!-- omit in toc -->

- [Basics](#basics)
- [Object references and copying](#object-references-and-copying)
- [Garbage Collection](#garbage-collection)
- [Object Methods](#object-methods)
- [this](#this)
- [Contructor, operator "new"](#contructor-operator-new)
- [Symbol type](#symbol-type)
- [Object to primitive conversion](#object-to-primitive-conversion)
- [Object.keys, values, entries](#objectkeys-values-entries)

## Basics

https://javascript.info/object

- ```js
  let user = new Object(); // "object constructor" syntax
  let user = {}; // "object literal" syntax
  ```

- ```js
  let user = {
    name: "John",
    age: 30,
    "likes birds": true,
  };
  ```
- ```js
  let user = {
    name: "John",
    age: 30,
  };

  let key = "name";
  alert(user.key); // undefined
  alert(user["key"]);
  ```

- Computed properties

  ```js
  let fruit = prompt("Which fruit to buy?", "apple");

  let bag = {
    [fruit]: 5, // the name of the property is taken from
    //  the variable fruit
  };

  alert(bag.apple); // 5 if fruit="apple"
  bag[fruits + "Computer"] = 5; //bag.appleComputer = 5
  ```

- Property value shorthand

  ```js
  function makeUser(name, age) {
    return {
      name, // same as name: name
      age: age,
      // ...
    };
  }
  ```

- Property names no limitations

  ```js
    let obj = {
    for: 1, // keywords allowed
    let: 2,
    return: 3
    0: "zero" // non string keys are converted to strings
  };

  alert( obj.for + obj.let + obj.return );
  alert( obj["0"] ); // test
  alert( obj[0] ); // test (same property)
  ```

- Property existence test:

  ```js
  let user = {
    name: "John",
    age: 30,
    test: undefined,
  };

  alert("age" in user); // true, user.age exists, should be in QUOTES
  alert(age in user); // Reference error: age is not defined
  alert("blabla" in user); // false, user.blabla doesn't exist

  let key = "age";
  alert(key in user); // variable without quotes

  alert(user.noSuchProperty === undefined); // true means "no such property"

  alert(user.test === undefined); //true, claiming that property DOESNT Exist
  alert(test in user); //true, property Exists
  ```

- for - in loop:

  ```js
  for (key in object) {
  }
  ```

- Ordering of keys:\
  `integer properties are sorted, others appear in creation order.`  
  _watch out for integer with quotes_

  ```
  let codes = {
    "49": "Germany",
    "b": "test",
    41: "Switzerland",
    "44": "Great Britain",
    "1": "USA",
    "a": "test2",
  };

  for (let code in codes) {
    alert(code); // 1, 41, 44, 49
  }
  ```

## Object references and copying

- _objects are stored and copied `by reference`, whereas primitive values: strings, numbers, booleans, etc – are always copied “as a whole value”._

- A variable assigned to an object stores not the object itself, but its “address in memory” – in other words “a reference” to it.

- When an object variable is copied, the reference is copied, but the object itself is not duplicated.

- functions may be objects, but they are copied by value, not reference
- Shallow copy using:

  - Object.assign(dest, [src1, src2, src3...])
  - spread operator: dest = {...src1}

- **const objects can be modifed**

  - ```js
    const user = {
      name: "John",
    };

    user.name = "Pete"; //allowed

    user = {
      b: "b",
    }; // fails as it will change the reference
    ```

## Garbage Collection

- Objects are retained in memory while they are reachable.

## Object Methods

- method shorthand and `this`:

  ```js
  // these objects do the same

  user = {
    name: "hero",
    sayHi: function () {
      alert(`Hello ${this.name}`);
    },
  };

  user = {
    sayHi() {
      // same as "sayHi: function(){...}"
      alert(`Hello ${this.name}`);
      alert(`Hello ${user.name}`); // technically correct, but can screw up if assigned some other variable
    },
  };

  let admin = user;
  user = null; // overwrite to make things obvious

  admin.sayHi(); // TypeError: Cannot read property 'name' of null
  ```

## this

The value of `this` is evaluated during the run-time, depending on the context. And hence the below code is not invalid and refers to `name` in global context.

- this is undefined in <b>strict mode</b>. If we try to access `this.name`, there will be an error.
- one benefit of this: a function can be reused for different objects

```js
function sayHi() {
  alert(this.name);
}
```

```js
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert(this.name);
}

// use the same function in two objects
user.f = sayHi;
admin.f = sayHi;

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin["f"](); // Admin (dot or square brackets access the method – doesn't matter)
```

Examples:

```js
'use strict';
function makeUser() {
  return {
    name: "John",
    ref: this,
  };
}

let user = makeUser();

alert(user.ref.name); // Error: Cannot read property 'name' of undefined
```

```js
function makeUser() {
  return {
    name: "John",
    ref() {
      return this;
    },
  };
}

let user = makeUser();

alert(user.ref().name); // John
```

## Contructor, operator "new"

- constructors – to implement reusable object creation code.
- Rules:

  - capital first letter
  - call with new operator

- Any function can be used as constructor, expect Arrow as it doesnt have its own 'this'

  ```js
  function User(name="Test") {
    // this = {};  (implicitly)

    // add properties to this
    this.name = name;
    this.isAdmin = false;
    this.sayHi = () => alert(this.name);

    // return this;  (implicitly)
  }

  let user = new User("Jack");
  user.sayHi(); // Jack
  let usertest = new User; // without parenthesis, Test/false
  usertest.sayHi(); // Test

  /*
  {
    name: "Jack",
    isAdmin: false
  };
  */
  ```

- new function() { … }

  ```js
  // create a function and immediately call it with new, cant be reused
  let user = new function() {
    this.name       = 'John'
    this.isAdmin    = true
    this.birthDate  = '01-01-1980'

    // below lines are not possible in a literal creation
    const birthDate = new Date(this.birthDate)
  
    this.age        = new Date().getFullYear() - birthDate.getFullYear()
    this.isAdult    = this.age >= 18
  }
  
  ```

- Constructor mode test: new.target

  ```js
  function User() {
    alert(new.target);
  }

  // without "new":
  User(); // undefined

  // with "new":
  new User(); // function User { ... }
  ```

  ```js
  function User(name) {
    if (!new.target) {
      // if you run me without new
      return new User(name); // ...I will add new for you
    }

    this.name = name;
  }

  let john = User("John"); // redirects call to new User
  alert(john.name); // John
  ```

- Return from constructors
  - If return is called with an object, then the object is returned instead of this'.
  - If return is called with a primitive, it’s ignored.

- Excellent example: https://javascript.info/constructor-new#two-functions--one-object
  ```js
  let obj = {};
  
  function A() { return obj; }
  function B() { return obj; }
  
  alert( new A() == new B() ); // true
  ```
- ```js
  function Calculator() {

    this.read = function() {
      this.a = +prompt('a?', 0);
      this.b = +prompt('b?', 0);
    };

    this.sum = function() {
      return this.a + this.b;
    };

    this.mul = function() {
      return this.a * this.b;
    };
  }

  let calculator = new Calculator();
  calculator.read();

  alert( "Sum=" + calculator.sum() );
  alert( "Mul=" + calculator.mul() );
  ```

## Optional chaining '?.'

- value?.prop:
  - works as value.prop, if value exists,
  - otherwise (when value is undefined/null) it returns undefined.
  - 'value' must be declared
- stops processing immediately when first check fails
  ```js
  let user = {}; // user has no address
  alert( user?.address?.street ); // undefined (no error)
  ```
- with delete and writing to null
  ```js
  let user = null;
  
  user?.name = "John"; // Error, doesn't work
  // because it evaluates to undefined = "John"

  delete user?.name; // delete user.name if user exists
  ```
- with property and method:
  ```
  obj?.[prop] – returns obj[prop] if obj exists, otherwise undefined.
  obj.method?.() – calls obj.method() if obj.method exists, otherwise returns undefined
  ```

## Symbol type
https://javascript.info/symbol

- `object property keys may be either of string type, or of symbol type.`
- A “symbol” represents a `guarrenteed` unique identifier.
- dont auto-convert to string
- ```js
  let id = Symbol();

  let id1 = Symbol("id"); // with description "id", for debugging
  let id2 = Symbol("id");
  
  alert(id1 == id2); // false, even if same description

  alert(5); // 5  js autoconverts numeric to string for alert
  alert(id); // TypeError: Cannot convert a Symbol value to a string
  alert(id.toString()); // Symbol(id), now it works
  alert(id.description); // id

  let user = {
    name: "John",
    [id]: 123 // not "id": 123
  };
  ```
- **Hidden** properties using symbols:
  - we can add it to a imported library, without actually overwriting the library properties.
  - not listed in for..in loop
  - wont show up in Object.keys(), .values(), .entries()
  - Object.assign copies `both` string and symbol props
  - `Object.getOwnPropertySymbols(obj)` allow us to get all symbols
  - `Reflect.ownKeys(obj)` returns all keys including symbols

- Global symbols:
  - use `Symbol.for("key")` to get the same symbol every time, having the description key
  - `Symbol.keyFor(sym)` to get the description for a global symbol, will give undefined to non-global

```js
  // read from the global registry
  let globalSymbol = Symbol.for("id"); // if the symbol did not exist, it is created
  
  // read it again (maybe from another part of the code)
  let idAgain = Symbol.for("id");
  
  // the same symbol
  alert( globalSymbol === idAgain ); // true

  let localSymbol = Symbol("name");
  alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
  alert( Symbol.keyFor(localSymbol) ); // undefined, not global
  alert( localSymbol.description ); // name
  ```

## Object to primitive conversion
https://javascript.info/object-toprimitive  
http://www.adequatelygood.com/Object-to-Primitive-Conversions-in-JavaScript.html

- operator overloading for objects not allowed in js
- The object-to-primitive conversion is called `automatically` by many built-in functions and operators `that expect a primitive as a value`.
- The conversion algorithm is:
  - Call `obj[Symbol.toPrimitive](hint)` if the method exists
  - Otherwise if hint is `"string"`
    - try `obj.toString()` and `obj.valueOf()`, whatever exists.
  - Otherwise if hint is `"number"` or `"default"`
    - try `obj.valueOf()` and `obj.toString()`, whatever exists.
- hints: string, number and if not provided, defaults to number. But for Date object it defaults to string

- all three `must return a primitive` else they are ignored.
- binary "+" operator uses "default" hint as it doesnt know if to concatenate or actually add
- Mostly, `toString()` implementation is enough
- By `default`, a plain object has following `toString` and `valueOf` methods, inherited from Object.prototype
  - The toString method returns a string "[object Object]".
  - The valueOf method returns the object itself.
  - ```js
    let user = {name: "John"};
    
    alert(user); // [object Object]
    alert(user.valueOf() === user); // true 
    ```
```js
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// conversions demo:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```
 - for any operator, following steps are done:
    - The object is converted to a primitive (using the rules described above).
    - If the resulting primitive isn’t of the right type, it’s converted.

```js
function population(country, pop) {
	return {
		country: country,
		pop: pop,
		
		toString: function () {
			return "[Population " + 
				"\"" + country + "\" " +
				pop +
			"]";
		},
		
		valueOf: function () {
			return pop;
		}
	};
}

var america_pop = population("USA", 350e6); // constructor like init
var mexico_pop = population("Mexico", 200e6);
var canada_pop = population("Canada", 200e6);

alert(america_pop); // [Population "USA" 350000000] // calls toString

var north_america_pop = america_pop + mexico_pop + canada_pop;

alert(north_america_pop); // 750000000 // because of calling valueOf
```

- **Confusion about + operator**
  ```js
  var foo = {
  	toString: function () {
  		return "foo";
  	},
  	valueOf: function () {
  		return 5;
  	}
  };
  
  alert(foo + "bar"); // 5bar    expected foobar
  alert([foo, "bar"].join("")); // foobar
  ```
  this is because the primitive values are fetched without hint(so default to number) first, then js decides to concatenate instead of actual plus

- No typechecking based on what valueOf and toString should return:
  ```js
  var foo = {
  	toString: function () {
  		return 5;
  	},
  	valueOf: function () {
  		return "foo";
  	}
  };
  alert(foo.toString() + 1); // 6 (bad!)
  alert(foo + 1); // "foo1" (no good!), because of nohint, number hint was used to resolve foo and valueOf was called
  alert(+foo); // NaN (the worst!) same as above
  ```
## Object.keys, values, entries

```js
let user = {
  name: "John",
  age: 30
};
let userKeys = Object.keys(user); // ["name", "age"]
let userValues = Object.values(user); // ["John", 30]
let userEntries = Object.entries(user); // [ ["name","John"], ["age",30] ]
let userObj = Object.fromEntries(userEntries); // {name:"John", age:30}
```
```js
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = Object.fromEntries(
  // convert prices to array, map each key/value pair into another pair
  // and then fromEntries gives back the object
  Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
);

alert(doublePrices.meat); // 8
```
