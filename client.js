/*
 * @Author: Laphets 
 * @Date: 2018-04-22 00:42:03 
 * @Last Modified by: Laphets
 * @Last Modified time: 2018-10-25 18:08:17
 */

const PROTO_PATH = __dirname + '/protos/zju_auth.proto';
const grpc = require('grpc');

let protoDescriptor = grpc.load(PROTO_PATH);
let qscrpc = protoDescriptor.qscrpc;

let client = new qscrpc.ZJUauth(`10.202.68.181:8890`, grpc.credentials.createInsecure());

const user = require('./test_user').test_user;

client.ZJUinfoLogin(user, (err, response) => {
    if (err) {
        console.log(err);
    } else {
        console.log(response);
    }
});