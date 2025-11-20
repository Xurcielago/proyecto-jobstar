import { RegisterGraduated } from "./RegisterGraduated";
import { RegisterCompany } from "./RegisterCompany";
import { useEffect, useState } from "react";

export const Home = () => {
  const [role, setRole] = useState("");

  const getUserData = async () => {
    try {
      const fetchUser = await fetch(
        "http://localhost:3000/api/auth/user/myuser",
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
      {role === "graduated" && <RegisterGraduated />}
      {role === "company" && <RegisterCompany />}
      {role === null && (
        <p>
          No se encontró rol de usuario. <br /> Podés registrarte o verificar tu
          sesión.
        </p>
      )}
    </>
  );
};
