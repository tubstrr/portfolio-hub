export const useCountAnimation = (payload) => {
  let { start, end, duration, callback } = payload;

  // This tracks the starting time
  let startTimestamp = null;

  const step = (timestamp) => {
    // If startTimestamp is null, set it to the current time
    if (!startTimestamp) startTimestamp = timestamp;

    // Calculate the progress as a value between 0 and 1
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // Use the progress value to calculate the current number
    const numbers = Math.floor(start + (end - start) * progress);

    // Call the callback with the current number
    callback(numbers);

    if (progress < 1) {
      if (process.client) window.requestAnimationFrame(step);
    }
  };

  if (process.client) window.requestAnimationFrame(step);
};
