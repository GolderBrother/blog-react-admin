# 基于nginx镜像
FROM nginx
# 标识名字和版本
LABEL name="blog-react-admin"
LABEL version="1.0"
# 把当前目录下的所有文件都拷贝到nginx配置的静态资源目录下
COPY ./dist /usr/share/nginx/html/blog-react-admin
# 配置nginx
COPY ./blog-react-admin.conf /etc/nginx/conf.d
# 向外暴露8000端口(需要在nginx改端口)
EXPOSE 8000




