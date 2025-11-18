import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import "../assets/Css/dashboard.css";

const MOCK_USERS = [
  { id: 1, email: "admin@cooktaste.com", role: "admin", status: "active" },
  { id: 2, email: "sara@example.com", role: "user", status: "active" },
  { id: 3, email: "john@example.com", role: "user", status: "blocked" },
  { id: 4, email: "maria@example.com", role: "user", status: "active" },
];

export default function Users() {
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = MOCK_USERS.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (statusFilter !== "all" && u.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1>
          <FaUsers style={{ marginRight: 8 }} />
          Users
        </h1>
        <p>See who is registered on Cook&amp;Taste.</p>
      </header>

      {/* Filters */}
      <section className="admin-form-card">
        <h2>Filters</h2>
        <div className="admin-form-grid">
          <div className="form-group">
            <label>Role</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="admin">Admins</option>
              <option value="user">Users</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>
      </section>

      {/* Users table */}
      <section className="admin-table-section">
        <h2>Registered users</h2>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, idx) => (
                <tr key={u.id}>
                  <td>{idx + 1}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="admin-table-subtitle">
          Later you can add actions here (block user, promote to admin, etc.).
        </p>
      </section>
    </div>
  );
}
