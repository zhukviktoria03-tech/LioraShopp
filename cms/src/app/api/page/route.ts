import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pathParam = searchParams.get('path') || '/'

    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: pathParam,
        },
      },
      limit: 1,
    })

    if (!result.docs || result.docs.length === 0) {
      return NextResponse.json(
        {
          error: `Сторінку за шляхом "${pathParam}" не знайдено. Перевірте колекцію Pages в Payload CMS.`,
        },
        {
          status: 404,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
    }

    const pageDoc = result.docs[0]

    // Трансформуємо блоки у чистий плоский вигляд для фронтенду
    const cleanBlocks = (pageDoc.layout || []).map((block: any) => {
      const type = block.blockType || block.type
      const { blockType, ...rest } = block
      return {
        type,
        ...rest,
      }
    })

    const responseData = {
      title: pageDoc.title,
      slug: pageDoc.slug,
      metaDescription: pageDoc.metaDescription || '',
      updatedAt: pageDoc.updatedAt,
      blocks: cleanBlocks,
    }

    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error: any) {
    console.error('Помилка в /api/page:', error)
    return NextResponse.json(
      {
        error: 'Помилка отримання сторінки з бази даних Neon PostgreSQL',
        details: error?.message || String(error),
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
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
