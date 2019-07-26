FROM node:10
ENV NODE_ENV=production
ENV HOST 0.0.0.0
ARG API_URL=${API_URL}
COPY . /app
WORKDIR /app
EXPOSE 4000
#此为cnpm淘宝镜像
#RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
RUN cross-env API_URL=${API_URL} nuxt build
CMD ["cross-env API_URL=${API_URL}", "nuxt", "start"]
