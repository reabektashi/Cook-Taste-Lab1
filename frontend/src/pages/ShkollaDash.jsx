import { useEffect, useState } from "react";
import API from "../api";
import "../assets/Css/dashboard.css";


export default function ShkollaDash() {
  const [shkollat, setShkolla] = useState([]);
  const [shkollaOptions, setShkollaOptions] = useState([]);

  const [shkollaForm, setShkollaForm] = useState({ ID: null, EmriShkolles: "", Qyteti: "" });
  const [nxenesiForm, setNxenesiForm] = useState({ EmriNxenesit: "",  Klasa: "", ID_Shkolla: "" });

  const loadAll = async () => {
    const [sRes, optRes] = await Promise.all([
      API.get("/shkolla"), 
      API.get("/shkolla/options"),
    ]);
    setShkolla(sRes.data);
    setShkollaOptions(optRes.data);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const submitShkolla = async (e) => {
    e.preventDefault();
    if (shkollaForm.ID) {
      await API.put(`/shkolla/${shkollaForm.ID}`, {
        EmriShkolles: shkollaForm.EmriShkolles,
        Qyteti: shkollaForm.Qyteti,
      });
    } else {
      await API.post("/shkolla", {
        EmriShkolles: shkollaForm.EmriShkolles,
        Qyteti: shkollaForm.Qyteti,
      });
    }
    setShkollaForm({ ID: null, EmriShkolles: "", Qyteti: "" });
    await loadAll();
  };

  const editShkolla = (s) => {
    
    setShkollaForm({ ID: s.ID, EmriShkolles: s.EmriShkolles, Qyteti: s.Qyteti });
  };

  const submitNxenesi = async (e) => {
    e.preventDefault();
    await API.post("/nxenesi", nxenesiForm);
    setNxenesiForm({ EmriNxenesit: "",  Klasa: "", ID_Shkolla: "" });
    await loadAll();
  };

  const deleteNxenesi = async (id) => {
    const ok = window.confirm("A je i sigurt që dëshiron ta fshish nxenesin?");
    if (!ok) return;
    await API.delete(`/nxenesi/${id}`);
    await loadAll();
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Shkollat & Nxenesit</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
        {/* Add/Update Shkolla */}
        <form onSubmit={submitShkolla} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
          <h3>{shkollaForm.ID ? "Përditëso Shkollën" : "Shto Shkollë"}</h3>
          <input
            placeholder="Emri i Shkolles"
            value={shkollaForm.EmriShkolles}
            onChange={(e) => setShkollaForm((p) => ({ ...p, EmriShkolles: e.target.value }))}
            style={{ width: "100%", marginTop: 8, padding: 8 }}
          />
          <input
            placeholder="Qyteti"
            value={shkollaForm.Qyteti}
            onChange={(e) => setShkollaForm((p) => ({ ...p, Qyteti: e.target.value }))}
            style={{ width: "100%", marginTop: 8, padding: 8 }}
          />
          <button style={{ marginTop: 10, padding: 10 }}>
            {shkollaForm.ID ? "Ruaj Ndryshimet" : "Shto"}
          </button>
          {shkollaForm.ID && (
            <button
              type="button"
              onClick={() => setShkollaForm({ ID: null, EmriShkolles: "", Qyteti: "" })}
              style={{ marginLeft: 8, padding: 10 }}
            >
              Anulo
            </button>
          )}
        </form>

        {/* Add Nxenesi */}
        <form onSubmit={submitNxenesi} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
          <h3>Shto Nxenes</h3>

          <select
            value={nxenesiForm.ID_Shkolla}
            onChange={(e) => setNxenesiForm((p) => ({ ...p, ID_Shkolla: Number(e.target.value) }))}
            style={{ width: "100%", marginTop: 8, padding: 8 }}
          >
            <option value="">Zgjedh Shkollën (Dropdown)</option>
            {shkollat.map((s) => (
              <option key={s.ID} value={s.ID}>
                {s.EmriShkolles}
              </option>
            ))}
          </select>

          <input
            placeholder="Emri"
            value={nxenesiForm.EmriNxenesit}
            onChange={(e) => setNxenesiForm((p) => ({ ...p, EmriNxenesit: e.target.value }))}
            style={{ width: "100%", marginTop: 8, padding: 8 }}
          />
          
          <input
            placeholder="Klasa"
            value={nxenesiForm.Klasa}
            onChange={(e) => setNxenesiForm((p) => ({ ...p, Klasa: e.target.value }))}
            style={{ width: "100%", marginTop: 8, padding: 8 }}
          />

          <button style={{ marginTop: 10, padding: 10 }}>Shto Nxenes</button>
        </form>
      </div>

      {/* List Shkollat + Nxenesit */}
      <div style={{ marginTop: 20 }}>
        <h3>Lista e Shkollave dhe Nxenesve</h3>

        {shkollaOptions.map((s) => (
          <div key={s.ID} style={{ border: "1px solid #eee", padding: 12, borderRadius: 8, marginTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{s.EmriShkolles}</strong> — {s.Qyteti}
              </div>
              <button onClick={() => editShkolla(s)} style={{ padding: 8 }}>
                Edit
              </button>
            </div>

            <ul style={{ marginTop: 10 }}>
              {s.Nxenesit.length === 0 ? (
                <li style={{ opacity: 0.7 }}>Nuk ka nxenes</li>
              ) : (
                s.Nxenesit.map((n) => (
                  <li key={n.ID} style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span>
                      {n.EmriNxenesit} — {n.Klasa}
                    </span>
                    <button onClick={() => deleteNxenesi(n.ID)} style={{ padding: 6 }}>
                      Delete
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
    );}          