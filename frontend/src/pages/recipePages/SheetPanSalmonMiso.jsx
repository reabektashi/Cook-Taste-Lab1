import React from "react";
import "../../assets/Css/style.css";

export default function SheetPanSalmonMiso() {
  return (
    <div className="recipe-page">

      {/* TITLE */}
      <h1 className="recipe-title">
        Sheet Pan Salmon and Broccoli with Miso Butter
      </h1>

      {/* INTRO */}
      <div className="recipe-intro">
        <p>
          This sheet pan salmon and broccoli with miso butter is rich, savory,
          and incredibly easy to make. A perfect weeknight dinner with bold
          umami flavor and minimal cleanup.
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
          <p>15 mins</p>
        </div>
        <div className="info-box">
          <h3>Servings</h3>
          <p>4 servings</p>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="hero-image">
        <img
          src="../Images/Sheet Pan Salmon and Broccoli .webp"
          alt="Sheet Pan Salmon and Broccoli with Miso Butter"
        />
      </div>

      {/* INGREDIENTS */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>4 salmon fillets</li>
          <li>3 cups broccoli florets</li>
          <li>2 tbsp olive oil</li>
          <li>Salt & black pepper to taste</li>

          <li><strong>Miso Butter</strong></li>
          <li>3 tbsp unsalted butter, softened</li>
          <li>1 tbsp white miso paste</li>
          <li>1 tsp soy sauce</li>
          <li>1 tsp honey or maple syrup</li>
          <li>1 clove garlic, minced</li>
        </ul>
      </div>

      {/* INSTRUCTIONS */}
      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>Preheat oven to 400°F (200°C).</li>
          <li>Place salmon and broccoli on a large sheet pan.</li>
          <li>Drizzle broccoli with olive oil, season with salt and pepper, and toss lightly.</li>
          <li>In a small bowl, mix butter, miso paste, soy sauce, honey, and garlic.</li>
          <li>Spread miso butter evenly over the salmon fillets.</li>
          <li>Roast for 15–18 minutes until salmon is flaky and broccoli is tender.</li>
          <li>Serve hot, optionally with rice or noodles.</li>
        </ol>
      </div>

      {/* FLAVOR PROFILE */}
      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Savory, buttery, and deeply umami-rich. The miso butter melts into the
          salmon while the broccoli roasts to perfection, creating a balanced
          and satisfying dish.
        </p>
      </div>

    </div>
  );
}
