import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import API from "../api";
import { FaRegClock, FaStar } from "react-icons/fa";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery();
  const q = query.get("q") || "";
  const ingredients = query.get("ingredients") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q && !ingredients) {
      setResults([]);
      setLoading(false);
      return;
    }

    const term = q || ingredients.replace(/,/g, " ");

    (async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/recipes/search", {
          params: { q: term },
        });
        setResults(data.recipes || []);
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [q, ingredients]);

  return (
    <section className="weeknights section-gap">
      <div className="wk-head">
        <h2 className="wk-title">Search results</h2>
      </div>

      {loading ? (
        <p style={{ padding: "1rem" }}>Searching…</p>
      ) : results.length === 0 ? (
        <p style={{ padding: "1rem" }}>No recipes found.</p>
      ) : (
        <div className="wk-grid">
          {results.map((r) => (
            <article key={r.id} className="wk-card">
              <Link className="wk-thumb" to={r.href || "#"}>
                <img src={r.img} alt={r.title} />
              </Link>
              <div className="wk-body">
                <span className="wk-tag">{r.tag}</span>
                <Link className="wk-title-link" to={r.href || "#"}>
                  <h3 className="wk-h3">{r.title}</h3>
                </Link>
                <div className="wk-meta">
                  <span className="wk-time">
                    <FaRegClock /> {r.time_label || r.time}
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
