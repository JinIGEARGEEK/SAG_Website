import { getTranslations, getLocale } from 'next-intl/server'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LocaleSwitcher } from '@/components/examples/locale-switcher'
import { ProfileForm } from '@/components/examples/profile-form'
import { FormatterDemo } from '@/components/examples/formatter-demo'
import { CounterDemo } from '@/components/examples/counter-demo'
import { ToastDemo } from '@/components/examples/toast-demo'

export default async function ExamplesPage() {
  const t = await getTranslations('examples')
  const locale = await getLocale()

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-title-2">{t('title')}</h1>

      <Tabs defaultValue="i18n">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="i18n">{t('i18n.heading')}</TabsTrigger>
          <TabsTrigger value="form">{t('form.heading')}</TabsTrigger>
          <TabsTrigger value="formatter">{t('formatter.heading')}</TabsTrigger>
          <TabsTrigger value="state">{t('state.heading')}</TabsTrigger>
          <TabsTrigger value="toast">{t('toast.heading')}</TabsTrigger>
        </TabsList>

        <TabsContent value="i18n" className="mt-4 rounded-lg border p-6">
          <h2 className="text-title-5 mb-4">{t('i18n.heading')}</h2>
          <LocaleSwitcher currentLocale={locale} />
        </TabsContent>

        <TabsContent value="form" className="mt-4 rounded-lg border p-6">
          <h2 className="text-title-5 mb-4">{t('form.heading')}</h2>
          <ProfileForm />
        </TabsContent>

        <TabsContent value="formatter" className="mt-4 rounded-lg border p-6">
          <h2 className="text-title-5 mb-4">{t('formatter.heading')}</h2>
          <FormatterDemo />
        </TabsContent>

        <TabsContent value="state" className="mt-4 rounded-lg border p-6">
          <h2 className="text-title-5 mb-4">{t('state.heading')}</h2>
          <CounterDemo />
        </TabsContent>

        <TabsContent value="toast" className="mt-4 rounded-lg border p-6">
          <h2 className="text-title-5 mb-4">{t('toast.heading')}</h2>
          <ToastDemo />
        </TabsContent>
      </Tabs>
    </div>
  )
}
