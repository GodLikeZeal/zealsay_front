FROM alpine AS builder
WORKDIR /home/app
RUN apk add --no-cache --update nodejs nodejs-npm
COPY package.json package-lock.json ./
RUN npm install --production

FROM alpine
ENV NODE_ENV=production
ENV HOST 0.0.0.0
WORKDIR /home/app
EXPOSE 4000
RUN apk add --no-cache --update nodejs nodejs-npm
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build
CMD [ 'npm', 'start' ]