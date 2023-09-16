<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { sharedOptions } from '../shared-monaco-options'
  import type { MalvaConfig } from '../malva'

  export let value: string
  export let monaco: typeof import('monaco-editor')
  export let config: MalvaConfig
  export let syntax: string
  let el: HTMLDivElement
  let editor: import('monaco-editor').editor.IStandaloneCodeEditor | undefined

  $: {
    editor?.setValue(value)
  }
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
    editor = monaco.editor.create(el, {
      ...sharedOptions,
      renderWhitespace: 'boundary',
      value,
      language: 'css',
      readOnly: true,
    })

    window.addEventListener('resize', handleResize)
  })

  onDestroy(() => {
    window.removeEventListener('resize', handleResize)
    editor?.dispose()
  })
</script>

<div class="h-full border-l-width-1px" bind:this={el} />
