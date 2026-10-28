import type { BenefitsBlock } from '../types'

/**
 * Рендеринг блоку Benefits (Ключові переваги LioraShop)
 */
export function renderBenefitsBlock(block: BenefitsBlock): string {
  const itemsHtml = block.items
    .map(
      (item) => `
    <div class="benefit-card">
      <div class="benefit-icon">${item.icon}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </div>
  `
    )
    .join('')

  return `
    <section class="benefits-section" id="benefits">
      <div class="container">
        <h2>${escapeHtml(block.title)}</h2>
        <div class="benefits-grid">
          ${itemsHtml}
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
