# 🌸 LioraShop — Fullstack Промо-лендінг (Payload CMS + TypeScript + Neon PostgreSQL)

> **Звіт з виробничої/навчальної практики з дисципліни:** «Розробка вебзастосунків на JavaScript / TypeScript»  
> **Розділ 2:** Розробка Fullstack-застосунку на Payload CMS та TypeScript (Гусаров, Юрчишин)  
> **Тема проєкту:** Промо-лендінг бренду натуральної органічної косметики **«LioraShop»**

---

## 📖 1. Огляд проєкту та концепція

**«LioraShop»** — це елегантний презентаційний вебзастосунок (landing page / сайт-візитка) у ніжних кремово-зелено-рожево-жовтих пастельних відтінках. 

Головна мета лендінгу — переконати користувача у перевагах натуральної косметики ручної роботи над фабричним масмаркетом (відсутність токсичних хімікатів, свіжість, Cruelty-Free, екологічність) та спонукати його перейти до основного багатофункціонального інтернет-магазину на **Python Django** для вибору повного асортименту, оформлення замовлення та кошика з промокодом на знижку `-15%`.

### 🔑 Ключові особливості:
- **Монорепозиторій**: чіткий поділ на бекенд-частину CMS (`/cms`) та клієнтську частину (`/frontend`).
- **Бекенд на Payload CMS 3**: автогенерована адмін-панель, підтримка строгих схем і колекцій (Pages, Media, Users) та глобальних сутностей (Header, Footer).
- **Хмарна реляційна БД Neon PostgreSQL**: збереження контенту в хмарі через підключення Connection Pooling (`@payloadcms/db-postgres`).
- **Кастомні плоскі API-ендпоінти**: маршрути `/api/common` та `/api/page?path=` повертають оптимізований JSON без надлишкової вкладеності.
- **Клієнт на Vite + TypeScript**: компонентний блоковий рендеринг, сувора типізація (Type Aliases, Discriminated Unions, Intersection Types, Generics).
- **Початковий екран вибору ролі**: при старті сайту користувачеві доступний вибір ролі («Я Користувач» для перегляду промо-сайту або «Я Адміністратор» для швидкого переходу в адмін-панель CMS).
- **Надійне опрацювання станів UI**: Loading (анімований спінер), Error (вікно діагностики та кнопка повтору), Fallback (автономний демонстраційний режим) та Ready.

---

## 📁 2. Архітектура монорепозиторію

```text
звіт/
├── package.json               # Кореневий package.json для керування монорепозиторієм
├── README.md                  # Документація проєкту та інструкція запуску
├── ЗВІТ_РОЗДІЛ_2_LIORASHOP.md # Повний академічний текст звіту для здачі
│
├── cms/                       # Серверна частина (Payload CMS 3 + Next.js)
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.mjs
│   ├── .env.example           # Приклад змінних оточення (DATABASE_URL, PAYLOAD_SECRET)
│   └── src/
│       ├── payload.config.ts  # Головна конфігурація Payload CMS та адаптера БД Neon
│       ├── collections/       # Колекції бази даних
│       │   ├── Users.ts       # Користувачі та ролі адмінки
│       │   ├── Media.ts       # Завантаження та збереження медіафайлів
│       │   └── Pages.ts       # Сторінки та Page Builder (Hero, WhyUs, Benefits, Products, Reviews, FAQ, CTA)
│       ├── globals/           # Наскрізні глобальні сутності
│       │   ├── Header.ts      # Шапка, логотип, телефон, лінк на Django
│       │   └── Footer.ts      # Підвал, копірайт, соціальні мережі
│       ├── app/api/           # Кастомні ендпоінти
│       │   ├── common/route.ts# GET /api/common
│       │   └── page/route.ts  # GET /api/page?path=
│       └── seed/seed.ts       # Скрипт автоматичного наповнення бази даних контентом
│
└── frontend/                  # Клієнтська частина (Vite + TypeScript)
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── index.html             # Вхідна точка DOM-дерева
    ├── preview.html           # Автономне прев'ю без встановлення залежностей
    └── src/
        ├── main.ts            # Головний контролер життєвого циклу додатка
        ├── types/index.ts     # Повна TypeScript типізація (Union, Intersection, Aliases)
        ├── styles/main.css    # Ніжні пастельні стилі (крем, шавлія, троянда, вершковий)
        ├── components/
        │   └── RoleModal.ts   # Початковий екран вибору ролі (Користувач / Адмін)
        ├── services/
        │   └── api.ts         # Асинхронні виклики API та Fallback Data
        ├── render/
        │   └── renderBlocks.ts# Диспетчер рендерингу блоків
        └── blocks/            # Шаблони окремих блоків сторінки
            ├── HeroBlock.ts
            ├── WhyUsBlock.ts  # Переконання та порівняння з масмаркетом
            ├── BenefitsBlock.ts
            ├── ProductsShowcaseBlock.ts # Товари з посиланням на Django
            ├── ReviewsBlock.ts
            ├── FaqBlock.ts
            └── CtaBlock.ts
```

---

## 🚀 3. Швидкий запуск проєкту локально

### Крок 1. Запуск клієнтської частини (Frontend)
У терміналі перейдіть у папку фронтенду:
```bash
cd frontend
npm install
npm run dev
```
Фронтенд запуститься за адресою: `http://localhost:5173`

