import React from "react";
import "../../assets/Css/style.css";

export default function PeachIcedTea() {
  return (
    <div className="recipe-page">

      <h1 className="recipe-title">Peach Iced Tea</h1>

      <div className="recipe-intro">
        <p>
          A sweet and fruity iced tea flavored with fresh peach and brewed tea. Perfect for a sunny afternoon.
        </p>
      </div>

      <div className="recipe-info">
        <div className="info-box">
          <h3>Prep Time</h3>
          <p>10 mins</p>
        </div>
        <div className="info-box">
          <h3>Servings</h3>
          <p>2 glasses</p>
        </div>
      </div>

      <div className="hero-image">
        <img src="../Images/drink-peach-tea.png" alt="Peach Iced Tea" />
      </div>

      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>2 cups brewed black tea, chilled</li>
          <li>1 ripe peach, sliced</li>
          <li>1-2 tsp sugar (optional)</li>
          <li>Ice cubes</li>
        </ul>
      </div>

      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>Brew tea and let it cool.</li>
          <li>Muddle peach slices with sugar if using.</li>
          <li>Fill glasses with ice and pour tea over.</li>
          <li>Add peach slices and stir gently.</li>
          <li>Serve immediately.</li>
        </ol>
      </div>

      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Sweet, fruity, lightly tannic from the tea, and refreshing. A classic iced beverage.
        </p>
      </div>

    </div>
  );
}
