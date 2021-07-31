# Arrays <!-- omit in toc -->

[Home](../README.md)


[Array methods cheatsheet](https://javascript.info/array-methods#summary)  
[Must practice questions](https://javascript.info/array-methods#tasks)

- [Basics](#basics)
- [**add/remove methods**](#addremove-methods)
- [**Internals**](#internals)
- [**Loops**](#loops)
- [**Comparisons**](#comparisons)
- [**Searching**](#searching)
- [**Transforming and reordering array**](#transforming-and-reordering-array)
- [**Convert to Array**](#convert-to-array)
- [Examples](#examples)

## Basics
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

## **add/remove methods**

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

## **Internals**

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

## **Loops**

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

## **Comparisons**

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
## **Searching**

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
  ```js
  function inBetween(a, b) {
    return function(x) {
      return x >= a && x <= b;
    };
  }
  
  let arr = [1, 2, 3, 4, 5, 6, 7];
  alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6
  ```
  ```js
  function inArray(arr) {
    return function(x) {
      return arr.includes(x);
    };
  }
  
  let arr = [1, 2, 3, 4, 5, 6, 7];
  alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
  ```
## **Transforming and reordering array**

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

## **Convert to Array**

- spread syntax: works for any iterable
  ```js
  let str = "Hello";
  
  alert( [...str] ); // H,e,l,l,o
  ```
- Array.from: works on iterables and array-like objects
  ```js
  let str = "Hello";
  
  // Array.from converts an iterable into an array
  alert( Array.from(str) ); // H,e,l,l,o
  ```
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

## Examples

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
 