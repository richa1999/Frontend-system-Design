const PROTO_PATH = './customer.proto'

const gRPC = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const CustomerService = gRPC.loadPackageDefinition(packageDefinition).CustomerService;

const client = new CustomerService(
    "127.0.0.1:30043",
    gRPC.credentials.createInsecure()
)

module.exports = client;

