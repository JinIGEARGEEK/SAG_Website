import { getTranslations, getLocale } from 'next-intl/server'
import { LocaleSwitcher } from '@/components/examples/locale-switcher'

export default async function I18nExamplePage() {
  const t = await getTranslations('examples.i18n')
  const locale = await getLocale()

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-title-3">{t('heading')}</h1>
      <LocaleSwitcher currentLocale={locale} />
    </div>
  )
}
