import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";

export const WatchJobPosts = () => {
  const [jobs, setJobs] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [role, setRole] = useState("");

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
      console.log("Error interno del servidor " + error);
    }
  };

  const getRole = async () => {
    try {
      const fetchUser = await fetch(
        "http://localhost:5000/api/auth/user/myuser",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await fetchUser.json();
      setRole(data.getByID.role);
    } catch (error) {
      console.log("Error interno del servidor " + error);
    }
  };

  useEffect(() => {
    loadData();
    getRole();
  }, []);

  const { form, handleChange } = useForm({
    job_name: "",
    job_description: "",
    job_type_id: "",
    modality_id: "",
  });

  const [editingPost, setEditingPost] = useState(null);

  const getAllPosts = async () => {
    try {
      const fetchPosts = await fetch("http://localhost:5000/api/auth/jobpost", {
        method: "GET",
        credentials: "include",
      });

      const data = await fetchPosts.json();
      setJobs(data.getAll);
      console.log(data.getAll);
    } catch (error) {
      console.log("Error interno del servidor " + error);
    }
  };

  const updatePost = async (postID) => {
    try {
      const fetchUpdate = await fetch(
        `http://localhost:5000/api/auth/jobpost/${postID}`,
        {
          method: "PUT",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (fetchUpdate.ok) {
        alert("Post actualizado correctamente");
        setEditingPost(null);
        getAllPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <h1>Listando Ofertas Laborales:</h1>

      {jobs.map((job) => {
        const currentType = jobTypes.find((t) => t.id === job.job_type_id);
        const currentModality = modalities.find(
          (m) => m.id === job.modality_id
        );

        return (
          <div
            key={job.id}
            style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
          >
            <p>
              <strong>Compañía:</strong>{" "}
              {job.company ? job.company.company_name : "Sin compañía"}
            </p>
            <h3>{job.job_name}</h3>
            <h3>Descripción: {job.job_description}</h3>
            <p>
              <strong>Tipo de Jornada actual:</strong>{" "}
              {currentType ? currentType.type : "Sin dato"}
            </p>
            <p>
              <strong>Modalidad actual:</strong>{" "}
              {currentModality ? currentModality.modality : "Sin dato"}
            </p>
            {role === "company" && (
              <>
                <button
                  onClick={() => {
                    setEditingPost(job.id);
                    handleChange({
                      target: { name: "job_name", value: job.job_name },
                    });
                    handleChange({
                      target: {
                        name: "job_description",
                        value: job.job_description,
                      },
                    });
                    handleChange({
                      target: { name: "job_type_id", value: job.job_type_id },
                    });
                    handleChange({
                      target: { name: "modality_id", value: job.modality_id },
                    });
                  }}
                >
                  Editar
                </button>
                {editingPost === job.id && (
                  <div style={{ marginTop: 10 }}>
                    <label>Nombre</label>
                    <input
                      type="text"
                      value={form.job_name}
                      name="job_name"
                      onChange={handleChange}
                    />
                    <label>Descripción</label>
                    <input
                      type="text"
                      value={form.job_description}
                      name="job_description"
                      onChange={handleChange}
                    />
                    <label>Tipo de Jornada</label>
                    <select
                      name="job_type_id"
                      value={form.job_type_id}
                      onChange={handleChange}
                    >
                      <option value="">Seleccioná el tipo de jornada</option>
                      {jobTypes.map((jt) => (
                        <option key={jt.id} value={jt.id}>
                          {jt.type}
                        </option>
                      ))}
                    </select>
                    <label>Modalidad</label>
                    <select
                      name="modality_id"
                      value={form.modality_id}
                      onChange={handleChange}
                    >
                      <option value="">Seleccioná modalidad</option>
                      {modalities.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.modality}
                        </option>
                      ))}
                    </select>
                    <button onClick={() => updatePost(job.id)}>
                      Guardar Cambios
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </>
  );
};
