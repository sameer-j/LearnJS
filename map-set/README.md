# Map and Set <!-- omit in toc -->

[Home](../README.md)

- [Map](#map)
  - [**Loop**](#loop)
  - [**Map from Object/Object from Map**](#map-from-objectobject-from-map)
- [Set](#set)
  - [**Loops**](#loops)
  - [Examples:](#examples)
- [WeakMap - WeakSet](#weakmap---weakset)

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
