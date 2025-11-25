FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

# зависимости
RUN npm ci

# ВСЕ файлы фронтенда
COPY . .

# приложение
RUN npm run build

FROM nginx:alpine

# собранное приложение в nginx
COPY --from=build /app/build /usr/share/nginx/html

# кастомный конфиг nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]