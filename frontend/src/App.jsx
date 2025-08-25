import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RecipeTable from './pages/RecipeTable';
import UserTable from './pages/UserTable';
import InsertUser from './pages/InsertUser';
import InsertRecipe from './pages/InsertRecipe';
import UpdateUser from './pages/UpdateUser';
import UpdateRecipe from './pages/UpdateRecipe';
import DeleteUser from "./pages/DeleteUser";
import DeleteRecipe from "./pages/DeleteRecipe";
import Layout from './components/Layout';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/register";
import SearchResults from './pages/SearchResults';
import Food from "./pages/Recipes/food";
import Desserts from "./pages/Recipes/dessert";
import SideDishes from "./pages/Recipes/sidedishes";
import AboutUs from './pages/aboutus';
import Logout from './pages/logout';



function App() {
  return (
<Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/recipes/food" element={<Food />} />
          <Route path="/recipes/desserts" element={<Desserts />} />
          <Route path="/recipes/sidedishes" element={<SideDishes />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usertable" element={<UserTable />} />
        <Route path="/recipetable" element={<RecipeTable />} />
        <Route path="/insert-user" element={<InsertUser />} />
        <Route path="/insert-recipe" element={<InsertRecipe />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />
        <Route path="/update-recipe/:id" element={<UpdateRecipe />} />
        <Route path="/delete-user/:id" element={<DeleteUser />} />
        <Route path="/delete-recipe/:id" element={<DeleteRecipe />} />
        </Routes>
      </Layout>
    </Router>
   
  );
}

export default App;
