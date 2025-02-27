## Тестовое задания для Middle Node.JS разработчика
Разработайте простое REST API с использованием NestJS, которое включает в себя аутентификацию, CRUD операции и кэширование данных. Проект должен использовать PostgreSQL для хранения данных и Redis для кэширования.

**Создание API для аутентификации:**

Реализуйте регистрацию и аутентификацию пользователей.

Используйте JWT (JSON Web Tokens) для обработки аутентификации.

**Интеграция с базой данных PostgreSQL с использованием TypeORM:**

Настройте соединение с базой данных.

Используйте миграции для управления структурой базы данных.

**Разработка CRUD API для сущности "Статья":**

Структура "Статьи" должна включать: название, описание, дату публикации, автора.

Реализуйте операции создания, чтения, обновления и удаления статей.

Обеспечьте валидацию входных данных.

Реализуйте пагинацию для запросов списка статей.

Добавьте возможность фильтрации статей по различным критериям (например, по дате публикации, автору).

Создание и обновление статей, должны быть закрыты авторизацией

**Реализация кэширования с использованием Redis:**

Кэшируйте результаты запросов на чтение статей.

Обеспечьте инвалидацию кэша при обновлении или удалении статей.

**Тестирование:**

Напишите unit-тесты для проверки бизнес-логики.

### **Требования к коду и документации:**

Код должен быть чистым, хорошо структурированным и легко читаемым.

Обеспечьте комментарии к коду и документацию API (по желанию) с примерами запросов и ответов.
