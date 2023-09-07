import type { editor } from 'monaco-editor'

export const sharedOptions: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  fontFamily: '"Cascadia Code", monospace',
  fontSize: 14,
  lineHeight: 24,
  tabSize: 2,
}
