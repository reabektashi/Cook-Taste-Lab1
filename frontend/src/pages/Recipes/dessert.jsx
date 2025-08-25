import "../../assets/Css/style.css";

function Desserts() {
  return (
    <>
      {/* HEADER */}
      <header>
        <img src="/Images/dessertbackground.jpg" alt="Dessert Recipes Background" />
        <h1>Dessert Recipes</h1>
        <p>Your guide to delicious dessert ideas!</p>
      </header>

      {/* RECIPE CARDS */}
      <div className="container">
        <div className="row">
          {[
            {
              title: "Chocolate Chip Banana Bread Coffee Cake",
              img: "ChocolateChipBananaBreadCoffeeCake.jpg",
              text: "A moist coffee cake infused with ripe bananas and dotted with rich chocolate chips."
            },
            {
              title: "Red Velvet Cake",
              img: "Red-Velvet-Cake.jpg",
              text: "A luscious cake with a striking red hue, featuring a velvety texture and cream cheese frosting."
            },
            {
              title: "Cake Pops",
              img: "Cake-Pops.jpg",
              text: "Bite-sized treats made from crumbled cake and frosting, dipped in chocolate."
            },
            {
              title: "Pumpkin Chocolate Chip Muffins",
              img: "Chocolate-Pumpkin-Muffins.jpg",
              text: "Moist muffins infused with pumpkin puree and chocolate chips. A fall favorite."
            },
            {
              title: "Chocolate Pudding Cake",
              img: "Chocolate-Pudding-Cake.jpg",
              text: "Rich chocolate cake with a gooey pudding center. Best served warm with vanilla ice cream."
            },
            {
              title: "Oreo Cheesecake",
              img: "Oreo-Cheesecake.jpg",
              text: "Smooth cheesecake with Oreo crust and chunks, topped with chocolate drizzle."
            }
          ].map((item, i) => (
            <div key={i} className="recipe-card">
              <img src={`/Images/${item.img}`} alt={item.title} className="recipe-image" />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.text}</p>
                <a href="#" className="recipe-button">View Recipe</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Desserts;
