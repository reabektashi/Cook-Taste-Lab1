import API from "../api";

export async function fetchFavorites() {
  const { data } = await API.get("/favorites");
  return data.favorites;
}

export async function addFavorite(recipe) {
  await API.post("/favorites", {
    recipeId: recipe.id,
    recipe: {
      id: recipe.id,
      title: recipe.title,
      tag: recipe.tag,
      time: recipe.time,
      img: recipe.img,
      href: recipe.href,
      rating: recipe.rating,
    },
  });
}

export async function removeFavorite(recipeId) {
  await API.delete(`/favorites/${recipeId}`);
}
