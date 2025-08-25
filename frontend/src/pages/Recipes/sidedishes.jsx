import "../../assets/Css/style.css";

function SideDishes() {
  return (
    <>
      {/* HEADER */}
      <header>
        <img src="/Images/sidedishesIMG.jpg" alt="Side Dishes Background" />
        <h1>Side Dishes Recipes</h1>
        <p>Your guide to delicious side dishes ideas!</p>
      </header>

      {/* RECIPE CARDS */}
      <div className="container">
        <div className="row">
          {[
            {
              title: "Roasted Broccoli With Parmesan",
              img: "Roasted-Broccoli.jpg",
              text: "Roasting broccoli is reliably the preparation that converts broccoli haters, young and old alike."
            },
            {
              title: "Korean Potato Salad",
              img: "Korean-Potato-Salad.jpg",
              text: "Made with creamy mashed potatoes, crisp vegetables, and a hint of sweetness."
            },
            {
              title: "Oven Roasted Vegetables",
              img: "Oven-Roasted-Vegetables.jpg",
              text: "A colorful medley of seasonal vegetables tossed in olive oil and herbs."
            },
            {
              title: "Antipasto Salad",
              img: "Antipasto-Salad.jpg",
              text: "All the best antipasti with crisp lettuce and savory dressing."
            },
            {
              title: "Garlic Mashed Potatoes",
              img: "Mashed-Potatoes.jpg",
              text: "Creamy, buttery potatoes blended with roasted garlic."
            },
            {
              title: "Honey Glazed Carrots",
              img: "Honey-Roasted-Carrots.jpg",
              text: "Roast carrots with honey until crisp-tender, topped with herbs and lemon."
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

export default SideDishes;
