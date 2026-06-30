import type { LocaleCode } from './i18n';

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
};

const DATE_TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  ...DATE_FORMAT_OPTIONS,
  hour: '2-digit',
  minute: '2-digit'
};

export const formatLocalizedDate = (value: string | Date, locale: LocaleCode): string =>
  new Intl.DateTimeFormat(locale, DATE_FORMAT_OPTIONS).format(new Date(value));

export const formatLocalizedDateTime = (value: string | Date, locale: LocaleCode): string =>
  new Intl.DateTimeFormat(locale, DATE_TIME_FORMAT_OPTIONS).format(new Date(value));
