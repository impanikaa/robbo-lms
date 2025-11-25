#!/bin/bash

echo "Waiting for MySQL to be ready..."
while ! nc -z mysql 3306; do
  sleep 1
done
echo "MySQL is ready!"

# миграции
echo "Applying database migrations..."
python manage.py migrate

# сервер
echo "Starting server..."
python manage.py runserver 0.0.0.0:8000