import React from "react";
import "../assets/Css/dashboard.css";

function Categories() {
  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Desserts",
    "Appetizers",
  ];

  return (
    <div className="categories-page">
      
      {/* HEADER */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Categories</h1>
          <p className="admin-subtitle">
            Organize your Cook&Taste recipes into meaningful groups.
          </p>
        </div>
      </div>

      {/* CATEGORY BUTTONS */}
      <div className="category-buttons-full">
        {categories.map((cat) => (
          <button key={cat} className="category-btn-full">
            {cat}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <h2 className="existing-title">Existing categories</h2>

      <table className="categories-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Breakfast</td>
            <td>Quick and easy morning recipes</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Lunch</td>
            <td>Light and tasty mid-day meals</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Dinner</td>
            <td>Hearty mains for the evening</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Desserts</td>
            <td>Sweet treats & baking</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Appetizers</td>
            <td>Small bites to start your meal</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Categories;
