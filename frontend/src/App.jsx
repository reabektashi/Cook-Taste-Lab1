import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/register";
import SearchResults from "./pages/SearchResults";
import Drinks from "./pages/Drinks";
import Coffee from "./pages/Coffee";
import Tea from "./pages/Tea";
import Juices from "./pages/Juices";
import Coctails from "./pages/recipes/cocktails";
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
          <Route path="/drinks/tea" element={<Tea />} />
          <Route path="/drinks/juices" element={<Juices />} />
          <Route path="/recipes/coctails" element={<Coctails />} />
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
