<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let syntax: string

  let form = {
    syntax,
  }

  const dispatch = createEventDispatcher()

  function handleConfirm() {
    dispatch('update:syntax', form.syntax)
    dispatch('close')
  }

  function handleCancel() {
    form.syntax = syntax
    dispatch('close')
  }
</script>

<dialog
  class="border-fuchsia-600 border-width-1px rounded-sm p-3 w-80 text-base text-stone-900"
>
  <p class="flex justify-between">
    <span>Syntax</span>
    <select
      value={form.syntax}
      on:input={(event) => (form.syntax = event.currentTarget.value)}
    >
      <option value="css">CSS</option>
      <option value="scss">SCSS</option>
      <option value="sass">Sass</option>
      <option value="less" disabled>Less</option>
    </select>
  </p>

  <div class="flex justify-end gap-x-2 mt-8">
    <button
      class="border-fuchsia-600 border-width-1px rounded-sm w-30 px-2 py-1 text-sm text-fuchsia-800 hover:bg-fuchsia-100 active:bg-fuchsia-200 focus:bg-fuchsia-200"
      on:click={handleConfirm}
    >
      Done
    </button>
    <button
      class="border-fuchsia-600 border-width-1px rounded-sm w-30 px-2 py-1 text-sm text-fuchsia-800 hover:bg-fuchsia-100 active:bg-fuchsia-200 focus:bg-fuchsia-200"
      on:click={handleCancel}
    >
      Cancel
    </button>
  </div>
</dialog>

<style>
  dialog {
    background: white;
    position: fixed;
    z-index: 5;
    top: 10%;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 8px;
  }
</style>
