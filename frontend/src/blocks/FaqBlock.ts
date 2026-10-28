import type { FaqBlock } from '../types'

/**
 * Рендеринг блоку FAQ (Акордеон частих запитань)
 */
export function renderFaqBlock(block: FaqBlock): string {
  const itemsHtml = block.items
    .map(
      (item, idx) => `
    <div class="faq-item" data-faq-index="${idx}">
      <div class="faq-question">
        <span>${escapeHtml(item.question)}</span>
        <span class="faq-toggle-icon">+</span>
      </div>
      <div class="faq-answer">
        <p>${escapeHtml(item.answer)}</p>
      </div>
    </div>
  `
    )
    .join('')

  return `
    <section class="faq-section" id="faq">
      <div class="container">
        <h2>${escapeHtml(block.title)}</h2>
        <div class="faq-list">
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
