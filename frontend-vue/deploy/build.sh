#! /bin/bash

# 开始构建镜像
sudo docker build -t icoder-web .

# 不推镜像或者直接本地 启动容器，因为 nginx 内部配的是 8080端口，这里暴露8080端口给外网

sudo docker run -it -d --name icoder-web -p 8080:8080 icoder-web bash