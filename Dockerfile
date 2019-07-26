FROM node:10
ENV NODE_ENV=production
ENV HOST 0.0.0.0
ARG VUE_APP_API_URL
COPY . /app
WORKDIR /app
EXPOSE 4000
#此为cnpm淘宝镜像
#RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
RUN cross-env VUE_APP_API_URL=${VUE_APP_API_URL} nuxt build
CMD ["cross-env VUE_APP_API_URL=${VUE_APP_API_URL}", "nuxt", "start"]
