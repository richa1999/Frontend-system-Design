const PROTO_PATH = './customer.proto'

const gRPC = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const customerProto = gRPC.loadPackageDefinition(packageDefinition);

const server = new gRPC.Server();

const customers = [{
    id: '1',
    name: 'Richa',
    age: 24,
    address: 'Bangalore'
},{
    id: '2',
    name: 'Abhinav',
    age: 27,
    address: 'Noida'
}];

server.addService(customerProto.CustomerService.service, {
    getAll: (call, callback) => {
        callback(null, {customers});
    },
    get: (call, callback) => {
        let customer = customers.find(n => n.id == call.request.id);

        if(customer) {
            callback(null, customer);
        } else {
            callback({
                code: gRPC.status.NOT_FOUND,
                details: "Not Found"
            });
        }
    },
    insert: (call, callback) => {
        let customer = call.request;

        customer.id = Math.random();
        customers.push(customer);
        callback(null, customer);
    },
    update: (call, callback) => {
        let existingCustomer = customers.find(n => n.id == call.request.id);

        if(existingCustomer){
            existingCustomer.name = call.request.name;
            existingCustomer.age = call.request.age;
            existingCustomer.address = call.request.address;
            callback(null, existingCustomer);
        } else {
            callback({
                code: gRPC.status.NOT_FOUND,
                details: "Not Found"
            });
        }
    },
    remove: (call, callback) => {
        let existingCustomerIndex = customers.findIndex(n => n.id == call.request.id);

        if(existingCustomerIndex != -1){
            customers.splice(existingCustomerIndex, 1);
            callback(null, {});
        } else {
            callback({
                code: gRPC.status.NOT_FOUND,
                details: "Not Found"
            });
        }
    },
});

server.bindAsync("127.0.0.1:30043", gRPC.ServerCredentials.createInsecure(), (err, port) => {
    if(err){
        console.log(`Error starting gRPC Server: ${err}`);
    } else {
        server.start();
        console.log(`gRPC Server is listening on ${port}`)
    }
});