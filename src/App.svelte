<script lang="ts">
  import Header from './components/Header.svelte'
  import InputEditor from './components/InputEditor.svelte'
  import OutputEditor from './components/OutputEditor.svelte'
  import ConfigEditor from './components/ConfigEditor.svelte'
  import { encodeString, retrieve, share } from './sharing'
  import { onMount } from 'svelte'

  const monaco = import('monaco-editor')

  const STORAGE_KEY_CODE = 'malva.v1.code'
  const STORAGE_KEY_CONFIG = 'malva.v1.config'

  let inputCode = ''
  let configJSON = ''
  const syntax = 'css'

  $: {
    localStorage.setItem(STORAGE_KEY_CODE, inputCode)
    localStorage.setItem(STORAGE_KEY_CONFIG, configJSON)
  }

  onMount(() => {
    const shared = retrieve()
    inputCode =
      shared.inputCode ||
      localStorage.getItem(STORAGE_KEY_CODE) ||
      '.container>button{outline:none}'
    configJSON =
      shared.config ||
      localStorage.getItem(STORAGE_KEY_CONFIG) ||
      JSON.stringify({ printWidth: 80 }, null, 2)
  })

  function handleShare() {
    share({ inputCode, config: configJSON })
  }

  function handleViewAST() {
    const url = new URL('https://raffia-play.vercel.app/')
    url.searchParams.set('code', encodeString(inputCode))
    url.searchParams.set('syntax', syntax)
    window.open(url, '_blank', 'noopener noreferrer')
  }
</script>

<Header on:share={handleShare} on:view-ast={handleViewAST} />
{#await monaco}
  <main class="flex justify-center items-center">Loading editor...</main>
{:then monaco}
  <main class="grid grid-cols-2 h-full">
    <div>
      <div class="h-70%">
        <InputEditor
          {monaco}
          value={inputCode}
          on:input={(event) => (inputCode = event.detail)}
        />
      </div>
      <div class="h-30%">
        <ConfigEditor
          {monaco}
          value={configJSON}
          on:input={(event) => (configJSON = event.detail)}
        />
      </div>
    </div>
    <OutputEditor {monaco} value={inputCode} />
  </main>
{/await}

<style>
  main {
    min-height: calc(100vh - 57px);
  }
</style>
