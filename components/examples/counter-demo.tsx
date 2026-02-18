'use client'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/stores/app-store'

export function CounterDemo() {
  const t = useTranslations('examples.state')
  const { count, increment, reset } = useAppStore()

  return (
    <div className="space-y-4">
      <p className="text-title-4">{t('count', { count })}</p>
      <div className="flex gap-2">
        <Button onClick={increment}>{t('increment')}</Button>
        <Button onClick={reset} variant="outline">Reset</Button>
      </div>
      <p className="text-body-small text-muted-foreground">
        Switch tabs and come back — the count persists (Zustand global state).
      </p>
    </div>
  )
}
