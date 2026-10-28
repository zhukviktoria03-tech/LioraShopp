import type { ProductsShowcaseBlock } from '../types'

/**
 * Рендеринг блоку ProductsShowcase (Бестселери з переходом у Django-магазин)
 */
export function renderProductsShowcaseBlock(block: ProductsShowcaseBlock): string {
  // Іконки-заглушки для товарів косметики
  const productIcons = ['🧴', '💧', '🌸', '🧼', '✨', '🍃']

  const productsHtml = block.products
    .map((product, idx) => {
      const icon = productIcons[idx % productIcons.length]
      return `
      <div class="product-card">
        <div class="product-media">
          ${
            product.badge
              ? `<span class="badge badge-rose badge-corner">${escapeHtml(
                  product.badge
                )}</span>`
              : ''
          }
          <div class="product-icon-wrap">${icon}</div>
        </div>
        <div class="product-body">
          <span class="product-category">${escapeHtml(product.category)}</span>
          <h3>${escapeHtml(product.title)}</h3>
          <p>${escapeHtml(product.description)}</p>
          <div class="product-footer">
            <div class="product-price">
              <span class="price-current">${escapeHtml(product.price)}</span>
              ${
                product.oldPrice
                  ? `<span class="price-old">${escapeHtml(product.oldPrice)}</span>`
                  : ''
              }
            </div>
            <a href="${escapeHtml(
              product.djangoLink
            )}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
              В Django 🛍️
            </a>
          </div>
        </div>
      </div>
    `
    })
    .join('')

  return `
    <section class="products-section" id="products">
      <div class="container">
        <div class="section-header">
          ${
            block.tag
              ? `<span class="tag">${escapeHtml(block.tag)}</span>`
              : ''
          }
          <h2>${escapeHtml(block.title)}</h2>
          ${
            block.subtitle
              ? `<p>${escapeHtml(block.subtitle)}</p>`
              : ''
          }
        </div>
        <div class="products-grid">
          ${productsHtml}
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
