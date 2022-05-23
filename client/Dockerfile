FROM node:14.14.0-alpine as builder
WORKDIR /app
COPY ./package.json ./
COPY . .
RUN npm i
RUN npm run build

FROM nginx
EXPOSE 3001
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html