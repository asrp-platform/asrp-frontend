# KODA.md — Контекст проекта

## Обзор проекта

**Название:** rsapa-fronted-next  
**Версия:** 0.1.0  
**Назначение:** Веб-приложение для ASRP (American Society of Russian-Speaking Pathologists) — профессиональной некоммерческой организации для русскоязычных патологов в США.

**Целевая аудитория:** Русскоязычные патологи, ординаторы и исследователи в США.

**Основные функции:**
- Информация о миссии, видении и деятельности организации
- Приём заявок на членство (membership applications)
- Система управления членством с различными типами (ACTIVE, TRAINEE, AFFILIATE, HONORARY, PATHWAY)
- Форма для волонтёрства и участия в деятельности (Get Involved)
- Информирование о новостях и событиях
- Образовательные ресурсы и менторские программы
- Приём пожертвований и спонсорской поддержки
- Контактная форма для связи
- Административная панель для управления данными

## Технологии и стек

### Фронтенд
- **Framework:** Next.js 16.2.3 (App Router)
- **Язык:** TypeScript 5
- **UI-библиотеки:** 
  - Material-UI (MUI) 7.3.6
  - Ant Design 6.0.1
  - Lucide React (иконки)
- **State Management:** 
  - React Query (TanStack Query) 5.96.2 для серверного состояния
  - React Context API для глобального состояния (Auth, Permissions, CookieConsent)
- **Формы:** Ant Design Forms
- **Редактор текста:** Tiptap 3.15.1
- **HTTP-клиент:** Axios 1.13.2 с автоматической обработкой refresh токенов
- **Стилизация:** SCSS с модулями (`*.module.scss`)
- **React версия:** 19.2.0

### Инструменты разработки
- **Линтер:** ESLint 9 с TypeScript ESLint
- **Форматирование:** Prettier 3.7.4
- **Git hooks:** Husky 9.1.7 + lint-staged
- **Сборка:** npm + Docker
- **Контейнеризация:** Docker (node:20-alpine)

### Архитектурные паттерны
- **Feature-Sliced Design (FSD)** — используется структура папок:
  - `src/entities/` — бизнес-сущности (User, Membership, Payment и т.д.)
  - `src/features/` — пользовательские сценарии (формы, модальные окна)
  - `src/widgets/` — составные компоненты UI
  - `src/shared/` — переиспользуемые утилиты, хуки, UI-компоненты
  - `src/app/` — роутинг и страницы (Next.js App Router)
  - `src/context/` — провайдеры глобального состояния

### Путь-алиасы
```
@/* → ./src/*
@shared/* → ./src/shared/*
@entities/* → ./src/entities/*
@features/* → ./src/features/*
@widgets/* → ./src/widgets/*
@app/* → ./src/app/*
```

## Сборка и запуск

### Предварительные требования
- Node.js 20+
- npm 9+
- Docker (для контейнерного запуска)

### Переменные окружения

Создайте файл `.env` на основе `.env-template`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

Для продакшена используйте `/api` как базовый URL.

### Команды разработки

```bash
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшн-версии
npm start

# Линтинг кода
npm run lint

# Проверка типов TypeScript
npm run type-check

# Форматирование кода
npm run format

# Проверка форматирования
npm run format:check
```

### Запуск через Docker

```bash
# Сборка контейнера
docker build --build-arg NEXT_PUBLIC_API_URL=/api -t max31ru12/asrp-prod-frontend:latest -f ./docker/Dockerfile .

# Запуск контейнера
docker run -d -p 3000:3000 --name asrp_frontend --network asrp-backend_default max31ru12/asrp-prod-frontend:latest

# Пуш в DockerHub
docker push max31ru12/asrp-prod-frontend:latest

# Пул из DockerHub
docker pull max31ru12/asrp-prod-frontend:latest
```

## Структура проекта

```
src/
├── app/                          # Next.js App Router
│   ├── (main)/                   # Основной роут (с Header/Footer)
│   │   ├── page.tsx              # Главная страница
│   │   ├── about/                # О организации
│   │   ├── contacts/             # Контакты
│   │   ├── education/            # Образовательные ресурсы
│   │   ├── mentorship/           # Программа менторства
│   │   ├── membership/           # Членство
│   │   ├── news-and-events/      # Новости и события
│   │   ├── donations-and-sponsorship/  # Пожертвования
│   │   └── policies/             # Политики
│   ├── (administration)/         # Административная панель
│   ├── (auth)/                   # Авторизация
│   ├── (site)/                   # Публичная часть сайта
│   ├── layout.tsx                # Корневой лейаут
│   └── globals.scss              # Глобальные стили
├── context/                      # Глобальные контексты
│   ├── AuthProvider.tsx          # Аутентификация
│   ├── PermissionsProvider.tsx   # Права доступа
│   └── providers.tsx             # Корневой провайдер
├── entities/                     # Бизнес-сущности
│   ├── User.ts
│   ├── Membership.ts
│   ├── Payment.ts
│   ├── Permission.ts
│   └── ...
├── features/                     # Фичи (пользовательские сценарии)
│   ├── ContactForm/
│   ├── MembershipApplicationForm/
│   ├── GetInvolvedForm/
│   ├── ChangePasswordFormReset/
│   └── ...
├── shared/                       # Общие компоненты и утилиты
│   ├── backend/                  # API запросы
│   │   ├── queries/              # React Query хуки
│   │   └── restApiUrls/          # URL эндпоинтов
│   ├── helpers/                  # Утилитарные функции
│   ├── hooks/                    # Кастомные хуки
│   ├── types/                    # TypeScript типы
│   └── ui/                       # Переиспользуемые UI компоненты
└── widgets/                      # Составные компоненты
    ├── Header/
    ├── Footer/
    ├── Card/
    ├── TableDropdown/
    └── TiptapEditor/
```

