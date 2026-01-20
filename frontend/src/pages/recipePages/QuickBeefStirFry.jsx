import React from "react";
import "../../assets/Css/style.css";

export default function QuickBeefStirFry() {
  return (
    <div className="recipe-page">

      {/* TITLE */}
      <h1 className="recipe-title">Quick Beef Stir Fry with Bell Peppers</h1>

      {/* INTRO */}
      <div className="recipe-intro">
        <p>
          This quick and flavorful beef stir fry comes together in under
          40 minutes and is packed with tender beef, colorful bell peppers,
          and a savory sauce. Perfect for busy weeknights!
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
          <p>25 mins</p>
        </div>
        <div className="info-box">
          <h3>Servings</h3>
          <p>4</p>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="hero-image">
        <img
          src="../Images/Quick Beef Stir Fry with Bell Peppers.webp"
          alt="Quick Beef Stir Fry with Bell Peppers"
        />
      </div>

      {/* INGREDIENTS */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>450g beef sirloin or flank steak, thinly sliced</li>
          <li>2 bell peppers (red & green), sliced</li>
          <li>1 small onion, sliced</li>
          <li>2 cloves garlic, minced</li>
          <li>2 tbsp soy sauce</li>
          <li>1 tbsp oyster sauce</li>
          <li>1 tbsp hoisin sauce</li>
          <li>1 tsp cornstarch</li>
          <li>2 tbsp vegetable oil</li>
          <li>Salt & pepper to taste</li>
        </ul>
      </div>

      {/* STEPS */}
      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>Slice beef thinly against the grain and toss with cornstarch.</li>
          <li>Heat oil in a large skillet or wok over high heat.</li>
          <li>Add beef and stir-fry until browned, then remove from pan.</li>
          <li>Add garlic, onion, and bell peppers; stir-fry 3–4 minutes.</li>
          <li>Return beef to pan, add sauces, and toss to coat evenly.</li>
          <li>Cook another 2–3 minutes until sauce thickens.</li>
          <li>Serve hot with rice or noodles.</li>
        </ol>
      </div>

      {/* FLAVOR PROFILE */}
      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Savory, slightly sweet, and umami-rich with tender beef and
          crisp vegetables. A fast, satisfying stir fry for any night
          of the week.
        </p>
      </div>

    </div>
  );
}
