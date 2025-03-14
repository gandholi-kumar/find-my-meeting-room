let debounceTimeout;
export const debounce = (func, delay) => {
  return function (...args) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => func(...args), delay);
  };
};
