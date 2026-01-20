import React from "react";
import "../../assets/Css/style.css";

export default function StrawberrySmoothie() {
  return (
    <div className="recipe-page">

      <h1 className="recipe-title">Strawberry Smoothie</h1>

      <div className="recipe-intro">
        <p>
          A quick and healthy smoothie made with fresh strawberries and yogurt. Perfect for breakfast or a snack!
        </p>
      </div>

      <div className="recipe-info">
        <div className="info-box">
          <h3>Prep Time</h3>
          <p>5 mins</p>
        </div>
        <div className="info-box">
          <h3>Servings</h3>
          <p>2 glasses</p>
        </div>
      </div>

      <div className="hero-image">
        <img src="../Images/drink-smoothie.png" alt="Strawberry Smoothie" />
      </div>

      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>1 cup fresh strawberries</li>
          <li>1/2 cup yogurt</li>
          <li>1/2 cup milk</li>
          <li>1 tbsp honey or maple syrup</li>
          <li>Ice cubes (optional)</li>
        </ul>
      </div>

      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>Add strawberries, yogurt, milk, and honey into a blender.</li>
          <li>Blend until smooth and creamy.</li>
          <li>Add ice if you want it chilled and blend again.</li>
          <li>Pour into glasses and serve.</li>
        </ol>
      </div>

      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Sweet, fruity, creamy, and refreshing. A simple classic smoothie.
        </p>
      </div>

    </div>
  );
}
