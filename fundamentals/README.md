# Fundamentals <!-- omit in toc -->

[Home](../README.md)

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
- [Transpilers & Polyfills](#transpilers--polyfills)
  - [Shim vs Polyfills](#shim-vs-polyfills)

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
a = 1;
b = 2;
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
"" + 1 + 0 // "10"
"" - 1 + 0 // -1
true + false // 1
6 / "3" // 2
"2" * "3" // 6
4 + 5 + "px" // "9px"
"$" + 4 + 5 // "$45"
"4" - 2 // 2
"4px" - 2 // NaN
"  -9  " + 5 // "  -9  5"
"  -9  " - 5 // -14
null + 1 // 1
undefined + 1 // NaN (Number of undefined -> NaN)
" \t \n" - 2 // -2
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

## Transpilers & Polyfills

- A `transpiler` is a special piece of software that translates source code to another source code. It can parse (“read and understand”) modern code and rewrite it using older syntax constructs, so that it’ll also work in outdated engines.

  - Example: babel

- A script that updates/adds new functions is called `polyfill`. It “fills in” the gap and adds missing implementations.
  - Example: corejs

### Shim vs Polyfills

- `shim`: A shim is a library that brings a new API to an older environment, using only the means of that environment.
- while shims are used for covering up old sins, polyfills are used for bringing future enhancements back in time
- Polyfilling is really just a specialized version of shimming.

