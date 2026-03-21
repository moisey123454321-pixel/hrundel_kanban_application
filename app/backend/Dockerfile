# ========== Этап сборки ==========
FROM python:3.12-slim AS builder

# Метаданные образа
LABEL maintainer="hrundel delelopers association"
LABEL version="1.0.0"
LABEL description="hrundel kanban backend"

RUN apt-get update && apt-get install -y --no-install-recommends \
         build-essential\
     && rm -rf /var/lib/apt/lists/*

# Создаем виртуальное окружение
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Копируем и устанавливаем зависимости
COPY app/backend/requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# ========== Этап выполнения ==========
FROM python:3.12-slim AS runtime

# Устанавливаем curl для healthcheck и пинг
RUN apt-get update && apt-get install -y --no-install-recommends curl\
    && rm -rf /var/lib/apt/lists/*

# Копируем виртуальное окружение из builder
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Создаем рабочую директорию
WORKDIR /app

# Копируем код приложения
COPY app/backend/src /app

# Создаем non-root пользователя
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Меняем владельца файлов
RUN chown -R appuser:appuser /app
USER appuser

# Открываем порт
EXPOSE 8000

# Команда по умолчанию
CMD ["uvicorn", "backend:app", "--host", "0.0.0.0", "--port", "8000"]
