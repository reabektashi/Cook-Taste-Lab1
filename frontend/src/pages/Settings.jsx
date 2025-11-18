import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import "../assets/Css/dashboard.css";

export default function Settings() {
  const [siteName, setSiteName] = useState("Cook&Taste");
  const [ownerEmail, setOwnerEmail] = useState("owner@cooktaste.com");
  const [newsletterFrom, setNewsletterFrom] = useState("newsletter@cooktaste.com");

  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleSaveGeneral(e) {
    e.preventDefault();
    alert("General settings saved (front-end only for now).");
  }

  function handleChangePassword(e) {
    e.preventDefault();
    if (passwordNew !== passwordConfirm) {
      alert("New passwords do not match.");
      return;
    }
    alert("Password change request sent (front-end only for now).");
    setPasswordCurrent("");
    setPasswordNew("");
    setPasswordConfirm("");
  }

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1>
          <FaCog style={{ marginRight: 8 }} />
          Settings
        </h1>
        <p>Configure basic settings for your admin account and site.</p>
      </header>

      {/* General settings */}
      <section className="admin-form-card">
        <h2>General</h2>
        <form className="admin-form-grid" onSubmit={handleSaveGeneral}>
          <div className="form-group">
            <label>Site name</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Owner email</label>
            <input
              type="email"
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Newsletter from email</label>
            <input
              type="email"
              value={newsletterFrom}
              onChange={(e) => setNewsletterFrom(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Save settings
            </button>
          </div>
        </form>
      </section>

      {/* Password section */}
      <section className="admin-form-card">
        <h2>Change password</h2>
        <form className="admin-form-grid" onSubmit={handleChangePassword}>
          <div className="form-group">
            <label>Current password</label>
            <input
              type="password"
              value={passwordCurrent}
              onChange={(e) => setPasswordCurrent(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>New password</label>
            <input
              type="password"
              value={passwordNew}
              onChange={(e) => setPasswordNew(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm new password</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Update password
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