## API и бэкенд

### Конфигурация Axios
- Базовый URL: `process.env.NEXT_PUBLIC_API_URL` (по умолчанию `http://127.0.0.1:8000/api`)
- Автоматическая вставка JWT токена из `localStorage`
- Автоматический refresh токена при 401 ошибке
- Куки передаются с запросами (`withCredentials: true`)

### Основные эндпоинты
- `/api/auth/refresh` — обновление access токена
- `/api/current-user` — получение данных текущего пользователя
- Административные эндпоинты в `/api/admin/`

### Типы данных (основные сущности)

#### Membership
```typescript
enum MembershipTypeEnum {
    ACTIVE = "ACTIVE",
    TRAINEE = "TRAINEE",
    AFFILIATE = "AFFILIATE",
    HONORARY = "HONORARY",
    PATHWAY = "PATHWAY",
}

enum MembershipRequestStatusEnum {
    SUBMITTED = "SUBMITTED",
    PAYMENT_PENDING = "PAYMENT_PENDING",
    PAID = "PAID",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    PAYMENT_FAILED = "PAYMENT_FAILED",
    PAYMENT_EXPIRED = "PAYMENT_EXPIRED",
}
```

## Правила разработки

### Git и ветки
Все ветки должны создаваться из `develop`:
- `feature/*` — новые функции
- `release/*` — релизные ветки
- `hotfix/*` — срочные исправления
- `bugfix/*` — исправления багов

### Naming conventions

#### Commit messages
Используются [conventional commits](https://www.conventionalcommits.org/):
- `feat:` — новые функции
- `fix:` — исправления багов
- `docs:` — изменения документации
- `refactor:` — рефакторинг без изменения поведения
- `test:` — тесты
- `chore:` — технические задачи

#### Pull requests
- `Feature: *`
- `Release: *`
- `Hotfix: *`
- `Bugfix: *`

### Код-стайл

#### ESLint правила
- Строгая типизация TypeScript
- `no-unused-vars` отключён, используется `@typescript-eslint/no-unused-vars`
- Переменные, игнорируемые линтером, должны начинаться с `_`
- Предупреждения для `@typescript-eslint/no-explicit-any`
- React Hooks правила (exhaustive-deps)
- React Refresh правила (only-export-components)

#### Форматирование
- Prettier для всех JS/TS файлов
- Автоматическое форматирование через Husky перед коммитом

#### Структура компонентов
- Используется Feature-Sliced Design
- Компоненты должны быть типизированы через TypeScript
- Стили в SCSS модулях (`*.module.scss`)
- Избегать `any` типов, использовать явные типы

### Тестирование
Тесты пока не настроены (TODO). Рекомендуется добавить:
- Unit тесты для утилит и хуков
- Integration тесты для API запросов
- E2E тесты для критических путей пользователя

## Ключевые файлы

### Конфигурация
- `package.json` — зависимости и скрипты
- `tsconfig.json` — конфигурация TypeScript с путевыми алиасами
- `next.config.ts` — конфигурация Next.js (standalone output)
- `eslint.config.mjs` — правила линтинга
- `.prettierrc` — правила форматирования
- `docker/Dockerfile` — Docker сборка

### Основной код
- `src/app/layout.tsx` — корневой лейаут с провайдерами
- `src/context/providers.tsx` — настройка React Query и контекстов
- `src/axios.ts` — конфигурация API клиента
- `src/shared/types/interfaces.ts` — общие интерфейсы для API

### Сущности
- `src/entities/User.ts` — тип пользователя
- `src/entities/Membership.ts` — типы членства
- `src/entities/Payments.ts` — типы платежей

## SEO и метаданные

Проект использует Next.js Metadata API для SEO:
- **Site URL:** https://asrpath.org
- **Title шаблон:** `%s | ASRP`
- **Open Graph** и **Twitter Card** настроены
- **Robots:** индексация разрешена

## Примечания

- Приложение является клиентской частью (frontend) с SSR/SSG поддержкой через Next.js
- Авторизация через JWT токены с refresh механизмом
- Права доступа реализованы через PermissionGuard компоненты
- Используются защищённые роуты для административной панели
- Реализован CookieConsentProvider для соответствия GDPR
