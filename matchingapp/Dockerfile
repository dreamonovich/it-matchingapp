FROM python:3.12.1-alpine3.19

WORKDIR /app

RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev \
    && apk add libffi-dev

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
ENV PYTHONUNBUFFERED=1

COPY . .

CMD ["sh", "-c", "python3 manage.py migrate && python3 manage.py runserver $SERVER_ADDRESS"]
