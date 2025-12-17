import React, { useEffect, useState } from "react";
import "../assets/Css/dashboard.css";

const API_BASE = "http://localhost:5174";

const FILTERS = [
  { key: "all", label: "ALL" },
  { key: "user", label: "USERS" },
  { key: "admin", label: "ADMINS" },
];



function Users() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/api/users?role=${selectedFilter}`
        );
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error("Fetch users error:", err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [selectedFilter]);

  return (
    <div className="categories-page">
      {/* HEADER */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Users</h1>
          <p className="admin-subtitle">
            Manage users and admins access & status.
          </p>
        </div>

        {/* ADD USER */}
        <button className="btn-add">+ ADD USER</button>
      </div>

      {/* FILTER BUTTONS */}
      <div className="category-buttons-full">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={
              "category-btn-full" +
              (selectedFilter === f.key ? " active" : "")
            }
            onClick={() => setSelectedFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <h2 className="existing-title">
        {selectedFilter === "all"
          ? "All users"
          : selectedFilter === "admin"
          ? "Admins"
          : "Users"}
      </h2>

      {loading ? (
        <p style={{ padding: "12px 0" }}>Loading...</p>
      ) : (
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "16px" }}>
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.email}</td>
                  <td>{u.user_role}</td>

                  <td>
                    <span
                      className={
                        u.status === "active"
                          ? "status-active"
                          : "status-blocked"
                      }
                    >
                      {u.status}
                    </span>
                  </td>

                  <td>{new Date(u.created_at).toLocaleString()}</td>

                  <td>
                    <button className="btn-edit">EDIT</button>
                  </td>
                  <td>
                    <button className="btn-delete">DELETE</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
