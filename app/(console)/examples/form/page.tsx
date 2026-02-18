import { getTranslations } from 'next-intl/server'
import { ProfileForm } from '@/components/examples/profile-form'

export default async function FormExamplePage() {
  const t = await getTranslations('examples.form')

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-title-3">{t('heading')}</h1>
      <ProfileForm />
    </div>
  )
}
