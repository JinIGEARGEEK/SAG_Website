'use client'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { notify } from '@/lib/toast'

export function ToastDemo() {
  const t = useTranslations('examples.toast')

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => notify.success('Operation completed successfully!')} className="bg-success hover:bg-success-hover text-white">
        {t('success')}
      </Button>
      <Button onClick={() => notify.error('Something went wrong. Please try again.')} variant="destructive">
        {t('error')}
      </Button>
      <Button onClick={() => notify.warning('Please review before proceeding.')} className="bg-warning hover:bg-warning-hover text-black">
        {t('warning')}
      </Button>
      <Button onClick={() => notify.info('Here is some useful information.')} className="bg-info hover:bg-info-hover text-white">
        Info
      </Button>
    </div>
  )
}
