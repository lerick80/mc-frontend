import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;
const FRONT = import.meta.env.VITE_FRONT_URL;

export default function Admin() {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editGuests, setEditGuests] = useState(1);

  const [guests, setGuests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [newName, setNewName] = useState("");
  const [newGuests, setNewGuests] = useState(1);

  const [copiadoId, setCopiadoId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) window.location.href = "/login";
    else fetchGuests();
  }, []);

  const fetchGuests = async () => {
    const res = await axios.get(`${API}/admin/guests`, { headers: { token } });
    setGuests(res.data);
  };

  const handleCreateGuest = async () => {
    await axios.post(`${API}/admin/create_guest`, { name: newName, guests_allowed: Number(newGuests) }, { headers: { token } });
    setNewName("");
    setNewGuests(1);
    fetchGuests();
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar invitado?")) return;
    await axios.delete(`${API}/admin/delete/${id}`, { headers: { token } });
    fetchGuests();
  };

  const handleUpdate = async (id) => {
    await axios.put(`${API}/admin/update/${id}`, { name: editName, guests_allowed: Number(editGuests) }, { headers: { token } });
    setEditingId(null);
    fetchGuests();
  };

  const handleExport = async () => {
    const response = await axios.get(`${API}/admin/export`, { headers: { token }, responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "invitados.xlsx");
    document.body.appendChild(link);
    link.click();
  };

  const handleCopyLink = (code, id) => {
    navigator.clipboard.writeText(`${FRONT}/?code=${code}`);
    setCopiadoId(id);
    setTimeout(() => setCopiadoId(null), 1500);
  };

  const filteredGuests = guests
    .filter((g) => {
      if (filter === "confirmed") return g.guests_confirmed > 0;
      if (filter === "pending") return g.guests_confirmed === 0;
      return true;
    })
    .filter((g) => g.name.toLowerCase().includes(search.toLowerCase()));

  const totalAssigned = guests.reduce((a, b) => a + b.guests_allowed, 0);
  const totalConfirmed = guests.reduce((a, b) => a + b.guests_confirmed, 0);

  return (
    <div className="p-6 bg-[#f9f3ed] min-h-screen">
      <h1 className="text-4xl text-[#aa5532] text-center mb-6" style={{ fontFamily: "Great Vibes" }}>Control de Invitados</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto" style={{ fontFamily: "Cormorant Garamond" }}>
        <div className="bg-white shadow p-4 text-center">
          <p className="text-5xl">{totalAssigned}</p>
          <p className="text-s text-[#aa5532]">Boletos asignados</p>
        </div>
        <div className="bg-white shadow p-4 text-center">
          <p className="text-5xl text-[#408029]">{totalConfirmed}</p>
          <p className="text-s text-[#aa5532]">Confirmados</p>
        </div>
      </div>
      <br />

      <div className="bg-white p-6 w-150 mx-auto rounded-xl shadow mb-6 text-center" style={{ fontFamily: "Cormorant Garamond" }}>
        <h2 className="mb-4 text-xl text-[#aa5532]">Nueva Invitación</h2>
        <div className="flex justify-center gap-3 flex-wrap">
          <input placeholder="Nombre" value={newName} onChange={(e) => setNewName(e.target.value)} className="border-[#aa5532] text-black text-xl border p-2" />
          <input type="number" value={newGuests} onChange={(e) => setNewGuests(e.target.value)} className="border-[#aa5532] text-black text-xl text-center border p-2 w-24" />
          <button onClick={handleCreateGuest} className="bg-[#aa5532] text-white px-4 py-2">Crear</button>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-4 flex-wrap" style={{ fontFamily: "Cormorant Garamond" }}>
        <select onChange={(e) => setFilter(e.target.value)} className="border-[#aa5532] border p-2">
          <option value="all">Todos</option>
          <option value="confirmed">Confirmados</option>
          <option value="pending">Pendientes</option>
        </select>
        <input placeholder="Buscar" onChange={(e) => setSearch(e.target.value)} className="border-[#aa5532] border p-2" />
        <button onClick={handleExport} className="bg-[#408029] text-white px-4 py-2">Exportar Excel</button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-auto" style={{ fontFamily: "Cormorant Garamond" }}>
        <table className="w-full text-center">
          <thead className="bg-[#aa5532] text-white">
            <tr>
              <th className="p-3">Nombre</th><th>Código</th><th>Asignados</th><th>Confirmados</th><th>Invitados</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuests.map((g) => (
              <tr key={g.id} className="border-b">
                <td>{editingId === g.id ? <input value={editName} onChange={(e) => setEditName(e.target.value)} className="border p-1" /> : g.name}</td>
                <td>{g.code}</td>
                <td>{editingId === g.id ? <input type="number" value={editGuests} onChange={(e) => setEditGuests(e.target.value)} className="border p-1 w-16" /> : g.guests_allowed}</td>
                <td className={g.guests_confirmed > 0 ? "text-green-600" : "text-red-500"}>{g.guests_confirmed}</td>
                <td>{g.guest_names}</td>
                <td className="flex gap-2 justify-center py-2 flex-wrap">
                  {editingId === g.id ? (
                    <>
                      <button onClick={() => handleUpdate(g.id)} className="text-green-600">Guardar</button>
                      <button onClick={() => setEditingId(null)} className="text-gray-500">Cancelar</button>
                    </>
                  ) : (
                    <button onClick={() => { setEditingId(g.id); setEditName(g.name); setEditGuests(g.guests_allowed); }} className="text-yellow-600">Editar</button>
                  )}
                  <button onClick={() => handleCopyLink(g.code, g.id)} className="text-blue-600 underline">
                    {copiadoId === g.id ? "¡Copiado!" : "Link"}
                  </button>
                  <button onClick={() => handleDelete(g.id)} className="text-red-600">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}