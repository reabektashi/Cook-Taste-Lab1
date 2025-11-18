import React from "react";
import "../../assets/Css/dashboard.css";

function Settings() {
  return (
    <>
      <header className="admin-header">
        <div>
          <h2 className="admin-title">Settings</h2>
          <p className="admin-subtitle">
            Configure your admin profile and platform options.
          </p>
        </div>
      </header>

      <section className="summary-card">
        <form className="settings-form">
          <div className="form-row">
            <label>Admin name</label>
            <input type="text" placeholder="Cook&Taste Admin" />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input type="email" placeholder="admin@cooktaste.com" />
          </div>

          <div className="form-row">
            <label>New password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button type="submit" className="btn-primary">
            Save changes
          </button>
        </form>
      </section>
    </>
  );
}

export default Settings;
