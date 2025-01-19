<template>
  <section class="theme-accordion">
    <div class="container">
      <!-- Should be an H2 -->
      <slot name="head" />
      <ul class="accordion-list">
        <!-- Should be a v-for of FragmentsAccordionItem -->
        <slot name="items" />
      </ul>
    </div>
  </section>
</template>
