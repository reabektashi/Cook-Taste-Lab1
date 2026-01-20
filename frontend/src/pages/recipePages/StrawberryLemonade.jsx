import React from "react";
import "../../assets/Css/style.css";

export default function StrawberryLemonade() {
  return (
    <div className="recipe-page">

      {/* TITLE */}
      <h1 className="recipe-title">Strawberry Lemonade</h1>

      {/* INTRO */}
      <div className="recipe-intro">
        <p>
          Refreshing homemade strawberry lemonade with a perfect balance
          of sweet and tangy. Ideal for hot summer days!
        </p>
      </div>

      {/* RECIPE INFO */}
      <div className="recipe-info">
        <div className="info-box"><h3>Prep Time</h3><p>5 mins</p></div>
        <div className="info-box"><h3>Cook Time</h3><p>0 mins</p></div>
        <div className="info-box"><h3>Servings</h3><p>4</p></div>
      </div>

      {/* HERO IMAGE */}
      <div className="hero-image">
        <img src="../Images/Strawberry Lemonade.webp" alt="Strawberry Lemonade" />
      </div>

      {/* INGREDIENTS */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>1 cup fresh strawberries, hulled</li>
          <li>1/2 cup sugar</li>
          <li>1 cup freshly squeezed lemon juice</li>
          <li>4 cups water</li>
          <li>Ice and lemon slices for serving</li>
        </ul>
      </div>

      {/* STEPS */}
      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>Blend strawberries with sugar until smooth.</li>
          <li>Mix strawberry puree with lemon juice and water.</li>
          <li>Serve over ice and garnish with lemon slices.</li>
        </ol>
      </div>

      {/* FLAVOR PROFILE */}
      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Sweet, tart, and refreshing. A perfectly balanced summer drink
          that’s fruity and hydrating.
        </p>
      </div>

    </div>
  );
}
