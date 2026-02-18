/**
 * Color tokens referencing CSS variables from app/design-tokens.css.
 * Change values there; this file maps semantic names → CSS var references.
 * Also used to extend Tailwind v4 @theme inline (see globals.css).
 */
const colors = {
  primary:             'var(--color-primary)',
  secondary:           'var(--color-secondary)',
  'primary-opacity':   'var(--color-primary-opacity)',
  'secondary-opacity': 'var(--color-secondary-opacity)',
  'primary-hover':     'var(--color-primary-hover)',
  'secondary-hover':   'var(--color-secondary-hover)',
  success:             'var(--color-success)',
  'success-hover':     'var(--color-success-hover)',
  info:                'var(--color-info)',
  'info-hover':        'var(--color-info-hover)',
  warning:             'var(--color-warning)',
  'warning-hover':     'var(--color-warning-hover)',
  danger:              'var(--color-danger)',
  'danger-hover':      'var(--color-danger-hover)',
  'success-toast':     'var(--color-success-toast)',
  'success-toast-bg':  'var(--color-success-toast-bg)',
  'info-toast':        'var(--color-info-toast)',
  'info-toast-bg':     'var(--color-info-toast-bg)',
  'warning-toast':     'var(--color-warning-toast)',
  'warning-toast-bg':  'var(--color-warning-toast-bg)',
  'danger-toast':      'var(--color-danger-toast)',
  'danger-toast-bg':   'var(--color-danger-toast-bg)',
  'shadow-1':          'var(--color-shadow-1)',
  'shadow-2':          'var(--color-shadow-2)',
  white:               'var(--color-white)',
  'light-gray-1':      'var(--color-light-gray-1)',
  'light-gray-2':      'var(--color-light-gray-2)',
  gray:                'var(--color-gray)',
  'dark-gray':         'var(--color-dark-gray)',
  black:               'var(--color-black)',
} as const

export default colors
export type ColorToken = keyof typeof colors
