import { useNavigate } from "react-router";

export const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      const fetchLogout = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await fetchLogout.json();

      alert(data);

      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log("Error interno del server " + error);
    }
  };

  return (
    <>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};
