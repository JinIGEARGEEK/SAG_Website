'use client'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { setLocale } from '@/actions/locale'
import { useOptimistic, useTransition } from 'react'

interface LocaleSwitcherProps {
  currentLocale: string
}

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const t = useTranslations('examples.i18n')
  const [isPending, startTransition] = useTransition()
  const [optimisticLocale, setOptimisticLocale] = useOptimistic(currentLocale)

  const nextLocale = optimisticLocale === 'en' ? 'th' : 'en'

  function handleSwitch() {
    startTransition(async () => {
      setOptimisticLocale(nextLocale)
      await setLocale(nextLocale as 'en' | 'th')
    })
  }

  return (
    <div className="space-y-3">
      <p className="text-body">{t('greeting', { name: 'Admin' })}</p>
      <p className="text-body-small text-muted-foreground">
        Current locale: <strong>{optimisticLocale}</strong>
      </p>
      <Button onClick={handleSwitch} disabled={isPending} variant="outline">
        {t('switchTo')}
      </Button>
    </div>
  )
}
