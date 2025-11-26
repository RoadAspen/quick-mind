# -------------------------------
# 部署到 Nginx
# -------------------------------
FROM nginx:stable-alpine as production-stage
# 设置工作目录
WORKDIR /frontend
# 将除了.dockerignore中的指定文件外的 打包所需的文件全部拷贝进工作目录
COPY . /frontend

# 拷贝构建产物到 Nginx 的 html 目录
COPY ./dist /usr/share/nginx/html
# copy nginx.conf 到 nginx 配置文件夹,并替换掉初始的 nginx.conf 文件
COPY ./nginx.conf /etc/nginx/nginx.conf

# 赋予 文件可执行权限
CMD ["nginx", "-g", "daemon off;"]
    