import { getTranslations } from 'next-intl/server'
import { ToastDemo } from '@/components/examples/toast-demo'

export default async function ToastExamplePage() {
  const t = await getTranslations('examples.toast')

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-title-3">{t('heading')}</h1>
      <ToastDemo />
    </div>
  )
}
