# JSON <!-- omit in toc -->

[Home](../README.md)

- [JSON](#json)
    - [JSON.stringify](#jsonstringify)
    - [toJSON, like toString](#tojson-like-tostring)
    - [Examples - JSON](#examples---json)

## JSON

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
  







