import { useEffect, useState } from "react";
import avatar from "../assets/default/avatar.png";

export const GraduatedProfile = () => {
  const [profile, setProfile] = useState(null);

  const getCurrentProfile = async () => {
    try {
      const fetchProfile = await fetch(
        "http://localhost:5000/api/auth/profile",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await fetchProfile.json();
      const dataProfile = data.currentProfile;

      setProfile(dataProfile);
    } catch (error) {
      console.log("Error interno del servidor " + error);
    }
  };

  useEffect(() => {
    getCurrentProfile();
  }, []);

  if (!profile) return <p>Cargando perfil...</p>;

  return (
    <div
      className="profile-container"
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        background: "#fff",
        color: "#111",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img
          src={profile.avatar_url || avatar}
          alt="Avatar"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            objectFit: "cover",
            background: "#eee",
          }}
        />
        <div>
          <h2 style={{ margin: "0" }}>
            {profile.first_name} {profile.last_name}
          </h2>
          <p style={{ margin: "0.2rem 0", color: "#666" }}>
            {profile.location}
          </p>
        </div>
      </div>

      <hr style={{ margin: "1.5rem 0" }} />

      {/* About */}
      <section>
        <h3>Sobre mí</h3>
        <p>{profile.about_me}</p>
      </section>

      {/* Ambitions */}
      <section style={{ marginTop: "1rem" }}>
        <h3>Aspiraciones</h3>
        <p>{profile.ambitions}</p>
      </section>

      {/* Contact Info */}
      <section style={{ marginTop: "1rem" }}>
        <h3>Contacto</h3>
        <p>
          <strong>Email:</strong> {profile.contact}
        </p>
        <p>
          <strong>Repositorio:</strong>{" "}
          <a href={profile.repository_url}>{profile.repository_url}</a>
        </p>
      </section>
    </div>
  );
};
