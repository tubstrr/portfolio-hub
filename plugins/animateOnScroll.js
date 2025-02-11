export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) {
    nuxtApp.vueApp.directive("aos", {
      mounted(el) {
        el.classList.add("v-aos");
        el.classList.add("v-aos-before-enter");
      },
    });
  } else {
    const options = {
      threshold: 0.5,
    };
    const animateOnScrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("v-aos-before-enter");
          entry.target.classList.add("v-aos-entered");
        }
      });
    }, options);
    nuxtApp.vueApp.directive("aos", {
      mounted(el) {
        el.classList.add("v-aos");
        el.classList.add("v-aos-before-enter");
        animateOnScrollObserver.observe(el);
      },
    });
  }
});
