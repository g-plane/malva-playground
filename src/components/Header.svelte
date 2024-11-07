<script lang="ts">
  let { onShowOptions, onShare, onViewAST }: {
    onShowOptions: () => void,
    onShare: () => void,
    onViewAST: () => void,
  } = $props()
</script>

<header>
  <div class="title">Malva Playground</div>
  <div class="right">
    <div class="buttons">
      <div>
        <button class="btn-options" onclick={onShowOptions}>
          <i class="fa-solid fa-gear"></i>Options
        </button>
      </div>
      <button class="btn-options" onclick={onShare}>
        <i class="fa-solid fa-share"></i>Share
      </button>
      <button class="btn-options" onclick={onViewAST}>
        <i class="fa-solid fa-bug"></i>View AST
      </button>
    </div>

    <div class="links">
      <a
        href="https://github.com/g-plane/malva"
        target="_blank"
        rel="noopener noreferrer"
        class="mr-4"
      >
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
        Malva Repo
      </a>
      <a
        href="https://github.com/g-plane/malva-playground"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
        Playground Repo
      </a>
    </div>
  </div>
</header>

<style>
  header {
    height: 56px;
    padding: 12px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background: #fdf4ff;
    border-bottom: 2px solid #f5d0fe;
  }

  .title {
    font-size: 1.12rem;
    line-height: 1.75rem;
    font-weight: 600;
    color: #1c1917;
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #86198f;
  }

  .buttons {
    display: flex;
    column-gap: 12px;
  }
  .btn-options {
    border: 1px solid #c026d3;
    border-radius: 2px;
    padding: 4px 8px;
    position: relative;
    &:hover {
      background: #fae8ff;
    }
    &:active, &:focus {
      background: #f5d0fe;
    }
  }

  .links {
    display: flex;
    align-items: center;
    text-decoration: underline;
  }
  a:not(:last-of-type) {
    margin-right: 16px;
  }
  i {
    margin-right: 4px;
  }
</style>
