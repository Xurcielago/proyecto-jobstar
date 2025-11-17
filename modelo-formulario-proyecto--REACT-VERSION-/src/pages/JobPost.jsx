import { useForm } from "../hooks/useForm";
import { useState, useEffect } from "react";

export const JobPost = () => {
  const { form, handleChange, handleReset } = useForm({
    job_name: "",
    job_description: "",
    job_type_id: "",
    modality_id: "",
  });

  const { job_name, job_description, job_type_id, modality_id } = form;

  const [jobTypes, setJobTypes] = useState([]);
  const [modalities, setModalities] = useState([]);

  const loadData = async () => {
    try {
      const [typeRes, modRes] = await Promise.all([
        fetch("http://localhost:5000/api/auth/jobtype", {
          credentials: "include",
        }),
        fetch("http://localhost:5000/api/auth/modality", {
          credentials: "include",
        }),
      ]);

      const types = await typeRes.json();
      const mods = await modRes.json();

      setJobTypes(types.getAll);
      setModalities(mods.getAll);
    } catch (error) {
      console.log("Error cargando jobtypes o modalities" + error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createJobPost = async (event) => {
    event.preventDefault();
    try {
      const fetchJobPost = await fetch(
        "http://localhost:5000/api/auth/jobpost",
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!fetchJobPost.ok) {
        console.log("Error al realizar el fetch");
      }

      const data = await fetchJobPost.json();

      console.log(data.Create);

      alert(data.msg);
      handleReset();
    } catch (error) {
      console.log("Error interno del servidor " + error);
    }
  };

  return (
    <>
      <h1>Crear Oferta Laboral</h1>

      <form onSubmit={createJobPost}>
        <input
          type="text"
          name="job_name"
          placeholder="Nombre del Trabajo"
          value={job_name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="job_description"
          placeholder="Descripción"
          value={job_description}
          onChange={handleChange}
        />
        <br />
        <label>Tipo de Jornada</label>
        <select name="job_type_id" value={job_type_id} onChange={handleChange}>
          <option value="">Seleccioná el tipo de jornada</option>
          {jobTypes.map((jt) => (
            <option key={jt.id} value={jt.id}>
              {jt.type}
            </option>
          ))}
        </select>
        <br />
        <label>Modalidad</label>
        <select name="modality_id" value={modality_id} onChange={handleChange}>
          <option value="">Seleccioná modalidad</option>
          {modalities.map((m) => (
            <option key={m.id} value={m.id}>
              {m.modality}
            </option>
          ))}
        </select>
        <br />
        <button>Crear</button>
      </form>
    </>
  );
};
