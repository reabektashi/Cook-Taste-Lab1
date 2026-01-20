import React from "react";
import "../../assets/Css/style.css";

export default function AntipastoSalad() {
  return (
    <div className="recipe-page">

      {/* TITLE */}
      <h1 className="recipe-title">Antipasto Salad</h1>

      {/* INTRO */}
      <div className="recipe-intro">
        <p>
          Combine all of the best antipasti with crisp lettuce and savory dressing for a satisfying antipasto salad.
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
          <p>0 mins</p>
        </div>
        <div className="info-box">
          <h3>Servings</h3>
          <p>4 servings</p>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="hero-image">
        <img
          src="../Images/AntipastoSalad.jpg"
          alt="Antipasto Salad"
        />
      </div>

      {/* INGREDIENTS */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>4 cups mixed lettuce or salad greens</li>
          <li>1/2 cup sliced salami or prosciutto</li>
          <li>1/2 cup cherry tomatoes, halved</li>
          <li>1/4 cup olives (green or black), pitted</li>
          <li>1/4 cup roasted red peppers, sliced</li>
          <li>1/4 cup mozzarella balls or cubed cheese</li>
          <li>2 tbsp olive oil</li>
          <li>1 tbsp red wine vinegar</li>
          <li>Salt & pepper to taste</li>
        </ul>
      </div>

      {/* STEPS */}
      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>In a large salad bowl, combine lettuce, salami/prosciutto, cherry tomatoes, olives, roasted peppers, and cheese.</li>
          <li>Drizzle with olive oil and red wine vinegar.</li>
          <li>Toss gently to combine.</li>
          <li>Season with salt and pepper to taste.</li>
          <li>Serve immediately and enjoy!</li>
        </ol>
      </div>

      {/* FLAVOR PROFILE */}
      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Savory, tangy, and fresh. The combination of cured meats, cheese, and crisp vegetables makes this salad hearty yet refreshing—perfect for lunch or a light dinner.
        </p>
      </div>

    </div>
  );
}
