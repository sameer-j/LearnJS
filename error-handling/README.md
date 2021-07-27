# Error Handling <!-- omit in toc -->

[Main Page](../README.md)

- [Syntax](#syntax)
- [Error Object](#error-object)
- [Optional "catch" binding](#optional-catch-binding)
- [Throwing own exceptions](#throwing-own-exceptions)
- [Rethrowing](#rethrowing)

## Syntax

  - ```js
    try {
       // ... try to execute the code ...
    } catch (err) { // OPTIONAL
       // ... handle errors ...
    } finally { // OPTIONAL
       // ... execute always ...
    }
    ```
  - Variables are local inside try...catch...finally
  - The finally clause works for any exit from try...catch, including:
    - exception not caught
    - return from try

## Error Object

  - name, message, stack

## Optional "catch" binding

  - ```js
    try {
      // ...
    } catch { // <-- without (err)
      // ...
    }
    ```

## Throwing own exceptions

  - Syntax:
    ```js
    throw <error object>
    ```
    - Any object is allowed, but ideally with `name` and `message`
  - Built-in:
    ```js
    let error = new Error(message);
    // or
    let error = new SyntaxError(message);
    let error = new ReferenceError(message);
    // etc
    ```
  - Example:
    ```js
    let json = '{ "age": 30 }'; // incomplete data
    try {
      let user = JSON.parse(json); // <-- no errors
      if (!user.name) {
        throw new SyntaxError("Incomplete data: no name"); // (*)
      }
      alert( user.name );
    } catch (err) {
      alert( "JSON Error: " + err.message ); // JSON Error: Incomplete data: no name
    }
    ```

## Rethrowing

- ```js
  function readData() {
    let json = '{ "age": 30 }';

    try {
      // ...
      blabla(); // error!
    } catch (err) {
      // ...
      if (!(err instanceof SyntaxError)) {
        throw err; // rethrow (don't know how to deal with it)
      }
    }
  }

  try {
    readData();
  } catch (err) {
    alert( "External catch got: " + err ); // caught it!
  }
  ```

## Global catch

  - for uncaught exception causing script to die
  - not to recover, but to find why/where the exception occurred causing script to die
  - ```js
    <script>
      window.onerror = function(message, url, line, col, error) {
        alert(`${message}\n At ${line}:${col} of ${url}`);
      };
    
      function readData() {
        badFunc(); // Whoops, something went wrong!
      }
    
      readData();
    </script>
    ```

## Custom Exception class

  - inherit built-in Error class:
    - configure name property
    - call super
  - `name` works as `instance of` to figure out exception class name for checks

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name; // ValidationError
  }
}

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.name = this.constructor.name; // PropertyRequiredError
    this.property = property;
  }
}

// Usage
function readUser(json) {
  let user = JSON.parse(json);

  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }

  return user;
}

// Working example with try..catch

try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
    alert("Invalid data: " + err.message); // Invalid data: No property: name
    alert(err.name); // PropertyRequiredError
    alert(err.property); // name
  } else if (err instanceof SyntaxError) {
    alert("JSON Syntax Error: " + err.message);
  } else {
    throw err; // unknown error, rethrow it
  }
}
```

