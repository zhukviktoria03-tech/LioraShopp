import type { UserRole } from '../types'

export type RoleSelectCallback = (role: UserRole) => void

// Визначаємо URL адмінки динамічно:
// 1. Спочатку перевіряємо env змінну VITE_API_URL (Vercel)
// 2. Якщо не задана — відкриваємо input-модал де юзер сам вводить URL
const CMS_BASE = import.meta.env.VITE_API_URL || ''
const ADMIN_URL = CMS_BASE ? `${CMS_BASE}/admin` : ''

export function initRoleModal(onSelectRole: RoleSelectCallback) {
  const container = document.getElementById('role-modal-container')
  if (!container) return

  const savedRole = sessionStorage.getItem('liorashop_role') as UserRole | null

  renderFloatingPill(savedRole || 'guest', onSelectRole)

  if (!savedRole) {
    showModal(container, onSelectRole)
  } else {
    onSelectRole(savedRole)
  }
}

export function showRoleModal(onSelectRole: RoleSelectCallback) {
  const container = document.getElementById('role-modal-container')
  if (!container) return
  showModal(container, onSelectRole)
}

function openAdmin() {
  if (ADMIN_URL) {
    // Env змінна задана — відкриваємо одразу в новій вкладці
    window.open(ADMIN_URL, '_blank')
  } else {
    // Env змінна НЕ задана — показуємо зручний діалог із полем для URL
    showAdminLinkModal()
  }
}

function showAdminLinkModal() {
  // Зберігаємо раніше введений URL (якщо є)
  const saved = localStorage.getItem('liorashop_cms_url') || ''

  const overlay = document.createElement('div')
  overlay.id = 'admin-link-overlay'
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(44,53,46,0.6);backdrop-filter:blur(8px);
    display:flex;align-items:center;justify-content:center;z-index:10000;padding:20px;
  `
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:20px;padding:36px 32px;max-width:520px;width:100%;
                box-shadow:0 20px 60px rgba(0,0,0,0.15);border:1px solid #D1E0D4;text-align:center;">
      <div style="font-size:2.5rem;margin-bottom:12px;">⚙️</div>
      <h2 style="font-family:'Cormorant Garamond',serif;font-size:1.8rem;margin-bottom:8px;color:#2C352E;">
        Payload CMS Admin
      </h2>
      <p style="color:#647366;font-size:0.95rem;margin-bottom:20px;">
        Вкажіть URL твого CMS-проєкту на Vercel:<br>
        <small style="color:#8E9E90;">(наприклад: https://liora-shopp.vercel.app)</small>
      </p>
      <input
        id="cms-url-input"
        type="url"
        placeholder="https://твій-проєкт.vercel.app"
        value="${saved}"
        style="width:100%;padding:12px 16px;border:1px solid #D1E0D4;border-radius:12px;
               font-size:0.95rem;margin-bottom:16px;outline:none;
               font-family:'Plus Jakarta Sans',sans-serif;color:#2C352E;background:#FBF9F5;"
      />
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
        <button id="btn-open-admin" style="
          background:#6B8E73;color:#fff;border:none;border-radius:999px;
          padding:12px 28px;font-size:1rem;font-weight:600;cursor:pointer;
          font-family:'Plus Jakarta Sans',sans-serif;">
          Відкрити адмінку →
        </button>
        <button id="btn-close-admin-modal" style="
          background:transparent;border:1px solid #D1E0D4;border-radius:999px;
          padding:12px 20px;font-size:1rem;color:#647366;cursor:pointer;
          font-family:'Plus Jakarta Sans',sans-serif;">
          Скасувати
        </button>
      </div>
      <p style="margin-top:16px;font-size:0.78rem;color:#8E9E90;">
        💡 URL запам'ятовується у браузері для наступного разу
      </p>
    </div>
  `

  document.body.appendChild(overlay)

  document.getElementById('btn-open-admin')?.addEventListener('click', () => {
    const input = document.getElementById('cms-url-input') as HTMLInputElement
    const url = input.value.trim().replace(/\/$/, '') // прибираємо слеш в кінці
    if (!url) {
      input.style.border = '1px solid #E28D97'
      return
    }
    localStorage.setItem('liorashop_cms_url', url)
    document.body.removeChild(overlay)
    window.open(`${url}/admin`, '_blank')
  })

  document.getElementById('btn-close-admin-modal')?.addEventListener('click', () => {
    document.body.removeChild(overlay)
  })

  // Дозволяємо натискати Enter в інпуті
  const input = document.getElementById('cms-url-input') as HTMLInputElement
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      document.getElementById('btn-open-admin')?.click()
    }
  })
  // Автофокус на поле вводу
  setTimeout(() => input?.focus(), 50)
}

