import type { HeroBlock } from '../types'

/**
 * Рендеринг блоку Hero (Головний банер бренду LioraShop)
 */
export function renderHeroBlock(block: HeroBlock): string {
  const statsHtml =
    block.stats && block.stats.length > 0
      ? `
      <div class="hero-stats">
        ${block.stats
          .map(
            (stat) => `
          <div class="stat-item">
            <h4>${escapeHtml(stat.value)}</h4>
            <p>${escapeHtml(stat.label)}</p>
          </div>
        `
          )
          .join('')}
      </div>
    `
      : ''

  const secondaryBtnHtml =
    block.secondaryButtonText && block.secondaryButtonUrl
      ? `<a href="${escapeHtml(block.secondaryButtonUrl)}" class="btn btn-outline">${escapeHtml(
          block.secondaryButtonText
        )}</a>`
      : ''

  return `
    <section class="hero-section" id="hero">
      <div class="container hero-grid">
        <div class="hero-content">
          ${
            block.badge
              ? `<div class="badge badge-sage">${escapeHtml(block.badge)}</div>`
              : ''
          }
          <h1>${escapeHtml(block.title)}</h1>
          <p class="hero-subtitle">${escapeHtml(block.subtitle)}</p>
          <div class="hero-buttons">
            <a href="${escapeHtml(
              block.primaryButtonUrl
            )}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
              ${escapeHtml(block.primaryButtonText)}
            </a>
            ${secondaryBtnHtml}
          </div>
          ${statsHtml}
        </div>
        <div class="hero-visual">
          <div class="hero-card-showcase">
            <div class="hero-visual-icon">🧴✨</div>
            <div class="badge badge-rose" style="margin-bottom: 12px;">Ексклюзивна формула</div>
            <h3>Органічний догляд LioraShop</h3>
            <p>100% холодний віджим рослинних олій та свіжі гідролати без синтетичних ароматизаторів.</p>
            <a href="${escapeHtml(
              block.primaryButtonUrl
            )}" target="_blank" rel="noopener noreferrer" class="btn btn-rose btn-sm">
              Відкрити Django-магазин →
            </a>
          </div>
        </div>
      </div>
    </section>
  `
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
