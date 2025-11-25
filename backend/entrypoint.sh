#!/bin/bash

# Ждем пока MySQL будет готова
echo "Waiting for MySQL to be ready..."
while ! nc -z mysql 3306; do
  sleep 1
done
echo "MySQL is ready!"

# Применяем миграции
echo "Applying database migrations..."
python manage.py migrate

# Запускаем сервер
echo "Starting server..."
python manage.py runserver 0.0.0.0:8000