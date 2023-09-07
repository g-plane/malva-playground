<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from 'svelte'
  import { sharedOptions } from '../shared-monaco-options'

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
  })

  onDestroy(() => {
    editor.dispose()
  })
</script>

<div class="h-full" bind:this={el} />
