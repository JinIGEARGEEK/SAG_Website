import { getTranslations } from 'next-intl/server'
import { CounterDemo } from '@/components/examples/counter-demo'

export default async function StateExamplePage() {
  const t = await getTranslations('examples.state')

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-title-3">{t('heading')}</h1>
      <CounterDemo />
    </div>
  )
}
