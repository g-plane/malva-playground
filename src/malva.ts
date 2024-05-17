export type Formatter = (
  code: string,
  syntax: string,
  config: MalvaConfig,
) => string

export async function loadWasm(url: string): Promise<Formatter> {
  const { default: init, format } = await import(/* @vite-ignore */ url)
  await init()
  return format
}

export interface MalvaConfig {
  printWidth?: number
  useTabs?: boolean
  indentWidth?: number
  lineBreak?: 'lf' | 'crlf'
  [key: string]: unknown
}
