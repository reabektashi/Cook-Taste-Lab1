import React from "react";
import "../../assets/Css/style.css";

export default function PartyPie() {
  return (
    <div className="recipe-page">

      {/* TITLE */}
      <h1 className="recipe-title">
        My Granny's 5-Ingredient Party Pie Is My Favorite Retro Dessert
      </h1>

      {/* INTRO */}
      <div className="recipe-intro">
        <p>
          This classic retro dessert uses just five simple ingredients and
          comes together in only 20 minutes. Sweet, nostalgic, and perfect
          for parties or family gatherings.
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
          <h3>Total Time</h3>
          <p>20 mins</p>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="hero-image">
        <img
          src="../Images/Party Pie.webp"
          alt="5-Ingredient Party Pie"
        />
      </div>

      {/* INGREDIENTS */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>1 pre-made pie crust</li>
          <li>1 cup fruit pie filling (cherry or apple)</li>
          <li>1/2 cup sweetened condensed milk</li>
          <li>1 tsp vanilla extract</li>
          <li>1/2 cup crushed cookies or graham crackers</li>
        </ul>
      </div>

      {/* STEPS */}
      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>Preheat oven to 180°C (350°F).</li>
          <li>Place pie crust into a pie dish.</li>
          <li>Mix condensed milk and vanilla, spread over crust.</li>
          <li>Add fruit filling evenly on top.</li>
          <li>Sprinkle crushed cookies over the pie.</li>
          <li>Bake for 10–12 minutes until lightly golden.</li>
          <li>Cool slightly before slicing and serving.</li>
        </ol>
      </div>

      {/* FLAVOR PROFILE */}
      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Sweet, creamy, and fruity with a crunchy topping. A nostalgic
          dessert that tastes like childhood memories.
        </p>
      </div>

    </div>
  );
}
