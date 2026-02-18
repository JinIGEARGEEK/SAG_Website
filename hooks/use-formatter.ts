'use client'
import dayjs from '@/lib/dayjs'
import numeral from 'numeral'

export function useFormatter() {
  const dateFormat = (value: Date | string) => dayjs(value).format('DD/MM/BBBB')
  const timeFormat = (value: Date | string) => dayjs(value).format('HH:mm')
  const dateTimeFormat = (value: Date | string) => dayjs(value).format('DD/MM/YY HH:mm')
  const utcFormat = (value: Date | string) => dayjs(value).utc().format()
  const phoneFormat = (value: string) => value.replace(/(\d{3})(\d{3})(\d{3,4})/, '$1-$2-$3')
  const idCardFormat = (value: string) => value.replace(/(\d)(?=(\d{4})+$)/g, '$1-')
  const numberFormat = (value: number) => numeral(value).format('0,0')
  const priceFormat = (value: number) => numeral(value).format('0,0.00')
  const mbToBytes = (mb: number) => mb * 1024 * 1024

  return { dateFormat, timeFormat, dateTimeFormat, utcFormat, phoneFormat, idCardFormat, numberFormat, priceFormat, mbToBytes }
}
