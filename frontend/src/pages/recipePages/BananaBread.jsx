import React from "react";
import "../../assets/Css/style.css";

export default function BananaBread() {
  return (
    <div className="recipe-page">

      {/* TITLE */}
      <h1 className="recipe-title">
        Peanut Butter Chocolate Chip Banana Bread
      </h1>

      {/* INTRO */}
      <div className="recipe-intro">
        <p>
          Moist banana bread loaded with peanut butter flavor and
          chocolate chips — a perfect sweet treat for breakfast or dessert.
        </p>
      </div>

      {/* RECIPE INFO */}
      <div className="recipe-info">
        <div className="info-box">
          <h3>Prep Time</h3>
          <p>10 mins</p>
        </div>
        <div className="info-box">
          <h3>Bake Time</h3>
          <p>12 mins</p>
        </div>
        <div className="info-box">
          <h3>Servings</h3>
          <p>8 slices</p>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="hero-image">
        <img
          src="../Images/Peanut Butter Chocolate Chip Banana Bread.webp"
          alt="Banana Bread"
        />
      </div>

      {/* INGREDIENTS */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>3 ripe bananas, mashed</li>
          <li>1/2 cup peanut butter</li>
          <li>1/3 cup sugar</li>
          <li>1 egg</li>
          <li>1 cup flour</li>
          <li>1/2 tsp baking soda</li>
          <li>1/4 tsp salt</li>
          <li>1/2 cup chocolate chips</li>
        </ul>
      </div>

      {/* STEPS */}
      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>Preheat oven to 175°C (350°F) and grease a loaf pan.</li>
          <li>In a bowl, mix mashed bananas, peanut butter, sugar, and egg.</li>
          <li>Stir in flour, baking soda, and salt until just combined.</li>
          <li>Fold in chocolate chips.</li>
          <li>Pour batter into loaf pan and bake 50–60 minutes.</li>
          <li>Let cool before slicing and serving.</li>
        </ol>
      </div>

      {/* FLAVOR PROFILE */}
      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Sweet, nutty, and chocolatey with a moist, tender texture. 
          Perfect for breakfast, snack, or dessert.
        </p>
      </div>

    </div>
  );
}
