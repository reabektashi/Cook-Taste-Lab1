import React, { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import "../assets/Css/dashboard.css";
import API from "../api";

export default function Settings() {
  const [siteName, setSiteName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [newsletterFrom, setNewsletterFrom] = useState("");

  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [loading, setLoading] = useState(true);

  // load settings from backend
  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get("/settings");
        setSiteName(data.siteName || "");
        setOwnerEmail(data.ownerEmail || "");
        setNewsletterFrom(data.newsletterFrom || "");
      } catch (err) {
        alert(err?.response?.data?.error || "Failed to load settings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleSaveGeneral(e) {
    e.preventDefault();
    try {
      await API.put("/settings", { siteName, ownerEmail, newsletterFrom });
      alert("Settings saved ✅");
    } catch (err) {
      alert(err?.response?.data?.error || "Save failed");
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    if (passwordNew !== passwordConfirm) {
      alert("New passwords do not match.");
      return;
    }

    try {
      await API.put("/change-password", {
        currentPassword: passwordCurrent,
        newPassword: passwordNew,
      });

      alert("Password updated ✅ (you may need to login again)");
      setPasswordCurrent("");
      setPasswordNew("");
      setPasswordConfirm("");
    } catch (err) {
      alert(err?.response?.data?.error || "Password update failed");
    }
  }

  if (loading) {
  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1 className="settings-title">
          <FaCog style={{ marginRight: 8 }} />
          Settings
        </h1>
        <p>Loading…</p>
      </header>
    </div>
  );
}


  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1 className="settings-title">
          <FaCog style={{ marginRight: 8 }} />
          Settings
        </h1>
        <p>Configure basic settings for your admin account and site.</p>
      </header>

      <section className="admin-form-card">
        <h2>General</h2>
        <form className="admin-form-grid" onSubmit={handleSaveGeneral}>
          <div className="admin-form-group">
            <label>Site name</label>
            <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
          </div>

          <div className="admin-form-group">
            <label>Owner email</label>
            <input type="email" value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} />
          </div>

          <div className="admin-form-group">
            <label>Newsletter from email</label>
            <input
              type="email"
              value={newsletterFrom}
              onChange={(e) => setNewsletterFrom(e.target.value)}
            />
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn-primary">
              Save settings
            </button>
          </div>
        </form>
      </section>

      <section className="admin-form-card">
        <h2>Change password</h2>
        <form className="admin-form-grid" onSubmit={handleChangePassword}>
          <div className="admin-form-group">
            <label>Current password</label>
            <input
              type="password"
              value={passwordCurrent}
              onChange={(e) => setPasswordCurrent(e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label>New password</label>
            <input
              type="password"
              value={passwordNew}
              onChange={(e) => setPasswordNew(e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label>Confirm new password</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn-primary">
              Update password
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
