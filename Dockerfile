#build environment
FROM node:18-alpine as builder
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


#stage 2
FROM nginx:stable-alpine

COPY --from=builder /nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /nginx/mtdtesting.crt /etc/ssl
COPY --from=builder /nginx/mtdtesting.key /etc/ssl
COPY --from=builder /public /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]