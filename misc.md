# Miscellaneous <!-- omit in toc -->

- [Extending functionality using Symbols](#extending-functionality-using-symbols)
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

