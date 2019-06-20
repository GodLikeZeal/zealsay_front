FROM nginx:1.15

# 删除nginx 默认配置
RUN rm /etc/nginx/conf.d/default.conf

# 添加我们自己的配置 default.conf 在下面
ADD default.conf /etc/nginx/conf.d/

# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/
