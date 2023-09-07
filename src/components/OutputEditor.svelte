<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { sharedOptions } from '../shared-monaco-options'

  export let value: string
  export let monaco: typeof import('monaco-editor')
  let el: HTMLDivElement
  let editor: import('monaco-editor').editor.IStandaloneCodeEditor

  onMount(() => {
    editor = monaco.editor.create(el, {
      ...sharedOptions,
      value,
      language: 'css',
      readOnly: true,
    })
  })

  onDestroy(() => {
    editor.dispose()
  })
</script>

<div class="h-full border-l-width-1px" bind:this={el} />
