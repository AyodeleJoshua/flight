export const removeItemFromLocalStorage = (tokenName: string) => {
  return localStorage.removeItem(tokenName);
};

export const removeAllItemsFromLocalStorage = () => localStorage.clear();

export const getItemFromLocalStorage = (tokenName: string) =>
  localStorage.getItem(tokenName);

export const setItemInLocalStorage = (name: string, value: string) =>
  localStorage.setItem(name, value);

export const setBulkItemsInLocalStorage = (
  items: { name: string; value: string }[],
) => items.map((item) => setItemInLocalStorage(item.name, item.value));
