import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/register";
import SearchResults from './pages/SearchResults';
import Drinks from "./pages/Drinks";
import Favorites from "./pages/Favorites";
import Desserts from "./pages/Recipes/dessert";
import AboutUs from './pages/aboutus';
import Logout from './pages/logout';
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Dinner from "./pages/Recipes/dinner"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent route renders Layout; child routes render inside <Outlet /> */}
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
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
    
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
