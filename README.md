# Learn JS <!-- omit in toc -->

Learning JS  
[Topics to cover](./learnJS.todo)  
[Questions](./questions.md)  
[Important topics for interview](./interview-topics.md)  
[Array methods cheatsheet](https://javascript.info/array-methods#summary)

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
  - [Object.keys, values, entries](#objectkeys-values-entries)
- [Datatypes](#datatypes)
  - [Methods of primitives](#methods-of-primitives)
  - [Number](#number)
  - [Strings](#strings)
    - [**String are immutable**](#string-are-immutable)
    - [**Searching for a substring**](#searching-for-a-substring)
    - [**Getting a substring**](#getting-a-substring)
    - [**Comparing Strings**](#comparing-strings)
    - [Examples](#examples)
  - [Arrays](#arrays)
    - [**add/remove methods**](#addremove-methods)
    - [**Internals**](#internals)
    - [**Loops**](#loops-1)
    - [**Comparisons**](#comparisons)
    - [**Searching**](#searching)
    - [**Transforming and reordering array**](#transforming-and-reordering-array)
    - [Examples](#examples-1)
  - [Map](#map)
    - [**Loop**](#loop)
    - [**Map from Object/Object from Map**](#map-from-objectobject-from-map)
  - [Set](#set)
    - [**Loops**](#loops-2)
    - [Examples:](#examples-2)
  - [WeakMap - WeakSet](#weakmap---weakset)
  - [Destructuring assignment](#destructuring-assignment)
    - [**Array destructuring**](#array-destructuring)
    - [**Object Destructuring**](#object-destructuring)
    - [**Nested Destructuring**](#nested-destructuring)
    - [**Smart function parameters**](#smart-function-parameters)
  - [Date](#date)
    - [Basics](#basics-1)
    - [Examples - Date](#examples---date)
  - [JSON](#json)
    - [JSON.stringify](#jsonstringify)
    - [toJSON, like toString](#tojson-like-tostring)
    - [Examples - JSON](#examples---json)

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

  // ----------- returning an object, check extra bracket--------
  let usersMapped = users.map(user => ({
    fullName: `${user.name} ${user.surname}`,
    id: user.id
  }));
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
### Object.keys, values, entries

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

## Datatypes

### Methods of primitives

- Primitives except null and undefined provide many helpful methods like `toUpperCase`
- Formally, these methods work via temporary objects, still not as expensive as actual objects, and They can’t store additional data.

### Number

- Ways to write number:
  - `let billion = 1_000_000_000;`
  - `let billion = 1e9;`
  - `let ms = 1e-6;` // 0.000001
  - `alert( 0xff );` // 255 or 0xFF -- Hexadecimal
  - `let a = 0b11111111;` // binary form of 255
  - `let b = 0o377;` // octal form of 255  
    alert( a == b ); // true, the same number 255 at both sides

- `toString(base)`: base can be 2 to 36
  ```js
  let num = 255;
  
  alert( num.toString(16) );  // ff
  alert( num.toString(2) );   // 11111111
  alert( 255..toString(16) ); // ff NOTICE THE DOUBLE DOTS
  alert( 255..toString(16) );
  ```
- Rounding:
  | Number | Math.floor | Math.ceil	| Math.round | Math.trunc |
  | ------ | ---------- | ----------| ---------- | -----------|
  | 3.1	   |    3	      |     4	    |     3	     |    3       |
  | 3.6	   |    3	      |     4	    |     4	     |    3       |
  | 3.5	   |    3	      |     4	    |     `4`	   |    3       |
  | -1.1	 |    -2	    |     -1	  |     -1	   |    -1      |
  | -1.6	 |    -2	    |     -1	  |     -2	   |    -1      |
  - Rounding to nth decimal:
    ```js
    let num = 12.36;
    alert( num.toFixed(1) ); // "12.4" GIVES STRING
    alert( +num.toFixed(1) ); // 12.4
    ```
  - Imprecise calculations
    - **`Comparisons involving float numbers will give unexpected result, specially equality`**
    ```js
    alert( 0.1 + 0.2 == 0.3 ); // false why?
    alert( 0.1 + 0.2 ); // 0.30000000000000004  thats why
    // solution:
    alert( +(0.1 + 0.2).toFixed(1) == 0.3 ); 
    ```
  - `isNaN(value)`: converts its argument to a number and then tests it for being NaN  
  - `isFinite(value)`: converts its argument to a number and returns true if it’s a regular number, not NaN/Infinity/-Infinity
  - `Object.is(value)`, same as ===, but with NaN and -0 edge case
    ```js
    alert( isNaN(NaN) );
    alert( isNaN("str") );
    alert( NaN === NaN ); // false
    alert( NaN == "str" ); // false

    alert( isFinite("15") ); // true
    alert( isFinite("str") ); // false, because a special value: NaN
    alert( isFinite(Infinity) ); // false, because a special value: Infinity

    Object.is(NaN, NaN); // true
    Object.is(0, -0); // false
    ```
  - `parseInt(value)`, `parseFloat(value)`
    ```js
    alert( parseInt('100px') ); // 100
    alert( parseFloat('12.5em') ); // 12.5
    
    alert( parseInt('12.3') ); // 12, only the integer part is returned
    alert( parseFloat('12.3.4') ); // 12.3, the second point stops the reading

    alert( parseInt('a123') ); // NaN, the first symbol stops the process

    alert( parseInt('0xff', 16) ); // 255
    alert( parseInt('ff', 16) ); // 255, without 0x also works
    
    alert( parseInt('2n9c', 36) ); // 123456

    alert( 255..toString(16) ); // 255
    ```
  - `Math.random()`: a random number from 0 to 1 (not including 1).
  - `Math.max(a, b, c...)`, `Math.min(a, b, c...)`
  - `Math.pow(n, power)`
  - Examples:
    - [Why 6.35.toFixed(1) == 6.3 and 1.35.toFixed(1) == 1.4?](https://javascript.info/number#why-6-35-tofixed-1-6-3)
    - [Repeat until the input is a number](https://javascript.info/number#repeat-until-the-input-is-a-number)
    - [A random integer from min to max](https://javascript.info/number#a-random-integer-from-min-to-max)

### Strings

- default encoding: `UTF-16`
- type of quotes: `single`, `double quotes` and `backtick`
- backtick:
  - allow expressions
  - multilines
  - nested backticks possible without needing to escape it
  - `template functions`: func\`string`
- string `length` is a property, not a function
- Accessing characters:
  ```js
  let str = `Hello`;
  
  // the first character
  alert( str[0] ); // H
  alert( str.charAt(0) ); // H
  
  // the last character
  alert( str[str.length - 1] ); // o

  alert( str[1000] ); // undefined
  alert( str.charAt(1000) ); // '' (an empty string)

  for (let char of "Hello") {
    alert(char); // H,e,l,l,o (char becomes "H", then "e", then "l" etc)
  }
  ```
#### **String are immutable**
  ```js
  'use strict';
  let str = 'hello';
  
  str[0] = 'j'; // error
  alert( str[0] ); // doesn't work

  str = 'j' + str[1]; // replace the string
  
  alert( str ); // jello
  ```
#### **Searching for a substring**
  - `str.indexOf(substr, pos)`: 
    - starting from pos, gives first index of substr
    - return index if found, -1 if not found
    - case-sensitive
    ```js
    // alert all positions of target
    let str = "As sly as a fox, as strong as an ox";
    let target = "as";
    
    let pos = -1;
    while ((pos = str.indexOf(target, pos + 1)) != -1) {
      alert( pos );
    }

    // OR

    let str = "As sly as a fox, as strong as an ox";
    let target = "as";
    let pos = 0
    while(pos != -1) {
    	pos = str.indexOf(target, pos+1);
      alert(pos);
    }
    ```
  - `str.lastIndexOf(substr, position)`
  - `str.includes(substr, pos)`: true or false
  - `str.startsWith(substr)`, `str.endsWith(substr)`: true or false
#### **Getting a substring**
  - |method	|selects…	|negatives|
    |-------|---------|---------|
    |`slice(start, end)`|from start to end (not including end)|allows negatives|
    |`substring(start, end)`|between start and end|negative values mean 0|
    |`substr(start, length)`|from start get length|characters	allows negative start|
#### **Comparing Strings**
  - strings are compared character-by-character in alphabetical order.
  - The characters are compared by their `numeric code`. 
  - ```js
    alert( 'a' > 'Z' ); // true
    alert( 'Österreich' > 'Zealand' ); // true
    ```
  - `str.codePointAt(pos)`
  - `String.fromCodePoint(code)`
  - Comparing strings in different languages:  
    `str.localeCompare(str2)`: -1, 1 or 0

#### Examples
- [Uppercase the first character](https://javascript.info/string#uppercase-the-first-character)

### Arrays

[Array methods cheatsheet](https://javascript.info/array-methods#summary)  
[Must practice questions](https://javascript.info/array-methods#tasks)

- `Ordered` collection

```js
let arr = new Array();
let arr1 = [];

let a = ["Apple","Hello"];
alert(a); // Apple,Hello

// ----------Don't use this-----------------------------
let arr2 = new Array("Apple", "Pear", "etc");

let arr3 = new Array(2); // will it create an array of [2] ?

alert( arr3[0] ); // undefined! no elements.

alert( arr3.length ); // length 2

// --------------Multidimensional Array--------------
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

alert( matrix[1][1] ); // 5, the central element

// ------------toString---------------------
let arr4 = [1, 2, 3];

alert( arr4 ); // 1,2,3
alert( String(arr4) === '1,2,3' ); // true

// ------------------------------------

alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"

// --------------- isArray ----------------
alert(typeof {}); // object
alert(typeof []); // same

alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

#### **add/remove methods**

- add/remove elements both to/from the beginning or the end.
- `dequeue`
- `pop()`/`push(val1, val2, ...)` : at end of the array
- `shift()`/`unshift(val1, val2, ...)`: at the beginning
  ```js
  let fruits = ["Apple"];
  
  fruits.push("Orange", "Peach"); // Apple,Orange,Peach
  let val = fruits.pop(); // Peach -- array is Apple,Orange

  fruits.unshift("Cherry", "Lemon"); // Cherry,Lemon,Apple,Orange
  let val2 = fruits.shift(); // Lemon,Apple,Orange
  ```
- **`shift/unshift are much slower than push/pop because of index shift`**
- `arr.splice(start[, deleteCount, elem1, ..., elemN])`
  - ref: [mdn doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
  - modifies array in-place, returns deleted elements array
  - negative indexes allowed
- `arr.slice([start], [end])`: returns subarray
  ```js
  let arr = ["t", "e", "s", "t"];
  
  let arr2 = arr.slice(); // ["t", "e", "s", "t"], makes a copy
  alert( arr.slice(1, 3) ); // e,s (copy from 1 to 3)
  
  alert( arr.slice(-2) ); // s,t (copy from -2 till the end)
  ```
- `arr.concat(arg1, arg2...)`: joins array and arguments
  ```js
  let arr = [1, 2];
  
  let arrayLike = {
    0: "something",
    1: "else",
    [Symbol.isConcatSpreadable]: true,
    length: 2
  };
  
  alert( arr.concat(arrayLike,"test",5) ); // 1,2,something,else,test,5
  ```

#### **Internals**

- Array is an object, so it follows `copy by reference`
- The ways to misuse an array, and thereby lose benefits of js engine optimizations:
  - Add a non-numeric property like arr.test = 5
  - Make holes, like: add arr[0] and then arr[1000] (and nothing between them).
  - Fill the array in the reverse order, like arr[1000], arr[999] and so on.
  
- `length`:
  - the greatest numeric index plus one
  - length is writable. If increased, nothing happends. If decreased, array is truncated to length
  - so simplet way to clear array is `arr.length = 0`
  ```js
  let fruits = [];
  fruits[123] = "Apple";
  
  alert( fruits.length ); // 124
  //--------------------------------------------------
  let arr = [1, 2, 3, 4, 5];
  
  arr.length = 2; // truncate to 2 elements
  alert( arr ); // [1, 2]
  
  arr.length = 5; // return length back
  alert( arr[3] ); // undefined: the values do not return
  ```

#### **Loops**

- as Array is an object, we can use `for-in`, but its much slower and shouldnt be used
- u can modify the array on the fly, shouldnt do it though
```js
let arr = ["Apple", "Orange", "Pear"];

// --------- 1 ---------------
// ----------fastest---------------
for (let i = 0; i < arr.length; i++) {
  alert( arr[i] );
}

// --------- 2 ---------------
for (let fruit of fruits) {
  alert( fruit );
}

// --------- 3 ---------------
for (let key in arr) {
  alert( arr[key] ); // Apple, Orange, Pear
}

// --------- 4 ---------------
arr.forEach(function(item, index, array) {
  // ... do something with item
});
```

#### **Comparisons**

- don't use ==, >, < etc as they work like for objects
  - equal only if references are same
  - if one argument is primitive, then the array is converted to primitive for comparing
  - null and undefined equal each other and nothing else
```js
alert( [] == [] ); // false
alert( [0] == [0] ); // false
//-------------------------------
alert( 0 == [] ); // true

alert('0' == [] ); // false
//----why?
// after [] was converted to '' because of toString
alert( 0 == '' ); // true, as '' becomes converted to number 0

alert('0' == '' ); // false, no type conversion, different strings
```
#### **Searching**

- `arr.indexOf(item, from)`: first index where found, else -1
- `arr.lastIndexOf(item, from)`: from end, index or -1
- `arr.includes(item, from)`: true if found
  - uses `===`, so to check false, it should be false, not 0
  - NaN is handled correctly by includes
  ```js
  const arr = [NaN];
  alert( arr.indexOf(NaN) ); // -1 (should be 0, but === equality doesn't work for NaN)
  alert( arr.includes(NaN) );// true (correct)
  ```
Searching array of objects:
- `arr.find(fn)` and `arr.findIndex(fn)`, for first item matching condition
- `arr.filter(fn)`: returns array of all matching elements
  ```js
  let result = arr.find(function(item, index, array) {
    // if true is returned, item is returned and iteration is stopped
    // for falsy scenario returns undefined
  });
  ```
  ```js
  let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"}
  ];
  
  let user = users.find(item => item.id == 1);
  alert(user.name); // John
  
  let user2 = users.find(item => item.id > 1 && item.id < 3);
  alert(user2.name); // Pete
  
  let user3ind = users.findIndex(item => item.id == 3);
  alert(users[user3ind].name); // Mary

  // ------------ filter -----------------
  // returns array of the first two users
  let someUsers = users.filter(item => item.id < 3);
  alert(someUsers.length); // 2
  ```
#### **Transforming and reordering array**

- `arr.map(fn)`: applies fn on each element of the array and returns result as array, `whatever the function returns`
  ```js
  let result = arr.map(function(item, index, array) {
    // returns the new value instead of item
  });
  ```
  ```js
  let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
  console.log(lengths); // 5,7,6
  
  let lengths2 = ["Bilbo", "Gandalf", "Nazgul"].map(function(item) {
   });
  console.log(lengths2); // undefined,undefined,undefined
  ```
- `arr.sort()/arr.sort(fn)`: sorts array in-place, **items are sorted as strings by default**
  ```js
  // ---------- default sorted as string --------
  let a = [ 1, 2, 15 ];
  a.sort();
  alert( a );  // 1, 15, 2

  // ----------- sorting as number --------------
  function compareNumeric(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
  }
  
  let arr = [ 1, 2, 15 ];
  arr.sort(compareNumeric);
  alert(arr);  // 1, 2, 15
  ```
  ```js
  // --- shorter version ------------
  let arr = [ 1, 2, 15 ];
  
  arr.sort(function(a, b) { return a - b; });
  
  alert(arr);  // 1, 2, 15

  // -----even shorter----------
  arr.sort( (a, b) => a - b ); // ascending
  arr.sort( (a, b) => b - a ); // descending
  

  // ----------- best string comparison -------
  let countries = ['Österreich', 'Andorra', 'Vietnam'];
  
  alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (correct!)
  ```
- `arr.reverse()`: reverses array
- `arr.split(delim)`/`arr.join(glue)`: delim, glue can even be empty string
- `reduce/reduceRight`: returns accumulated value, non-array
  ```js
  let value = arr.reduce(function(accumulator, item, index, array) {
    // ...
  }, [initial]);
  ```
  ```js
  let arr = [1, 2, 3, 4, 5];
  
  let result = arr.reduce((sum, current) => sum + current, 0);
  
  alert(result); // 15
  ```
  ```js

  function groupById(array) {
    return array.reduce((obj, value) => {
      obj[value.id] = value;
      return obj;
    }, {})
  }

  let users = [
    {id: 'john', name: "John Smith", age: 20},
    {id: 'ann', name: "Ann Smith", age: 24},
    {id: 'pete', name: "Pete Peterson", age: 31},
  ];
  
  let usersById = groupById(users);
  
  /*
  // after the call we should have:
  
  usersById = {
    john: {id: 'john', name: "John Smith", age: 20},
    ann: {id: 'ann', name: "Ann Smith", age: 24},
    pete: {id: 'pete', name: "Pete Peterson", age: 31},
  }
  */
  ```
  - if initial is not given, first array value is used as init
  - `reduceRight` goes right to left

#### Examples

- [Sum input numbers](https://javascript.info/array#sum-input-numbers)
- Important! [A maximal subarray](https://javascript.info/array#a-maximal-subarray)
- Camel case: camelize("background-color") == 'backgroundColor';
  ```js
  function camelize(str) {
    return str
      .split('-') // splits 'my-long-word' into array ['my', 'long', 'word']
      .map(
        // capitalizes first letters of all array items except the first one
        // converts ['my', 'long', 'word'] into ['my', 'Long', 'Word']
        (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
      )
      .join(''); // joins ['my', 'Long', 'Word'] into 'myLongWord'
  }
  ```
- filterRangeInPlace(arr, a, b):
  ```js
  let filterRangeInPlace = (arr, a, b) => {
  	for(let i in arr) {
    	if(arr[i] < a || arr[i] > b) {
      	arr.splice(i, 1);
      }
    }
  }
  
  let arr = [5, 3, 8, 1];
  
  filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4
  
  alert( arr ); // [3, 1]
  ```
- Extendable calculator:
  ```js
  let calc = new Calculator;
  
  alert( calc.calculate("3 + 7") ); // 10
  
  let powerCalc = new Calculator;
  powerCalc.addMethod("*", (a, b) => a * b);
  powerCalc.addMethod("/", (a, b) => a / b);
  powerCalc.addMethod("**", (a, b) => a ** b);
  
  let result = powerCalc.calculate("2 ** 3");
  alert( result ); // 8
  
  function Calculator() {
  	this.operators = {
    	"+": (a, b) => a + b,
      "-": (a, b) => a - b,
    };
  	this.calculate = function (expr) {
    	let [op1, op, op2] = expr.split(" ");
      return this.operators[op](+op1, +op2);
      
    };
    this.addMethod = function (op, fn) {
    	this.operators[op] = fn;
      
    };
  }
  ```
  
### Map

- keyed data items like object
- get an element by its number.
- Methods and props:
  - `new Map()` – creates the map.
  - `map.set(key, value)` – stores the value by the key, returns map
  - `map.get(key)` – returns the value by the key, undefined if key doesn’t exist in map.
    - map['key'] limits key to be string, **dont use**
  - `map.has(key)` – returns true if the key exists, false otherwise.
  - `map.delete(key)` – removes the value by the key.
  - `map.clear()` – removes everything from the map.
  - `map.size` – returns the current element count.
  ```js
  let map = new Map();
  
  map.set('1', 'str1');   // a string key
  map.set(1, 'num1');     // a numeric key
  map.set(true, 'bool1'); // a boolean key
  
  // remember the regular Object? it would convert keys to string
  // Map keeps the type, so these two are different:
  alert( map.get(1)   ); // 'num1'
  alert( map.get('1') ); // 'str1'
  
  alert( map.size ); // 3

  // ------- accessing like object, bad idea ------------
  alert(map[1]): // undefined
  alert(map["1"]): // undefined
  map[1] = "test";
  map["1"] = "t2";
  alert(map[1]): // t2

  // ---------chaining-------------
  map.set('2', 'str1')
    .set(2, 'num1')
    .set(false, 'bool1');

  // --------- adding methods in map ----------------
  let fun = t => alert(t);
  let map = new Map();
  map.set("f", fun);
  map.get("f")("test"); // test
  ```
- Unlike object, it allows any type of key, even object as a key
  ```js
  let john = { name: "John" };
  
  // for every user, let's store their visits count
  let visitsCountMap = new Map();
  
  // john is the key for the map
  visitsCountMap.set(john, 123);
  
  alert( visitsCountMap.get(john) ); // 123
  ```
  ```js
  let john = { name: "John" };
  let ben = { name: "Ben" };
  
  let visitsCountObj = {}; // try to use an object
  
  visitsCountObj[ben] = 234; // try to use ben object as the key
  visitsCountObj[john] = 123; // try to use john object as the key, ben object will get replaced
  
  // That's what got written!
  alert( visitsCountObj["[object Object]"] ); // 123
  ```

#### **Loop**

- `map.keys()`, `map.values()`, `map.entries()`, `map.forEach(fn)`
  - map.entries() – returns an iterable for entries [key, value], it’s used by default in for..of
  - returns iterable, `not array`
- The iteration goes in the same order as the values were inserted. Map `preserves this order`, unlike a regular Object.
  ```js
  let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 350],
    ['onion',    50]
  ]);
  
  // iterate over keys (vegetables)
  for (let vegetable of recipeMap.keys()) {
    alert(vegetable); // cucumber, tomatoes, onion
  }
  
  // iterate over values (amounts)
  for (let amount of recipeMap.values()) {
    alert(amount); // 500, 350, 50
  }
  
  // iterate over [key, value] entries
  for (let entry of recipeMap) { // the same as of recipeMap.entries()
    alert(entry); // cucumber,500 (and so on)
  }

  // runs the function for each (key, value) pair
  recipeMap.forEach( (value, key, map) => {
    alert(`${key}: ${value}`); // cucumber: 500 etc
  });
  ```

#### **Map from Object/Object from Map**

```js
let obj = {
  name: "John",
  age: 30
};

alert(Object.entries(obj)); // [ ["name","John"], ["age", 30] ]

let map = new Map(Object.entries(obj));

alert( map.get('name') ); // John
```
```js
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map.entries()); // make a plain object (*)

// OR

let obj2 = Object.fromEntries(map);

// done!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

### Set

- set of values, unique
- get an element by its number.
- Methods and props:
  - `new Set(iterable)` – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
  - `set.add(value)` – adds a value, returns the set itself.
  - `set.delete(value)` – removes the value, returns true if value existed at the moment of the call, otherwise false.
  - `set.has(value)` – returns true if the value exists in the set, otherwise false.
  - `set.clear()` – removes everything from the set.
  - `set.size` – is the elements count.
```js
let set = new Set();
let sam = {name: "Sam"};
set.add({name:"John"});
set.add({name:"John"}); // not same value as above, each new object has different reference
set.add(sam);
set.add(sam); // same as above
set.add(1);


console.log(set.size); // 4

for(let s of set) {
	console.log(s.name??s);
}
// John John Sam 1

// OR
for(let s of set.keys()) {
	console.log(s.name??s);
}
```
#### **Loops**

```js
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// the same with forEach:
set.forEach((value, valueAgain, set) => {
  alert(value);
});

// valueAgain to keep consistency with Map forEach
```  
below are just for compatibility, not really useful
- `set.keys()` – returns an iterable object for values, not array
- `set.values()`– same as set.keys(), for compatibility with Map,
- `set.entries()` – returns an iterable object for entries [value, value], exists for compatibility with Map.

#### Examples:

```js
// Unique Array

function unique(arr) {
  return Array.from(new Set(arr));
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) );
```

- [Filter Anagrams](https://javascript.info/map-set#filter-anagrams)


### WeakMap - WeakSet
https://javascript.info/weakmap-weakset

### Destructuring assignment

#### **Array destructuring**

- ```js
  // we have an array with the name and surname
  let arr = ["John", "Smith"]

  // destructuring assignment
  // sets firstName = arr[0]
  // and surname = arr[1]
  let [firstName, surname] = arr;

  alert(firstName); // John
  alert(surname);  // Smith
  ```
  ```js
  let [firstName, surname] = "John Smith".split(' ');
  alert(firstName); // John
  alert(surname);  // Smith
  ```

- ignoring elements using commas
  ```js
  // second element is not needed
  let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
  
  alert( title ); // Consul
  ```

- Works with any iterable
  ```js
  let [a, b, c] = "abc"; // ["a", "b", "c"]
  let [one, two, three] = new Set([1, 2, 3]);
  ```
- Assign to anything at the left-side
  ```js
  let user = {};
  [user.name, user.surname] = "John Smith".split(' ');
  
  alert(user.name); // John
  alert(user.surname); // Smith
  ```
- Looping with .entries()
  ```js
  let user = {
    name: "John",
    age: 30
  };
  
  // loop over keys-and-values
  for (let [key, value] of Object.entries(user)) {
    alert(`${key}:${value}`); // name:John, then age:30
  }
  ```
  ```js
  let user = new Map();
  user.set("name", "John");
  user.set("age", "30");
  
  // Map iterates as [key, value] pairs, very convenient for destructuring
  for (let [key, value] of user) {
    alert(`${key}:${value}`); // name:John, then age:30
  }
  ```
- Swapping variables
  ```js
  let guest = "Jane";
  let admin = "Pete";
  
  // Let's swap the values: make guest=Pete, admin=Jane
  [guest, admin] = [admin, guest];
  
  alert(`${guest} ${admin}`); // Pete Jane (successfully swapped!)
  ```

- `three dots ...`
  - should be the last
  ```js
  let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
  
  // rest is array of items, starting from the 3rd one
  alert(rest[0]); // Consul
  alert(rest[1]); // of the Roman Republic
  alert(rest.length); // 2
  ```

- Default values
  ```js
  // runs only prompt for surname
  let [name = prompt('name?'), surname = prompt('surname?'), nickname="Juju"] = ["Julius"];
  
  alert(name);    // Julius (from array)
  alert(surname); // whatever prompt gets
  alert(nickname); // Juju
  ```

#### **Object Destructuring**

- ```js
  let {var1, var2} = {var1:…, var2:…}

  // OR for existsing variable
  let var1, var2;
  ({var1, var2} = {var1:..., var2:...});
  ```
- ```js
  // --------- same variable names -----------------
  let options = {
    title: "Menu",
    width: 100,
    height: 200
  };
  
  let {title, width, height} = options;
  
  alert(title);  // Menu
  alert(width);  // 100
  alert(height); // 200
  ```
- ```js
  // ---------- change in order, but same name ----------
  // changed the order in let {...}
  let {height, width, title} = { title: "Menu", height: 200, width: 100 }
  ```
- ```js
  // ----------- changing variable name ---------------
  let options = {
    title: "Menu",
    width: 100,
    height: 200
  };
  
  // { sourceProperty: targetVariable }
  let {width: w, height: h, title} = options;
  
  // width -> w
  // height -> h
  // title -> title
  
  alert(title);  // Menu
  alert(w);      // 100
  alert(h);      // 200
  ```
- Default value:
  ```js
  let options = {
    title: "Menu"
  };
  
  let {width = 100, height:h = prompt("height?"), title} = options;
  
  alert(title);  // Menu
  alert(width);  // 100
  alert(h); // whatever prompt gives
  ```
- Extracting only needed values from obj:
  ```js
  let options = {
    title: "Menu",
    width: 100,
    height: 200
  };
  
  // only extract title as a variable
  let { title } = options;
  
  alert(title); // Menu
  ```
- `three dots ...`
  ```js
  let options = {
    title: "Menu",
    height: 200,
    width: 100
  };
  
  // title = property named title
  // rest = object with the rest of properties
  let {title, ...rest} = options;
  
  // now title="Menu", rest={height: 200, width: 100}
  alert(rest.height);  // 200
  alert(rest.width);   // 100
  ```
- for existing variable, `without let`
  ```js
  let title, width, height;
  
  // error in this line, js hinks its code block
  {title, width, height} = {title: "Menu", width: 200, height: 100};

  // okay now
  ({title, width, height} = {title: "Menu", width: 200, height: 100});
  ```
#### **Nested Destructuring**
  - ```js
    let options = {
      size: {
        width: 100,
        height: 200
      },
      items: ["Cake", "Donut"],
      extra: true
    };
    
    // destructuring assignment split in multiple lines for clarity
    let {
      size: { // put size here
        width,
        height
      },
      items: [item1, item2], // assign items here
      title = "Menu" // not present in the object (default value is used)
    } = options;
    
    alert(title);  // Menu
    alert(width);  // 100
    alert(height); // 200
    alert(item1);  // Cake
    alert(item2);  // Donut
    
    let {items:test} = options;
    let {items:[,it2]} = options;
    alert(test); // ["Cake", "Donut"]
    alert(it2); // Donut
    ```

#### **Smart function parameters**

  - using object destructuring to handle multiple parameters, and not caring about operators
  - ```js
    let options = {
      title: "My menu",
      items: ["Item1", "Item2"]
    };
    
    function showMenu({
      title = "Untitled", width: w = 100, items: [item1, item2]
    } = {}) 
    {
      alert( `${title} ${w}` ); // My Menu 100
      alert( item1 ); // Item1
      alert( item2 ); // Item2
    }
    
    showMenu(options);
    // OR
    showMenu(); // as there is a default value in function def
    ```
### Date

#### Basics
  - default browser timezone
  - Creation:
    ```js
    // ------------------ 1 ----------------
    let now = new Date();
    alert( now ); // Thu Jul 22 2021 22:43:08 GMT+0530 (India Standard Time)

    // --------------- 2 new Date(milliseconds)-----------
    // 0 means 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );
    
    // now add 24 hours, get 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000); // timestamp
    alert( Jan02_1970 );

    // -------- 3 new Date(datestring)--------------------
    let date = new Date("2017-01-26");
    alert(date);
    // The time is not set, so it's assumed to be midnight GMT and
    // is adjusted according to the timezone the code is run in
    // So the result could be
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // or
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)

    // -------4 new Date(year, month, date, hours, minutes, seconds, ms)--------
    new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // the same, hours etc are 0 by default
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```
  - Access date components:
    - `getFullYear()`: Get the year (4 digits)
    - `getMonth()`: Get the month, from **0 to 11**.
    - `getDate()`: 1-31
    - `getHours()`, `getMinutes()`, `getSeconds()`, `getMilliseconds()`
    - `getDay()`: **0(Sunday) - 6(Saturday)**
    - All above have utc methods as well:
      - `getUTCFullYear()`, `getUTCMonth()`, `getUTCDay()`
    - `getTime()`: timestamp, no. of milliseconds from Jan 1, 1970, UTC +0
    - `getTimezoneOffset()` difference between UTC and timezone, in minutes
  - Setting date components:
    - `setFullYear(year, [month], [date])`
    - `setMonth(month, [date])`
    - `setDate(date)`
    - `setHours(hour, [min], [sec], [ms])`
    - `setMinutes(min, [sec], [ms])`
    - `setSeconds(sec, [ms])`
    - `setMilliseconds(ms)`
    - `setTime(milliseconds)` (sets the whole date by milliseconds since 01.01.1970 UTC)
    - ```js
      let today = new Date();
      
      today.setHours(0);
      alert(today); // still today, but the hour is changed to 0
      
      today.setHours(0, 0, 0, 0);
      alert(today); // still today, now 00:00:00 sharp.
      ```
  - Autocorrection
    - auto adjusts to correct date when set to invalid value or out of order value
    ```js
    let date = new Date(2013, 0, -32);
    alert(date); // Thu Nov 29 2012 00:00:00 GMT+0530 (India Standard Time)
    ```
  - Date to number, date diff in ms
    ```js
    let date = new Date();
    alert(+date); // the number of milliseconds, same as date.getTime()
    let start = new Date(); // start measuring time
    
    // do the job
    for (let i = 0; i < 100000; i++) {
      let doSomething = i * i * i;
    }
    
    let end = new Date(); // end measuring time
    
    alert( `The loop took ${end - start} ms` );
    ```
  - Date.now(): current timestamp, `faster` than date object
    
    ```js
    let start = Date.now(); // milliseconds count from 1 Jan 1970
    
    // do the job
    for (let i = 0; i < 100000; i++) {
      let doSomething = i * i * i;
    }
    
    let end = Date.now(); // done
    
    alert( `The loop took ${end - start} ms` ); // subtract numbers, not dates
    ```
  - Date.parse(str): date from string, returns timestamp from 1 Jan, 1970
    - string format: YYYY-MM-DDTHH:mm:ss.sssZ
    - Z is optional, timezone +-hh:mm, Z is for UTC
    
    ```js
    let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
    
    alert(ms); // 1327611110417  (timestamp)
    ```
    ```js
    let date = new Date(Date.parse('2001-26'));
    
    alert(date); // invalid date

    let date = new Date(Date.parse('2001-1'));
    
    alert(date); // Mon Jan 01 2001 00:00:00 GMT+0530 (India Standard Time)
    ```

#### Examples - Date

- date: Feb 20, 2012, 3:12am
  
  ```js
  // new Date(year, month, date, hour, minute, second, millisecond)
  let d1 = new Date(2012, 1, 20, 3, 12);
  alert( d1 );
  // new Date(datastring)
  let d2 = new Date("February 20, 2012 03:12:00");
  alert( d2 );
  ```
- getLastDayOfMonth(2012, 1) = 29
  
  ```js
  function getLastDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
  }
  
  alert( getLastDayOfMonth(2012, 0) ); // 31
  alert( getLastDayOfMonth(2012, 1) ); // 29
  alert( getLastDayOfMonth(2013, 1) ); // 28
  ```
- [Tasks](https://javascript.info/date#tasks)

### JSON

- `JSON.stringify`: object to json string
- `JSON.parse`: json string to object

#### JSON.stringify

- Can be used on Object, Array, primitives
- converts quotes to double quotes, keys also to be with double quotes
- Skips the following properties:
  - Functions
  - undefined
  - Symbolic keys and values
- Nested structure and variable resolution supported
  
  ```js
  let title = "Conference";
  let meetup = {
    title: title,
    room: {
      number: 23,
      participants: ["john", "ann"]
    }
  };
  
  alert( JSON.stringify(meetup) );
  // {"title":"Conference","room":{"number":23,"participants":["john","ann"]}}
  ```
- there must be **`no circular references.`**
  
  ```js
  let room = {
    number: 23
  };
  
  let meetup = {
    title: "Conference",
    participants: ["john", "ann"]
  };
  
  meetup.place = room;       // meetup references room
  room.occupiedBy = meetup; // room references meetup
  
  JSON.stringify(meetup); // Error: Converting circular structure to JSON
  ```
- JSON.stringify(value[, replacer, space])
  ```js
  let room = {
    number: 23
  };
  
  let meetup = {
    title: "Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room // meetup references room
  };
  
  room.occupiedBy = meetup; // room references meetup
  
  alert( JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']) );
  /*
  {
    "title":"Conference",
    "participants":[{"name":"John"},{"name":"Alice"}],
    "place":{"number":23}
  }
  */
  ```
  ```js
  let room = {
    number: 23
  };
  
  let meetup = {
    title: "Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room // meetup references room
  };
  
  room.occupiedBy = meetup; // room references meetup
  
  alert( JSON.stringify(meetup, function replacer(key, value) {
    alert(`${key}: ${value}`);
    return (key == 'occupiedBy') ? undefined : value;
  }));
  
  /* key:value pairs that come to replacer:
  :             [object Object]
  title:        Conference
  participants: [object Object],[object Object]
  0:            [object Object]
  name:         John
  1:            [object Object]
  name:         Alice
  place:        [object Object]
  number:       23
  occupiedBy: [object Object]
  */
  ```
  ```js
  let user = {
    name: "John",
    age: 25,
    roles: {
      isAdmin: false,
      isEditor: true
    }
  };
  
  alert(JSON.stringify(user, null, 2));
  /* two-space indents:
  {
    "name": "John",
    "age": 25,
    "roles": {
      "isAdmin": false,
      "isEditor": true
    }
  }
  */
  ```
#### toJSON, like toString
- ```js
  let room = {
    number: 23,
    toJSON() {
      return this.number;
    }
  };
  
  let meetup = {
    title: "Conference",
    room
  };
  
  alert( JSON.stringify(room) ); // 23
  
  alert( JSON.stringify(meetup) );
  /*
    {
      "title":"Conference",
      "room": 23
    }
  */
  ```

#### JSON.parse

- ```js
  let userData = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

  let user = JSON.parse(userData);

  alert( user.friends[1] ); // 1
  ```
- JSON.parse(value[, reviver])
  ```js
  let schedule = `{
    "meetups": [
      {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
      {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
    ]
  }`;
  
  schedule = JSON.parse(schedule, function(key, value) {
    if (key == 'date') return new Date(value);
    return value;
  });
  
  alert( schedule.meetups[1].date.getDate() ); // works
  ```

#### Examples - JSON

- [Exclude backreferences](https://javascript.info/json#exclude-backreferences)
  






