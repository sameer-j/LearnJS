# Date <!-- omit in toc -->

[Home](../README.md)

- [Basics](#basics)
- [Examples - Date](#examples---date)

#### Basics
  - default browser timezone
  - Creation:
    ```js
    // ------------------ 1 ----------------
    let now = new Date();
    alert( now ); // Thu Jul 22 2021 22:43:08 GMT+0530 (India Standard Time)

    // --------------- 2 new Date(milliseconds)-----------
    // 0 means 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );
    
    // now add 24 hours, get 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000); // timestamp
    alert( Jan02_1970 );

    // -------- 3 new Date(datestring)--------------------
    let date = new Date("2017-01-26");
    alert(date);
    // The time is not set, so it's assumed to be midnight GMT and
    // is adjusted according to the timezone the code is run in
    // So the result could be
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // or
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)

    // -------4 new Date(year, month, date, hours, minutes, seconds, ms)--------
    new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // the same, hours etc are 0 by default
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```
  - Access date components:
    - `getFullYear()`: Get the year (4 digits)
    - `getMonth()`: Get the month, from **0 to 11**.
    - `getDate()`: 1-31
    - `getHours()`, `getMinutes()`, `getSeconds()`, `getMilliseconds()`
    - `getDay()`: **0(Sunday) - 6(Saturday)**
    - All above have utc methods as well:
      - `getUTCFullYear()`, `getUTCMonth()`, `getUTCDay()`
    - `getTime()`: timestamp, no. of milliseconds from Jan 1, 1970, UTC +0
    - `getTimezoneOffset()` difference between UTC and timezone, in minutes
  - Setting date components:
    - `setFullYear(year, [month], [date])`
    - `setMonth(month, [date])`
    - `setDate(date)`
    - `setHours(hour, [min], [sec], [ms])`
    - `setMinutes(min, [sec], [ms])`
    - `setSeconds(sec, [ms])`
    - `setMilliseconds(ms)`
    - `setTime(milliseconds)` (sets the whole date by milliseconds since 01.01.1970 UTC)
    - ```js
      let today = new Date();
      
      today.setHours(0);
      alert(today); // still today, but the hour is changed to 0
      
      today.setHours(0, 0, 0, 0);
      alert(today); // still today, now 00:00:00 sharp.
      ```
  - Autocorrection
    - auto adjusts to correct date when set to invalid value or out of order value
    ```js
    let date = new Date(2013, 0, -32);
    alert(date); // Thu Nov 29 2012 00:00:00 GMT+0530 (India Standard Time)
    ```
  - Date to number, date diff in ms
    ```js
    let date = new Date();
    alert(+date); // the number of milliseconds, same as date.getTime()
    let start = new Date(); // start measuring time
    
    // do the job
    for (let i = 0; i < 100000; i++) {
      let doSomething = i * i * i;
    }
    
    let end = new Date(); // end measuring time
    
    alert( `The loop took ${end - start} ms` );
    ```
  - Date.now(): current timestamp, `faster` than date object
    
    ```js
    let start = Date.now(); // milliseconds count from 1 Jan 1970
    
    // do the job
    for (let i = 0; i < 100000; i++) {
      let doSomething = i * i * i;
    }
    
    let end = Date.now(); // done
    
    alert( `The loop took ${end - start} ms` ); // subtract numbers, not dates
    ```
  - Date.parse(str): date from string, returns timestamp from 1 Jan, 1970
    - string format: YYYY-MM-DDTHH:mm:ss.sssZ
    - Z is optional, timezone +-hh:mm, Z is for UTC
    
    ```js
    let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
    
    alert(ms); // 1327611110417  (timestamp)
    ```
    ```js
    let date = new Date(Date.parse('2001-26'));
    
    alert(date); // invalid date

    let date = new Date(Date.parse('2001-1'));
    
    alert(date); // Mon Jan 01 2001 00:00:00 GMT+0530 (India Standard Time)
    ```

#### Examples - Date

- date: Feb 20, 2012, 3:12am
  
  ```js
  // new Date(year, month, date, hour, minute, second, millisecond)
  let d1 = new Date(2012, 1, 20, 3, 12);
  alert( d1 );
  // new Date(datastring)
  let d2 = new Date("February 20, 2012 03:12:00");
  alert( d2 );
  ```
- getLastDayOfMonth(2012, 1) = 29
  
  ```js
  function getLastDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
  }
  
  alert( getLastDayOfMonth(2012, 0) ); // 31
  alert( getLastDayOfMonth(2012, 1) ); // 29
  alert( getLastDayOfMonth(2013, 1) ); // 28
  ```
- [Tasks](https://javascript.info/date#tasks)
  