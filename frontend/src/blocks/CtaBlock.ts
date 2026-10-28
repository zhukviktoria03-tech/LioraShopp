import type { CtaBlock } from '../types'

/**
 * Рендеринг блоку CTA (Фінальний заклик до переходу в Django-магазин зі знижкою)
 */
export function renderCtaBlock(block: CtaBlock): string {
  const promoHtml = block.promoCode
    ? `
    <div class="promo-pill">
      <span>🎁 Ваш промокод на -15%:</span>
      <span class="promo-code-text">${escapeHtml(block.promoCode)}</span>
    </div>
  `
    : ''

  return `
    <section class="cta-section" id="cta">
      <div class="container">
        <div class="cta-box">
          <div class="badge badge-rose" style="margin-bottom: 16px;">Спеціальна пропозиція</div>
          <h2>${escapeHtml(block.title)}</h2>
          <p>${escapeHtml(block.text)}</p>
          ${promoHtml}
          <div>
            <a href="${escapeHtml(
              block.buttonUrl
            )}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size: 1.1rem; padding: 16px 36px;">
              ${escapeHtml(block.buttonText)}
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
