import React from "react";
import "../../assets/Css/style.css";

export default function GrilledChickenFullPage() {
  return (
    <div className="recipe-page">

      {/* TITLE */}
      <h1 className="recipe-title">Grilled Chicken with Secret Rub</h1>

{/* INTRO */}
      <div className="recipe-intro">
        <p>
          This grilled chicken recipe features a secret spice rub that gives bold flavor while keeping the meat juicy and tender. Perfect for weeknight dinners or outdoor BBQs!
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
          src="../Images/grilled-chicken.avif"
          alt="Grilled Chicken"
        />
      </div>

     

      {/* INGREDIENTS */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>4 chicken breasts</li>
          <li>2 tsp paprika</li>
          <li>1 tsp garlic powder</li>
          <li>1 tsp onion powder</li>
          <li>1/2 tsp cayenne pepper</li>
          <li>Salt & pepper to taste</li>
          <li>2 tbsp olive oil</li>
        </ul>
      </div>

      {/* STEPS */}
      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>Mix all spices to create the rub.</li>
          <li>Rub the chicken with olive oil and then the spice mix.</li>
          <li>Preheat the grill to medium-high heat.</li>
          <li>Grill chicken 6–7 mins per side until cooked through.</li>
          <li>Let rest 5 mins before serving.</li>
        </ol>
      </div>

      {/* FLAVOR PROFILE */}
      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Savory, slightly smoky, and lightly sweet. Pairs well with roasted veggies, salads, or rice.
        </p>
      </div>


    </div>
  );
}
