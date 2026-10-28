import type { CommonData, PageData, ApiResponse } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

/**
 * Резервні дані (Fallback Data) для автономної демонстрації LioraShop,
 * якщо Payload CMS сервер або Neon DB ще не запущені локально.
 */
export const FALLBACK_COMMON: CommonData = {
  header: {
    brandName: 'LioraShop',
    tagline: 'Натуральна косметика ручної роботи',
    navItems: [
      { label: 'Чому ми?', url: '#why-us' },
      { label: 'Переваги', url: '#benefits' },
      { label: 'Бестселери', url: '#products' },
      { label: 'Відгуки', url: '#reviews' },
      { label: 'FAQ', url: '#faq' },
    ],
    hotlinePhone: '+380 (67) 890-45-12',
    djangoShopUrl: 'https://liorashop-django.example.com/',
  },
  footer: {
    brandName: 'LioraShop',
    description:
      'LioraShop — гармонія чистої природи, органічних екстрактів та дбайливого догляду за вашою шкірою щодня.',
    copyright: '© 2026 LioraShop. Всі права захищено. Студентський звіт з практики.',
    djangoNotice:
      'Цей промо-лендінг розроблено на Payload CMS & TypeScript для залучення клієнтів до основного Django-магазину.',
    socialLinks: [
      { name: 'Instagram', url: 'https://instagram.com/liorashop' },
      { name: 'Telegram', url: 'https://t.me/liorashop' },
      { name: 'TikTok', url: 'https://tiktok.com/@liorashop' },
    ],
  },
}

