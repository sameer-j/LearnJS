# Destructuring <!-- omit in toc -->

[Home](../README.md)

- [Destructuring assignment](#destructuring-assignment)
    - [**Array destructuring**](#array-destructuring)
    - [**Object Destructuring**](#object-destructuring)
    - [**Nested Destructuring**](#nested-destructuring)
    - [**Smart function parameters**](#smart-function-parameters)

## Destructuring assignment

*Also see `Spread syntax` under functions*

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