> **Порада для швидкої перевірки:**  
> Якщо ви хочете відкрити сайт прямо зараз в один клік без встановлення пакетів, просто відкрийте файл `frontend/preview.html` у вашому браузері (Chrome, Safari, Firefox)!

### Крок 2. Налаштування та запуск Payload CMS (Backend)
1. Створіть файл `cms/.env` на основі `cms/.env.example`:
   ```bash
   cp cms/.env.example cms/.env
   ```
2. Вкажіть ваші дані підключення до Neon (див. розділ 4 нижче):
   ```env
   DATABASE_URL="postgresql://user:password@ep-sample-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"
   PAYLOAD_SECRET="7a3f8b9c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8"
   ```
3. Запустіть бекенд:
   ```bash
   cd cms
   npm install
   npm run dev
   ```
   Панель керування буде доступна за адресою: `http://localhost:3000/admin`  
   API: `http://localhost:3000/api/common` та `http://localhost:3000/api/page?path=/`

---

## 🐘 4. Покрокова інструкція підключення Neon PostgreSQL

1. **Реєстрація та створення проєкту:**
   - Перейдіть на [console.neon.tech](https://console.neon.tech/) та увійдіть (через GitHub або Google).
   - Натисніть кнопку **New Project**.
   - Назвіть проєкт: `liorashop-dev`.
   - Оберіть найближчий регіон (наприклад, `Frankfurt (eu-central-1)`).
   - Натисніть **Create project**.

2. **Отримання `DATABASE_URL` (Connection String):**
   - На головній сторінці дашборду проєкту натисніть кнопку **Connect**.
   - Обов'язково увімкніть галочку **Connection pooling** (у хості з'явиться суфікс `-pooler`).
   - Скопіюйте рядок підключення вигляду:
     ```text
     postgresql://liorashop_owner:abc123xyz@ep-flower-pooler.eu-central-1.aws.neon.tech/liorashop?sslmode=require
     ```

3. **Підключення до локального проєкту:**
   - Вставте скопійований рядок у файл `cms/.env` у змінну `DATABASE_URL`.
   - Згенеруйте секрет для сесій:
     ```bash
     node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
     ```
   - Запишіть згенерований рядок у `PAYLOAD_SECRET`.

4. **Перший запуск та синхронізація таблиць:**
   - Запустіть `npm run dev` у папці `cms/`.
   - Payload автоматично підключиться до Neon та створить усі необхідні таблиці (`pages`, `users`, `media`, `payload_preferences` тощо).
   - Відкрийте `http://localhost:3000/admin` та створіть першого облікового запису адміністратора.

---

## ☁️ 5. Розгортання проєкту на Vercel (Деплой)

1. **Підготовка репозиторію:**
   - Ініціалізуйте git та зробіть коміт (переконайтеся, що `.env` та `node_modules` додані у `.gitignore`):
     ```bash
     git init
     git add .
     git commit -m "feat: complete LioraShop landing with Payload CMS and TypeScript"
     ```
   - Створіть репозиторій на GitHub та запушіть код:
     ```bash
     git remote add origin https://github.com/your-username/liorashop.git
     git branch -M main
     git push -u origin main
     ```

2. **Деплой CMS на Vercel:**
   - Увійдіть на [vercel.com](https://vercel.com/) -> **Add New** -> **Project**.
   - Імпортуйте ваш репозиторій з GitHub.
   - У блоці **Root Directory** натисніть `Edit` і виберіть папку `cms`.
   - У блоці **Framework Preset** залиште `Next.js`.
   - У блоці **Environment Variables** додайте:
     - `DATABASE_URL` = ваш pooled рядок із Neon (без зовнішніх лапок).
     - `PAYLOAD_SECRET` = ваш секретний ключ.
     - `NEXT_PUBLIC_SERVER_URL` = посилання, яке згенерує Vercel (наприклад, `https://liorashop-cms.vercel.app`).
   - Натисніть **Deploy**.

3. **Деплой Frontend на Vercel:**
   - Створіть ще один проєкт на Vercel з цього самого репозиторію.
   - У блоці **Root Directory** виберіть папку `frontend`.
   - Framework Preset визначиться як `Vite`.
   - Додайте змінну оточення:
     - `VITE_API_URL` = URL вашої задеплоєної CMS на Vercel.
   - Натисніть **Deploy**.

---

## 📸 6. Контрольний приклад та демонстрація (Скріншоти)

1. **Початковий екран вибору ролі:**
   - Користувач відкриває сайт і бачить фірмове вікно «LioraShop» із двома кнопками: «Я Користувач» та «Я Адміністратор».
2. **Клієнтський промо-лендінг:**
   - Відмальовування Hero-блоку з кнопками переходу на Django.
   - Блок порівняння «Чому LioraShop?» з масмаркетом.
   - Вітрина бестселерів із кнопками переходу на сторінки товарів у Django.
   - Інтерактивний FAQ-акордеон та CTA-блок із промокодом `LIORAVIBE`.
3. **Панель керування Payload CMS:**
   - Авторизація за адресою `/admin`.
   - Редагування блоків сторінки у колекції Pages.
   - Збереження змін із миттєвою синхронізацією у базі Neon PostgreSQL.
4. **Обробка помилок UI:**
   - Демонстрація поведінки при зупинці сервера CMS: поява картки помилки з кнопкою повтору або перемиканням у режим автономного прев'ю.
