import type { JSONSchema6 } from 'json-schema'

export type Formatter = (
  code: string,
  syntax: string,
  config: Record<string, unknown>,
) => string

export async function loadWasm(url: string): Promise<Formatter> {
  const { default: init, format } = await import(/* @vite-ignore */ url)
  await init()
  return format
}

export const configSchema: JSONSchema6 = {
  type: 'object',
  properties: {
    printWidth: {
      type: 'integer',
      default: 80,
      minimum: 0,
    },
    useTabs: {
      type: 'boolean',
      default: false,
    },
    indentWidth: {
      type: 'integer',
      default: 2,
      minimum: 0,
    },
    lineBreak: {
      type: 'string',
      enum: ['lf', 'crlf'],
      default: 'lf',
    },
    hexCase: {
      type: 'string',
      enum: ['ignore', 'lower', 'upper'],
      default: 'lower',
    },
    quotes: {
      type: 'string',
      enum: ['alwaysDouble', 'alwaysSingle', 'preferDouble', 'preferSingle'],
      default: 'alwaysDouble',
    },
    operatorLinebreak: {
      type: 'string',
      enum: ['before', 'after'],
      default: 'after',
    },
    blockSelectorLinebreak: {
      type: 'string',
      enum: ['always', 'consistent', 'wrap'],
      default: 'consistent',
    },
    omitZeroBeforeDot: {
      type: 'boolean',
      default: false,
    },
    trailingComma: {
      type: 'boolean',
      default: false,
    },
  },
  additionalProperties: false,
}
