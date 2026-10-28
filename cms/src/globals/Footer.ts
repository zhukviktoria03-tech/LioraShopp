import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Підвал сайту (Footer)',
  fields: [
    {
      name: 'brandName',
      type: 'text',
      label: 'Назва бренду',
      defaultValue: 'LioraShop',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Короткий опис / маніфест у футері',
      defaultValue: 'LioraShop — ваш провідник у світ безпечного, чистого та естетичного органічного догляду. Ми поєднуємо природні екстракти з науковим підходом.',
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Текст копірайту',
      defaultValue: '© 2026 LioraShop. Всі права захищено. Студентський проєкт практики.',
    },
    {
      name: 'djangoNotice',
      type: 'text',
      label: 'Повідомлення про зв\'язок з Django бекендом',
      defaultValue: 'Цей промо-лендінг розроблено на Payload CMS & TypeScript як вітрину для переходу до повнофункціонального магазину LioraShop на Python Django.',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Соціальні мережі',
      fields: [
        { name: 'name', type: 'text', label: 'Мережа (Instagram, Telegram тощо)', required: true },
        { name: 'url', type: 'text', label: 'Посилання', required: true },
      ],
    },
  ],
}
