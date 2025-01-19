export const makeHash = (string) => {
  if (typeof string !== "string") string = JSON.stringify(string);

  let hash = 0;

  if (string.length === 0) return hash;
  let index = 0;
  do {
    hash = (hash << 5) - hash + string.charCodeAt(index);
    hash |= 0; // Convert to 32bit integer
    index++;
  } while (index < string.length);

  return hash.toString();
};
