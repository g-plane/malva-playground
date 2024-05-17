<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import type { MalvaConfig } from '../malva'
  import { cssModeConfiguration, sharedOptions } from '../shared-monaco-options'

  export let value: string
  export let monaco: typeof import('monaco-editor')
  export let config: MalvaConfig
  export let syntax: string
  let el: HTMLDivElement
  let editor: import('monaco-editor').editor.IStandaloneCodeEditor | undefined

  const dispatch = createEventDispatcher()

  $: {
    if (editor) {
      editor.updateOptions({
        rulers: [config.printWidth ?? 80],
        tabSize: config.indentWidth ?? 2,
      })
      const model = editor.getModel()
      if (model) {
        model.updateOptions({
          indentSize: config.indentWidth ?? 2,
          insertSpaces: !config.useTabs,
        })
        monaco.editor.setModelLanguage(model, syntax)
      }
    }
  }

  function handleResize() {
    editor?.layout()
  }

  onMount(() => {
    monaco.languages.css.cssDefaults.setModeConfiguration(cssModeConfiguration)
    monaco.languages.css.scssDefaults.setModeConfiguration(cssModeConfiguration)
    monaco.languages.css.lessDefaults.setModeConfiguration(cssModeConfiguration)

    editor = monaco.editor.create(el, {
      ...sharedOptions,
      renderWhitespace: 'boundary',
      value,
      language: 'css',
    })
    editor.onDidChangeModelContent(() => {
      dispatch('input', editor!.getValue())
    })

    window.addEventListener('resize', handleResize)
  })

  onDestroy(() => {
    window.removeEventListener('resize', handleResize)
    editor?.dispose()
  })
</script>

<div bind:this={el}></div>

<style>
  div {
    height: 100%;
    border-bottom-width: 1px;
  }
</style>
