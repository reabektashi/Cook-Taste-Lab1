import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/register";
import SearchResults from "./pages/SearchResults";
import Drinks from "./pages/Drinks";
import Favorites from "./pages/Favorites";
import Desserts from "./pages/Recipes/dessert";
import Dinner from "./pages/Recipes/dinner";
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
import Breakfast from "./pages/recipes/breakfast";
import Lunch from "./pages/recipes/lunch";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/recipes/desserts" element={<Desserts />} />
          <Route path="/recipes/dinner" element={<Dinner />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/recipes/breakfast" element={<Breakfast />} />
          <Route path="/recipes/lunch" element={<Lunch />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="reports" element={<Reports />} />
            <Route path="categories" element={<Categories />} />
            <Route path="drinksdash" element={<DrinksDash />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
