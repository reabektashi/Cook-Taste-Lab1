import { useEffect, useState, useCallback } from "react";
import API from "../api";

export default function useFavorites() {
  const [liked, setLiked] = useState({});
  const [loadingFavs, setLoadingFavs] = useState(true);

  const fetchFavorites = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLiked({});
      setLoadingFavs(false);
      return;
    }

    try {
      setLoadingFavs(true);
      const res = await API.get("/favorites", { withCredentials: true });
      const map = {};
      (res.data.favorites || []).forEach((r) => {
        map[r.id] = true;
      });
      setLiked(map);

      // optional cache
      localStorage.setItem("liked", JSON.stringify(map));
    } catch (err) {
      console.error("Failed to sync favorites:", err);
    } finally {
      setLoadingFavs(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites(); // 🔥 THIS fixes cross-device
  }, [fetchFavorites]);

  const toggleFavorite = useCallback(
    async (recipe, { onLoginRequired } = {}) => {
      const token = localStorage.getItem("token");
      if (!token) {
        onLoginRequired?.();
        return;
      }

      const wasLiked = !!liked[recipe.id];

      // optimistic UI
      setLiked((prev) => ({ ...prev, [recipe.id]: !prev[recipe.id] }));

      try {
        if (wasLiked) {
          await API.delete(`/favorites/${recipe.id}`, { withCredentials: true });
        } else {
          await API.post(
            "/favorites",
            {
              recipeId: recipe.id,
              recipe: {
                title: recipe.title,
                tag: recipe.tag,
                time: recipe.time_label,
                img: recipe.img,
                href: recipe.href,
                rating: recipe.rating,
              },
            },
            { withCredentials: true }
          );
        }

        // 🔁 re-sync from DB (guarantees consistency)
        await fetchFavorites();
      } catch (err) {
        console.error("Favorite toggle failed:", err);
        await fetchFavorites(); // rollback
      }
    },
    [liked, fetchFavorites]
  );

  return { liked, loadingFavs, toggleFavorite, fetchFavorites };
}
