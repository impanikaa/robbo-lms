FROM python:3.11-slim

WORKDIR /app

# Устанавливаем системные зависимости для MySQL и других пакетов
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    build-essential \
    pkg-config \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Копируем зависимости и устанавливаем их
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем код проекта
COPY . .

# Создаем папку для статики
RUN mkdir -p /app/static

# Открываем порт
EXPOSE 8000

# Запускаем сервер (миграции будут в entrypoint)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]