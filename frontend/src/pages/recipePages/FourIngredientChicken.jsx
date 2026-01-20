import React from "react";
import "../../assets/Css/style.css";

export default function FourIngredientChicken() {
  return (
    <div className="recipe-page">

      {/* TITLE */}
      <h1 className="recipe-title">4-Ingredient Chicken Dinner</h1>

      {/* INTRO */}
      <div className="recipe-intro">
        <p>
          A simple and satisfying chicken dinner made with just four ingredients.
          Perfect for busy weeknights when you want something quick and comforting.
        </p>
      </div>

      {/* RECIPE INFO */}
      <div className="recipe-info">
        <div className="info-box">
          <h3>Prep Time</h3>
          <p>10 mins</p>
        </div>
        <div className="info-box">
          <h3>Cook Time</h3>
          <p>20 mins</p>
        </div>
        <div className="info-box">
          <h3>Servings</h3>
          <p>4</p>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="hero-image">
        <img
          src="../Images/4-Ingredient Chicken Dinner.webp"
          alt="4-Ingredient Chicken Dinner"
        />
      </div>

      {/* INGREDIENTS */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>4 chicken breasts</li>
          <li>1 cup cream of chicken soup</li>
          <li>1 cup shredded cheese</li>
          <li>Salt & pepper to taste</li>
        </ul>
      </div>

      {/* STEPS */}
      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>Preheat oven to 190°C (375°F).</li>
          <li>Season chicken with salt and pepper and place in a baking dish.</li>
          <li>Spread cream of chicken soup evenly over chicken.</li>
          <li>Sprinkle shredded cheese on top.</li>
          <li>Bake 20–25 minutes until chicken is cooked through and cheese is melted.</li>
        </ol>
      </div>

      {/* FLAVOR PROFILE */}
      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Creamy, cheesy, and comforting with tender baked chicken. Perfect for
          quick weeknight dinners.
        </p>
      </div>

    </div>
  );
}