function showModal(container: HTMLElement, onSelectRole: RoleSelectCallback) {
  container.innerHTML = `
    <div class="role-modal-overlay" id="role-modal-overlay">
      <div class="role-modal-card">
        <div class="logo-badge">🌸</div>
        <h2>LioraShop</h2>
        <p class="subtitle">Ласкаво просимо! Оберіть роль для демонстрації вебзастосунку:</p>

        <div class="role-options-grid">
          <div class="role-card-btn" id="btn-select-guest">
            <div class="role-card-icon">🛍️</div>
            <h3>Я Користувач</h3>
            <p>Переглянути промо-лендінг, порівняння з масмаркетом, бестселери та отримати знижку в Django-магазині.</p>
            <span class="btn btn-primary btn-sm" style="margin-top: auto; width: 100%;">
              Увійти як клієнт →
            </span>
          </div>

          <div class="role-card-btn" id="btn-select-admin">
            <div class="role-card-icon">⚙️</div>
            <h3>Я Адміністратор</h3>
            <p>Перейти до адмін-панелі Payload CMS (база даних Neon) для редагування блоків та контенту.</p>
            <span class="btn btn-outline btn-sm" style="margin-top: auto; width: 100%;">
              Відкрити адмінку CMS 🔐
            </span>
          </div>
        </div>

        <div class="role-modal-footer">
          💡 Проєкт практики: Fullstack-застосунок на Payload CMS, TypeScript та Neon PostgreSQL
        </div>
      </div>
    </div>
  `

  document.getElementById('btn-select-guest')?.addEventListener('click', () => {
    sessionStorage.setItem('liorashop_role', 'guest')
    container.innerHTML = ''
    renderFloatingPill('guest', onSelectRole)
    onSelectRole('guest')
  })

  document.getElementById('btn-select-admin')?.addEventListener('click', () => {
    sessionStorage.setItem('liorashop_role', 'admin')
    container.innerHTML = ''
    renderFloatingPill('admin', onSelectRole)
    onSelectRole('admin')
    // Відкриваємо адмінку (з env змінної або через діалог)
    openAdmin()
  })
}

function renderFloatingPill(currentRole: UserRole, onSelectRole: RoleSelectCallback) {
  let pill = document.getElementById('role-floating-pill')
  if (!pill) {
    pill = document.createElement('div')
    pill.id = 'role-floating-pill'
    pill.className = 'role-floating-pill'
    document.body.appendChild(pill)
  }

  const roleText = currentRole === 'admin' ? '⚙️ Адміністратор' : '🌸 Клієнт'
  const adminHref = ADMIN_URL || '#'
  const adminTarget = ADMIN_URL ? '_blank' : ''

  pill.innerHTML = `
    <span>Роль: <strong>${roleText}</strong></span>
    <button id="btn-switch-role" title="Змінити роль">Змінити</button>
    <a
      href="${adminHref}"
      target="${adminTarget}"
      id="pill-cms-link"
      title="Відкрити Payload CMS Admin"
      style="font-size:0.75rem;text-decoration:underline;color:var(--color-sage-dark);"
    >CMS ↗</a>
  `

  document.getElementById('btn-switch-role')?.addEventListener('click', () => {
    showRoleModal(onSelectRole)
  })

  // Якщо ADMIN_URL не задано — відкриваємо діалог із полем для URL
  if (!ADMIN_URL) {
    document.getElementById('pill-cms-link')?.addEventListener('click', (e) => {
      e.preventDefault()
      showAdminLinkModal()
    })
  }
}
