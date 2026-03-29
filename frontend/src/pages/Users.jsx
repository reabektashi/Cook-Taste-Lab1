import React, { useEffect, useState } from "react";
import "../assets/Css/dashboard.css";
import API from "../api";

const FILTERS = [
  { key: "all", label: "ALL" },
  { key: "user", label: "USERS" },
  { key: "admin", label: "ADMINS" },
];

function Users() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);

  
  const emptyForm = { email: "", user_role: "user", status: "active", password: "" };
  const [form, setForm] = useState(emptyForm);

  
  const authHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const addLabel =
    selectedFilter === "all"
      ? "ADD"
      : selectedFilter === "admin"
      ? "ADD ADMIN"
      : "ADD USER";

  const modalTitle =
    editId !== null
      ? "Edit User"
      : selectedFilter === "all"
      ? "Add"
      : selectedFilter === "admin"
      ? "Add Admin"
      : "Add User";

  const listTitle =
    selectedFilter === "all" ? "All" : selectedFilter === "admin" ? "Admins" : "Users";

  const fetchUsers = async (role) => {
    setLoading(true);
    try {
      const res = await API.get("/users", {
        params: { role },
        headers: { ...authHeader() },
      });

      setUsers(Array.isArray(res.data?.users) ? res.data.users : []);
    } catch (err) {
      console.error("Fetch users error:", err);
      setUsers([]);

      const status = err?.response?.status;
      if (status === 401) alert("401: Not logged in (token missing/expired).");
      else if (status === 403) alert("403: Admin only.");
      else alert(err?.response?.data?.error || "Fetch failed (login/admin?)");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(selectedFilter);
    
  }, [selectedFilter]);

  const openAddModal = () => {
    setEditId(null);

    const roleFromFilter = selectedFilter === "admin" ? "admin" : "user"; // all -> user default

    setForm({
      ...emptyForm,
      user_role: roleFromFilter,
      status: "active",
    });

    setOpenModal(true);
  };

  const openEditModal = (user) => {
    setEditId(user.id);
    setForm({
      email: user.email || "",
      user_role: user.user_role || "user",
      status: user.status || "active",
      password: "",
    });
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditId(null);
    setForm(emptyForm);
  };

  const handleSave = async () => {
    if (!form.email.trim()) return alert("All fields are required.");

    try {
      if (editId !== null) {
        //  EDIT 
        await API.put(
          `/users/${editId}`,
          {
            email: form.email,
            user_role: form.user_role,
            status: form.status,
          },
          { headers: { ...authHeader() } }
        );
      } else {
        //  ADD 
        const payload = {
          email: form.email,
          user_role: form.user_role,
          status: form.status,
        };
        if (form.password?.trim()) payload.password = form.password.trim();

        const res = await API.post(`/users`, payload, {
          headers: { ...authHeader() },
        });

        if (res?.data?.note) alert(res.data.note);
      }

      closeModal();
      fetchUsers(selectedFilter);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "Save failed");
    }
  };

  const handleDelete = async (u) => {
    const ok = window.confirm(`Delete "${u.email}"?`);
    if (!ok) return;

    try {
      await API.delete(`/users/${u.id}`, {
        headers: { ...authHeader() },
      });
      fetchUsers(selectedFilter);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div className="categories-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Users</h1>
          <p className="admin-subtitle">Manage users and admins access & status.</p>
        </div>

        <button className="btn-add" onClick={openAddModal} type="button">
          + {addLabel}
        </button>
      </div>

      {openModal && (
        <div className="modal-backdrop" onMouseDown={closeModal}>
          <div className="modal-card" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2 className="modal-title">{modalTitle}</h2>
              <button className="modal-close" onClick={closeModal} type="button">
                ✕
              </button>
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
                
                  disabled={editId === null && selectedFilter === "admin"}
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
                  <option value="inactive">Inactive</option>
                </select>
              </label>

             
              {editId === null && (
                <label style={{ gridColumn: "1 / -1" }}>
                  Password (optional)
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                    placeholder="Leave empty for default"
                  />
                </label>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn-delete" onClick={closeModal} type="button">
                Cancel
              </button>
              <button className="btn-edit" onClick={handleSave} type="button">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="category-buttons-full">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={"category-btn-full" + (selectedFilter === f.key ? " active" : "")}
            onClick={() => setSelectedFilter(f.key)}
            type="button"
          >
            {f.label}
          </button>
        ))}
      </div>

      <h2 className="existing-title">{listTitle}</h2>

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
                    <button className="btn-edit" onClick={() => openEditModal(u)} type="button">
                      EDIT
                    </button>
                  </td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDelete(u)} type="button">
                      DELETE
                    </button>
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
