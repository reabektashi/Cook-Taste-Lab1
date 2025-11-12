export const loadFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("favorites") || "{}");
  } catch {
    return {};
  }
};

export const saveFavorites = (data) => {
  localStorage.setItem("favorites", JSON.stringify(data || {}));
};

export const toggleFavorite = (id, recipe, current) => {
  const updated = { ...(current || {}) };
  if (updated[id]) delete updated[id];
  else updated[id] = recipe;
  saveFavorites(updated);
  return updated;
};
