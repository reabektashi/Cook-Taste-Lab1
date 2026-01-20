import React from "react";
import "../../assets/Css/style.css";

export default function BlueberrySmoothie() {
  return (
    <div className="recipe-page">

      {/* TITLE */}
      <h1 className="recipe-title">Blueberry Smoothie</h1>

      {/* INTRO */}
      <div className="recipe-intro">
        <p>
          A quick and healthy blueberry smoothie packed with antioxidants.
          Perfect for breakfast or a refreshing snack!
        </p>
      </div>

      {/* RECIPE INFO */}
      <div className="recipe-info">
        <div className="info-box"><h3>Prep Time</h3><p>5 mins</p></div>
        <div className="info-box"><h3>Cook Time</h3><p>0 mins</p></div>
        <div className="info-box"><h3>Servings</h3><p>2</p></div>
      </div>

      {/* HERO IMAGE */}
      <div className="hero-image">
        <img src="../Images/Blueberry Smoothie.webp" alt="Blueberry Smoothie" />
      </div>

      {/* INGREDIENTS */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>1 cup fresh or frozen blueberries</li>
          <li>1 banana</li>
          <li>1/2 cup yogurt or milk</li>
          <li>1 tsp honey (optional)</li>
          <li>Ice cubes as needed</li>
        </ul>
      </div>

      {/* STEPS */}
      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>Combine all ingredients in a blender.</li>
          <li>Blend until smooth.</li>
          <li>Pour into glasses and serve immediately.</li>
        </ol>
      </div>

      {/* FLAVOR PROFILE */}
      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Sweet, fruity, and creamy with a refreshing berry flavor.
          Perfect for a healthy start to the day.
        </p>
      </div>

    </div>
  );
}
