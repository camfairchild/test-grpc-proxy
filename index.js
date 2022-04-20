/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(
    import.meta.url
);
const __dirname = path.dirname(__filename);

const PROTO_PATH = __dirname + '/protos/helloworld.proto';

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function sayHello(call, callback) {
    callback(null, { message: 'Hello ' + call.request.name });
}

function sayHelloAgain(call, callback) {
    callback(null, { message: 'Hello again, ' + call.request.name });
}

function main() {
    var server = new grpc.Server();
    server.addService(hello_proto.Greeter.service, { sayHello: sayHello, sayHelloAgain: sayHelloAgain });
    server.bindAsync('0.0.0.0:8091', grpc.ServerCredentials.createInsecure(), () => {
        server.start();
        console.log('Server running...');
    });
}
main();