import { useEffect, useRef, useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube, FaShareAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar, FaRegClock } from "react-icons/fa";
import "../assets/Css/style.css";
import { loadFavorites, toggleFavorite } from "../utils/favorites";

function Home() {
  const navigate = useNavigate();

  const slides = [
    {
      img: "/Images/italian-pasta-shells-with-mushrooms-zucchini-tomato-sauce.jpg",
      captionPos: { left: "10%", bottom: "20%" },
      align: "text-start",
      title: <>Craving something different?</>,
      text: <>Our recipes are <br />here to inspire your plate!</>,
    },
    {
      img: "/Images/sliced-tasty-chocolate-brownie-with-cream-cutting-board-high-quality-photo.jpg",
      captionPos: { right: "6.2%", bottom: "20%" },
      align: "text-end",
      title: <>Elevate Your Dessert Game.</>,
      text: <>Explore our cake recipes and impress <br /> your family and friends!</>,
    },
    {
      img: "/Images/plate-with-paleo-diet-food-boiled-eggs-avocado-cucumber-nuts-cherry-strawberries-paleo-breakfast-top-view.jpg",
      captionPos: { left: "10%", bottom: "20%" },
      align: "text-start",
      title: <>Want your salads <br />to be healthy &amp; delicious?</>,
      text: <>Well, we're here to help you!, </>,
      customClass: "salad-caption",
    },
  ];

  const weeknights = [
    {
      id: "wk1",
      tag: "FAMILY DINNERS",
      title: "Sheet Pan Salmon and Broccoli with Miso Butter",
      time: "45 mins",
      img: "/Images/Sheet Pan Salmon and Broccoli .webp",
      href: "/recipes/sheet-pan-salmon",
      rating: 4.5,
    },
    {
      id: "wk2",
      tag: "Quick Dinners",
      title: " Quick Beef Stir Fry with Bell Peppers",
      time: "40 mins",
      img: "/Images/Quick Beef Stir Fry with Bell Peppers.webp",
      href: "/recipes/sausage-potato-soup",
      rating: 4.7,
    },
    {
      id: "wk3",
      tag: "Easy Pies",
      title: "My Granny's 5-Ingredient Party Pie Is My Favorite Retro Dessert",
      time: "20 mins",
      img: "/Images/Party Pie.webp",
      href: "/recipes/Party Pie",
      rating: 4.6,
    },
    {
      id: "wk4",
      tag: "Easy Slow Cooker",
      title: "4-Ingredient Chicken Dinner",
      time: "30 mins",
      img: "/Images/4-Ingredient Chicken Dinner.webp",
      href: "/recipes/4-Ingredient Chicken Dinner",
      rating: 4.8,
    },
    {
      id: "wk5",
      tag: "VEGETARIAN",
      title: "Vegetarian Spinach and Mushroom Lasagna",
      time: "30 mins",
      img: "/Images/Vegetarian Spinach and Mushroom Lasagna.webp",
      href: "/recipes/Vegetarian Spinach and Mushroom Lasagna",
      rating: 4.4,
    },
    {
      id: "wk6",
      tag: "Dessert",
      title: "Peanut Butter Chocolate Chip Banana Bread",
      time: "22 mins",
      img: "/Images/Peanut Butter Chocolate Chip Banana Bread.webp",
      href: "/recipes/Peanut Butter Chocolate Chip Banana Bread",
      rating: 4.6,
    },
    {
      id: "wk7",
      tag: "Drinks",
      title: "Boozy Hot Chocolate",
      time: "15 mins",
      img: "/Images/Boozy Hot Chocolate.webp",
      href: "/recipes/Boozy Hot Chocolate",
      rating: 4.8,
    },
    {
      id: "wk8",
      tag: "Drinks",
      title: "Strawberry Lemonade",
      time: "5 mins",
      img: "/Images/Strawberry Lemonade.webp",
      href: "/recipes/Strawberry Lemonade",
      rating: 4.4,
    },
    {
      id: "wk9",
      tag: "Healthy Smoothies",
      title: "Blueberry Smoothie",
      time: "5 mins",
      img: "/Images/Blueberry Smoothie.webp",
      href: "/recipes/Blueberry Smoothie",
      rating: 4.6,
    },
  ];

  // ===== Favorites (persistent via localStorage) =====
  const [liked, setLiked] = useState(() => loadFavorites());
  const handleLike = (recipe) => {
    setLiked((prev) => toggleFavorite(recipe.id, recipe, prev));
  };

  // --- Carousel logic ---
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  const goTo = (i) => setIndex((i + slides.length) % slides.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [index]);

  const startAuto = () => {
    stopAuto();
    timer.current = setInterval(next, 5000);
  };
  const stopAuto = () => {
    if (timer.current) clearInterval(timer.current);
  };

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
              <div
                className={`carousel-caption ${s.align} ${s.customClass || ""}`}
                style={{
                  ...s.captionPos,
                  ...(s.customClass === "salad-caption" ? { left: "10%" } : {}),
                }}
              >
                <h3 className="caption-title">{s.title}</h3>
                <p className="caption-text">{s.text}</p>

                {s.customClass === "salad-caption" ? (
                  // Slide 3 — open Healthy listing (no scroll)
                  <button
                    type="button"
                    className="btn read-more-btn"
                    onClick={() => navigate("/recipes?cat=healthy")}
                    style={{ position: "relative", zIndex: 20 }}
                  >
                    Read More <span className="btn-icon">»</span>
                  </button>
                ) : i === 0 ? (
                  // Slide 1 — Dinner
                  <button
                    type="button"
                    className="btn read-more-btn"
                    onClick={() => navigate("/recipes/dinner")}
                    style={{ position: "relative", zIndex: 20 }}
                  >
                    Read More <span className="btn-icon">»</span>
                  </button>
                ) : i === 1 ? (
                  // Slide 2 — Desserts
                  <button
                    type="button"
                    className="btn read-more-btn"
                    onClick={() => navigate("/recipes/desserts")}
                    style={{ position: "relative", zIndex: 20 }}
                  >
                    Read More <span className="btn-icon">»</span>
                  </button>
                ) : (
                  <button type="button" className="btn read-more-btn">
                    Read More <span className="btn-icon">»</span>
                  </button>
                )}
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

      <section className="cook">
        <div className="cook-head">
          <h2 className="cook-title">Cooking</h2>
          <p className="cook-dek">
            Make the mealtime more delicious, memorable, and achievable with
            expert advice from our Test Kitchen, grocery store taste tests,
            editor-curated recipe collections, and more.
          </p>
        </div>

        <div className="cook-feature">
          {/* Majtas: mozaik me 3 imazhe */}
          <div className="cook-mosaic">
            <img src="/Images/Tomato.webp" alt="Heirloom tomato" />
            <img src="/Images/nectarine.webp" alt="Nectarine" />
            <img src="/Images/Homemade Sabich.webp" alt="Homemade Sabich" />
          </div>

          {/* Djathtas: spotlight me tekst brenda fotos */}
          <article className="cook-spotlight">
            <img
              src="/Images/GrilledChicken.webp"
              className="cook-spotlight-img"
              alt="Grilled Chicken"
            />

            {/* Teksti mbi imazh */}
            <div className="cook-cap">
              <span className="cook-kicker">COOKING</span>
              <h3 className="cook-h3">
                An Unexpected Rub for Exceptional Grilled Chicken
              </h3>
              <div className="cook-underline" />
              <p className="cook-subdek">
                Buttermilk powder swoops in when you don't have time for an
                all-day marinade.
              </p>
            </div>
          </article>
        </div>

        {/* Categories bubbles row */}
        <CategoriesRow />

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

        {/* TASTE TESTS */}
        <TasteTestsRow />

        {/* EDITOR'S PICKS */}
        <section className="editors section-gap">
          <EditorsPicks />
        </section>

        {/* STORY + SIDEBAR */}
        <section className="story section-gap">
          <StoryWithSidebar />
        </section>

        {/* Simply Recipes / Weeknights */}
        <section className="weeknights section-gap">
          <div className="wk-head">
            <h2 className="wk-title">Simply Recipes</h2>
            <a className="wk-more" href="/recipes?tag=weeknight">
              →
            </a>
          </div>

          <div className="wk-grid">
            {weeknights.map((r) => (
              <article key={r.id} className="wk-card">
                <a className="wk-thumb" href={r.href}>
                  <img src={r.img} alt={r.title} />
                  <button
                    type="button"
                    className={`wk-like ${liked[r.id] ? "is-liked" : ""}`}
                    aria-label={liked[r.id] ? "Remove from favorites" : "Add to favorites"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLike(r); // persist full recipe to localStorage
                    }}
                  >
                    {liked[r.id] ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </a>

                <div className="wk-body">
                  <span className="wk-tag">{r.tag}</span>
                  <a className="wk-title-link" href={r.href}>
                    <h3 className="wk-h3">{r.title}</h3>
                  </a>

                  <div className="wk-meta">
                    <span className="wk-time">
                      <FaRegClock /> {r.time}
                    </span>
                    <span className="wk-stars" aria-label={`Rating ${r.rating} out of 5`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={i} className={i < Math.round(r.rating) ? "on" : ""} />
                      ))}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===== FUN COOKING FACTS ===== */}
        <section className="fun-facts">
          <h2 className="fun-title">Did You Know?</h2>
          <p className="fun-dek">Surprising (and tasty) science from the kitchen!</p>

          <div className="fun-grid">
            {[
              {
                fact:
                  "Adding a pinch of salt to chocolate desserts makes them taste sweeter, salt boosts the brain's sweet receptors!",
                icon: "🍫",
              },
              {
                fact:
                  "Garlic becomes milder the more you cook it. Raw = sharp, roasted = sweet and nutty.",
                icon: "🧄",
              },
              {
                fact:
                  "Searing meat doesn't lock in juices, it creates the Maillard reaction, which adds that irresistible flavor crust.",
                icon: "🥩",
              },
              {
                fact:
                  "Honey never spoils. Archaeologists found pots of it still edible after 3,000 years in Egyptian tombs.",
                icon: "🍯",
              },
              {
                fact:
                  "Chilling cookie dough overnight lets the flour fully hydrate for thicker, richer cookies.",
                icon: "🍪",
              },
              {
                fact:
                  "Carrots were originally purple! The orange variety was bred in the 17th century as a tribute to the Dutch royal family.",
                icon: "🥕",
              },
              {
                fact:
                  "Olive oil can 'freeze' in the fridge, that's a sign it's pure and unrefined, not a defect!",
                icon: "🫒",
              },
              {
                fact:
                  "You taste food less when you're cold, that's why soups and stews are seasoned stronger in winter.",
                icon: "🍲",
              },
            ].map((item, i) => (
              <div key={i} className="fun-card">
                <div className="fun-emoji">{item.icon}</div>
                <p className="fun-text">{item.fact}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== THE ART OF COOKING ===== */}
        <section className="art-cooking">
          <div className="art-inner">
            <div className="art-img">
              <video
                className="art-video"
                src="/Images/Alice Waters Teaches The Art of Home Cooking _ Official Trailer _ MasterClass.mp4"
                controls
                preload="metadata"
                poster="/Images/ArtOfCooking.jpg"
                playsInline
              />
            </div>

            <div className="art-text">
              <h2 className="art-title">The Art of Cooking</h2>
              <p>
                Cooking is more than following a recipe, it's a quiet dialogue between
                nature, time, and the senses. Every slice of a knife, every scent that
                fills the air, every taste that lingers on the tongue tells a deeper
                story, one of care, patience, and gratitude.
              </p>
              <p>
                Real cooking begins long before the heat. It starts with curiosity, in
                the soil that grows our food, in the hands that harvest it, and in the
                heart that decides to create something nourishing. It teaches us to slow
                down, to pay attention, and to appreciate the beauty in simple moments,
                the crackle of butter, the rhythm of stirring, the comfort of sharing a
                meal.
              </p>
              <p>
                To cook is to connect, to the earth, to others, and to ourselves. It is
                a practice of mindfulness and love, where flavor becomes memory, and
                every dish becomes a reflection of who we are.
              </p>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <NewsletterBand />
      </section>
    </>
  );
}

export default Home;

function TasteTestsRow() {
  const items = [
    {
      img: "/Images/Graham Cracker Taste Test.webp",
      kicker: "COOKING",
      title: "The Best Graham Crackers for Pie Crusts, S'mores, and More",
      dek: "We tasted 11 grahams—classics to gluten-free—to find the best crackers for everyone.",
    },
    {
      img: "/Images/taste-test-mint-chip-ice-cream.webp",
      kicker: "COOKING",
      title: "The 3 Best Mint Chocolate Chip Ice Creams: A Blind Taste Test",
      dek: "We sampled pints from Jeni's, Trader Joe's, Häagen-Dazs, and more.",
    },
    {
      img: "/Images/taste-test-tonic-water.webp",
      kicker: "DRINKS",
      title: "The Best Tonic Water for Cocktails, According to Editors",
      dek: "Seven widely available picks—Fever-Tree, Q, Betty Buzz, and more.",
    },
    {
      img: "/Images/Sparkling Water Taste Test.webp",
      kicker: "TRENDS",
      title: "We Tasted These Sparkling Waters So You Don't Have To",
      dek: "Blind-tasted the national favorites to see which actually sparkles.",
    },
    {
      img: "/Images/DarkChocolateTasteTest.webp",
      kicker: "COOKING",
      title: "The Best Dark Chocolate for Baking, Melting, and Snacking",
      dek: "We sampled bittersweet bars from Godiva, Ghirardelli, and Guittard to find the best chocolate to keep in your pantry.",
    },
    {
      img: "/Images/PieCrust.webp",
      kicker: "COOKING",
      title: "The Best Store-Bought Pie Crust Isn't the One You Think",
      dek: "In a blind taste test, there was one clear winner.",
    },
    {
      img: "/Images/taste-test-chapagne.webp",
      kicker: "DRINKS",
      title: "Which Champagne is Best? A Taste Test of Veuve Clicquot, Bollinger, Moët, and More",
      dek: "We sipped 7 brands to help you figure out your next great party pour.",
    },
    {
      img: "/Images/taste-test-caesar.webp",
      kicker: "COOKING",
      title: "The Best Caesar Dressing You Can Buy at the Store",
      dek: "We tried 19 Caesar dressings—Ken's, Cardini, Marzetti, and more—to find our favorite.",
    },
  ];

  const scrollerRef = useRef(null);
  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = Math.round(el.clientWidth * 0.9) * dir;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="cook-tt">
      <div className="cook-tt-head">
        <h3 className="cook-tt-title">TASTE TESTS</h3>
        <div className="cook-arrows">
          <button aria-label="Previous" onClick={() => scrollBy(-1)}>
            ‹
          </button>
          <button aria-label="Next" onClick={() => scrollBy(1)}>
            ›
          </button>
        </div>
      </div>

      <div className="cook-scroll" ref={scrollerRef}>
        {items.map((it, i) => (
          <article key={i} className="cook-card">
            <img src={it.img} alt={it.title} className="cook-card-img" />
            <span className="cook-kicker">{it.kicker}</span>
            <h4 className="cook-card-title">{it.title}</h4>
            <div className="cook-underline small" />
            <p className="cook-card-dek">{it.dek}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CategoriesRow() {
  const cats = [
    { key: "quick", label: "QUICK AND EASY", img: "/Images/QuickAndEasy.webp" },
    { key: "dinner", label: "DINNER", img: "/Images/Dinner.jpg" },
    { key: "vegetarian", label: "VEGETARIAN", img: "/Images/Vegetarian.webp" },
    { key: "healthy", label: "HEALTHY", img: "/Images/Healthyjpg.jpg" },
    { key: "instantpot", label: "INSTANT POT", img: "/Images/InstantPot.jpg" },
    { key: "vegan", label: "VEGAN", img: "/Images/Vegan.jpg" },
    { key: "mealprep", label: "MEAL PREP", img: "/Images/MealPrep.jpg" },
  ];

  return (
    <section className="cats">
      <div className="cats-track">
        {cats.map((c) => (
          <a
            key={c.key}
            className="cat"
            href={`/recipes?cat=${encodeURIComponent(c.key)}`}
          >
            <img className="cat-img" src={c.img} alt={c.label} />
            <span className="cat-label">{c.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function NewsletterBand() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const form = e.currentTarget;
    const email = new FormData(form).get("email");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email.");
      return;
    }

    setBusy(true);
    try {
      const url = "/api/subscribe";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setMessage("You’re in! Check your inbox.");
        form.reset();
      } else {
        setMessage(data?.error || "Subscription failed.");
      }
    } catch (err) {
      setMessage(`Network error — ${String(err?.message || err)}.`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="newsletter">
      <div className="newsletter-inner">
        <div className="newsletter-copy">
          <h3 className="newsletter-title">Get the best recipes, weekly.</h3>
          <p className="newsletter-dek">
            Fresh ideas, seasonal menus, and editor tips—straight to your inbox.
          </p>
        </div>

        <form className="newsletter-form" onSubmit={onSubmit} noValidate>
          <input
            className="newsletter-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            autoComplete="email"
            required
          />
          <button className="newsletter-btn" type="submit" disabled={busy}>
            {busy ? "Subscribing…" : "Subscribe"}
          </button>
          <p className="newsletter-msg" role="status" aria-live="polite">
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}

function EditorsPicks() {
  const picks = [
    {
      img: "/Images/Breakfast.webp",
      badge: "BREAKFAST",
      title: "The 3-Ingredient Breakfast My Son Requests Every Morning",
      href: "/recipes/breakfast",
    },
    {
      img: "/Images/Lunch.webp",
      badge: "LUNCH",
      title: "This Easy Sandwich Tastes Like Chinese Take-Out",
      href: "/recipes/lunch",
    },
    {
      img: "/Images/Dinner.webp",
      badge: "DINNER",
      title: "This Greek-Inspired Sheet Pan Dinner Is So Comforting",
      href: "/recipes/dinner",
    },
    {
      img: "/Images/carrot-cakewebp.webp",
      badge: "DESSERT",
      title: "The World’s Best Carrot Cake Is Also the Easiest",
      href: "/recipes/desserts",
    },
    {
      img: "/Images/Guacamole.webp",
      badge: "APPETIZERS",
      title: "How to Make the Best Guacamole",
      href: "/recipes/appetizers",
    },
    {
      img: "/Images/Smoothie.webp",
      badge: "DRINKS",
      title: "Berry Chocolate Protein Smoothie",
      href: "../drinks",
    },
  ];

  return (
    <div className="ed-grid">
      {picks.map((p, i) => (
        <a key={i} className="ed-card" href={p.href}>
          <img className="ed-card-img" src={p.img} alt={p.title} />
          <span className="ed-card-badge">{p.badge}</span>
          <h4 className="ed-card-title">{p.title}</h4>
        </a>
      ))}
    </div>
  );
}

function StoryWithSidebar() {
  return (
    <div className="story-grid">
      <a className="story-media" href="/Images/toast.jpg">
        <img src="/Images/toast.jpg" alt="Instant Pot  Toast" />
      </a>

      <article className="story-body">
        <h2 className="story-title">
          The Best Instant Pot Toast recipe (vegan & gluten free!)
        </h2>
        <p className="story-excerpt">
          Three easy breakfast toasts, one board. Savory cherry-tomato + toasted seeds with a glug of olive oil
          and flaky salt; classic herby avocado brightened with lemon and a pinch of chili; and a sweet banana-blueberry
          combo finished with maple (or tahini) and a sprinkle of sesame. All vegan and gluten-free, ready in 10 minutes.
          Serve as a mix-and-match brunch, pack for on-the-go fuel, or pair with plant-based yogurt for a fuller plate.
        </p>

        <div className="story-actions">
          <a className="story-readmore" href="/recipes/instant-pot-french-toast">Read more</a>
          <button className="story-share" type="button">
            <FaShareAlt /> <span>Share</span>
          </button>
        </div>
      </article>

      <aside className="story-aside">
        <div className="about-card">
          <img className="about-photo" src="/Images/about-image-new.png" alt="About me" />
          <h4 className="about-title">Hey, I'm Sarah Baker!</h4>
          <p className="about-text">
            I'm so happy you're here! Many of my favorite memories in life happen around the table
            and they're even better when nourished by something seriously delicious.
          </p>
          <a className="about-btn" href="/about">More about us</a>

          <div className="about-socials">
            <a aria-label="Facebook" href="#"><FaFacebookF /></a>
            <a aria-label="Instagram" href="#"><FaInstagram /></a>
            <a aria-label="Pinterest" href="#"><FaPinterestP /></a>
            <a aria-label="YouTube" href="#"><FaYoutube /></a>
          </div>
        </div>
      </aside>
    </div>
  );
}
