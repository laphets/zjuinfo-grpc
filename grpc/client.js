const PROTO_PATH = __dirname + '/../protos/zju_auth.proto';
const grpc = require('grpc');

let protoDescriptor = grpc.load(PROTO_PATH);
let zjuauth = protoDescriptor.zjuauth;

let client = new zjuauth.ZJUauth('localhost:50052', grpc.credentials.createInsecure());

const user = {
    username: "3170111705",
    password: 'asdfghjkl'
};

client.ZJUinfoLogin(user, (err, response) => {
    console.log(response);
});