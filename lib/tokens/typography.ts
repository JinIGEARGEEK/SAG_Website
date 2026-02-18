/**
 * Typography utility class definitions referencing CSS variables from design-tokens.css.
 * Each entry maps a CSS class name → CSS properties.
 * These are registered as Tailwind utilities in app/globals.css @layer utilities.
 */
export const typos = {
  '.text-title-1':     { fontSize: 'var(--font-title-1-size)', lineHeight: 'var(--font-title-1-lh)', fontWeight: 'var(--font-title-1-weight)' },
  '.text-title-2':     { fontSize: 'var(--font-title-2-size)', lineHeight: 'var(--font-title-2-lh)', fontWeight: 'var(--font-title-2-weight)' },
  '.text-title-3':     { fontSize: 'var(--font-title-3-size)', lineHeight: 'var(--font-title-3-lh)', fontWeight: 'var(--font-title-3-weight)' },
  '.text-title-4':     { fontSize: 'var(--font-title-4-size)', lineHeight: 'var(--font-title-4-lh)', fontWeight: 'var(--font-title-4-weight)' },
  '.text-title-5':     { fontSize: 'var(--font-title-5-size)', lineHeight: 'var(--font-title-5-lh)', fontWeight: 'var(--font-title-5-weight)' },
  '.text-title-6':     { fontSize: 'var(--font-title-6-size)', lineHeight: 'var(--font-title-6-lh)', fontWeight: 'var(--font-title-6-weight)' },
  '.text-subtitle':    { fontSize: 'var(--font-title-6-size)', lineHeight: 'var(--font-title-6-lh)', fontWeight: 'var(--font-title-5-weight)' },
  '.text-body':        { fontSize: 'var(--font-body-size)',    lineHeight: 'var(--font-body-lh)',    fontWeight: 'var(--font-body-weight)' },
  '.text-body-small':  { fontSize: 'var(--font-body-sm-size)', lineHeight: 'var(--font-body-sm-lh)', fontWeight: 'var(--font-body-sm-weight)' },
  '.text-body-tiny':   { fontSize: 'var(--font-body-xs-size)', lineHeight: 'var(--font-body-xs-lh)', fontWeight: 'var(--font-body-xs-weight)' },
  '.text-button':      { fontSize: 'var(--font-button-size)',  lineHeight: 'var(--font-button-lh)',  fontWeight: 'var(--font-button-weight)' },
  '.text-button-small':{ fontSize: 'var(--font-button-sm-size)', lineHeight: 'var(--font-button-sm-lh)', fontWeight: 'var(--font-button-sm-weight)' },
  '.text-link':        { fontSize: 'var(--font-link-size)',    lineHeight: 'var(--font-link-lh)',    fontWeight: 'var(--font-link-weight)' },
} as const
