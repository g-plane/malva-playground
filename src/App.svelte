<script lang="ts">
  import Header from './components/Header.svelte'
  import InputEditor from './components/InputEditor.svelte'
  import OutputEditor from './components/OutputEditor.svelte'
  import ConfigEditor from './components/ConfigEditor.svelte'

  const monaco = import('monaco-editor')

  let inputCode = '.container>button{outline:none}'
  let config = JSON.stringify({ printWidth: 80 }, null, 2)
</script>

<Header />
{#await monaco}
  <main class="flex justify-center items-center">Loading editor...</main>
{:then monaco}
  <main class="grid grid-cols-2 h-full">
    <div>
      <div class="h-70%">
        <InputEditor {monaco} value={inputCode} />
      </div>
      <div class="h-30%">
        <ConfigEditor
          {monaco}
          value={config}
          on:input={(event) => (config = event.detail)}
        />
      </div>
    </div>
    <OutputEditor {monaco} value={inputCode} />
  </main>
{/await}
