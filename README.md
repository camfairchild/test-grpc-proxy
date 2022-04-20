# Basic GRPC Bridge Setup over HTTP 1.1
Uses [Envoy](https://www.envoyproxy.io/) to setup a proxy bridge.  
## How to test
Run the docker image on your favourite VM that supports HTTP connections (but not grpc).
you can pull it from dockerhub:   
    `wich23/test-grpc-envoy`    
Just expose the port `8080` to TCP.  
You can test using this [example node grpc client](https://github.com/grpc/grpc/blob/master/examples/node/dynamic_codegen/greeter_client.js)  