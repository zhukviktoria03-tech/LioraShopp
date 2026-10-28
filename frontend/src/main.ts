import './styles/main.css'
import type { CommonData, PageData, UIState, UserRole } from './types'
import { fetchCommonData, fetchPageData } from './services/api'
import { renderBlocks } from './render/renderBlocks'
import { initRoleModal } from './components/RoleModal'

/**
 * Головний контролер клієнтського застосунку LioraShop
 */
class LioraShopApp {
  private appContainer: HTMLElement
  private uiState: UIState = 'loading'
  private commonData: CommonData | null = null
  private pageData: PageData | null = null
  private isFallbackMode: boolean = false
  private currentRole: UserRole = 'guest'

  constructor() {
    const el = document.getElementById('app')
    if (!el) throw new Error('Root #app container not found')
    this.appContainer = el
  }

  public init() {
    // 1. Ініціалізація початкового екрану вибору ролі
    initRoleModal((role: UserRole) => {
      this.currentRole = role
      this.loadApplication()
    })
  }

  /**
   * Завантаження даних з Payload CMS через кастомні API ендпоінти
   */
  private async loadApplication() {
    this.setUIState('loading')

    try {
      // Паралельний запит до /api/common та /api/page?path=/
      const [commonRes, pageRes] = await Promise.all([
        fetchCommonData(),
        fetchPageData('/'),
      ])

      this.isFallbackMode = !!(commonRes.isFallback || pageRes.isFallback)

      if (commonRes.data && pageRes.data) {
        this.commonData = commonRes.data
        this.pageData = pageRes.data
        this.setUIState('ready')
      } else {
        throw new Error('Не вдалося отримати коректні дані з API')
      }
    } catch (err: any) {
      console.error('Помилка завантаження LioraShop:', err)
      this.setUIState('error', err?.message || 'Не вдалося підключитися до сервера CMS')
    }
  }

  /**
   * Керування станами користувацького інтерфейсу:
   * - 'loading': спінер завантаження
   * - 'error': повідомлення про помилку з кнопкою повтору
   * - 'ready': повноцінне відмальовування сторінки
   */
  private setUIState(state: UIState, errorMessage?: string) {
    this.uiState = state

    switch (state) {
      case 'loading':
        this.renderLoading()
        break
      case 'error':
        this.renderError(errorMessage || 'Виникла непередбачувана помилка під час запиту')
        break
      case 'ready':
        this.renderReady()
        break
    }
  }

  /**
   * Стан 1: Завантаження (Loading State)
   */
  private renderLoading() {
    this.appContainer.innerHTML = `
      <div class="initial-loader">
        <div class="loader-content">
          <div class="flower-spin">🌸</div>
          <h2>LioraShop</h2>
          <p>Завантажуємо природну косметику та налаштування...</p>
        </div>
      </div>
    `
  }

  /**
   * Стан 2: Помилка (Error State)
   */
  private renderError(message: string) {
    this.appContainer.innerHTML = `
      <div class="error-container">
        <div class="error-card">
          <div class="error-icon">🥀</div>
          <h2>Щось пішло не так</h2>
          <p>${escapeHtml(message)}</p>
          <p style="font-size: 0.85rem; color: var(--color-text-light);">
            Перевірте, чи запущено сервер Payload CMS на порті 3000 та чи активне підключення до Neon PostgreSQL.
          </p>
          <div class="error-actions">
            <button id="btn-retry" class="btn btn-primary btn-sm">
              Спробувати знову 🔄
            </button>
            <button id="btn-fallback" class="btn btn-outline btn-sm">
              Увімкнути демо-режим ✨
            </button>
          </div>
        </div>
      </div>
    `

    document.getElementById('btn-retry')?.addEventListener('click', () => {
      this.loadApplication()
    })

    document.getElementById('btn-fallback')?.addEventListener('click', () => {
      this.isFallbackMode = true
      this.loadApplication()
    })
  }

  /**
   * Стан 3: Готовність (Ready State) — відмальовування всього DOM-дерева
   */
  private renderReady() {
    if (!this.commonData || !this.pageData) return

    const { header, footer } = this.commonData

    const fallbackNotice = this.isFallbackMode
      ? `
        <div class="fallback-banner">
          <span>🌿 <strong>Автономний демо-режим:</strong> відображаються локальні дані LioraShop. Для керування через Neon DB запустіть: <code>npm run dev:cms</code></span>
        </div>
      `
      : ''

    const headerHtml = `
      <header class="site-header">
        <div class="container header-inner">
          <div class="header-brand">
            <span class="brand-flower">🌸</span>
            <div class="brand-info">
              <h1>${escapeHtml(header.brandName)}</h1>
              <span>${escapeHtml(header.tagline || '')}</span>
            </div>
          </div>

          <nav class="header-nav">
            ${header.navItems
              .map(
                (item) => `
              <a href="${escapeHtml(item.url)}">${escapeHtml(item.label)}</a>
            `
              )
              .join('')}
          </nav>

          <div class="header-actions">
            <a href="${escapeHtml(
              header.djangoShopUrl
            )}" target="_blank" rel="noopener noreferrer" class="btn btn-rose btn-sm">
              Django-магазин 🛍️
            </a>
          </div>
        </div>
      </header>
    `

    const contentHtml = renderBlocks(this.pageData.blocks)

    const footerHtml = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-info">
              <h3>🌸 ${escapeHtml(footer.brandName)}</h3>
              <p>${escapeHtml(footer.description)}</p>
            </div>
            <div class="footer-django-notice">
              <strong>Зв'язок із бекендом на Python Django:</strong>
              <p>${escapeHtml(footer.djangoNotice)}</p>
              <p style="margin-top: 8px;">
                <a href="${escapeHtml(
                  header.djangoShopUrl
                )}" target="_blank" rel="noopener noreferrer">
                  Перейти до каталогу та кошика в Django →
                </a>
              </p>
            </div>
          </div>

          <div class="footer-bottom">
            <span>${escapeHtml(footer.copyright)}</span>
            <div class="footer-socials">
              ${footer.socialLinks
                .map(
                  (s) => `
                <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
                    s.name
                  )}</a>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
      </footer>
    `

    this.appContainer.innerHTML = `
      ${fallbackNotice}
      ${headerHtml}
      <main>
        ${contentHtml}
      </main>
      ${footerHtml}
    `

    // Підключення інтерактивних обробників подій (FAQ accordion)
    this.attachEventListeners()
  }

  /**
   * Навішування слухачів подій на згенерований HTML
   */
  private attachEventListeners() {
    // Акордеон для FAQ
    const faqItems = this.appContainer.querySelectorAll('.faq-item')
    faqItems.forEach((item) => {
      const question = item.querySelector('.faq-question')
      question?.addEventListener('click', () => {
        const isActive = item.classList.contains('active')
        // Закриваємо інші відкриті
        faqItems.forEach((other) => other.classList.remove('active'))
        if (!isActive) {
          item.classList.add('active')
        }
      })
    })
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Запуск застосунку після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
  const app = new LioraShopApp()
  app.init()
})
