// src/pages/DrinksAdmin.jsx
import React from "react";
import "../../assets/Css/dashboard.css";

function DrinksAdmin() {
  return (
    <>
      <header className="admin-header">
        <div>
          <h2 className="admin-title">Drinks</h2>
          <p className="admin-subtitle">Manage drink recipes.</p>
        </div>
      </header>

      <section className="summary-card">
        <p>List / tabela e drinks këtu.</p>
      </section>
    </>
  );
}

export default DrinksAdmin;
