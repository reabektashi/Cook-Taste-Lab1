import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Fshini të gjitha të dhënat e përdoruesit
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("user"); // Nëse e përdor diku
    sessionStorage.clear();

    // Redirekto në faqen kryesore
    navigate("/");
  }, [navigate]);

  return null;
}

export default Logout;
