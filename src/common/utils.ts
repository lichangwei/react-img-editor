export function uuid() {
  return '_' + Math.random().toString(36).substr(2, 9)
}

export const i18n = {
  t: (key: string) => '',
}