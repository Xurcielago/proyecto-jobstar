import { useState, useEffect } from "react";
import { useForm } from "../hooks/useForm";

export const RegisterGraduated = () => {
  const { form, handleChange, handleReset } = useForm({
    first_name: "",
    last_name: "",
    about_me: "",
    location: "",
    repository_url: "",
    avatar_url: "",
    contact: "",
    ambitions: "",
    specialization_id: "",
    wanted_job_id: "",
  });

  const [specializations, setSpecializations] = useState([]);
  const [wantedJobs, setWantedJobs] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [specRes, jobRes, jobTypeRes] = await Promise.all([
        fetch("http://localhost:5000/api/auth/specialization", {
          credentials: "include",
        }),
        fetch("http://localhost:5000/api/auth/wantedjob", {
          credentials: "include",
        }),
        fetch("http://localhost:5000/api/auth/jobtype", {
          credentials: "include",
        }),
      ]);

      const specs = await specRes.json();
      const jobs = await jobRes.json();
      const types = await jobTypeRes.json();

      console.log(specs);
      console.log(jobs);
      console.log(types);

      setSpecializations(specs.getAll);
      setWantedJobs(jobs.getAll);
      setJobTypes(types.getAll);
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const registerGraduated = async (event) => {
    event.preventDefault();

    try {
      const fetchGraduated = await fetch(
        "http://localhost:5000/api/auth/jobseeker",
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!fetchGraduated.ok) {
        console.log("Error al hacer el fetch");
      }

      const data = await fetchGraduated.json();

      if (!data.ok) {
        console.log(data.msg);
      }

      console.log(data.Create);

      alert(data.msg);

      handleReset();
    } catch (error) {
      console.log("Error interno del servidor " + error);
    }
  };

  return (
    <>
      <h1>Crea tu perfil</h1>

      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <form onSubmit={registerGraduated}>
          <input
            type="text"
            name="first_name"
            placeholder="Nombre"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="last_name"
            placeholder="Apellido"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="about_me"
            placeholder="Sobre mí..."
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="location"
            placeholder="Ubicación"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="repository_url"
            placeholder="Perfil de GitHub"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="avatar_url"
            placeholder="Foto de Perfil (URL)"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="contact"
            placeholder="Contacto (email)"
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="ambitions"
            placeholder="Ambiciones"
            onChange={handleChange}
          />
          <br />
          <label>Especialización</label>
          <select
            name="specialization_id"
            value={form.specialization_id}
            onChange={handleChange}
          >
            <option value="">Seleccioná una especialización</option>
            {specializations.map((s) => (
              <option key={s.id} value={s.id}>
                {s.specialization}
              </option>
            ))}
          </select>
          <br />
          <label>Puesto deseado</label>
          <select
            name="wanted_job_id"
            value={form.wanted_job_id}
            onChange={handleChange}
          >
            <option value="">Seleccioná el trabajo deseado</option>
            {wantedJobs.map((job) => {
              const jobType = jobTypes.find((t) => t.id === job.job_type_id);
              return (
                <option key={job.id} value={job.id}>
                  {job.occupation} — {jobType?.type || "Sin tipo"}
                </option>
              );
            })}
          </select>
          <br />
          <button>Crear Perfil</button>
        </form>
      )}
    </>
  );
};
