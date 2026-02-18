'use client'
import { useFormatter } from '@/hooks/use-formatter'

const SAMPLE_DATE = '2024-06-15T09:30:00Z'
const SAMPLE_PHONE = '0812345678'
const SAMPLE_ID = '1234567890123'
const SAMPLE_NUMBER = 1234567
const SAMPLE_PRICE = 9999.99

export function FormatterDemo() {
  const { dateFormat, timeFormat, dateTimeFormat, utcFormat, phoneFormat, idCardFormat, numberFormat, priceFormat, mbToBytes } = useFormatter()

  const rows: { label: string; value: string }[] = [
    { label: 'dateFormat',     value: dateFormat(SAMPLE_DATE) },
    { label: 'timeFormat',     value: timeFormat(SAMPLE_DATE) },
    { label: 'dateTimeFormat', value: dateTimeFormat(SAMPLE_DATE) },
    { label: 'utcFormat',      value: utcFormat(SAMPLE_DATE) },
    { label: 'phoneFormat',    value: phoneFormat(SAMPLE_PHONE) },
    { label: 'idCardFormat',   value: idCardFormat(SAMPLE_ID) },
    { label: 'numberFormat',   value: numberFormat(SAMPLE_NUMBER) },
    { label: 'priceFormat',    value: priceFormat(SAMPLE_PRICE) },
    { label: 'mbToBytes(5)',   value: mbToBytes(5).toLocaleString() + ' bytes' },
  ]

  return (
    <div className="max-w-md rounded-lg border">
      <table className="w-full text-body-small">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-2 text-left font-medium">Function</th>
            <th className="px-4 py-2 text-left font-medium">Output</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, value }) => (
            <tr key={label} className="border-b last:border-0">
              <td className="px-4 py-2 font-mono text-muted-foreground">{label}</td>
              <td className="px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
