import "../assets/Css/style.css";

function Drinks() {
  const categories = [
    { key: "cocktails", label: "Cocktails", img: "/Images/cat-cocktail.jpg" },
    { key: "mocktails", label: "Mocktails", img: "/Images/cat-mocktail.jpg" },
    { key: "smoothies", label: "Smoothies", img: "/Images/cat-smoothie.jpg" },
    { key: "coffee",    label: "Coffee",    img: "/Images/cat-coffee.jpg" },
    { key: "tea",       label: "Tea",       img: "/Images/cat-tea.jpg" },
    { key: "juices",    label: "Juices",    img: "/Images/cat-juice.jpg" },
  ];

  const trending = [
    {
      title: "Classic Mojito",
      text: "Fresh lime, mint, soda water — simple & refreshing.",
      img: "/Images/drink-mojito.jpg",
    },
    {
      title: "Iced Matcha Latte",
      text: "Earthy green tea with creamy milk & ice.",
      img: "/Images/drink-matcha.jpg",
    },
    {
      title: "Strawberry Smoothie",
      text: "A fruity blend of strawberries & yogurt.",
      img: "/Images/drink-smoothie.jpg",
    },
  ];

  return (
    <div className="drinks-page">
      {/* Hero */}
      <header className="drinks-hero">
        <div className="hero-text">
          <h1>Sip Something Refreshing</h1>
          <p>Cocktails, smoothies, teas & more to quench your thirst.</p>
          <a className="hero-btn" href="#categories">Explore Recipes</a>
        </div>
      </header>

      {/* Categories */}
      <section id="categories" className="cats section-gap">
        <h2 className="section-title">Browse by Category</h2>
        <div className="cats-track">
          {categories.map((c) => (
            <a key={c.key} className="cat" href={`/drinks/${c.key}`}>
              <img className="cat-img" src={c.img} alt={c.label} />
              <span className="cat-label">{c.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="trending-container section-gap">
        <h2 className="heading">Trending Drinks</h2>
        <div className="row">
          {trending.map((d, i) => (
            <div key={i} className="card">
              <div className="card-body">
                <h5 className="card-title">{d.title}</h5>
                <p className="card-text">{d.text}</p>
              </div>
              <img src={d.img} alt={d.title} className="card-img" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Drinks;
