FROM node:bullseye
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN apt update && apt install -y nodejs openssl bash wget tar tmux curl
RUN wget https://github.com/fullstorydev/grpcurl/releases/download/v1.8.6/grpcurl_1.8.6_linux_x86_64.tar.gz && \
    tar -xzvf grpcurl_1.8.6_linux_x86_64.tar.gz && \
    mv grpcurl /usr/bin/grpcurl && \
    rm -rf grpcurl_1.8.6_linux_x86_64.tar.gz && \
    chmod +x /usr/bin/grpcurl
# Install envoy proxy
RUN apt install -y debian-keyring debian-archive-keyring apt-transport-https lsb-release
RUN curl -sL 'https://deb.dl.getenvoy.io/public/gpg.8115BA8E629CC074.key' | gpg --dearmor -o /usr/share/keyrings/getenvoy-keyring.gpg && \
     echo a077cb587a1b622e03aa4bf2f3689de14658a9497a9af2c427bba5f4cc3c4723 /usr/share/keyrings/getenvoy-keyring.gpg | sha256sum --check && \
     echo "deb [arch=amd64 signed-by=/usr/share/keyrings/getenvoy-keyring.gpg] https://deb.dl.getenvoy.io/public/deb/debian $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/getenvoy.list && \
     apt update && \
     apt install getenvoy-envoy -y
RUN yarn install
CMD ["/bin/bash", "-c", "sleep infinity"]

EXPOSE 8091