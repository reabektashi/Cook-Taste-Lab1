// src/pages/Reports.jsx
import React, { useEffect, useMemo, useState } from "react";
import { FaChartBar } from "react-icons/fa";
import "../assets/Css/dashboard.css";
import API from "../api";

const PERIOD_TO_DAYS = {
  "7": 7,
  "14": 14,
  "30": 30,
};

export default function Reports() {
  const [period, setPeriod] = useState("7");
  const [loading, setLoading] = useState(true);

  const [topRecipes, setTopRecipes] = useState([]);
  const [activity, setActivity] = useState({ recipes: [], users: [] });
  const [newsletter, setNewsletter] = useState({ totalSubscribers: 0, openRate: 42, topSegment: "—" });

  const days = PERIOD_TO_DAYS[period] || 7;

  const labels = useMemo(() => {
    const out = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      out.push({
        key: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString(undefined, { weekday: "short" }),
      });
    }
    return out;
  }, [days]);

  const toMap = (rows) => {
    const m = {};
    (rows || []).forEach((r) => {
      const key = String(r.d).slice(0, 10);
      m[key] = Number(r.total) || 0;
    });
    return m;
  };

  const recipesMap = useMemo(() => toMap(activity.recipes), [activity.recipes]);
  const usersMap = useMemo(() => toMap(activity.users), [activity.users]);

  const chart = useMemo(() => {
    return labels.map((x) => ({
      ...x,
      recipes: recipesMap[x.key] || 0,
      users: usersMap[x.key] || 0,
    }));
  }, [labels, recipesMap, usersMap]);

  const maxVal = Math.max(1, ...chart.map((x) => Math.max(x.recipes, x.users)));

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const res = await API.get(`/admin/reports?days=${days}`, { withCredentials: true });

        if (!alive) return;

        setTopRecipes(res.data.topRecipes || []);
        setActivity(res.data.activity || { recipes: [], users: [] });
        setNewsletter(res.data.newsletter || { totalSubscribers: 0, openRate: 42, topSegment: "—" });
      } catch (err) {
        console.error("Reports load failed:", err);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, [days]);

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div>
          <h1 className="reports-title">
            <FaChartBar className="reports-title-icon" />
            Reports
          </h1>
          <p className="reports-subtitle">
            Key performance metrics for your Cook&amp;Taste platform.
          </p>
        </div>

        <div className="reports-filter">
          <span>Period</span>
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="7">Last 7 days</option>
            <option value="14">Last 14 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: "1rem" }}>Loading…</div>
      ) : (
        <>
          <section className="reports-main-grid">
            <div className="reports-panel">
              <div className="reports-panel-header">
                <h2>Top performing recipes</h2>
                <span className="reports-panel-caption">
                  Based on favorites and rating.
                </span>
              </div>

              <div className="reports-table-wrapper">
                <table className="reports-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Recipe</th>
                      <th>Category</th>
                      <th>Rating</th>
                      <th>Favorites</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topRecipes.map((r, idx) => (
                      <tr key={r.id}>
                        <td>{idx + 1}</td>
                        <td>{r.title}</td>
                        <td>{r.category || "—"}</td>
                        <td>{Number(r.rating || 0).toFixed(1)}</td>
                        <td>{Number(r.favorites || 0)}</td>
                      </tr>
                    ))}
                    {!topRecipes.length && (
                      <tr>
                        <td colSpan="5" style={{ opacity: 0.7 }}>
                          No data yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="reports-panel">
              <div className="reports-panel-header">
                <h2>Weekly activity</h2>
                <span className="reports-panel-caption">
                  New recipes and users by day.
                </span>
              </div>

              <div className="reports-chart-legend">
                <span className="legend-item">
                  <span className="legend-dot recipes" /> Recipes
                </span>
                <span className="legend-item">
                  <span className="legend-dot users" /> Users
                </span>
              </div>

              <div className="reports-chart">
                {chart.slice(-7).map((d) => (
                  <div key={d.key} className="reports-chart-column">
                    <div
                      className="bar recipes"
                      style={{ height: `${(d.recipes / maxVal) * 14 + 10}px` }}
                      title={`Recipes: ${d.recipes}`}
                    />
                    <div
                      className="bar users"
                      style={{ height: `${(d.users / maxVal) *14 + 10}px` }}
                      title={`Users: ${d.users}`}
                    />
                    <span className="reports-chart-label">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="reports-bottom">
            <div className="reports-panel wide">
              <div className="reports-panel-header">
                <h2>Newsletter performance</h2>
                <span className="reports-panel-caption">
                  Subscribers 
                </span>
              </div>

              <div className="reports-bottom-grid">
                <div>
                  <h3>Total subscribers</h3>
                  <p className="reports-bottom-number">{newsletter.totalSubscribers}</p>
                </div>
                <div>
                  <h3>Estimated open rate</h3>
                  <p className="reports-bottom-number">{newsletter.openRate}%</p>
                </div>
                <div>
                  <h3>Top segment</h3>
                  <p className="reports-bottom-number">{newsletter.topSegment}</p>
                </div>
                <div>
                  <h3>Suggested next step</h3>
                  <p className="reports-bottom-text">
                    Send a weekly “Quick Dinner Ideas” email to your most active segment.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
