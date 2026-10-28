import { redirect } from 'next/navigation'

/**
 * Коренева сторінка CMS — автоматично перенаправляє на адмін-панель Payload.
 * Відвідувачі кореневого URL одразу потрапляють до панелі керування контентом.
 */
export default function RootPage() {
  redirect('/admin')
}
