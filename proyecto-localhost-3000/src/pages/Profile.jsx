import { useState, useEffect } from "react";
import { CompanyProfile } from "./CompanyProfile";
import { GraduatedProfile } from "./GraduatedProfile";

export const Profile = () => {
  const [role, setRole] = useState("");

  const getUserData = async () => {
    try {
      const fetchUser = await fetch(
        "http://localhost:5000/api/auth/user/myuser",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await fetchUser.json();

      console.log(data.getByID);

      setRole(data.getByID.role);
    } catch (error) {
      console.log("Error interno del server " + error);
    }
  };

  console.log(role);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {role === "graduated" && <GraduatedProfile />}
      {role === "company" && <CompanyProfile />}
      {role === null && (
        <p>
          No se encontró rol de usuario. <br /> Podés registrarte o verificar tu
          sesión.
        </p>
      )}
    </>
  );
};
