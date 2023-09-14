import { Base64 } from 'js-base64'
import { gzip, ungzip } from 'pako'

export type ShareableData = {
  inputCode: string
  config: string
}

export function share({ inputCode, config }: ShareableData) {
  const url = new URL(location.href)
  url.searchParams.set('code', encodeString(inputCode))
  url.searchParams.set('config', encodeString(config))
  history.replaceState(null, '', url.toString())
  navigator.clipboard.writeText(url.toString())
}

export function retrieve(): ShareableData {
  const searchParams = new URLSearchParams(location.search)
  const code = searchParams.get('code')
  const config = searchParams.get('config')

  return {
    inputCode: code ? ungzip(Base64.toUint8Array(code), { to: 'string' }) : '',
    config: config ? ungzip(Base64.toUint8Array(config), { to: 'string' }) : '',
  }
}

export function encodeString(str: string): string {
  return Base64.fromUint8Array(gzip(str))
}
