import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout për frontend
import Layout from "./components/Layout";

// Faqet e frontend-it
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

// DASHBOARD (layout-i)
import Dashboard from "./pages/Dashboard";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* FRONTEND me Layout normal */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="drinks" element={<Drinks />} />
          <Route path="recipes/desserts" element={<Desserts />} />
          <Route path="recipes/dinner" element={<Dinner />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="logout" element={<Logout />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
           <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>

        
      </Routes>
    </BrowserRouter>
  );
}
