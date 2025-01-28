const DEFAULT_THEME = "light";

export const whichTheme = (mode) => {
  switch (mode) {
    case "light":
      return "light-mode";
    case "dark":
      return "dark-mode";
    default:
      return "light-mode";
  }
};

export const updateTheme = (mode = "light", flip = false) => {
  const { $bus } = useNuxtApp();
  const themeCookie = useCookie("theme", DEFAULT_THEME);
  const userTheme = useCookie("user_theme", false);
  userTheme.value = true;

  if (flip) {
    themeCookie.value = themeCookie.value === "light" ? "dark" : "light";
  } else themeCookie.value = mode;

  if (import.meta.client) {
    document.documentElement.classList.remove("light-mode", "dark-mode");
    document.documentElement.classList.add(whichTheme(themeCookie.value));
  }

  $bus.emit("theme:change", themeCookie.value);
};

export const useTheme = () => {
  const themeCookie = useCookie("theme", DEFAULT_THEME);

  const theme = computed(() => whichTheme(themeCookie.value));

  return theme;
};

export const setupTheme = () => {
  const { $bus } = useNuxtApp();
  const userTheme = useCookie("user_theme", false);
  if (typeof userTheme.value === "undefined") userTheme.value = false;

  const themeCookie = useCookie("theme", DEFAULT_THEME);
  const hasCookie = themeCookie.value;
  themeCookie.value = hasCookie ? themeCookie.value : DEFAULT_THEME;

  if (import.meta.client) {
    if (!userTheme.value) {
      const prefersString = "(prefers-color-scheme: dark)";
      const match = window.matchMedia;
      const prefersDarkMode = match && match(prefersString).matches;

      if (prefersDarkMode) {
        themeCookie.value = "dark";
      } else {
        themeCookie.value = "light";
      }
    }

    document.documentElement.classList.remove("light-mode", "dark-mode");
    document.documentElement.classList.add(whichTheme(themeCookie.value));
    nextTick(() => {
      $bus.emit("theme:change", themeCookie.value);
    });
  }

  return useTheme();
};
