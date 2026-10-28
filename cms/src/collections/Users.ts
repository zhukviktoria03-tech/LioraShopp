import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'role'],
  },
  auth: true,
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
    admin: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: "Ім'я користувача",
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      label: 'Роль',
      defaultValue: 'editor',
      options: [
        { label: 'Адміністратор', value: 'admin' },
        { label: 'Контент-редактор', value: 'editor' },
      ],
      required: true,
    },
  ],
}
