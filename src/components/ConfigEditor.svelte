<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { sharedOptions } from '../shared-monaco-options'

  let { value, monaco, onInput }: {
    value: string,
    monaco: typeof import('monaco-editor'),
    onInput: (value: string) => void,
  } = $props()
  let el: HTMLDivElement
  let editor: import('monaco-editor').editor.IStandaloneCodeEditor | undefined = $state()

  function handleResize() {
    editor?.layout()
  }

  onMount(async () => {
    editor = monaco.editor.create(el, {
      ...sharedOptions,
      value,
      language: 'json',
    })
    editor.onDidChangeModelContent(() => {
      if (editor) {
        onInput(editor.getValue())
      }
    })

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      enableSchemaRequest: true,
      schemas: [
        {
          uri: 'https://malva.netlify.app/schema.json',
          fileMatch: [editor.getModel()?.uri.toString() ?? ''],
        },
      ],
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
  }
</style>
