import { useEffect, useRef, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import "../assets/Css/style.css"; // keep your styles

function Home() {
  const slides = [
    {
      img: "/Images/italian-pasta-shells-with-mushrooms-zucchini-tomato-sauce.jpg",
      captionPos: { left: "10%", bottom: "10%" },
      align: "text-start",
      title: <>Craving something <br /> different?</>,
      text: <>Our recipes are <br />here to inspire your palate!</>,
    },
    {
      img: "/Images/sliced-tasty-chocolate-brownie-with-cream-cutting-board-high-quality-photo.jpg",
      captionPos: { right: "6.2%", bottom: "6%" },
      align: "text-end",
      title: <>Elevate Your Dessert Game.</>,
      text: <>Explore our cake recipes and impress <br /> your family and friends!</>,
    },
    {
      img: "/Images/plate-with-paleo-diet-food-boiled-eggs-avocado-cucumber-nuts-cherry-strawberries-paleo-breakfast-top-view.jpg",
      captionPos: { left: "8%", bottom: "10%" },
      align: "text-start",
      title: <>Want your salads <br />to be healthy &amp; delicious?</>,
      text: <>Well, we're here to help you!</>,
    },
  ];

  // --- Carousel logic ---
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  const goTo = (i) => setIndex((i + slides.length) % slides.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // autoplay (pause on hover)
  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [index]);

  const startAuto = () => {
    stopAuto();
    timer.current = setInterval(next, 5000); // 5s
  };
  const stopAuto = () => {
    if (timer.current) clearInterval(timer.current);
  };

  // --- Page ---
  return (
    <>
      {/* CAROUSEL */}
      <div
        id="recipeCarousel"
        className="carousel"
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
      >
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              className={i === index ? "active" : ""}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <div className="carousel-inner">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`carousel-item ${i === index ? "active" : ""}`}
              aria-hidden={i === index ? "false" : "true"}
            >
              <img src={s.img} alt={`Food ${i + 1}`} />
              <div className={`carousel-caption ${s.align}`} style={s.captionPos}>
                <h3 style={{ fontWeight: "bold", fontSize: 36 }}>{s.title}</h3>
                <p style={{ fontSize: 28 }}>{s.text}</p>
                <button className="btn read-more-btn" style={{ fontSize: 18 }}>
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" aria-label="Previous" onClick={prev}>
          &lt;
        </button>
        <button className="carousel-control-next" aria-label="Next" onClick={next}>
          &gt;
        </button>
      </div>

      {/* TRENDING */}
      <div className="trending-container">
        <h2 className="heading">Trending Now</h2>
        <div className="row">
          {[
            {
              title: "Buffalo Chicken Tacos",
              text:
                "This weeknight winner is ready in under 20 minutes and is topped with a creamy, crunchy slaw and blue cheese.",
              img: "BuffaloChickenTacos.jpg",
            },
            {
              title: "Antipasto Salad",
              text:
                "Combine all of the best antipasti with crisp lettuce and savory dressing for a satisfying antipasto salad.",
              img: "AntipastoSalad.jpg",
            },
            {
              title: "Tiramisu Cake",
              text:
                "This gorgeous two-layer cake is a tiramisu lover's dream. The fluffy mascarpone and Marsala filling uses instant vanilla pudding.",
              img: "TiramisuCake.jpg",
            },
            {
              title: "Banana Chocolate Chip Muffins",
              text:
                "Turn overripe bananas into crowd-pleasing muffins tender, moist and chocolate-studded.",
              img: "BananaChocolateMuffins.jpg",
            },
          ].map((item, i) => (
            <div key={i} className="card">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.text}</p>
              </div>
              <img src={`/Images/${item.img}`} alt={item.title} className="card-img" />
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Explore Flavorful Dishes Tailored to Your Tastes</h1>
            <p className="hero-description">
              Simply choose your favorite ingredients, and we'll suggest the perfect recipes to delight your taste buds.
            </p>
            <button
              className="hero-button"
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#ff6347";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#ff7f50";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <FaUtensils style={{ marginRight: 8 }} /> Get Started
            </button>
          </div>
          <div className="hero-image">
            <img src="/Images/Chicken-Alfredo-Pizza-HomePage.jpg" alt="Delicious Food" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
