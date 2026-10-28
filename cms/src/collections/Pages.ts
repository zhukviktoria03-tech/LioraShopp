import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Назва сторінки',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL шлях (Slug)',
      required: true,
      unique: true,
      admin: {
        description: 'Вкажіть "/" для головної сторінки LioraShop',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'SEO опис (Meta Description)',
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Блоки сторінки (Page Builder)',
      minRows: 1,
      blocks: [
        // Блок 1: Hero (Головний банер)
        {
          slug: 'hero',
          labels: {
            singular: 'Hero банер',
            plural: 'Hero банери',
          },
          fields: [
            {
              name: 'badge',
              type: 'text',
              label: 'Бейдж (наприклад: 🌿 100% Органічна косметика)',
              defaultValue: '🌿 Створено природою, вдосконалено з любов\'ю',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Головний заголовок',
              required: true,
              defaultValue: 'Природна краса у кожній краплині LioraShop',
            },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Підзаголовок / Короткий опис',
              defaultValue: 'Відкрийте для себе ніжний догляд без агресивних хімікатів. Ексклюзивні авторські формули, що дарують вашій шкірі природне сяйво.',
            },
            {
              name: 'primaryButtonText',
              type: 'text',
              label: 'Текст основної кнопки',
              defaultValue: 'Перейти до каталогу в Django-магазині',
            },
            {
              name: 'primaryButtonUrl',
              type: 'text',
              label: 'Посилання основної кнопки',
              defaultValue: 'https://liorashop-django.example.com/catalog/',
            },
            {
              name: 'secondaryButtonText',
              type: 'text',
              label: 'Текст другої кнопки',
              defaultValue: 'Чому саме ми?',
            },
            {
              name: 'secondaryButtonUrl',
              type: 'text',
              label: 'Якір / Посилання другої кнопки',
              defaultValue: '#why-us',
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Статистика бренду',
              fields: [
                { name: 'value', type: 'text', label: 'Показник', required: true },
                { name: 'label', type: 'text', label: 'Підпис', required: true },
              ],
            },
          ],
        },

        // Блок 2: WhyUs (Чому саме LioraShop, а не масмаркет)
        {
          slug: 'whyUs',
          labels: {
            singular: 'Чому ми (Порівняння)',
            plural: 'Чому ми',
          },
          fields: [
            {
              name: 'sectionTag',
              type: 'text',
              label: 'Тег секції',
              defaultValue: 'ЧОМУ LIORASHOP?',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Заголовок секції',
              required: true,
              defaultValue: 'Чому натуральний догляд LioraShop перевершує звичайний масмаркет',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Опис ідеології бренду',
              defaultValue: 'Ми не просто продаємо косметику — ми створюємо усвідомлений ритуал турботи про вашу красу без шкоди для здоров\'я та довкілля.',
            },
            {
              name: 'comparisonItems',
              type: 'array',
              label: 'Пункти порівняння',
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  label: 'Критерій / Властивість',
                  required: true,
                },
                {
                  name: 'lioraAdvantage',
                  type: 'text',
                  label: 'Як у LioraShop (Перевага)',
                  required: true,
                },
                {
                  name: 'massMarketDisadvantage',
                  type: 'text',
                  label: 'Як у масмаркеті (Недолік)',
                  required: true,
                },
              ],
            },
          ],
        },

        // Блок 3: Benefits (Ключові цінності та переваги)
        {
          slug: 'benefits',
          labels: {
            singular: 'Переваги бренду',
            plural: 'Переваги',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Заголовок секції',
              required: true,
              defaultValue: 'Наші непохитні стандарти якості',
            },
            {
              name: 'items',
              type: 'array',
              label: 'Список переваг',
              fields: [
                { name: 'icon', type: 'text', label: 'Іконка (емодзі або назва)', required: true },
                { name: 'title', type: 'text', label: 'Назва переваги', required: true },
                { name: 'text', type: 'textarea', label: 'Детальний опис', required: true },
              ],
            },
          ],
        },

        // Блок 4: ProductsShowcase (Топ товарів для переходу в Django-магазин)
        {
          slug: 'productsShowcase',
          labels: {
            singular: 'Промо-вітрина товарів',
            plural: 'Промо-вітрини',
          },
          fields: [
            {
              name: 'tag',
              type: 'text',
              label: 'Тег секції',
              defaultValue: 'БЕСТСЕЛЕРИ БРЕНДУ',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Заголовок вітрини',
              required: true,
              defaultValue: 'Фаворити наших клієнтів',
            },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Підзаголовок',
              defaultValue: 'Обирайте засоби на цьому промо-лендінгу та замовляйте повний об\'єм у нашому головному Django-магазині зі спеціальною знижкою!',
            },
            {
              name: 'products',
              type: 'array',
              label: 'Список товарів',
              fields: [
                { name: 'title', type: 'text', label: 'Назва товару', required: true },
                { name: 'category', type: 'text', label: 'Категорія', required: true },
                { name: 'price', type: 'text', label: 'Ціна (наприклад: 420 ₴)', required: true },
                { name: 'oldPrice', type: 'text', label: 'Стара ціна (якщо є знижка)' },
                { name: 'description', type: 'textarea', label: 'Короткий опис засобу', required: true },
                { name: 'badge', type: 'text', label: 'Маркер (Хіт / New / Еко)' },
                { name: 'djangoLink', type: 'text', label: 'Посилання на товар у Django', required: true },
              ],
            },
          ],
        },

        // Блок 5: Reviews (Відгуки покупців)
        {
          slug: 'reviews',
          labels: {
            singular: 'Відгуки клієнтів',
            plural: 'Відгуки',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Заголовок блоку',
              defaultValue: 'Що кажуть ті, хто вже обрав LioraShop',
            },
            {
              name: 'reviewsList',
              type: 'array',
              label: 'Список відгуків',
              fields: [
                { name: 'author', type: 'text', label: "Ім'я клієнта", required: true },
                { name: 'city', type: 'text', label: 'Місто', defaultValue: 'Київ' },
                { name: 'rating', type: 'number', label: 'Оцінка (1-5)', min: 1, max: 5, defaultValue: 5 },
                { name: 'comment', type: 'textarea', label: 'Текст відгуку', required: true },
                { name: 'productPurchased', type: 'text', label: 'Придбаний засіб' },
              ],
            },
          ],
        },

        // Блок 6: FAQ (Часті запитання)
        {
          slug: 'faq',
          labels: {
            singular: 'Часті запитання (FAQ)',
            plural: 'FAQ',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Заголовок FAQ',
              defaultValue: 'Відповіді на поширені запитання',
            },
            {
              name: 'items',
              type: 'array',
              label: 'Запитання та відповіді',
              fields: [
                { name: 'question', type: 'text', label: 'Запитання', required: true },
                { name: 'answer', type: 'textarea', label: 'Відповідь', required: true },
              ],
            },
          ],
        },

        // Блок 7: CTA (Заклик до переходу в Django-магазин)
        {
          slug: 'cta',
          labels: {
            singular: 'Заклик до дії (CTA)',
            plural: 'CTA блоки',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Головний заклик',
              required: true,
              defaultValue: 'Готові подарувати своїй шкірі справжню природну ніжність?',
            },
            {
              name: 'text',
              type: 'textarea',
              label: 'Текст пропозиції з промокодом',
              defaultValue: 'Переходьте до нашого основного Django-магазину, вказуйте промокод LIORAVIBE на сторінці замовлення та отримуйте знижку -15% на весь асортимент!',
            },
            {
              name: 'promoCode',
              type: 'text',
              label: 'Промокод',
              defaultValue: 'LIORAVIBE',
            },
            {
              name: 'buttonText',
              type: 'text',
              label: 'Текст кнопки переходу',
              defaultValue: 'Перейти в Django-магазин за покупками →',
            },
            {
              name: 'buttonUrl',
              type: 'text',
              label: 'URL Django магазину',
              defaultValue: 'https://liorashop-django.example.com/',
            },
          ],
        },
      ],
    },
  ],
}
