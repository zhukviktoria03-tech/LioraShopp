import type { UserRole } from '../types'

export type RoleSelectCallback = (role: UserRole) => void

const ADMIN_URL = 'http://localhost:3000/admin'

/**
 * Відображення початкового екрану з назвою LioraShop та вибором ролі:
 * 1) Клієнт сайту (перегляд промо-лендінгу)
 * 2) Адміністратор CMS (перехід до адмін-панелі Payload CMS)
 */
export function initRoleModal(onSelectRole: RoleSelectCallback) {
  const container = document.getElementById('role-modal-container')
  if (!container) return

  // Перевіряємо, чи вже був зроблений вибір у цій сесії (за замовчуванням показуємо при кожному відкритті)
  const savedRole = sessionStorage.getItem('liorashop_role') as UserRole | null

  // Рендеримо плаваючий віджет у кутку
  renderFloatingPill(savedRole || 'guest', onSelectRole)

  // Якщо ролі ще немає, показуємо початковий модал
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

function showModal(container: HTMLElement, onSelectRole: RoleSelectCallback) {
  container.innerHTML = `
    <div class="role-modal-overlay" id="role-modal-overlay">
      <div class="role-modal-card">
        <div class="logo-badge">🌸</div>
        <h2>LioraShop</h2>
        <p class="subtitle">Ласкаво просимо! Оберіть роль для демонстрації вебзастосунку:</p>

        <div class="role-options-grid">
          <!-- Опція 1: Відвідувач / Клієнт сайту -->
          <div class="role-card-btn" id="btn-select-guest">
            <div class="role-card-icon">🛍️</div>
            <h3>Я Користувач</h3>
            <p>Переглянути промо-лендінг, порівняння з масмаркетом, бестселери та отримати знижку в Django-магазині.</p>
            <span class="btn btn-primary btn-sm" style="margin-top: auto; width: 100%;">
              Увійти як клієнт →
            </span>
          </div>

          <!-- Опція 2: Адміністратор CMS -->
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

  // Слухач для кнопки "Я Користувач"
  document.getElementById('btn-select-guest')?.addEventListener('click', () => {
    sessionStorage.setItem('liorashop_role', 'guest')
    container.innerHTML = ''
    renderFloatingPill('guest', onSelectRole)
    onSelectRole('guest')
  })

  // Слухач для кнопки "Я Адміністратор"
  document.getElementById('btn-select-admin')?.addEventListener('click', () => {
    sessionStorage.setItem('liorashop_role', 'admin')
    container.innerHTML = ''
    renderFloatingPill('admin', onSelectRole)

    // Сповіщення та перехід
    const proceed = confirm(
      'Ви обрали роль Адміністратора. Зараз відбудеться перехід до панелі керування Payload CMS (/admin).\n\nПереконайтеся, що бекенд запущено: npm run dev:cms (порт 3000).\n\nБажаєте перейти зараз?'
    )
    if (proceed) {
      window.location.href = ADMIN_URL
    } else {
      onSelectRole('admin')
    }
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

  pill.innerHTML = `
    <span>Роль: <strong>${roleText}</strong></span>
    <button id="btn-switch-role" title="Змінити роль">Змінити</button>
    <a href="${ADMIN_URL}" target="_blank" title="Відкрити Payload CMS Admin" style="font-size: 0.75rem; text-decoration: underline; color: var(--color-sage-dark);">CMS ↗</a>
  `

  document.getElementById('btn-switch-role')?.addEventListener('click', () => {
    showRoleModal(onSelectRole)
  })
}
