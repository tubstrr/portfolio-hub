export const debounce = (callback, wait, immediate) => {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) callback.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) callback.apply(context, args);
  };
};

export const throttle = (callback, limit) => {
  let waiting = false;
  return function executedFunction() {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
};
