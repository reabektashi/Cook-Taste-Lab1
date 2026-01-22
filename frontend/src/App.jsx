import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";

// ⭐ Protected Admin Route
import ProtectedRoutes from "./utils/ProtectedRoutes";

// PUBLIC PAGES (lazy)
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/register"));
const SearchResults = lazy(() => import("./pages/SearchResults"));

const Drinks = lazy(() => import("./pages/Drinks"));
const Coffee = lazy(() => import("./pages/Coffee"));
const Cocktails = lazy(() => import("./pages/Cocktails"));
const Mocktails = lazy(() => import("./pages/Mocktails"));
const Smoothies = lazy(() => import("./pages/Smoothies"));
const Tea = lazy(() => import("./pages/Tea"));
const Juices = lazy(() => import("./pages/Juices"));

const Desserts = lazy(() => import("./pages/recipes/desserts"));
const Breakfast = lazy(() => import("./pages/recipes/breakfast"));
const Lunch = lazy(() => import("./pages/recipes/lunch"));
const Dinner = lazy(() => import("./pages/recipes/dinner"));
const Appetizers = lazy(() => import("./pages/Recipes/appetizers"));

const Favorites = lazy(() => import("./pages/Favorites"));
const AboutUs = lazy(() => import("./pages/aboutus"));
const Logout = lazy(() => import("./pages/logout"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

const QuickEasy = lazy(() => import("./pages/QuickEasy"));
const Vegetarian = lazy(() => import("./pages/Vegetarian"));
const Healthy = lazy(() => import("./pages/Healthy"));
const InstantPot = lazy(() => import("./pages/InstantPot"));
const Vegan = lazy(() => import("./pages/Vegan"));
const MealPrep = lazy(() => import("./pages/MealPrep"));

// RECIPE PAGES (lazy)
const GrillChicken = lazy(() => import("./pages/recipePages/GrilledChicken"));
const BuffaloChickenTacos = lazy(() => import("./pages/recipePages/BuffaloChickenTacos"));
const AntipastoSalad = lazy(() => import("./pages/recipePages/AntipastoSalad"));
const TiramisuCake = lazy(() => import("./pages/recipePages/TiramisuCake"));
const BananaMuffins = lazy(() => import("./pages/recipePages/BananaMuffins"));
const SheetPanSalmonMiso = lazy(() => import("./pages/recipePages/SheetPanSalmonMiso"));
const QuickBeefStirFry = lazy(() => import("./pages/recipePages/QuickBeefStirFry"));
const PartyPie = lazy(() => import("./pages/recipePages/PartyPie"));
const FourIngredientChicken = lazy(() => import("./pages/recipePages/FourIngredientChicken"));
const VegetarianLasagna = lazy(() => import("./pages/recipePages/VegetarianLasagna"));
const BananaBread = lazy(() => import("./pages/recipePages/BananaBread"));
const BoozyHotChocolate = lazy(() => import("./pages/recipePages/BoozyHotChocolate"));

// DRINK RECIPE PAGES (lazy)
const StrawberryLemonade = lazy(() => import("./pages/recipePages/StrawberryLemonade"));
const BlueberrySmoothie = lazy(() => import("./pages/recipePages/BlueberrySmoothie"));
const ClassicMojito = lazy(() => import("./pages/drinksRecipePages/ClassicMojito"));
const IcedMatchaLatte = lazy(() => import("./pages/drinksRecipePages/IcedMatchaLatte"));
const StrawberrySmoothie = lazy(() => import("./pages/drinksRecipePages/StrawberrySmoothie"));
const PeachIcedTea = lazy(() => import("./pages/drinksRecipePages/PeachIcedTea"));

// ADMIN (lazy)
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Overview = lazy(() => import("./pages/Overview"));
const Reports = lazy(() => import("./pages/Reports"));
const Categories = lazy(() => import("./pages/Categories"));
const DrinksDash = lazy(() => import("./pages/DrinksDash"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* No visible "Loading..." text */}
      <Suspense fallback={null}>
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

            {/* 🔐 ADMIN PROTECTED ROUTES */}
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
      </Suspense>
    </BrowserRouter>
  );
}
