## Запуск проекта
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
