import React from "react";
import "../../assets/Css/style.css";

export default function BoozyHotChocolate() {
  return (
    <div className="recipe-page">

      {/* TITLE */}
      <h1 className="recipe-title">Boozy Hot Chocolate</h1>

      {/* INTRO */}
      <div className="recipe-intro">
        <p>
          A rich and warming hot chocolate with a splash of your favorite liqueur.
          Perfect for cozy evenings or festive gatherings.
        </p>
      </div>

      {/* RECIPE INFO */}
      <div className="recipe-info">
        <div className="info-box"><h3>Prep Time</h3><p>5 mins</p></div>
        <div className="info-box"><h3>Cook Time</h3><p>10 mins</p></div>
        <div className="info-box"><h3>Servings</h3><p>2</p></div>
      </div>

      {/* HERO IMAGE */}
      <div className="hero-image">
        <img src="../Images/Boozy Hot Chocolate.webp" alt="Boozy Hot Chocolate" />
      </div>

      {/* INGREDIENTS */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>2 cups milk</li>
          <li>1/2 cup heavy cream</li>
          <li>1/2 cup chocolate chips</li>
          <li>1-2 oz liqueur (Baileys, Kahlua, or choice)</li>
          <li>Whipped cream for topping</li>
        </ul>
      </div>

      {/* STEPS */}
      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>Heat milk and cream in a saucepan over medium heat.</li>
          <li>Add chocolate chips and whisk until smooth.</li>
          <li>Stir in liqueur.</li>
          <li>Pour into mugs and top with whipped cream.</li>
        </ol>
      </div>

      {/* FLAVOR PROFILE */}
      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Rich, chocolatey, and warming with a hint of boozy sweetness. Perfect
          for chilly evenings.
        </p>
      </div>

    </div>
  );
}
