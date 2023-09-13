<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { sharedOptions } from '../shared-monaco-options'
  import { configSchema } from '../malva'

  export let value: string
  export let monaco: typeof import('monaco-editor')
  let el: HTMLDivElement
  let editor: import('monaco-editor').editor.IStandaloneCodeEditor

  const dispatch = createEventDispatcher()

  onMount(() => {
    editor = monaco.editor.create(el, {
      ...sharedOptions,
      value,
      language: 'json',
    })
    editor.onDidChangeModelContent(() => {
      dispatch('input', editor.getValue())
    })

    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      schemas: [
        {
          uri: 'http://server/malva-schema.json',
          fileMatch: [editor.getModel()?.uri.toString() ?? ''],
          schema: configSchema,
        },
      ],
    })
  })

  onDestroy(() => {
    editor.dispose()
  })
</script>

<div class="h-full" bind:this={el} />
