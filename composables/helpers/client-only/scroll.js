// This composable is used to scroll to a specific element on the page
// There is support for running a callback function after the scroll is complete
export const scrollIntoView = (element, callBack) => {
  if (process.server || !element) return;

  const offsetY = -150;
  const newY = element.getBoundingClientRect().top + window.scrollY + offsetY;

  if (callBack) {
    const fixedOffset = newY;

    const onScroll = () => {
      if (window.scrollY.toFixed() === fixedOffset.toFixed()) {
        window.removeEventListener("scroll", onScroll);
        callBack();
      }
    };

    window.addEventListener("scroll", onScroll);
    window.scrollTo({ top: newY, behavior: "smooth" });
  } else {
    window.scrollTo({ top: newY, behavior: "smooth" });
  }
};

export const scrollTo = () => {
  const route = useRoute();
  // If we open a page that has one of these query params, we want to scroll to that section
  const scrollToOptions = ["filters", "category", "alumni"];
  let hit = false;
  scrollToOptions.forEach((option, index) => {
    const hasOption = route.query[option]?.length > 0;
    if (hasOption && !hit) {
      hit = true;
      let scrollTo = document.querySelector(`[data-scroll-to="${option}"]`);
      if (typeof scrollTo == "array") scrollTo = scrollTo[0];

      setTimeout(() => {
        scrollIntoView(scrollTo);
      }, 250);
    }
  });

  if (hit) return; // If we hit a scroll to option, we don't want to scroll to the top of the page
  if (process.server) return;
  setTimeout(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, 250);
};
