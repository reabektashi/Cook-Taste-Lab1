import React, { useEffect, useState } from "react";
import "../assets/Css/dashboard.css";

const API_BASE = "https://localhost:5174";

const FILTERS = [
  { key: "all", label: "ALL" },
  { key: "user", label: "USERS" },
  { key: "admin", label: "ADMINS" },
];

function Users() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // modal + edit mode
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyForm = { email: "", user_role: "user", status: "active" };
  const [form, setForm] = useState(emptyForm);

  // ---------------- FETCH USERS ----------------
  const fetchUsers = async (role) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/users?role=${role}`);
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error("Fetch users error:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(selectedFilter);
  }, [selectedFilter]);

  // ---------------- MODAL HELPERS ----------------
  const openAddModal = () => {
    setEditId(null);
    setForm(emptyForm);
    setOpenModal(true);
  };

  const openEditModal = (user) => {
    setEditId(user.id);
    setForm({
      email: user.email || "",
      user_role: user.user_role || "user",
      status: user.status || "active",
    });
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditId(null);
    setForm(emptyForm);
  };

  // ---------------- SAVE ----------------
  const handleSave = async () => {
    if (!form.email.trim()) {
      return alert("Email is required.");
    }

    const payload = { ...form };

    try {
      if (editId !== null) {
        // EDIT
        await fetch(`${API_BASE}/api/users/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // ADD
        await fetch(`${API_BASE}/api/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      closeModal();
      fetchUsers(selectedFilter);
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (user) => {
    const ok = window.confirm(`Delete "${user.email}"?`);
    if (!ok) return;

    try {
      await fetch(`${API_BASE}/api/users/${user.id}`, { method: "DELETE" });
      fetchUsers(selectedFilter);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="categories-page">
      {/* HEADER */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Users</h1>
          <p className="admin-subtitle">Manage users and admins access & status.</p>
        </div>

        <button className="btn-add" onClick={openAddModal}>+ ADD USER</button>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-head">
              <h2 className="modal-title">{editId !== null ? "Edit User" : "Add User"}</h2>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>

            <div className="modal-grid">
              <label>
                Email *
                <input
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  placeholder="user@example.com"
                />
              </label>

              <label>
                Role
                <select
                  value={form.user_role}
                  onChange={(e) => setForm((p) => ({ ...p, user_role: e.target.value }))}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>

              <label>
                Status
                <select
                  value={form.status}
                  onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                >
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </label>
            </div>

            <div className="modal-actions">
              <button className="btn-delete" onClick={closeModal}>Cancel</button>
              <button className="btn-edit" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* FILTER BUTTONS */}
      <div className="category-buttons-full">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={"category-btn-full" + (selectedFilter === f.key ? " active" : "")}
            onClick={() => setSelectedFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <h2 className="existing-title">
        {selectedFilter === "all" ? "All users" : selectedFilter === "admin" ? "Admins" : "Users"}
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
                    <span className={u.status === "active" ? "status-active" : "status-blocked"}>
                      {u.status}
                    </span>
                  </td>
                  <td>{new Date(u.created_at).toLocaleString()}</td>
                  <td>
                    <button className="btn-edit" onClick={() => openEditModal(u)}>EDIT</button>
                  </td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDelete(u)}>DELETE</button>
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
