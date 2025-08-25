import "../../assets/Css/style.css";

function Food() {
  return (
    <>
      {/* HEADER */}
      <header className="header">
        <img src="/Images/foodIMG.jpg" alt="Food Recipes Background" className="header-image" />
        <h1 className="header-title">Food Recipes</h1>
        <p className="header-subtitle">Your guide to delicious food ideas!</p>
      </header>

      {/* FOOD RECIPE CARDS */}
      <div className="container">
      <div className="row">
        {[
          {
            title: "Spaghetti Carbonara",
            img: "SpaghettiCarbonara.jpg",
            text: "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper."
          },
          {
            title: "Chicken Tikka Masala",
            img: "ChickenTikkaMasala.jpg",
            text: "A popular dish of marinated chicken chunks in a spicy sauce."
          },
          {
            title: "Beef Stroganoff",
            img: "Beef-Stroganoff.jpg",
            text: "A Russian dish of sautéed pieces of beef served in a sauce with sour cream."
          },
          {
            title: "The Best Homemade Lasagna",
            img: "ClassicLasagna.jpg",
            text: "A layered dish of lasagna noodles, rich meat sauce, creamy béchamel, and melted cheese."
          },
          {
            title: "Homemade Pepperoni Pizza",
            img: "easy-pepperoni-pizza.jpg",
            text: "A crispy crust topped with tangy sauce, melted mozzarella, and spiced pepperoni."
          },
          {
            title: "Buttermilk Pancakes",
            img: "Buttermilk-Pancakes.jpg",
            text: "Fluffy, golden pancakes, perfect for a cozy breakfast stack topped with butter and syrup."
          }
        ].map((item, i) => (
          <div key={i} className="recipe-card">
            <img src={`/Images/${item.img}`} alt={item.title} className="recipe-image" />
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.text}</p>
            <a href="#" className="recipe-button">View Recipe</a>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}

export default Food;
