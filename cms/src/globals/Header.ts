import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Шапка сайту (Header)',
  fields: [
    {
      name: 'brandName',
      type: 'text',
      label: 'Назва бренду',
      defaultValue: 'LioraShop',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Слоган під брендом',
      defaultValue: 'Натуральна косметика ручної роботи',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Навігаційні посилання',
      fields: [
        { name: 'label', type: 'text', label: 'Назва пункту', required: true },
        { name: 'url', type: 'text', label: 'Посилання / якір (#)', required: true },
      ],
    },
    {
      name: 'hotlinePhone',
      type: 'text',
      label: 'Телефон гарячої лінії',
      defaultValue: '+380 (67) 890-45-12',
    },
    {
      name: 'djangoShopUrl',
      type: 'text',
      label: 'Посилання на головний Django-магазин',
      defaultValue: 'https://liorashop-django.example.com/',
      required: true,
    },
  ],
}
