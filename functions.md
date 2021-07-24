[Home](./README.md)

# Functions <!-- omit in toc -->
- [Basics](#basics)
- [Arrow functions](#arrow-functions)
  
## Basics
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

## Arrow functions

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
