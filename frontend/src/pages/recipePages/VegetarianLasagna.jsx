import React from "react";
import "../../assets/Css/style.css";

export default function VegetarianLasagna() {
  return (
    <div className="recipe-page">

      {/* TITLE */}
      <h1 className="recipe-title">
        Vegetarian Spinach and Mushroom Lasagna
      </h1>

      {/* INTRO */}
      <div className="recipe-intro">
        <p>
          A hearty vegetarian lasagna layered with mushrooms, spinach,
          and creamy cheese sauce. Perfect for a comforting weeknight meal.
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
          <p>30 mins</p>
        </div>
        <div className="info-box">
          <h3>Servings</h3>
          <p>6</p>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="hero-image">
        <img
          src="../Images/Vegetarian Spinach and Mushroom Lasagna.webp"
          alt="Vegetarian Lasagna"
        />
      </div>

      {/* INGREDIENTS */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>9 lasagna noodles</li>
          <li>2 cups fresh spinach</li>
          <li>2 cups sliced mushrooms</li>
          <li>1 ½ cups ricotta cheese</li>
          <li>1 ½ cups shredded mozzarella cheese</li>
          <li>2 cups marinara sauce</li>
          <li>Salt & pepper to taste</li>
        </ul>
      </div>

      {/* STEPS */}
      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>Preheat oven to 180°C (350°F).</li>
          <li>Cook lasagna noodles according to package directions.</li>
          <li>Sauté mushrooms and spinach until tender.</li>
          <li>Layer noodles, marinara sauce, ricotta, veggies, and mozzarella in a baking dish.</li>
          <li>Repeat layers and top with remaining mozzarella.</li>
          <li>Bake 25–30 minutes until cheese is melted and bubbly.</li>
          <li>Let cool 5 minutes before serving.</li>
        </ol>
      </div>

      {/* FLAVOR PROFILE */}
      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Rich, cheesy, and hearty with tender vegetables. Comforting
          vegetarian lasagna perfect for family dinners or meal prep.
        </p>
      </div>

    </div>
  );
}
