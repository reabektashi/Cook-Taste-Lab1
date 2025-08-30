import React from "react";
import "../assets/Css/style.css";

function Drinks() {
  const categories = [
    { key: "cocktails", label: "Cocktails", img: "/Images/cat-cocktail.png" },
    { key: "mocktails", label: "Mocktails", img: "/Images/cat-mocktail.png" },
    { key: "smoothies", label: "Smoothies", img: "/Images/cat-smoothie.png" },
    { key: "coffee",    label: "Coffee",    img: "/Images/cat-coffee.png" },
    { key: "tea",       label: "Tea",       img: "/Images/cat-tea.png" },
    { key: "juices",    label: "Juices",    img: "/Images/cat-juice.png" },
  ];

  const trending = [
    {
      title: "Classic Mojito",
      text: "Fresh lime, mint, soda water — simple & refreshing.",
      img: "/Images/drink-mojito.png",
    },
    {
      title: "Iced Matcha Latte",
      text: "Earthy green tea with creamy milk & ice.",
      img: "/Images/drink-matcha.png",
    },
    {
      title: "Strawberry Smoothie",
      text: "A fruity blend of strawberries & yogurt.",
      img: "/Images/drink-smoothie.png",
    },
    {
      title: "Peach Iced Tea",
      text: "Sweet tea & juicy peach.",
      img: "/Images/drink-peach-tea.png",
    },
  ];

  return (
    <div className="drinks-page">
      {/* HERO */}
      <header className="drinks-hero">
        <div className="hero-text">
          <h1 className="hero-title">
            Sip Something <span className="nowrap">Refreshing</span>
          </h1>
          <p className="hero-sub">
            Cocktails, smoothies, teas & more to quench your thirst.
          </p>
          <a className="hero-btn" href="#categories">Explore Recipes</a>
        </div>
      </header>

      {/* CATEGORIES */}
      <section id="categories" className="cats section-gap">
        <h2 className="section-title">DRINKS</h2>
        <div className="cats-track">
          {categories.map((c) => (
            <a key={c.key} className="cat" href={`/drinks/${c.key}`}>
              <img className="cat-img" src={c.img} alt={c.label} />
              <span className="cat-label">{c.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* EDITORIAL GRID */}
      <section className="editorial">
        <div className="ed-grid left-feature">
          {/* Feature (left) */}
          <article className="ed-feature ed-d has-image">
            <div className="ed-feature-media">
              <img
                src="/Images/balance.png"
                alt="Balancing a cocktail with citrus and syrup"
              />
            </div>

            <div className="ed-feature-body">
              <span className="ed-tag">COCKTAIL BASICS</span>
              <h3 className="ed-title">How to Balance a Drink Like a Pro</h3>
              <p className="ed-excerpt">
                Master the 2:1:1 rule (spirit : sour : sweet), then adjust bitterness and
                dilution for bar-quality cocktails at home.
              </p>
              <a className="ed-link" href="/guides/balance-a-drink">Read more →</a>
            </div>
          </article>

          {/* Right images */}
          <a className="ed-img ed-a" href="#" aria-label="Blue Lagoon">
            <img src="/Images/bluelagoon.png" alt="Blue Lagoon" />
          </a>

          <a className="ed-img ed-b" href="#" aria-label="Coffee">
            <img src="/Images/coffee.png" alt="Coffee" />
          </a>

          {/* Right tall tile as VIDEO (kept in /Images) */}
          <a className="ed-img ed-c" href="#" aria-label="Watch: Peach iced tea">
            <video
              className="ed-media"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/Images/big.jpg"
            >
              <source src="/Images/big.mp4" type="video/mp4" />
              {/* <source src="/Images/big.webm" type="video/webm" /> */}
              Sorry, your browser doesn’t support embedded videos.
            </video>
          </a>
        </div>
      </section>

      {/* TOP RATED — now directly AFTER editorial */}
      <section className="trending-container section-gap" id="top-rated">
        <h2 className="heading">TOP RATED DRINKS</h2>
        <div className="row">
          {trending.map((d, i) => (
            <div key={i} className="card drink-card">
              <img src={d.img} alt={d.title} className="card-img" />
              <div className="card-body">
                <h5 className="card-title">{d.title}</h5>
                <p className="card-text">{d.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO BANNER (video background) */}
      <section className="promo has-video">
        <div className="promo-media">
          <video autoPlay muted loop playsInline preload="metadata">
            <source src="/Images/videor.mp4.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="promo-text">
          <h3>Try Something New</h3>
          <p>Five-minute spritzes & sunny sips.</p>
          <a className="btn" href="#top-rated">See Recipes</a>
        </div>
      </section>

     {/* ===== Feature Tiles (6 cards) ===== */}
<section className="ft section-gap">
  <h2 className="section-title">SEASONAL PICKS</h2>

  <div className="ft-grid">
    {[
      {
        title: "Cocktails",
        img: "/Images/limon.png",
        href: "/drinks/cocktails"
      },
      {
        title: "Blue Cocktail",
        img: "/Images/blue.png",
        href: "/drinks/tea"
      },
      {
        title: "Iced Vietnamese Coffee",
        img: "/Images/Iced Vietnamese Coffee.png",
        href: "/drinks/smoothies"
      },
      {
        title: "Pineapple Coconut Colada",
        img: "/Images/Pineapple Coconut Colada.png",
        href: "/drinks/mocktails"
      },
      {
        title: "Cucumber Mint Spa Water",
      img: "/Images/Cucumber Mint Spa Water.png",
        href: "/drinks/coffee"
      },
      {
        title: "Grapefruit Paloma",
        img: "/Images/Grapefruit Paloma.png",
        href: "/drinks/juices"
      },
    ].map((t, i) => (
      <a key={i} className="ft-card" href={t.href}>
        <img className="ft-img" src={t.img} alt={t.title} />
        <h3 className="ft-title">{t.title}</h3>
      </a>
    ))}
  </div>
</section>

    </div>
  );
}

export default Drinks;
