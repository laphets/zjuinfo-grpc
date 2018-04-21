# ZJUinfo-grpc

## Overview
A rpc based project for *ZJU Unified Identity Authentication System*.

## Server Deploy Guide
### Prerequisite
First you need to define the port which the gRPC server will be running on and your test account in config.js
```bash
mv config_sample.js config.js
vim config.js
```
### Build
```bash
npm install //install required packages
npm start //run the server on the port you defined
```

## Client Guide
You need to contain the `Proto file` in your own project, and using grpc to load it.

A sample code for client is shown below.
```js
const PROTO_PATH = __dirname + '/protos/zju_auth.proto';
const grpc = require('grpc');

let protoDescriptor = grpc.load(PROTO_PATH);
let zjuauth = protoDescriptor.zjuauth;

let client = new zjuauth.ZJUauth(require('./config').port, grpc.credentials.createInsecure());

const user = require('./config').test_user;

client.ZJUinfoLogin(user, (err, response) => {
    console.log(response);
});
```

## Test
This step can be viewed as building a client and sending request to the server.
```
npm test
```

## Contributor
Laphets `i@laphets.com`