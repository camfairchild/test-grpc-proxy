# Basic GRPC Bridge Setup over HTTP 1.1
Uses [Envoy](https://www.envoyproxy.io/) to setup a proxy bridge.  
## How to test
### Setup Server
Run the docker image on your favourite VM host that supports HTTP connections (but not grpc).
you can pull it from dockerhub:   
    `wich23/test-grpc-envoy`    
Expose the port `8080` to TCP on your VM host.  
SSH into VM with container running.  
Open a tmux for the proxy.  
`envoy -c envoy-override-runpod.yaml`  
Ctrl+b, d to detach tmux  
Open a tmux for the test server.  
`node index.js`
Ctrl+b, d to detach tmux.  
Exit SSH
### Setup Proxy
[Install Envoy](https://www.envoyproxy.io/docs/envoy/latest/start/install) on your proxy host.  
I will be using the docker config.  
Open port 8091 to internet (or test on this VM).  
Run [envoy with the config](https://www.envoyproxy.io/docs/envoy/latest/start/quick-start/run-envoy#override-the-default-configuration) `envoy-override-external.yaml`  

    docker run --rm -it \
      -v $(pwd)/envoy-override-external.yaml:/envoy-override-external.yaml \
      -p 8091:8091 \
      envoyproxy/envoy-dev:16de18d5e0c3f3b166f2d2564857a1470ede1154 \
      -c /envoy-override-external.yaml 
          
You can test on the proxy VM, or locally, using this [example node grpc client](https://github.com/grpc/grpc/blob/master/examples/node/dynamic_codegen/greeter_client.js)  
Just modify the line with the url to match the proxy's grpc port and ip.