<script lang="ts">
  let { syntax, onUpdateSyntax, onClose }: {
    syntax: string,
    onUpdateSyntax: (syntax: string) => void,
    onClose: () => void,
  } = $props()

  let form = $state({ syntax })

  function handleConfirm() {
    onUpdateSyntax(form.syntax)
    onClose()
  }

  function handleCancel() {
    form.syntax = syntax
    onClose()
  }
</script>

<dialog>
  <p class="syntax-select">
    <span>Syntax</span>
    <select value={form.syntax} oninput={(event) => (form.syntax = event.currentTarget.value)}>
      <option value="css">CSS</option>
      <option value="scss">SCSS</option>
      <option value="sass">Sass</option>
      <option value="less">Less</option>
    </select>
  </p>

  <div class="buttons">
    <button onclick={handleConfirm}>
      Done
    </button>
    <button onclick={handleCancel}>
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
    border: 1px solid #c026d3;
    border-radius: 2px;
    padding: 12px;
    width: 320px;
    font-size: 1rem;
    line-height: 1.5rem;
    color: #1c1917;
  }

  .syntax-select {
    display: flex;
    justify-content: space-between;
  }

  .buttons {
    display: flex;
    justify-content: end;
    column-gap: 8px;
    margin-top: 32px;
  }
  button {
    border: 1px solid #c026d3;
    border-radius: 2px;
    width: 120px;
    padding: 4px 8px;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #86198f;
    &:hover {
      background: #fae8ff;
    }
    &:active, &:focus {
      background: #f5d0fe;
    }
  }
</style>
