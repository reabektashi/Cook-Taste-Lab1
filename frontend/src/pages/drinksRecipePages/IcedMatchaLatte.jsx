import React from "react";
import "../../assets/Css/style.css";

export default function IcedMatchaLatte() {
  return (
    <div className="recipe-page">

      <h1 className="recipe-title">Iced Matcha Latte</h1>

      <div className="recipe-intro">
        <p>
          A creamy, refreshing green tea latte served over ice. Perfect for a cool, energizing drink.
        </p>
      </div>

      <div className="recipe-info">
        <div className="info-box">
          <h3>Prep Time</h3>
          <p>5 mins</p>
        </div>
        <div className="info-box">
          <h3>Servings</h3>
          <p>1 glass</p>
        </div>
      </div>

      <div className="hero-image">
        <img src="../Images/drink-matcha.png" alt="Iced Matcha Latte" />
      </div>

      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>1 tsp matcha powder</li>
          <li>2 tsp hot water</li>
          <li>200 ml milk (or plant-based)</li>
          <li>Ice cubes</li>
          <li>Sweetener (optional)</li>
        </ul>
      </div>

      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>Whisk matcha powder with hot water until smooth.</li>
          <li>Fill a glass with ice and pour in milk.</li>
          <li>Add matcha mixture and stir well.</li>
          <li>Add sweetener if desired.</li>
          <li>Enjoy chilled.</li>
        </ol>
      </div>

      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Earthy, slightly grassy, creamy, and lightly sweet. A refreshing iced treat.
        </p>
      </div>

    </div>
  );
}
