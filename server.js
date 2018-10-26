/*
 * @Author: Laphets 
 * @Date: 2018-04-21 23:46:43 
 * @Last Modified by: Laphets
 * @Last Modified time: 2018-10-26 19:09:12
 */

const PROTO_PATH = __dirname + '/protobuf/ZJUAuth/ZJUAuth.proto';
const grpc = require('grpc');

let protoDescriptor = grpc.load(PROTO_PATH);
let ZJUAuth = protoDescriptor.ZJUAuth;

const get_auth_cookie = require('./spider/zjuinfo_login');
const ZJUinfoLogin = (call, callback) => {
    get_auth_cookie(call.request).then((result) => {
        if (result.status == 1) {
            callback(null, {
                status: 1,
                cookie: result.cookie
            });            
        } else if (res.status == 0) {
            callback(null, {
                status: 0,
                cookie: ['']
            })
        }
    }).catch((err) => {
        console.log(err);
        callback(null, {
            status: -1,
            cookie: ['']
        });
    });
};


const getServer = () => {
    let server = new grpc.Server();
    server.addProtoService(ZJUAuth.AuthService.service, {
        ZJUinfoLogin: ZJUinfoLogin
    });
    return server;
}

const Server = getServer();
const port = require('./config').port;
Server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
console.log(`Server is running at 0.0.0.0:${port}`);
Server.start();