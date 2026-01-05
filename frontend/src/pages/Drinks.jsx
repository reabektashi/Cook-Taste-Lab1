// src/pages/Drinks.jsx
import React from "react";
import { Link } from "react-router-dom"; // SPA navigation
import "../assets/Css/style.css";

function Drinks() {
  const categories = [
    { key: "cocktails", label: "Cocktails", img: "/Images/cat-cocktail.png" },
    { key: "mocktails", label: "Mocktails", img: "/Images/cat-mocktail.png" },
    { key: "smoothies", label: "Smoothies", img: "/Images/cat-smoothie.png" },
    { key: "coffee", label: "Coffee", img: "/Images/cat-coffee.png" },
    { key: "tea", label: "Tea", img: "/Images/cat-tea.png" },
    { key: "juices", label: "Juices", img: "/Images/cat-juice.png" },
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

  const seasonalPicks = [
    { title: "Cocktails", img: "/Images/limon.png", key: "cocktails" },
    { title: "Blue Cocktail", img: "/Images/blue.png", key: "mocktails" },
    { title: "Iced Vietnamese Coffee", img: "/Images/Iced Vietnamese Coffee.png", key: "coffee" },
    { title: "Pineapple Coconut Colada", img: "/Images/Pineapple Coconut Colada.png", key: "mocktails" },
    { title: "Cucumber Mint Spa Water", img: "/Images/Cucumber Mint Spa Water.png", key: "juices" },
    { title: "Grapefruit Paloma", img: "/Images/Grapefruit Paloma.png", key: "juices" },
    { title: "Mango Pineapple Smoothie", img: "/Images/Mango Pineapple Smoothie.png", key: "smoothies" },
    { title: "Mixed Berry Smoothie", img: "/Images/Mixed Berry Smoothie.png", key: "smoothies" },
    { title: "Green Detox Smoothie", img: "/Images/Green Detox Smoothie.png", key: "smoothies" },
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
          <Link className="hero-btn" to="#categories">
            Explore Recipes <span className="btn-icon">»</span>
          </Link>
        </div>
      </header>

      {/* CATEGORIES */}
      <section id="categories" className="cats section-gap aboutus-page">
        <h2 className="section-title">DRINKS</h2>
        <div className="cats-track">
          {categories.map((c) => (
            <Link key={c.key} className="cat" to={`/drinks/${c.key}`}>
              <img className="cat-img" src={c.img} alt={c.label} />
              <span className="cat-label">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* EDITORIAL GRID */}
      <section className="ed-dark">
        <div className="editorial">
          <div className="ed-grid left-feature">
            <article className="ed-feature ed-d has-image">
              <div className="ed-feature-media">
                <img src="/Images/balance.png" alt="Balancing a cocktail" loading="lazy" />
              </div>
              <div className="ed-feature-body">
                <span className="ed-tag">COCKTAIL BASICS</span>
                <h3 className="ed-title">How to Balance a Drink Like a Pro</h3>
                <p className="ed-excerpt">
                  Master the 2:1:1 rule (spirit : sour : sweet), then adjust bitterness and
                  dilution for bar-quality cocktails at home.
                </p>
                <Link className="ed-link" to="/guides/balance-a-drink">
                  Read more →
                </Link>
              </div>
            </article>

            <Link className="ed-img ed-a" to="/drinks/cocktails" aria-label="Blue Lagoon">
              <img src="/Images/bluelagoon.png" alt="Blue Lagoon cocktail" loading="lazy" />
            </Link>

            <Link className="ed-img ed-b" to="/drinks/coffee" aria-label="Coffee">
              <img src="/Images/coffee.png" alt="Iced coffee" loading="lazy" />
            </Link>

            <Link className="ed-img ed-c" to="/drinks/iced-tea" aria-label="Peach iced tea">
              <video className="ed-media" autoPlay muted loop playsInline preload="metadata" poster="/Images/big.jpg">
                <source src="/Images/big.mp4" type="video/mp4" />
                Sorry, your browser doesn’t support embedded videos.
              </video>
            </Link>
          </div>
        </div>
      </section>

      {/* TOP RATED */}
      <section className="trending-container section-gap aboutus-page" id="top-rated">
        <h2 className="heading">TOP RATED DRINKS</h2>
        <div className="ct-row">
          {trending.map((d, i) => (
            <div key={i} className="drink-card">
              <img src={d.img} alt={d.title} className="ct-card-img drink-card-img" />
              <div className="drink-card-body">
                <h5 className="drink-card-title">{d.title}</h5>
                <p className="drink-card-text">{d.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* PROMO BANNER */}
      <section className="promo has-video">
        <div className="promo-media">
          <video autoPlay muted loop playsInline preload="metadata">
            <source src="/Images/video.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="promo-text">
          <h3>Try Something New</h3>
          <p>Five-minute spritzes & sunny sips.</p>
          <a className="ct-btn" href="#top-rated">
            See Recipes <span className="btn-icon">»</span>
          </a>
        </div>
      </section>

      {/* SEASONAL PICKS */}
      <section className="ft section-gap aboutus-page">
        <h2 className="section-title">SEASONAL PICKS</h2>
        <div className="ft-grid">
          {seasonalPicks.map((t, i) => (
            <Link key={i} className="ft-card" to={`/drinks/${t.key}`}>
              <img className="ft-img" src={t.img} alt={t.title} />
              <h3 className="ft-title">{t.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Drinks;
