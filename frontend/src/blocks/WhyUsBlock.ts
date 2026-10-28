import type { WhyUsBlock } from '../types'

/**
 * Рендеринг блоку WhyUs (Порівняння та переконання обрати LioraShop замість масмаркету)
 */
export function renderWhyUsBlock(block: WhyUsBlock): string {
  const rowsHtml = block.comparisonItems
    .map(
      (item) => `
    <div class="comparison-row">
      <div class="feature-name">
        <span>🌿</span>
        <strong>${escapeHtml(item.feature)}</strong>
      </div>
      <div class="liora-col">
        <strong>LioraShop:</strong> ${escapeHtml(item.lioraAdvantage)}
      </div>
      <div class="mass-col">
        <strong>Масмаркет:</strong> ${escapeHtml(item.massMarketDisadvantage)}
      </div>
    </div>
  `
    )
    .join('')

  return `
    <section class="why-us-section" id="why-us">
      <div class="container">
        <div class="section-header">
          ${
            block.sectionTag
              ? `<span class="tag">${escapeHtml(block.sectionTag)}</span>`
              : ''
          }
          <h2>${escapeHtml(block.title)}</h2>
          ${
            block.description
              ? `<p>${escapeHtml(block.description)}</p>`
              : ''
          }
        </div>

        <div class="comparison-table-wrapper">
          <div class="comparison-row header-row">
            <div>Критерій оцінки</div>
            <div>🌿 Авторська косметика LioraShop</div>
            <div>❌ Звичайний фабричний масмаркет</div>
          </div>
          ${rowsHtml}
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
