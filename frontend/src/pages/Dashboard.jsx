import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/Css/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/"); // ose /login nëse don
    }
  }, [navigate]);

  return (
    <main>
      <br /><br /><br /><br /><br /><br />
      <div className="container">
        <div className="box">
          <div className="box1">
            <Link to="/usertable" style={{ textDecoration: "none" }}>
              <button className="button">VIEW USERS</button>
            </Link>
          </div>
          <div className="box1">
            <Link to="/recipetable" style={{ textDecoration: "none" }}>
              <button className="button">VIEW RECIPES</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
