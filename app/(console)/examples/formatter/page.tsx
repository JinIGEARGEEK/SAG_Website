import { getTranslations } from 'next-intl/server'
import { FormatterDemo } from '@/components/examples/formatter-demo'

export default async function FormatterExamplePage() {
  const t = await getTranslations('examples.formatter')

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-title-3">{t('heading')}</h1>
      <FormatterDemo />
    </div>
  )
}
