import React from "react";
import "../../assets/Css/style.css";

export default function BananaMuffins() {
  return (
    <div className="recipe-page">

      {/* TITLE */}
      <h1 className="recipe-title">Banana Chocolate Chip Muffins</h1>

      {/* INTRO */}
      <div className="recipe-intro">
        <p>
          Turn overripe bananas into crowd-pleasing muffins tender, moist and chocolate-studded.
        </p>
      </div>

      {/* RECIPE INFO */}
      <div className="recipe-info">
        <div className="info-box">
          <h3>Prep Time</h3>
          <p>15 mins</p>
        </div>
        <div className="info-box">
          <h3>Cook Time</h3>
          <p>20 mins</p>
        </div>
        <div className="info-box">
          <h3>Servings</h3>
          <p>12 muffins</p>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="hero-image">
        <img
          src="../Images/BananaChocolateMuffins.jpg"
          alt="Banana Chocolate Chip Muffins"
        />
      </div>

      {/* INGREDIENTS */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>3 overripe bananas, mashed</li>
          <li>1/3 cup melted butter</li>
          <li>3/4 cup sugar</li>
          <li>1 beaten egg</li>
          <li>1 tsp vanilla extract</li>
          <li>1 tsp baking soda</li>
          <li>Pinch of salt</li>
          <li>1 1/2 cups all-purpose flour</li>
          <li>1/2 cup chocolate chips</li>
        </ul>
      </div>

      {/* STEPS */}
      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>Preheat oven to 350°F (175°C). Line a muffin tin with paper liners.</li>
          <li>Mix melted butter with mashed bananas in a large bowl.</li>
          <li>Add sugar, beaten egg, and vanilla, and mix until combined.</li>
          <li>Sprinkle baking soda and salt over the mixture, then gently fold in flour.</li>
          <li>Stir in chocolate chips.</li>
          <li>Pour batter into muffin cups and bake 18–20 mins until a toothpick comes out clean.</li>
          <li>Cool slightly before serving.</li>
        </ol>
      </div>

      {/* FLAVOR PROFILE */}
      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Sweet, moist, and tender with rich chocolate chips and the natural flavor of ripe bananas. Perfect for breakfast, snacks, or dessert.
        </p>
      </div>

    </div>
  );
}
