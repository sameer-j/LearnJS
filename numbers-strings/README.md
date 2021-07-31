# Numbers and Strings <!-- omit in toc -->

[Home](../README.md)

- [Strings](#strings)
  - [**String are immutable**](#string-are-immutable)
  - [**Searching for a substring**](#searching-for-a-substring)
  - [**Getting a substring**](#getting-a-substring)
  - [**Comparing Strings**](#comparing-strings)
  - [Examples](#examples)

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
 
