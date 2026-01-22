import { ALL_ITEMS } from "../data/allItems";

export const byCategory = (category) =>
  ALL_ITEMS.filter((x) => x.category === category);

export const byType = (type) =>
  ALL_ITEMS.filter((x) => x.type === type);

export const byTagIncludes = (needle) =>
  ALL_ITEMS.filter((x) =>
    String(x.tag || "").toLowerCase().includes(String(needle).toLowerCase())
  );
