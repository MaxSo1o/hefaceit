# Этап 1: Сборка проекта
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной исходный код
COPY . .

# Собираем проект
RUN npm run build

# Этап 2: Запуск прод-сервера
FROM node:18-alpine AS runner

# Устанавливаем рабочую директорию
WORKDIR /app

# Порт, на котором будет запущено приложение
EXPOSE 3000

# Команда запуска
CMD ["npm", "start"]
