<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function handleShareButtonClick() {
    dispatch('share')
  }

  function handleViewASTButtonClick() {
    dispatch('view-ast')
  }
</script>

<header
  class="h-14 p-3 grid grid-cols-2 bg-fuchsia-50 border-b-width-2px border-b-fuchsia-200"
>
  <div class="text-lg font-semibold text-stone-900">Malva Playground</div>
  <div class="flex justify-between items-center px-4 text-sm text-fuchsia-800">
    <div class="flex gap-x-3">
      <div>
        <button
          class="btn-options border-fuchsia-600 border-width-1px rounded-sm px-2 py-1 hover:bg-fuchsia-100 active:bg-fuchsia-200 focus:bg-fuchsia-200 relative"
        >
          <i class="fa-solid fa-gear mr-1" />Options
        </button>
      </div>
      <button
        class="btn-options border-fuchsia-600 border-width-1px rounded-sm px-2 py-1 hover:bg-fuchsia-100 active:bg-fuchsia-200 focus:bg-fuchsia-200 relative"
        on:click={handleShareButtonClick}
      >
        <i class="fa-solid fa-share mr-1" />Share
      </button>
      <button
        class="btn-options border-fuchsia-600 border-width-1px rounded-sm px-2 py-1 hover:bg-fuchsia-100 active:bg-fuchsia-200 focus:bg-fuchsia-200 relative"
        on:click={handleViewASTButtonClick}
      >
        <i class="fa-solid fa-bug mr-1" />View AST
      </button>
    </div>

    <div class="flex items-center underline">
      <a
        href="https://github.com/g-plane/malva"
        target="_blank"
        rel="noopener noreferrer"
        class="mr-4"
      >
        <i class="fa-solid fa-arrow-up-right-from-square mr-1" />
        Malva Repo
      </a>
      <a
        href="https://github.com/g-plane/malva-playground"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="fa-solid fa-arrow-up-right-from-square mr-1" />
        Playground Repo
      </a>
    </div>
  </div>
</header>
