import type { editor, languages } from 'monaco-editor'

export const sharedOptions: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  fontFamily: '"Cascadia Code", monospace',
  fontSize: 14,
  lineHeight: 24,
  tabSize: 2,
}

export const cssModeConfiguration: languages.css.ModeConfiguration = {
  colors: false,
  completionItems: true,
  documentFormattingEdits: false,
  documentHighlights: true,
  foldingRanges: true,
  hovers: true,
  references: true,
  rename: true,
  selectionRanges: true,
}
