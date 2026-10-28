import type { PageBlock } from '../types'
import { renderHeroBlock } from '../blocks/HeroBlock'
import { renderWhyUsBlock } from '../blocks/WhyUsBlock'
import { renderBenefitsBlock } from '../blocks/BenefitsBlock'
import { renderProductsShowcaseBlock } from '../blocks/ProductsShowcaseBlock'
import { renderReviewsBlock } from '../blocks/ReviewsBlock'
import { renderFaqBlock } from '../blocks/FaqBlock'
import { renderCtaBlock } from '../blocks/CtaBlock'

/**
 * Головний диспетчер рендерингу блоків сторінки (Page Builder Dispatcher)
 * Приймає масив типізованих блоків і повертає згенерований HTML рядок.
 */
export function renderBlocks(blocks: PageBlock[]): string {
  if (!blocks || blocks.length === 0) {
    return `
      <div class="container" style="padding: 60px 0; text-align: center;">
        <p>Сторінка не містить наповнених блоків. Додайте блоки в Payload CMS.</p>
      </div>
    `
  }

  return blocks
    .map((block) => {
      switch (block.type) {
        case 'hero':
          return renderHeroBlock(block)
        case 'whyUs':
          return renderWhyUsBlock(block)
        case 'benefits':
          return renderBenefitsBlock(block)
        case 'productsShowcase':
          return renderProductsShowcaseBlock(block)
        case 'reviews':
          return renderReviewsBlock(block)
        case 'faq':
          return renderFaqBlock(block)
        case 'cta':
          return renderCtaBlock(block)
        default:
          console.warn(`Невідомий тип блоку: ${(block as any)?.type}`)
          return `<!-- Невідомий блок -->`
      }
    })
    .join('\n')
}
