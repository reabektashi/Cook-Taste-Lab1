
import React, { useEffect, useMemo, useState } from "react";
import "../assets/Css/dashboard.css";
import {
  FaUtensils,
  FaListUl,
  FaWineGlassAlt,
  FaUsers,
  FaEnvelope,
} from "react-icons/fa";
import API from "../api";

const PERIOD_TO_DAYS = {
  "7days": 7,
  "30days": 30,
  "365days": 365,
};

export default function Overview() {
  const [period, setPeriod] = useState("7days");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    recipes: 0,
    categories: 0,
    drinks: 0,
    users: 0,
    subscribers: 0,
  });
  const [daily, setDaily] = useState({ recipes: [], users: [], subscribers: [] });

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

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        const res = await API.get(`/admin/overview?period=${period}`, { withCredentials: true });

        if (!alive) return;

        setStats(res.data.totals || {});
        setDaily(res.data.daily || { recipes: [], users: [], subscribers: [] });
      } catch (err) {
        console.error("Overview load failed:", err);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [period]);

  const recipesMap = useMemo(() => toMap(daily.recipes), [daily.recipes]);
  const usersMap = useMemo(() => toMap(daily.users), [daily.users]);
  const subsMap = useMemo(() => toMap(daily.subscribers), [daily.subscribers]);

  const chartValues = useMemo(() => {
    return labels.map((x) => ({
      ...x,
      recipes: recipesMap[x.key] || 0,
      users: usersMap[x.key] || 0,
      subs: subsMap[x.key] || 0,
    }));
  }, [labels, recipesMap, usersMap, subsMap]);

  
  const maxVal = Math.max(1, ...chartValues.map((x) => x.recipes));

  return (
    <>
      <header className="admin-header">
        <div>
          <h2 className="admin-title">Admin Dashboard</h2>
          <p className="admin-subtitle">Overview of your Cook&amp;Taste platform</p>
        </div>

        <div className="admin-filter">
          <span>Filter</span>
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="365days">Last year</option>
          </select>
        </div>
      </header>

      {loading ? (
        <div style={{ padding: "1rem" }}>Loading…</div>
      ) : (
        <>
          <section className="admin-cards-row">
            <div className="stat-card">
              <div className="stat-icon icon-recipes"><FaUtensils /></div>
              <div className="stat-label">Recipes</div>
              <div className="stat-value">{stats.recipes}</div>
              <p className="stat-caption">Total recipes in the platform</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon icon-categories"><FaListUl /></div>
              <div className="stat-label">Categories</div>
              <div className="stat-value">{stats.categories}</div>
              <p className="stat-caption">Breakfast, lunch, dinner, desserts…</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon icon-drinks"><FaWineGlassAlt /></div>
              <div className="stat-label">Drinks</div>
              <div className="stat-value">{stats.drinks}</div>
              <p className="stat-caption">Items that link to /drinks/*</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon icon-users"><FaUsers /></div>
              <div className="stat-label">Users</div>
              <div className="stat-value">{stats.users}</div>
              <p className="stat-caption">Registered accounts</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon icon-subs"><FaEnvelope /></div>
              <div className="stat-label">Subscribers</div>
              <div className="stat-value">{stats.subscribers}</div>
              <p className="stat-caption">Newsletter sign-ups</p>
            </div>
          </section>

          <section className="admin-bottom">
            <div className="summary-card">
              <div className="summary-header">
                <h2>Summary</h2>
                <span className="summary-period">
                  {period === "7days" ? "Last 7 days" : period === "30days" ? "Last 30 days" : "Last year"}
                </span>
              </div>

              <div className="summary-substats">
                <div>
                  <span className="summary-label">New recipes</span>
                  <strong>{chartValues.reduce((a, x) => a + x.recipes, 0)}</strong>
                </div>
                <div>
                  <span className="summary-label">New users</span>
                  <strong>{chartValues.reduce((a, x) => a + x.users, 0)}</strong>
                </div>
                <div>
                  <span className="summary-label">New subscribers</span>
                  <strong>{chartValues.reduce((a, x) => a + x.subs, 0)}</strong>
                </div>
              </div>

              <div className="summary-chart">
                {chartValues.slice(-7).map((x) => (
                  <div key={x.key} className="chart-col">
                    <div
                      className="chart-bar"
                      style={{ height: `${(x.recipes / maxVal) * 90 + 18}px` }}
                      title={`Recipes: ${x.recipes}, Users: ${x.users}, Subs: ${x.subs}`}
                    />
                    <span className="chart-label">{x.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="side-card">
              <h3 className="side-title">Newsletter snapshot</h3>
              <ul className="side-list">
                <li><span>Total subscribers</span><strong>{stats.subscribers}</strong></li>
                <li><span>Open rate (est.)</span><strong>42%</strong></li>
                <li><span>Top segment</span><strong>—</strong></li>
              </ul>
              <p className="side-foot">
                Tip: add tracking if you want real open-rate later.
              </p>
            </div>
          </section>
        </>
      )}
    </>
  );
}
