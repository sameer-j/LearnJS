# Miscellaneous <!-- omit in toc -->

- [Extending functionality using Symbols](#extending-functionality-using-symbols)
- [Var](#var)
- [Object properties configuration](#object-properties-configuration)
- [Generators, advanced iteration](#generators-advanced-iteration)
## Extending functionality using Symbols

- `Symbol.isConcatSpreadable`
  ```js
  let arrayLike = {
      0: "something",
      1: "else",
      [Symbol.isConcatSpreadable]: true,
      length: 2
    };
    
    alert( arr.concat(arrayLike,"test",5) ); // 1,2,something,else,test,5
  ```
- `Symbol.iterator`: to make any object iterable like array: [read more with example](https://javascript.info/iterable#symbol-iterator)

## Var
https://javascript.info/var

- “var” has no block scope
  - only function-scoped and global scoped
- “var” tolerates redeclarations
- “var” variables can be declared below their use
  - var declarations are processed when the function starts (or script starts for globals).

  - In other words, var variables are defined from the beginning of the function, no matter where the definition is (assuming that the definition is not in the nested function).
- To emulate var scope block level: IIFE
  ```js
  (function() {
  
    var message = "Hello";
  
    alert(message); // Hello
  
  })();
  ```

## Object properties configuration

https://javascript.info/object-properties

## Generators, advanced iteration

https://javascript.info/generators-iterators

