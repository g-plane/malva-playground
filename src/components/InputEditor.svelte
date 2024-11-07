<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import type { MalvaConfig } from '../malva'
  import { cssModeConfiguration, sharedOptions } from '../shared-monaco-options'

  let { value, monaco, config, syntax, onInput }: {
    value: string,
    monaco: typeof import('monaco-editor'),
    config: MalvaConfig,
    syntax: string,
    onInput: (value: string) => void,
  } = $props()
  let el: HTMLDivElement
  let editor: import('monaco-editor').editor.IStandaloneCodeEditor | undefined = $state()

  $effect(() => {
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
  })

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
      if (editor) {
        onInput(editor.getValue())
      }
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
