import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaRegClock, FaStar } from "react-icons/fa";
import { ALL_ITEMS } from "../data/allItems";

const norm = (s = "") => String(s).toLowerCase().trim();

export default function SearchResults() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const q = params.get("q") || "";
  const ingredientsParam = params.get("ingredients") || "";

  const selectedIngredients = useMemo(() => {
    return ingredientsParam
      .split(",")
      .map((x) => norm(x))
      .filter(Boolean);
  }, [ingredientsParam]);

  const results = useMemo(() => {
    const query = norm(q);

    return ALL_ITEMS.filter((it) => {
      // 1) text match (title/tag/category/time/type)
      const hay = [it.title, it.tag, it.category, it.time, it.type]
        .filter(Boolean)
        .map(norm)
        .join(" ");

      const textOk = query ? hay.includes(query) : true;

      // 2) ingredient match (AND logic)
      // item.ingredients must be an array of strings
      const itemIngredients = (it.ingredients || []).map(norm);

      const ingredientsOk =
        selectedIngredients.length === 0
          ? true
          : selectedIngredients.every((ing) => itemIngredients.includes(ing));

      return textOk && ingredientsOk;
    });
  }, [q, selectedIngredients]);

  const searching = Boolean(q || selectedIngredients.length);

  return (
    <section className="weeknights section-gap">
      <div className="wk-head">
        <h2 className="wk-title">Search results</h2>
      </div>

      {!searching ? (
        <p style={{ padding: "1rem" }}>Type something in the search bar.</p>
      ) : results.length === 0 ? (
        <p style={{ padding: "1rem" }}>No items found.</p>
      ) : (
        <div className="wk-grid">
          {results.map((r) => (
            <article key={`${r.type}-${r.id}`} className="wk-card">
              <Link className="wk-thumb" to={r.href || "#"}>
                <img src={r.img} alt={r.title} />
              </Link>
              <div className="wk-body">
                <span className="wk-tag">{r.tag || r.category}</span>
                <Link className="wk-title-link" to={r.href || "#"}>
                  <h3 className="wk-h3">{r.title}</h3>
                </Link>
                <div className="wk-meta">
                  <span className="wk-time">
                    <FaRegClock /> {r.time || "—"}
                  </span>
                  <span className="wk-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.round(r.rating || 0) ? "on" : ""}
                      />
                    ))}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
