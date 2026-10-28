import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const header = await payload.findGlobal({
      slug: 'header',
    })

    const footer = await payload.findGlobal({
      slug: 'footer',
    })

    const responseData = {
      header: {
        brandName: header?.brandName || 'LioraShop',
        tagline: header?.tagline || 'Натуральна косметика ручної роботи',
        navItems: header?.navItems || [
          { label: 'Чому ми', url: '#why-us' },
          { label: 'Переваги', url: '#benefits' },
          { label: 'Бестселери', url: '#products' },
          { label: 'Відгуки', url: '#reviews' },
          { label: 'FAQ', url: '#faq' },
        ],
        hotlinePhone: header?.hotlinePhone || '+380 (67) 890-45-12',
        djangoShopUrl: header?.djangoShopUrl || 'https://liorashop-django.example.com/',
      },
      footer: {
        brandName: footer?.brandName || 'LioraShop',
        description:
          footer?.description ||
          'LioraShop — натуральна та органічна косметика для вашої неповторної краси.',
        copyright:
          footer?.copyright ||
          '© 2026 LioraShop. Всі права захищено. Студентська практика.',
        djangoNotice:
          footer?.djangoNotice ||
          'Цей промо-лендінг розроблено на Payload CMS & TypeScript для презентації та переходу до основного магазину на Django.',
        socialLinks: footer?.socialLinks || [
          { name: 'Instagram', url: 'https://instagram.com/liorashop' },
          { name: 'Telegram', url: 'https://t.me/liorashop' },
        ],
      },
    }

    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('Помилка в /api/common:', error)
    return NextResponse.json(
      { error: 'Не вдалося завантажити спільні налаштування (Header/Footer)' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
