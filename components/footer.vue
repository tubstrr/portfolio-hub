<template>
  <footer class="block footer">
    <div class="container">
      <div class="flexer">
        <div class="col col-1">
          <h2 class="h6">La Footer</h2>
          <p>Footer content goes here</p>
        </div>
        <div class="col col-2">
          <h2 class="h6">Contact Me</h2>
          <ul>
            <li>
              Email:
              <a href="mailto:me@jonknoll.dev">me@jonknoll.dev</a>
            </li>
            <li>
              Phone:
              <a href="tel:+1-815-334-7608">(815) 334-7608</a>
            </li>
          </ul>
        </div>
        <div class="col col-3"></div>
        <div class="col col-4">
          <strong class="h6">2025 © ℗ Ⓒ ® ℠ ™</strong>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
// @use "@/assets/styles/variables/breakpoints" as *;

.block.footer {
  background: var(--header-background);
  margin-top: 16rem;
  padding: 3rem 0;
  border-top: var(--border);

  .container {
    .flexer {
      display: flex;
      justify-content: space-between;

      .col-4 {
        align-self: flex-end;
      }
    }
  }
}
</style>
