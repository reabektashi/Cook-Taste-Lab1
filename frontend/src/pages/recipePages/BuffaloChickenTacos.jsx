import React from "react";
import "../../assets/Css/style.css";

export default function BuffaloChickenTacos() {
  return (
    <div className="recipe-page">

      {/* TITLE */}
      <h1 className="recipe-title">Buffalo Chicken Tacos</h1>

      {/* INTRO */}
      <div className="recipe-intro">
        <p>
          This weeknight winner is ready in under 20 minutes and is topped with a creamy, crunchy slaw and blue cheese.
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
          <p>10 mins</p>
        </div>
        <div className="info-box">
          <h3>Servings</h3>
          <p>4 tacos</p>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="hero-image">
        <img
          src="../Images/BuffaloChickenTacos.jpg"
          alt="Buffalo Chicken Tacos"
        />
      </div>

      {/* INGREDIENTS */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>2 cups cooked shredded chicken</li>
          <li>1/2 cup buffalo sauce</li>
          <li>4 small tortillas</li>
          <li>1 cup shredded cabbage or slaw mix</li>
          <li>1/4 cup blue cheese crumbles</li>
          <li>2 tbsp ranch or creamy dressing</li>
          <li>Optional: chopped green onions or cilantro</li>
        </ul>
      </div>

      {/* STEPS */}
      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>In a bowl, toss shredded chicken with buffalo sauce until coated.</li>
          <li>Warm tortillas in a skillet or microwave.</li>
          <li>Assemble tacos: layer chicken, cabbage/slaw, blue cheese, and dressing.</li>
          <li>Top with green onions or cilantro if desired.</li>
          <li>Serve immediately and enjoy!</li>
        </ol>
      </div>

      {/* FLAVOR PROFILE */}
      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Spicy, tangy, and creamy with a crunchy texture from the slaw. Perfect for quick weeknight dinners that pack a punch!
        </p>
      </div>

    </div>
  );
}
