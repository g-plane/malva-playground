import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import App from './App.svelte'

self.MonacoEnvironment = {
  async getWorker(_, label) {
    switch (label) {
      case 'css':
      case 'scss':
      case 'sass':
      case 'less': {
        const cssWorker = await import(
          'monaco-editor/esm/vs/language/css/css.worker?worker'
        )
        return new cssWorker.default()
      }
      case 'json':
      case 'jsonc': {
        const jsonWorker = await import(
          'monaco-editor/esm/vs/language/json/json.worker?worker'
        )
        return new jsonWorker.default()
      }
      default: {
        const editorWorker = await import(
          'monaco-editor/esm/vs/editor/editor.worker?worker'
        )
        return new editorWorker.default()
      }
    }
  },
}

const app = new App({
  target: document.querySelector('#app')!,
})

export default app
