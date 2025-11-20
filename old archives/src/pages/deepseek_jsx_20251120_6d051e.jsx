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
    <div className="hellpad-container">
      <div className="hellpad-header">
        <h1>LISTANDO OFERTAS LABORALES</h1>
      </div>

      {jobs.map((job) => {
        const currentType = jobTypes.find((t) => t.id === job.job_type_id);
        const currentModality = modalities.find(
          (m) => m.id === job.modality_id
        );

        return (
          <div
            key={job.id}
            className="hellpad-job-card"
          >
            <div className="hellpad-company">
              {job.company ? job.company.company_name : "SIN COMPAÑÍA"}
            </div>
            <h3 className="hellpad-job-title">{job.job_name}</h3>
            <div className="hellpad-job-description">
              {job.job_description}
            </div>
            <p className="hellpad-job-detail">
              <strong>TIPO DE JORNADA ACTUAL:</strong>{" "}
              {currentType ? currentType.type : "SIN DATO"}
            </p>
            <p className="hellpad-job-detail">
              <strong>MODALIDAD ACTUAL:</strong>{" "}
              {currentModality ? currentModality.modality : "SIN DATO"}
            </p>
            {role === "company" && (
              <>
                <button
                  className="hellpad-button"
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
                  EDITAR
                </button>
                {editingPost === job.id && (
                  <div className="hellpad-form">
                    <label className="hellpad-label">NOMBRE</label>
                    <input
                      type="text"
                      className="hellpad-input"
                      value={form.job_name}
                      name="job_name"
                      onChange={handleChange}
                    />
                    <label className="hellpad-label">DESCRIPCIÓN</label>
                    <input
                      type="text"
                      className="hellpad-input"
                      value={form.job_description}
                      name="job_description"
                      onChange={handleChange}
                    />
                    <label className="hellpad-label">TIPO DE JORNADA</label>
                    <select
                      className="hellpad-select"
                      name="job_type_id"
                      value={form.job_type_id}
                      onChange={handleChange}
                    >
                      <option value="">SELECCIONÁ EL TIPO DE JORNADA</option>
                      {jobTypes.map((jt) => (
                        <option key={jt.id} value={jt.id}>
                          {jt.type}
                        </option>
                      ))}
                    </select>
                    <label className="hellpad-label">MODALIDAD</label>
                    <select
                      className="hellpad-select"
                      name="modality_id"
                      value={form.modality_id}
                      onChange={handleChange}
                    >
                      <option value="">SELECCIONÁ MODALIDAD</option>
                      {modalities.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.modality}
                        </option>
                      ))}
                    </select>
                    <button 
                      className="hellpad-button"
                      onClick={() => updatePost(job.id)}
                    >
                      GUARDAR CAMBIOS
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};