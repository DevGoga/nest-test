## Описание
Тестовое задания, описание задания дано в [task.md](./task.md)

## От себя
* Очень много времени ушло, чтобы разобраться с TypeORM, раньше с ним не работал
* Кеширование никогда не делал, сделал как получилось. Сейчас оно прям в бизнес-логике,
то есть в сервисе. Мне кажется это не совсем правильно, кеширование должно быть где-то до сервиса,
и не участвовать в бизнес-логике. Но работает)
* С юнит-тестами работал очень мало, +- какие-то накидал, не совсем уверен в их полезности, но хотя бы работают)
И мне кажется я сделал e2e тесты. 
* Часть тестов для Article сделал навскидку, они почему-то не проходят, хотя, если повторять те же действия
через Swagger, то всё работает. Как будто очистка базы работает моментально. К моменту expect в базе уже ничего нет.

## Установка
Для начала установите зависимости
```shell
npm ci
```

Затем подготовьте ваш `.env` файл
```shell
cp .env.example .env
```

## Запуск проекта
Запуск в dev-режиме
```shell
npm run start
```

Сборка
```shell
npm run build
```

Запуск в prod-режиме
```shell
npm run start:prod
```

## Swagger
Документация Swagger доступна после запуска проекта, по адресу http://localhost:3000/docs

## Тесты
Доступны e2e тесты
```shell
npm run start test:e2e
```

## Миграции
Создание новой миграции `<name>`
```shell
npm run migration:generate --name=<name>
```

Запуск миграций
```shell
npm run migration:run
```

Откат последней миграции
```shell
npm run migration:revert
```
