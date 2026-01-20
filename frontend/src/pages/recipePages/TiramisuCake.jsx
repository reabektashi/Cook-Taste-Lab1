import React from "react";
import "../../assets/Css/style.css";

export default function TiramisuCake() {
  return (
    <div className="recipe-page">

      {/* TITLE */}
      <h1 className="recipe-title">Tiramisu Cake</h1>

      {/* INTRO */}
      <div className="recipe-intro">
        <p>
          This gorgeous two-layer cake is a tiramisu lover's dream. The fluffy mascarpone and Marsala filling uses instant vanilla pudding.
        </p>
      </div>

      {/* RECIPE INFO */}
      <div className="recipe-info">
        <div className="info-box">
          <h3>Prep Time</h3>
          <p>30 mins</p>
        </div>
        <div className="info-box">
          <h3>Cook Time</h3>
          <p>0 mins</p>
        </div>
        <div className="info-box">
          <h3>Servings</h3>
          <p>8 slices</p>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="hero-image">
        <img
          src="../Images/TiramisuCake.jpg"
          alt="Tiramisu Cake"
        />
      </div>

      {/* INGREDIENTS */}
      <div className="recipe-section">
        <h2>Ingredients</h2>
        <ul>
          <li>1 package ladyfingers</li>
          <li>1 cup brewed espresso or strong coffee</li>
          <li>1/2 cup coffee liqueur (optional)</li>
          <li>8 oz mascarpone cheese</li>
          <li>1 cup heavy cream</li>
          <li>1/2 cup sugar</li>
          <li>1 tsp vanilla extract</li>
          <li>Cocoa powder for dusting</li>
        </ul>
      </div>

      {/* STEPS */}
      <div className="recipe-section">
        <h2>Instructions</h2>
        <ol>
          <li>Brew coffee and let it cool slightly; mix with liqueur if using.</li>
          <li>Whip heavy cream with sugar and vanilla until soft peaks form.</li>
          <li>Fold mascarpone into whipped cream until smooth.</li>
          <li>Dip ladyfingers into coffee mixture and layer in a dish.</li>
          <li>Spread half of mascarpone mixture over the ladyfingers. Repeat layers.</li>
          <li>Refrigerate for at least 2 hours.</li>
          <li>Dust with cocoa powder before serving.</li>
        </ol>
      </div>

      {/* FLAVOR PROFILE */}
      <div className="recipe-section">
        <h2>Flavor Profile</h2>
        <p>
          Creamy, coffee-flavored, and slightly sweet with a delicate texture. Perfect dessert for any special occasion or a cozy evening treat.
        </p>
      </div>

    </div>
  );
}