export const FALLBACK_PAGE: PageData = {
  title: 'Головна сторінка LioraShop — Натуральна косметика',
  slug: '/',
  metaDescription:
    'Офіційний промо-лендінг бренду натуральної косметики LioraShop. Переходьте до нашого Django-магазину за знижками!',
  blocks: [
    {
      type: 'hero',
      badge: '🌿 100% Органічні формули без хімікатів',
      title: 'Ніжність природи для твого щоденного сяйва',
      subtitle:
        'Забудьте про агресивні сульфати та штучні консерванти. LioraShop — це авторська косметика ручної роботи на основі чистих рослинних екстрактів, гідролатів та цінних олій. Переконайтеся самі!',
      primaryButtonText: 'Перейти до покупок в Django-магазин 🛍️',
      primaryButtonUrl: 'https://liorashop-django.example.com/catalog/',
      secondaryButtonText: 'Чому саме LioraShop? ✨',
      secondaryButtonUrl: '#why-us',
      stats: [
        { value: '100%', label: 'Чисті органічні компоненти' },
        { value: '5 000+', label: 'Щасливих клієнток' },
        { value: '0%', label: 'Штучних барвників та парабенів' },
        { value: '4.9/5', label: 'Середня оцінка якості' },
      ],
    },
    {
      type: 'whyUs',
      sectionTag: 'ПЕРЕВАГИ НАД МАСМАРКЕТОМ',
      title: 'Чому варто обрати косметику LioraShop замість звичайного масмаркету?',
      description:
        'Більшість засобів з мас-маркету містять до 80% води, дешеві нафтопродукти та силікони, що дають лише тимчасовий візуальний ефект. LioraShop працює на клітинному рівні.',
      comparisonItems: [
        {
          feature: 'Основа складу',
          lioraAdvantage: 'Квіткові гідролати та натуральні рослинні олії першого холодного віджиму',
          massMarketDisadvantage: 'Мінеральні олії (продукти нафтопереробки), силікони та дешева вода',
        },
        {
          feature: 'Свіжість та терміни',
          lioraAdvantage: 'Виготовляється невеликими партіями щотижня, максимальна концентрація активів',
          massMarketDisadvantage: 'Зберігається на складах роками завдяки токсичним парабенам та консервантам',
        },
        {
          feature: 'Турбота про тварин та довкілля',
          lioraAdvantage: 'Етичне Cruelty-Free виробництво, біорозкладна та скляна еко-упаковка',
          massMarketDisadvantage: 'Тестування на тваринах і непереробний дешевий пластик',
        },
        {
          feature: 'Результат на шкірі',
          lioraAdvantage: 'Глибоке накопичувальне відновлення природного мікробіому та сяйво',
          massMarketDisadvantage: 'Штучна плівка силікону, що забиває пори та сушить шкіру',
        },
      ],
    },
    {
      type: 'benefits',
      title: 'Фундаментальні принципи бренду LioraShop',
      items: [
        {
          icon: '🌱',
          title: 'Сертифікована органіка',
          text: 'Кожна рослина, ефірна олія та екстракт проходять лабораторний контроль якості та чистоти.',
        },
        {
          icon: '🐰',
          title: '100% Cruelty-Free',
          text: 'Ми категорично проти будь-якого тестування на тваринах. Наші формули безпечні від природи.',
        },
        {
          icon: '✨',
          title: 'Дерматологічний баланс',
          text: 'Усі засоби адаптовані під чутливу шкіру, підтримують фізіологічний pH 5.5 та не викликають алергії.',
        },
        {
          icon: '📦',
          title: 'Швидка доставка з Django-складу',
          text: 'Оформлюйте замовлення в один клік у нашому Django-магазині з відправкою день у день по всій Україні.',
        },
      ],
    },
    {
      type: 'productsShowcase',
      tag: 'БЕСТСЕЛЕРИ LIORASHOP',
      title: 'Улюблені засоби наших покупців',
      subtitle:
        'Погляньте на ці хіти, а для вибору повного асортименту, об\'ємів та оформлення кошика переходьте до нашого основного Django-магазину!',
      products: [
        {
          title: 'Крем «Ніжна Роса» з центелою та керамідами',
          category: 'Догляд за обличчям',
          price: '480 ₴',
          oldPrice: '560 ₴',
          description:
            'Глибоке зволоження 24 години, відновлення захисного бар\'єру шкіри та зняття почервонінь.',
          badge: 'ХІТ ПРОДАЖІВ 🔥',
          djangoLink: 'https://liorashop-django.example.com/product/dew-cream/',
        },
        {
          title: 'Антиоксидантна сироватка з Вітаміном C 15%',
          category: 'Сироватки',
          price: '540 ₴',
          oldPrice: '620 ₴',
          description:
            'Освітлює пігментацію, стимулює вироблення природного колагену та дарує бездоганний тон.',
          badge: 'ТОП ВИБІР ✨',
          djangoLink: 'https://liorashop-django.example.com/product/vitamin-c-serum/',
        },
        {
          title: 'Трояндовий гідролат дистиляції сорту Дамаська',
          category: 'Тонізація',
          price: '290 ₴',
          oldPrice: '',
          description:
            '100% чистий дистилят пелюсток троянд. М\'яко звужує пори, освіжає та готує до нанесення крему.',
          badge: 'NEW 🌸',
          djangoLink: 'https://liorashop-django.example.com/product/rose-hydrolat/',
        },
        {
          title: 'Делікатна пінка з екстрактом ромашки та вівса',
          category: 'Очищення',
          price: '340 ₴',
          oldPrice: '390 ₴',
          description:
            'М\'яке фізіологічне очищення без відчуття стягнутості навіть для сухої та атопічної шкіри.',
          badge: 'ECO CHOICE 🌿',
          djangoLink: 'https://liorashop-django.example.com/product/chamomile-foam/',
        },
      ],
    },
    {
      type: 'reviews',
      title: 'Щирі відгуки наших покупців',
      reviewsList: [
        {
          author: 'Олена Ковальчук',
          city: 'Київ',
          rating: 5,
          comment:
            'Раніше користувалася люксовою косметикою, але постійно турбувала сухість. Спробувала крем «Ніжна Роса» у LioraShop — і це кохання! Шкіра нарешті відпочила і сяє.',
          productPurchased: 'Крем «Ніжна Роса»',
        },
        {
          author: 'Марія Мельник',
          city: 'Львів',
          rating: 5,
          comment:
            'Дуже зручно, що на цьому промо-лендінгу можна прочитати все про натуральний склад і одразу перейти в Django-магазин та оформити замовлення. Доставка приїхала на наступний день!',
          productPurchased: 'Сироватка з вітаміном С',
        },
        {
          author: 'Анастасія Бойко',
          city: 'Одеса',
          rating: 5,
          comment:
            'Аромат трояндового гідролату — це щось неймовірне. Жодного спирту, тільки чиста свіжість. Дякую за якісну українську косметику!',
          productPurchased: 'Трояндовий гідролат',
        },
      ],
    },
    {
      type: 'faq',
      title: 'Часті запитання та відповіді',
      items: [
        {
          question: 'Чому цей сайт зроблено як промо-лендінг, а не повноцінний магазин?',
          answer:
            'Цей лендінг створено на Payload CMS & TypeScript у рамках курсу практики. Він презентує філософію бренду, а всі транзакції та управління замовленнями реалізовано на нашому основному бекенді Python Django.',
        },
        {
          question: 'Який термін придатності косметики без хімічних консервантів?',
          answer:
            'Завдяки натуральним рослинним антиоксидантам (екстракт розмарину, вітамін E) термін зберігання становить від 6 до 9 місяців у закритому вигляді та до 4 місяців після відкриття.',
        },
        {
          question: 'Як оформити замовлення та отримати знижку?',
          answer:
            'Натисніть на будь-яку кнопку «Перейти до каталогу в Django-магазині», оберіть потрібні позиції та введіть промокод LIORAVIBE для отримання знижки -15%!',
        },
        {
          question: 'Чи є засоби безпечними для алергіків?',
          answer:
            'Так, усі наші засоби є гіпоалергенними та протестованими. Проте ми завжди рекомендуємо провести патч-тест на зап\'ястку перед першим використанням будь-якого нового продукту.',
        },
      ],
    },
    {
      type: 'cta',
      title: 'Оберіть здоровий та природний догляд вже сьогодні',
      text: 'Переходьте до нашого основного Django-магазину прямо зараз та скористайтеся промокодом на спеціальну знижку -15% для першого замовлення!',
      promoCode: 'LIORAVIBE',
      buttonText: 'Перейти до основного магазину на Django →',
      buttonUrl: 'https://liorashop-django.example.com/',
    },
  ],
}

/**
 * Отримання глобальних налаштувань сайту (Header/Footer)
 */
export async function fetchCommonData(): Promise<ApiResponse<CommonData>> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const response = await fetch(`${API_BASE_URL}/api/common`, {
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`)
    }

    const data: CommonData = await response.json()
    return { data, error: null, status: response.status, isFallback: false }
  } catch (error) {
    console.warn('Сервер CMS недоступний, використовується демо-режим (Common):', error)
    return { data: FALLBACK_COMMON, error: null, status: 200, isFallback: true }
  }
}

/**
 * Отримання сторінки та її блоків за вказаним шляхом (path)
 */
export async function fetchPageData(path: string = '/'): Promise<ApiResponse<PageData>> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const response = await fetch(`${API_BASE_URL}/api/page?path=${encodeURIComponent(path)}`, {
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Помилка отримання сторінки (HTTP ${response.status})`)
    }

    const data: PageData = await response.json()
    return { data, error: null, status: response.status, isFallback: false }
  } catch (error: any) {
    console.warn('Сервер CMS недоступний, використовується демо-режим (Page):', error)
    return {
      data: FALLBACK_PAGE,
      error: null,
      status: 200,
      isFallback: true,
    }
  }
}
