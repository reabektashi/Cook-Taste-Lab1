import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/register";
import SearchResults from "./pages/SearchResults";
import Drinks from "./pages/Drinks";
import Coffee from "./pages/Coffee";
import Cocktails from "./pages/Cocktails";
import Mocktails from "./pages/Mocktails";
import Smoothies from "./pages/Smoothies";
import Tea from "./pages/Tea";
import Juices from "./pages/Juices";
import Desserts from "./pages/recipes/desserts";
import Breakfast from "./pages/recipes/breakfast";
import Lunch from "./pages/recipes/lunch";
import Dinner from "./pages/recipes/dinner";
import Appetizers from "./pages/Recipes/appetizers";
import Favorites from "./pages/Favorites";
import AboutUs from "./pages/aboutus";
import Logout from "./pages/logout";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import Reports from "./pages/Reports";
import Categories from "./pages/Categories";
import DrinksDash from "./pages/DrinksDash";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import QuickEasy from "./pages/QuickEasy";
import Vegetarian from "./pages/Vegetarian";
import Healthy from "./pages/Healthy";
import InstantPot from "./pages/InstantPot";
import Vegan from "./pages/Vegan";
import MealPrep from "./pages/MealPrep";
import GrillChicken from "./pages/recipePages/GrilledChicken";
import BuffaloChickenTacos from "./pages/recipePages/BuffaloChickenTacos";
import AntipastoSalad from "./pages/recipePages/AntipastoSalad";
import TiramisuCake from "./pages/recipePages/TiramisuCake";
import BananaMuffins from "./pages/recipePages/BananaMuffins";
import SheetPanSalmonMiso from "./pages/recipePages/SheetPanSalmonMiso";
import QuickBeefStirFry from "./pages/recipePages/QuickBeefStirFry";
import PartyPie from "./pages/recipePages/PartyPie";
import FourIngredientChicken from "./pages/recipePages/FourIngredientChicken";
import VegetarianLasagna from "./pages/recipePages/VegetarianLasagna";
import BananaBread from "./pages/recipePages/BananaBread";
import BoozyHotChocolate from "./pages/recipePages/BoozyHotChocolate";
import StrawberryLemonade from "./pages/recipePages/StrawberryLemonade";
import BlueberrySmoothie from "./pages/recipePages/BlueberrySmoothie";
import ClassicMojito from "./pages/drinksRecipePages/ClassicMojito";
import IcedMatchaLatte from "./pages/drinksRecipePages/IcedMatchaLatte";
import StrawberrySmoothie from "./pages/drinksRecipePages/StrawberrySmoothie";
import PeachIcedTea from "./pages/drinksRecipePages/PeachIcedTea";


// ⭐ Protected Admin Route
import ProtectedRoutes from "./utils/ProtectedRoutes";

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/drinks/coffee" element={<Coffee />} />
          <Route path="/drinks/cocktails" element={<Cocktails />} />
          <Route path="/drinks/mocktails" element={<Mocktails />} />
          <Route path="/drinks/smoothies" element={<Smoothies />} />
          <Route path="/drinks/tea" element={<Tea />} />
          <Route path="/drinks/juices" element={<Juices />} />
          <Route path="/recipes/desserts" element={<Desserts />} />
          <Route path="/recipes/breakfast" element={<Breakfast />} />
          <Route path="/recipes/lunch" element={<Lunch />} />
          <Route path="/recipes/dinner" element={<Dinner />} />
          <Route path="/recipes/appetizers" element={<Appetizers />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/quick-easy" element={<QuickEasy />} />
          <Route path="/vegetarian" element={<Vegetarian />} />
          <Route path="/healthy" element={<Healthy />} />
          <Route path="/instantpot" element={<InstantPot />} />
          <Route path="/vegan" element={<Vegan />} />
          <Route path="/mealprep" element={<MealPrep />} />
          <Route path="/grilled-chicken" element={<GrillChicken />} />
          <Route path="/buffalo-tacos" element={<BuffaloChickenTacos />} />
          <Route path="/antipasto-salad" element={<AntipastoSalad />} />
        <Route path="/tiramisu-cake" element={<TiramisuCake />} />
        <Route path="/banana-muffins" element={<BananaMuffins />} />
        <Route path="/sheet-pan-salmon-miso" element={<SheetPanSalmonMiso />} />
        <Route path="/quick-beef-stir-fry" element={<QuickBeefStirFry />} />
        <Route path="/party-pie" element={<PartyPie />} />
        <Route path="/4-ingredient-chicken" element={<FourIngredientChicken />} />
       <Route path="/vegetarian-lasagna" element={<VegetarianLasagna />} />
       <Route path="/banana-bread" element={<BananaBread />} />
        <Route path="/boozy-hot-chocolate" element={<BoozyHotChocolate />} />
<Route path="/strawberry-lemonade" element={<StrawberryLemonade />} />
<Route path="/blueberry-smoothie" element={<BlueberrySmoothie />} />
<Route path="/classic-mojito" element={<ClassicMojito />} />
<Route path="/iced-matcha-latte" element={<IcedMatchaLatte />} />
<Route path="/strawberry-smoothie" element={<StrawberrySmoothie />} />
<Route path="/peach-iced-tea" element={<PeachIcedTea />} />

          {/* ================================
              🔐 ADMIN PROTECTED ROUTES
              ================================= */}
          <Route element={<ProtectedRoutes requireAdmin={true} />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Overview />} />
              <Route path="reports" element={<Reports />} />
              <Route path="categories" element={<Categories />} />
              <Route path="drinksdash" element={<DrinksDash />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
