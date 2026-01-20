import React from "react";
import "../../assets/Css/style.css";

export default function ClassicMojito() {
  return (
    <div className="recipe-page">

      {/* TITLE */}
      <h1 className="recipe-title">Classic Mojito</h1>

      {/* INTRO */}
      <div className="recipe-intro">
        <p>
          A refreshing Cuban cocktail made with fresh lime, mint, sugar, rum, and soda water. Perfect for hot summer days!
        </p>
      </div>

      {/* RECIPE INFO */}
      <div className="recipe-info">
        <div className="info-box">
          <h3>Prep Time</h3>
          <p>10 mins</p>
        </div>
        <div className="info-box">
          <h3>Servings</h3>
          <p>1 cocktail</p>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="hero-image">
        <img src="../Images/drink-mojito.png" alt="Classic Mojito" />
      </div>

      {/* INGREDIENTS */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>10 fresh mint leaves</li>
          <li>1/2 lime, cut into 4 wedges</li>
          <li>2 tsp sugar</li>
          <li>60 ml white rum</li>
          <li>Soda water</li>
          <li>Ice cubes</li>
        </ul>
      </div>

      {/* STEPS */}
      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>Muddle mint leaves and lime wedges with sugar in a glass.</li>
          <li>Add ice and pour in rum.</li>
          <li>Top with soda water and gently stir.</li>
          <li>Garnish with a mint sprig and lime wedge.</li>
          <li>Serve immediately.</li>
        </ol>
      </div>

      {/* FLAVOR PROFILE */}
      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Refreshing, zesty, and minty with a slight sweetness from sugar. Light and effervescent.
        </p>
      </div>

    </div>
  );
}
