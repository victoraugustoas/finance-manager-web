import { format, formatDistance, formatRelative, type Locale } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

import ptBRCommon from '../assets/locales/pt-BR/common.json'
import ptBRNav from '../assets/locales/pt-BR/nav.json'
import ptBRDashboard from '../assets/locales/pt-BR/dashboard.json'
import ptBRTransactions from '../assets/locales/pt-BR/transactions.json'
import ptBRCategories from '../assets/locales/pt-BR/categories.json'

import enCommon from '../assets/locales/en/common.json'
import enNav from '../assets/locales/en/nav.json'
import enDashboard from '../assets/locales/en/dashboard.json'
import enTransactions from '../assets/locales/en/transactions.json'
import enCategories from '../assets/locales/en/categories.json'

i18n.use(initReactI18next).init({
  lng: 'pt-BR',
  fallbackLng: 'en',
  defaultNS: 'common',
  resources: {
    'pt-BR': {
      common: ptBRCommon,
      nav: ptBRNav,
      dashboard: ptBRDashboard,
      transactions: ptBRTransactions,
      categories: ptBRCategories,
    },
    en: {
      common: enCommon,
      nav: enNav,
      dashboard: enDashboard,
      transactions: enTransactions,
      categories: enCategories,
    },
  },
  interpolation: { escapeValue: false },
})

const dateFnsLocales: Record<string, Locale> = {
  'pt-BR': ptBR,
  en: enUS,
}

function resolveLocale(lng: string): Locale {
  return dateFnsLocales[lng] ?? dateFnsLocales[lng.split('-')[0]] ?? enUS
}

export type DateFormatOptions = {
  formatStr?: string
  locale?: Locale
}

export type FormatDateFn = (date: Date | number, options?: DateFormatOptions) => string
export type FormatDistanceFn = (date: Date | number, baseDate: Date | number) => string
export type FormatRelativeFn = (date: Date | number, baseDate: Date | number) => string

export type TranslateOptions = {
  count?: number
  defaultValue?: string
  [key: string]: unknown
}

export type TranslateFn = (key: string, options?: TranslateOptions) => string

export type UseTranslateReturn = {
  /** Traduz uma chave do namespace ativo.
   * @example
   * t('cancel')                              // "Cancelar"
   * t('type_outgo')                          // "Saída"
   * t('row_summary', { count: 5, pct: 32 })  // "5 transações · 32%"
   */
  t: TranslateFn

  /** Código do idioma ativo, ex: `"pt-BR"` ou `"en"`. */
  locale: string

  /** Troca o idioma ativo e atualiza todos os componentes que usam `useTranslate`.
   * @example
   * await changeLocale('en')
   */
  changeLocale: (locale: string) => Promise<void>

  /** Formata uma data usando `date-fns/format` com o locale ativo.
   * O `formatStr` aceita qualquer token do date-fns; padrão: `'P'` (data curta localizada).
   * @example
   * formatDate(new Date())                          // "24/05/2026"  (pt-BR)
   * formatDate(new Date(), { formatStr: 'PPP' })    // "24 de maio de 2026"
   */
  formatDate: FormatDateFn

  /** Retorna a distância entre duas datas em linguagem natural com sufixo.
   * @example
   * formatDistance(pastDate, new Date())  // "há 3 dias"
   */
  formatDistance: FormatDistanceFn

  /** Formata uma data em relação a uma data base (hoje, ontem, dia da semana…).
   * @example
   * formatRelative(pastDate, new Date())  // "segunda-feira às 14:30"
   */
  formatRelative: FormatRelativeFn
}

export function useTranslate(namespace?: string): UseTranslateReturn {
  const { t, i18n: instance } = useTranslation(namespace)
  const dateFnsLocale = resolveLocale(instance.language)

  return {
    t: (key, options) => String(t(key, options as never)),
    locale: instance.language,
    changeLocale: (locale) => instance.changeLanguage(locale).then(() => undefined),
    formatDate: (date, options) =>
      format(date, options?.formatStr ?? 'P', {
        locale: options?.locale ?? dateFnsLocale,
      }),
    formatDistance: (date, baseDate) =>
      formatDistance(date, baseDate, { locale: dateFnsLocale, addSuffix: true }),
    formatRelative: (date, baseDate) =>
      formatRelative(date, baseDate, { locale: dateFnsLocale }),
  }
}
