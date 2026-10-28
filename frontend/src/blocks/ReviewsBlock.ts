import type { ReviewsBlock } from '../types'

/**
 * Рендеринг блоку Reviews (Відгуки задоволених клієнтів)
 */
export function renderReviewsBlock(block: ReviewsBlock): string {
  const reviewsHtml = block.reviewsList
    .map((review) => {
      const stars = '★'.repeat(Math.min(5, Math.max(1, review.rating)))
      const initials = review.author
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()

      return `
      <div class="review-card">
        <div class="review-stars">${stars}</div>
        <p class="review-text">«${escapeHtml(review.comment)}»</p>
        <div class="review-author-wrap">
          <div class="author-avatar">${escapeHtml(initials)}</div>
          <div class="author-meta">
            <h4>${escapeHtml(review.author)}</h4>
            <span>${escapeHtml(review.city)}${
        review.productPurchased ? ` • ${escapeHtml(review.productPurchased)}` : ''
      }</span>
          </div>
        </div>
      </div>
    `
    })
    .join('')

  return `
    <section class="reviews-section" id="reviews">
      <div class="container">
        <h2>${escapeHtml(block.title)}</h2>
        <div class="reviews-grid">
          ${reviewsHtml}
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
