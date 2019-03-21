# Phidget Control

Repository for physical computing snippets

### Setup

Install phidget manager from phidgets.com

```js
npm i --save phidget22
```

### Usage

Include `phidget` lib in front end code

##### Encoder

```js
var ch1 = new phidget22.DigitalInput(0);
ch1.open().then(function(){});
```

##### Digital Input

```js
var encoder = new phidget22.Encoder();
encoder.open().then(function(){});
```
