import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";


function Logout() {
  const navigate = useNavigate();

   useEffect(() => {
    const doLogout = async () => {
      try {
        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;
        const userId = user?.id;

        // inform backend so it deletes refresh token and clears cookie
        await API.post("/logout", { userId });
      } catch (err) {
        console.error("Logout error:", err);
      }

      // clear frontend auth data
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      sessionStorage.clear();
      navigate("/");
    };

    doLogout();
  }, [navigate]);


  return null;
}

export default Logout;
