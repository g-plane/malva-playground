<script lang="ts">
  import { onMount } from 'svelte'
  import ConfigEditor from './components/ConfigEditor.svelte'
  import Header from './components/Header.svelte'
  import InputEditor from './components/InputEditor.svelte'
  import OptionsDialog from './components/OptionsDialog.svelte'
  import OutputEditor from './components/OutputEditor.svelte'
  import { type Formatter, type MalvaConfig, loadWasm } from './malva'
  import { encodeString, retrieve, share } from './sharing'

  const monaco = import('monaco-editor')
  let format: Formatter = $state(() => '/* Loading Malva... */')

  const STORAGE_KEY_CODE = 'malva.v1.code'
  const STORAGE_KEY_CONFIG = 'malva.v1.config'
  const STORAGE_KEY_SYNTAX = 'malva.v1.syntax'

  const shared = retrieve()
  let inputCode = $state(
    shared.inputCode ??
      localStorage.getItem(STORAGE_KEY_CODE) ??
      '.container>button{outline:none}'
  )
  let configJSON = $state(
    shared.config ??
      localStorage.getItem(STORAGE_KEY_CONFIG) ??
      JSON.stringify({ printWidth: 80 }, null, 2)
  )
  let syntax = $state(
    shared.syntax ?? localStorage.getItem(STORAGE_KEY_SYNTAX) ??
      'css'
  )

  let config: MalvaConfig = $state({})
  let outputCode = $state('')

  $effect(() => {
    localStorage.setItem(STORAGE_KEY_CODE, inputCode)
    localStorage.setItem(STORAGE_KEY_CONFIG, configJSON)
    localStorage.setItem(STORAGE_KEY_SYNTAX, syntax)
  })

  $effect(() => {
    try {
      config = JSON.parse(configJSON)
    } catch (error) {
      outputCode = `/* ${error} */`
  }
})

$effect(() => {
  try {
    outputCode = format(inputCode, syntax, config)
  } catch (error) {
    outputCode = `/* ${error} */`
  }
})

onMount(async () => {
  format = await loadWasm('https://malva.netlify.app/standalone_wasm.js')
})

function handleShare() {
  share({ inputCode, config: configJSON, syntax })
}

function handleViewAST() {
  const url = new URL('https://raffia-play.vercel.app/')
  url.searchParams.set('code', encodeString(inputCode))
  url.searchParams.set('syntax', syntax)
  window.open(url, '_blank', 'noopener noreferrer')
}

let showOptions = $state(false)
</script>

<Header
  onShowOptions={() => (showOptions = true)}
  onShare={handleShare}
  onViewAST={handleViewAST}
/>
{#await monaco}
  <main class="loading">Loading editor...</main>
{:then monaco}
  <main>
    <div class="left">
      <div>
        <InputEditor
          {monaco}
          {config}
          {syntax}
          value={inputCode}
          onInput={(value) => (inputCode = value)}
        />
      </div>
      <div>
        <ConfigEditor {monaco} value={configJSON} onInput={(value) => (configJSON = value)} />
      </div>
    </div>
    <OutputEditor {monaco} {config} {syntax} value={outputCode} />
  </main>
{/await}
{#if showOptions}
  <div class="overlay" aria-hidden="true" onclick={() => (showOptions = false)}></div>
  <OptionsDialog
    {syntax}
    onUpdateSyntax={(event) => (syntax = event)}
    onClose={() => (showOptions = false)}
  />
{/if}

<style>
  main {
    min-height: calc(100vh - 57px);
    &.loading {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &:not(.loading) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 100%;
    }
  }

  .left > :nth-of-type(1) {
    height: 70%;
  }
  .left > :nth-of-type(2) {
    height: 30%;
  }

  .overlay {
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: hsla(0, 0%, 0%, 0.5);
    backdrop-filter: blur(2px);
  }
</style>
