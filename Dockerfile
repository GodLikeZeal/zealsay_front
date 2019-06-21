FROM node:10.15.3-alpine
ENV NODE_ENV=production
ENV HOST 0.0.0.0
COPY . /front
WORKDIR /front
EXPOSE 3000
#此为cnpm淘宝镜像
#RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
RUN npm run build
CMD ["npm", "start"]
