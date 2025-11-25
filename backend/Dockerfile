FROM python:3.11-slim

WORKDIR /app

# системные зависимости для MySQL и других пакетов
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    build-essential \
    pkg-config \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# зависимости
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# код проекта
COPY . .

# папка для статики
RUN mkdir -p /app/static

# порт
EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]