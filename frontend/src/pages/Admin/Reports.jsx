// src/pages/Admin/Reports.jsx
import React from "react";
import "../../assets/Css/dashboard.css";
import { FaArrowUp, FaArrowDown, FaDownload } from "react-icons/fa";

function Reports() {
  // KPI fiktive – veç për UI
  const kpis = [
    {
      label: "Total visits",
      value: "18.4k",
      change: "+12%",
      positive: true,
      caption: "Sessions on the platform",
    },
    {
      label: "Recipe views",
      value: "42.7k",
      change: "+8%",
      positive: true,
      caption: "Views across all recipes",
    },
    {
      label: "Avg. session",
      value: "4m 21s",
      change: "-3%",
      positive: false,
      caption: "Time spent per visit",
    },
    {
      label: "Save rate",
      value: "17%",
      change: "+2.1%",
      positive: true,
      caption: "Users who save at least 1 recipe",
    },
  ];

  const traffic = [
    { label: "Sun", value: 1200 },
    { label: "Mon", value: 1800 },
    { label: "Tue", value: 1600 },
    { label: "Wed", value: 2100 },
    { label: "Thu", value: 1900 },
    { label: "Fri", value: 2500 },
    { label: "Sat", value: 2300 },
  ];

  const maxTraffic = Math.max(...traffic.map((t) => t.value));

  const topRecipes = [
    { name: "Creamy Mushroom Pasta", views: 3200, saves: 410 },
    { name: "Protein Berry Smoothie", views: 2800, saves: 350 },
    { name: "Grilled Chicken Bowl", views: 2600, saves: 305 },
    { name: "Chocolate Lava Cake", views: 2400, saves: 290 },
  ];

  const recentActivity = [
    {
      date: "Today",
      type: "New report",
      detail: "Weekly performance summary generated",
      value: "+145 users",
    },
    {
      date: "Yesterday",
      type: "Traffic spike",
      detail: "Social media campaign: Drinks collection",
      value: "+28% visits",
    },
    {
      date: "2 days ago",
      type: "New recipes",
      detail: "5 new dinner recipes published",
      value: "5 recipes",
    },
    {
      date: "3 days ago",
      type: "Newsletter",
      detail: "‘Quick desserts’ campaign sent",
      value: "41% open rate",
    },
  ];

  return (
    <>
      {/* KPI lart */}
      <section className="admin-cards-row reports-kpis">
        {kpis.map((item) => (
          <div key={item.label} className="stat-card reports-kpi-card">
            <div className="reports-kpi-header">
              <span className="stat-label">{item.label}</span>
              <span
                className={
                  "reports-kpi-change " +
                  (item.positive ? "positive" : "negative")
                }
              >
                {item.positive ? <FaArrowUp /> : <FaArrowDown />}
                {item.change}
              </span>
            </div>
            <div className="stat-value">{item.value}</div>
            <p className="stat-caption">{item.caption}</p>
          </div>
        ))}
      </section>

      {/* Trafiku + top recipes */}
      <section className="admin-bottom reports-main">
        {/* Trafiku i javës */}
        <div className="summary-card reports-traffic-card">
          <div className="summary-header">
            <h2>Traffic overview</h2>
            <div className="reports-chip-group">
              <button className="reports-chip active">This week</button>
              <button className="reports-chip">This month</button>
              <button className="reports-chip">This year</button>
            </div>
          </div>

          <p className="reports-text-muted">
            Visits and engagement across your Cook&Taste platform.
          </p>

          <div className="summary-chart reports-traffic-chart">
            {traffic.map((day) => (
              <div key={day.label} className="chart-col">
                <div
                  className="chart-bar"
                  style={{
                    height:
                      40 + Math.round((day.value / maxTraffic) * 70) + "px",
                  }}
                />
                <span className="chart-label">{day.label}</span>
              </div>
            ))}
          </div>

          <div className="reports-legend">
            <span className="reports-dot" />
            <span>Sessions</span>
            <span className="reports-legend-spacer" />
            <span className="reports-legend-value">
              Weekly total:{" "}
              <strong>
                {traffic
                  .reduce((sum, d) => sum + d.value, 0)
                  .toLocaleString()}{" "}
                visits
              </strong>
            </span>
          </div>
        </div>

        {/* Top recipes djathtas */}
        <div className="side-card reports-side-card">
          <div className="reports-side-header">
            <h3 className="side-title">Top recipes</h3>
            <button className="reports-export-btn">
              <FaDownload />
              <span>Export CSV</span>
            </button>
          </div>

          <table className="reports-table">
            <thead>
              <tr>
                <th>Recipe</th>
                <th>Views</th>
                <th>Saves</th>
              </tr>
            </thead>
            <tbody>
              {topRecipes.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>{r.views.toLocaleString()}</td>
                  <td>{r.saves.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="side-foot">
            Use this list to decide which recipes to feature on the homepage
            and in newsletters.
          </p>
        </div>
      </section>

      {/* Aktiviteti i fundit poshtë */}
      <section className="summary-card reports-activity-card">
        <div className="summary-header">
          <h2>Recent activity</h2>
        </div>

        <table className="reports-table reports-activity-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Details</th>
              <th>Impact</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((item, idx) => (
              <tr key={idx}>
                <td>{item.date}</td>
                <td>{item.type}</td>
                <td>{item.detail}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Reports;
