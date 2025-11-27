import API from "../../api";


// Load from local storage
export const loadFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("favorites") || "{}");
  } catch {
    return {};
  }
};

// Save local
export const saveFavorites = (data) => {
  localStorage.setItem("favorites", JSON.stringify(data || {}));
};

// Toggle favorite (local only)
export const toggleLocalFavorite = (id, recipe, current) => {
  const updated = { ...(current || {}) };
  if (updated[id]) delete updated[id];
  else updated[id] = recipe;
  saveFavorites(updated);
  return updated;
};

// ===============================
// NEW: BACKEND FAVORITES SUPPORT
// ===============================

// Add favorite to backend
export const addFavoriteToServer = async (recipeId, recipe, token) => {
  return API.post(
    "/favorites",
    { recipeId, recipe },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
};

// Remove from backend
export const removeFavoriteFromServer = async (recipeId, token) => {
  return API.delete(`/favorites/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

// Main toggle (auto decides local or backend)
export const toggleFavorite = async (recipe, current) => {
  const token = localStorage.getItem("token");
  const updated = { ...(current || {}) };

  // Remove local if exists
  const isFav = !!updated[recipe.id];

  if (isFav) delete updated[recipe.id];
  else updated[recipe.id] = recipe;

  // Update local storage always
  saveFavorites(updated);

  // If logged in, also sync with backend
  if (token) {
    try {
      if (isFav) {
        await removeFavoriteFromServer(recipe.id, token);
      } else {
        await addFavoriteToServer(recipe.id, recipe, token);
      }
    } catch (err) {
      console.error("Backend favorite error:", err);
    }
  }

  return updated;
};
