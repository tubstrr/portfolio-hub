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
};

export const useTheme = () => {
  const themeCookie = useCookie("theme", DEFAULT_THEME);

  const theme = computed(() => whichTheme(themeCookie.value));

  return theme;
};

export const setupTheme = () => {
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

      themeCookie.value = prefersDarkMode ? "dark" : "light";
    }

    document.documentElement.classList.remove("light-mode", "dark-mode");
    document.documentElement.classList.add(whichTheme(themeCookie.value));
  }

  return useTheme();
};
