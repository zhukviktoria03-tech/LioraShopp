/**
 * ============================================================================
 * LioraShop — Модуль типізації на TypeScript
 * Демонстрація: Type Aliases, Union Types, Intersection Types, Generics
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. ТИПОВІ ПСЕВДОНІМИ (Type Aliases)
// ----------------------------------------------------------------------------

/** Тип ролі користувача в системі */
export type UserRole = 'guest' | 'admin' | 'editor'

/** Стан завантаження інтерфейсу (UI State) */
export type UIState = 'loading' | 'error' | 'ready'

/** Допустимі типи блоків у конструкторі сторінок (Page Builder) */
export type BlockType =
  | 'hero'
  | 'whyUs'
  | 'benefits'
  | 'productsShowcase'
  | 'reviews'
  | 'faq'
  | 'cta'

/** HTTP методи для запитів до API */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

/** Формат ідентифікаторів у системі */
export type ID = string | number

// ----------------------------------------------------------------------------
// 2. БАЗОВІ ТА ПЕРЕТИННІ ТИПИ (Intersection Types)
// ----------------------------------------------------------------------------

/** Базовий інтерфейс будь-якого блоку CMS */
export type BaseBlock = {
  id?: string
  type: BlockType
  order?: number
}

/** Властивості тимчасових міток (створення/оновлення) */
export type Timestamped = {
  createdAt?: string
  updatedAt?: string
}

/** Інформація про зображення/медіа */
export type MediaItem = {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
}

// ----------------------------------------------------------------------------
// 3. КОНКРЕТНІ ТИПИ ДАНИХ ДЛЯ КОЖНОГО БЛОКУ (Intersection Types)
// ----------------------------------------------------------------------------

/** Статистичний показник для Hero-блоку */
export type StatItem = {
  value: string
  label: string
}

/** Блок 1: Hero — Головний банер */
export type HeroBlock = BaseBlock & {
  type: 'hero'
  badge?: string
  title: string
  subtitle: string
  primaryButtonText: string
  primaryButtonUrl: string
  secondaryButtonText?: string
  secondaryButtonUrl?: string
  stats?: StatItem[]
}

/** Елемент порівняння косметики LioraShop із масмаркетом */
export type ComparisonItem = {
  feature: string
  lioraAdvantage: string
  massMarketDisadvantage: string
}

/** Блок 2: WhyUs — Порівняння та аргументи покупки */
export type WhyUsBlock = BaseBlock & {
  type: 'whyUs'
  sectionTag?: string
  title: string
  description?: string
  comparisonItems: ComparisonItem[]
}

/** Перевага бренду */
export type BenefitItem = {
  icon: string
  title: string
  text: string
}

/** Блок 3: Benefits — Переваги та стандарти якості */
export type BenefitsBlock = BaseBlock & {
  type: 'benefits'
  title: string
  items: BenefitItem[]
}

/** Товар для промо-вітрини */
export type ProductPromoItem = {
  title: string
  category: string
  price: string
  oldPrice?: string
  description: string
  badge?: string
  djangoLink: string
  imageUrl?: string
}

/** Блок 4: ProductsShowcase — Вітрина товарів для переходу в Django */
export type ProductsShowcaseBlock = BaseBlock & {
  type: 'productsShowcase'
  tag?: string
  title: string
  subtitle?: string
  products: ProductPromoItem[]
}

/** Відгук клієнта */
export type ReviewItem = {
  author: string
  city: string
  rating: number
  comment: string
  productPurchased?: string
}

/** Блок 5: Reviews — Відгуки покупців */
export type ReviewsBlock = BaseBlock & {
  type: 'reviews'
  title: string
  reviewsList: ReviewItem[]
}

/** Елемент запитання-відповідь */
export type FaqItem = {
  question: string
  answer: string
}

/** Блок 6: FAQ — Часті запитання */
export type FaqBlock = BaseBlock & {
  type: 'faq'
  title: string
  items: FaqItem[]
}

/** Блок 7: CTA — Заклик до дії та переходу в Django */
export type CtaBlock = BaseBlock & {
  type: 'cta'
  title: string
  text: string
  promoCode?: string
  buttonText: string
  buttonUrl: string
}

// ----------------------------------------------------------------------------
// 4. ДИСКРИМІНОВАНЕ ОБ'ЄДНАННЯ (Discriminated Union Types)
// Поле 'type' виступає дискримінатором для безпечного розпізнавання блоку
// ----------------------------------------------------------------------------

export type PageBlock =
  | HeroBlock
  | WhyUsBlock
  | BenefitsBlock
  | ProductsShowcaseBlock
  | ReviewsBlock
  | FaqBlock
  | CtaBlock

// ----------------------------------------------------------------------------
// 5. ТИПІЗАЦІЯ ДАНИХ СТОРІНКИ ТА GLOBAL CONFIGS (Intersection)
// ----------------------------------------------------------------------------

/** Пункт навігаційного меню */
export type NavItem = {
  label: string
  url: string
}

/** Посилання на соціальні мережі */
export type SocialLink = {
  name: string
  url: string
}

/** Спільні дані шапки сайту */
export type HeaderData = {
  brandName: string
  tagline?: string
  navItems: NavItem[]
  hotlinePhone?: string
  djangoShopUrl: string
}

/** Спільні дані підвалу сайту */
export type FooterData = {
  brandName: string
  description: string
  copyright: string
  djangoNotice: string
  socialLinks: SocialLink[]
}

/** Відповідь ендпоінту /api/common */
export type CommonData = {
  header: HeaderData
  footer: FooterData
}

/** Структура сторінки, отриманої з Payload CMS через /api/page */
export type PageData = Timestamped & {
  title: string
  slug: string
  metaDescription?: string
  blocks: PageBlock[]
}

// ----------------------------------------------------------------------------
// 6. УЗАГАЛЬНЕНІ ТИПИ (Generics) ТА ТИПІЗАЦІЯ ФУНКЦІЙ
// ----------------------------------------------------------------------------

/** Універсальний тип відповіді API з обробкою помилок */
export type ApiResponse<T> = {
  data: T | null
  error: string | null
  status: number
  isFallback?: boolean
}

/** Стан асинхронного ресурсу на клієнті */
export type AsyncResource<T> =
  | { state: 'loading' }
  | { state: 'error'; message: string; retry: () => void }
  | { state: 'ready'; data: T }

/** Сигнатура функції рендерингу для конкретного блоку */
export type BlockRenderer<T extends BaseBlock> = (block: T) => string
