/*
 * @Author: Laphets 
 * @Date: 2018-04-22 00:42:03 
 * @Last Modified by: Laphets
 * @Last Modified time: 2018-04-22 01:20:04
 */

const PROTO_PATH = __dirname + '/protos/zju_auth.proto';
const grpc = require('grpc');

let protoDescriptor = grpc.load(PROTO_PATH);
let zjuauth = protoDescriptor.zjuauth;

let client = new zjuauth.ZJUauth(require('./config').port, grpc.credentials.createInsecure());

const user = require('./config').test_user;

client.ZJUinfoLogin(user, (err, response) => {
    console.log(response);
});