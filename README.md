# Learn JS <!-- omit in toc -->

Learning JS  
[Topics to cover](./learnJS.todo)  
[Questions](./questions.md)  
[Important topics for interview](./interview-topics.md)

Reference: https://javascript.info/

Topics:

- [Quick look on basics](#quick-look-on-basics)
- [Arrow Functions](#arrow-functions)
- [Type Conversion](#type-conversion)
  - [Numeric conversion rules:](#numeric-conversion-rules)
  - [Boolean conversion rules](#boolean-conversion-rules)
  - [typeof Exceptions](#typeof-exceptions)
- [Operators](#operators)
- [Comparison](#comparison)
- [Conditional Operator](#conditional-operator)
- [Logical Operators](#logical-operators)
- [Loops](#loops)
- [Switch](#switch)
- [Functions](#functions)
  - [Arrow functions](#arrow-functions-1)
- [Transpilers & Polyfills](#transpilers--polyfills)
  - [Shim vs Polyfills](#shim-vs-polyfills)
- [Objects](#objects)
  - [Basics](#basics)
  - [Object references and copying](#object-references-and-copying)
  - [Garbage Collection](#garbage-collection)
  - [Object Methods](#object-methods)
  - [this](#this)
  - [Contructor, operator "new"](#contructor-operator-new)
  - [Symbol type](#symbol-type)
  - [Object to primitive conversion](#object-to-primitive-conversion)

## Quick look on basics

https://javascript.info/javascript-specials

## Arrow Functions

https://javascript.info/arrow-functions-basics
https://javascript.info/arrow-functions

- arrow functions do not have this. If this is accessed, it is taken from the outside
-

## Type Conversion

https://javascript.info/type-conversions

### Numeric conversion rules:

`alert( "6" / "2" ); // 3, strings are converted to numbers`

| Value          |                                                     Becomes...                                                      |
| -------------- | :-----------------------------------------------------------------------------------------------------------------: |
| undefined      |                                                         NaN                                                         |
| true and false |                                                       1 and 0                                                       |
| string         | The string is read “as is”, whitespaces from both sides are ignored. An empty string becomes 0. An error gives NaN. |

### Boolean conversion rules

- Values that are intuitively "empty", become false, Other values become true.

| Value                       | Becomes... |
| --------------------------- | :--------: |
| 0, null, undefined, NaN, "" |   false    |
| any other value             |    true    |
| "0"                         |    true    |
| " "                         |    true    |
| any objects, even empty     |    true    |

### typeof Exceptions

```js
typeof null == "object"; // error in the language
typeof function () {} == "function"; // functions are treated specially
```

## Operators

https://javascript.info/operators

- all operators return a value after performing the operation
- **unary have higher precedence than binary**
- The call `x = value` writes the `value` into `x` and then returns it.

```js
let c = 3 - (a = b + 1); // 0
```

- Concatenation using `+` operator
  https://javascript.info/operators#string-concatenation-with-binary

```js
alert("1" + "2"); //"12"
alert("1" + 2); // "12"
alert(2 + "1"); // "21"
alert(2 + 2 + "1"); // "41" and not "221"
alert("1" + 2 + 2); // "122" and not "14"
alert(6 - "2"); // 4, converts '2' to a number
```

- Numeric conversion, `unary +`
  https://javascript.info/operators#numeric-conversion-unary

```js
// No effect on numbers
let x = 1;
alert(+x); // 1

let y = -2;
alert(+y); // -2

// Converts non-numbers
alert(+true); // 1
alert(+""); // 0
```

```js
let apples = "2";
let oranges = "3";

// both values converted to numbers before the binary plus
alert(+apples + +oranges); // 5
```

- The prefix form returns the `new value` while the postfix form returns the `old value` (prior to `increment/decrement`).

- The `comma` operator allows us to evaluate several expressions, dividing them with a comma ,. Each of them is evaluated but only the result of the last one is returned.

```js
let a = (1 + 2, 3 + 4);
alert(a); // 7 (the result of 3 + 4)
```

- `comma` - precedence lower than `=`

- **Important** Example:

```js
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

## Comparison

https://javascript.info/comparison

```js
let result = 5 > 4; // assign the result of the comparison
alert(result); // true
```

- String comparison -> lexicographical order and is case sensitive, based on unicode
  https://javascript.info/comparison#string-comparison

- When comparing values of `different types`, JavaScript converts the values to numbers.

```js
let a = 0;
alert(Boolean(a)); // false

let b = "0";
alert(Boolean(b)); // true

alert(a == b); // true!
```

- A strict equality operator `===` checks the equality without type conversion.

| Comparison Expression    | Result | Comment                                                           |
| ------------------------ | :----: | ----------------------------------------------------------------- |
| '2' > 1                  |  true  | string '2' becomes a number 2                                     |
| 0 `===` false            | false  | types are different                                               |
| null === undefined       | false  | different types                                                   |
| **null `==` undefined**  |  true  | they equal each other but not any other value                     |
| undefined === null       | false  | strict comparison, different types                                |
| null == "\n0\n"          | false  | null only equal to undefined                                      |
| null === +"\n0\n"        | false  | strict, different types                                           |
| true == 'true'           | false  | true becomes 1 and 'true' becomes NaN                             |
| NaN == NaN               | false  | `why?`                                                            |
| null > 0                 | false  | Number(null) is 0                                                 |
| null >= 0                |  true  | Number(null) is 0                                                 |
| null == 0                | false  | null can only be equal to undefined                               |
| undefined > 0, < 0, == 0 | false  | Number(undefined) is NaN, and undefined can only be equal to null |
| "2" > "12"               |  true  | lexicographical order                                             |

- `Be careful when using comparisons like > or < with variables that can occasionally be null/undefined. Checking for null/undefined separately is a good idea.`

## Conditional Operator

```js
let message;

if (login == "Employee") {
  message = "Hello";
} else if (login == "Director") {
  message = "Greetings";
} else if (login == "") {
  message = "No login";
} else {
  message = "";
}
```

Can be written as:

```js
let message =
  login == "Employee"
    ? "Hello"
    : login == "Director"
    ? "Greetings"
    : login == ""
    ? "No login"
    : "";
```

## Logical Operators

https://javascript.info/logical-operators

- `||`, `&&`, `!`, `??` (Nullish Coalescing)

- a chain of OR `||` returns the first truthy value or the last one if no truthy value is found.
- Examples:

  ```js
  // Getting the first truthy value from a list of variables or expressions.

  let firstName = "";
  let lastName = "";
  let nickName = "SuperCoder";

  alert(firstName || lastName || nickName || "Anonymous"); // SuperCoder
  ```

  ```js
  // Short-circuit evaluation
  true || alert("not printed"); // alert is not executed
  ```

- chain of `&&` returns the first falsy value or the last value if none were found.

- `Precedence`: `!` > `&&` > `||`

- `if` can be replace with `&&`, but not recommended

  ```js
  if (x > 0) alert("Greater than zero!");

  x > 0 && alert("Greater than zero!");
  ```

- Double NOT `!!` to convert value to boolean. First `!` convert to boolean and inverses and second `!` inverts back to original.

- Examples:

  ```js
  alert(alert(1) || 2 || alert(3)); // alerts 1, then 2. alert(1) returns undefined
  ```

  ```js
  alert(null || (2 && 3) || 4); // 3
  ```

  ```js
  if (-1 || 0) alert("first"); // alerts
  if (-1 && 0) alert("second");
  if (null || (-1 && 1)) alert("third"); // alerts
  ```

- `??` Nullish Coalescing

  ```js
  a ?? b is:

  if a is defined, then a,
  if a isn’t defined, then b.
  ```

  ```js
  result = a ?? b;
  // can be written as
  result = a !== null && a !== undefined ? a : b;
  ```

  ```js
  let firstName = null;
  let lastName = null;
  let nickName = "Supercoder";

  // shows the first defined value:
  alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
  ```

- **|| returns the first truthy value.
  ?? returns the first defined value.**

  ```js
  let height = 0;

  alert(height || 100); // 100
  alert(height ?? 100); // 0

  let a = null;
  alert(a || "a"); // a
  alert(a ?? "a"); // a

  let b = "";
  alert(b || "b"); // b
  alert(b ?? "b"); // ""

  let c = {};
  alert(c || "c"); // {}
  alert(c ?? "c"); // {}

  let d = false;
  alert(d || "d"); // d
  alert(d ?? "d"); // false
  ```

- ```js
  // important: use parentheses because of precedence order
  let area = (height ?? 100) * (width ?? 50);
  ```
- It’s forbidden to use it with || or && without explicit parentheses.
  ```js
  let x = 1 && 2 ?? 3; // Syntax error
  ```

## Loops

https://javascript.info/while-for

- Any expression or variable can be a loop condition, not just comparisons: the condition is evaluated and converted to a boolean by while.

- ```js
  for (;;) {
    // repeats without limits
  }
  ```

  semicolons are necessary

- `continue`:

  ```js
  (i > 5) ? alert(i) : continue; // continue isn't allowed here as its not a expression
  ```

- break/continue support labels before the loop. A `label` is the only way for break/continue to escape a nested loop to go to an outer one.

  ```js
  outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let input = prompt(`Value at coords (${i},${j})`, "");

      // if an empty string or canceled, then break out of both loops
      if (!input) break outer; // (*)

      // do something with the value...
    }
  }
  ```

- Examples:

  ```js
  // loop till num > 100 or user cancels with esc.

  let num;

  do {
    num = prompt("Enter a number greater than 100?", 0);
  } while (num <= 100 && num);

  //num = null if esc key pressed. and null <= 100, so second condition is needed
  ```

## Switch

- `strict equality check`
- default is optional
- **If there is no break then the execution continues with the next case without any checks.**
- we can `group` cases by skipping the break between two cases and keeping code in only last case. Usecase: when two cases share the same code.
  ```js
  case 2:
  case 3:
    alert( '2,3' );
    break;
  ```

## Functions

- Function `Declarations`:
  ```js
  function sum(a, b) {
    let result = a + b;
    return result;
  }
  ```
- Function `Expression`:

  ```js
  let sum = function (a, b) {
    let result = a + b;
    return result;
  };
  ```

- `Callback` and `Anonymous`: Both are Function Expressions

  ```js
  function ask(question, yes, no) {
    // yes and no are callbacks
    if (confirm(question)) yes();
    else no();
  }

  ask(
    "Do you agree?",
    function () {
      alert("You agreed.");
    }, // Anonymous
    function () {
      alert("You canceled the execution.");
    }
  );
  ```

- `a function always gets a copy of the value`
- We declare functions listing their `parameters`, then call them passing `arguments`.
- If a function is called, but an argument is not provided, then the corresponding value becomes `undefined`
- function is always copied by value, not reference like an object
- `default value`, complex example:
  ```js
  function showMessage(from, text = anotherFunction()) {
    // anotherFunction() only executed if no text given
    // its result becomes the value of text
  }
  ```
  it’s independently called every time when text is missing.
  ```js
  function showCount(count) {
    // if count is undefined or null, show "unknown"
    alert(count ?? "unknown");
  }
  ```
- `A function with an empty return or without it returns undefined`
- a function is a `value`
- Function Expression vs Declaration:
  - A Function Expression is created when the execution reaches it and is usable only from that moment.

| Function Expression               | Function Declaration                        |
| --------------------------------- | ------------------------------------------- |
| created when execution reaches it | processed before the code block is executed |
| usable only creation              | can be called earlier than defined          |

### Arrow functions

- they don't have their own this. If we reference `this` from such a function, it's taken from the outer 'normal' function.
- ```js
  // expression at the right side
  let sum = (a, b) => a + b;

  // or multi-line syntax with { ... }, need return here:
  let sum = (a, b) => {
    // ...
    return a + b;
  };

  // without arguments
  let sayHi = () => alert("Hello");

  // with a single argument
  let double = (n) => n * 2; // no need of bracked around n
  ```

- `Callback` using arrow functions:

  ```js
  let ask = (question, yes, no) => {
    // yes and no are callbacks
    if (confirm(question)) yes();
    else no();
  };

  ask(
    "Do you agree?",
    () => alert("You agreed."), // Anonymous
    () => alert("You canceled the execution.")
  );
  ```

## Transpilers & Polyfills

- A `transpiler` is a special piece of software that translates source code to another source code. It can parse (“read and understand”) modern code and rewrite it using older syntax constructs, so that it’ll also work in outdated engines.

  - Example: babel

- A script that updates/adds new functions is called `polyfill`. It “fills in” the gap and adds missing implementations.
  - Example: corejs

### Shim vs Polyfills

- `shim`: A shim is a library that brings a new API to an older environment, using only the means of that environment.
- while shims are used for covering up old sins, polyfills are used for bringing future enhancements back in time
- Polyfilling is really just a specialized version of shimming.

## Objects

### Basics

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

### Object references and copying

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

### Garbage Collection

- Objects are retained in memory while they are reachable.

### Object Methods

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

### this

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

### Contructor, operator "new"

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

### Optional chaining '?.'

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

### Symbol type
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
  - wont show up in Object.keys()
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

### Object to primitive conversion
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

