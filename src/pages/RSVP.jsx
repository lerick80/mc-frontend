import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function RSVP() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const [guest, setGuest] = useState(null);
  const [guestNames, setGuestNames] = useState([]);

  useEffect(() => {
    if (!code) return;

    const fetchGuest = async () => {
      try {
        const res = await axios.get(`${API}/guest/${code}`);
        setGuest(res.data);
      } catch (err) {
        alert("Invitado no encontrado");
      }
    };

    fetchGuest();
  }, [code]);

  const handleChange = (index, value) => {
    const updated = [...guestNames];
    updated[index] = value;
    setGuestNames(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (guestNames.length === 0 || guestNames.some((name) => !name)) {
      alert("Debes llenar todos los nombres");
      return;
    }

    try {
      await axios.post(`${API}/confirm`, { code, names: guestNames });
      alert("Confirmación guardada");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.detail || "Error");
    }
  };

  if (!guest) {
    return <p className="text-center mt-20">Cargando invitado...</p>;
  }

  if (guest.guests_confirmed > 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f3ed]">
        <div className="bg-[#f9f7f4] p-6 rounded-xl shadow text-center w-80">
          <h2 className="text-4xl text-[#aa5532] text-center mb-3" style={{ fontFamily: "Great Vibes" }}>{guest.name}</h2>
          <p className="text-[#aa5532] text-center mb-4 text-xl"style={{ fontFamily: "Cormorant Garamond" }}>Ya confirmaste tu asistencia</p>
          <p className="text-[#523324] text-sm">Invitados registrados:</p>
          <p className="text-[#523324] font-medium mt-2">{guest.guest_names}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f3ed]">
      <form onSubmit={handleSubmit} className="bg-[#f9f7f4] p-6 rounded-xl shadow w-96">
        <h2 className="text-4xl text-[#aa5532] text-center mb-3" style={{ fontFamily: "Great Vibes" }}>{guest.name}</h2>
        <p className="text-[#aa5532] text-center mb-4 text-xl"style={{ fontFamily: "Cormorant Garamond" }}>Boletos asignados: {guest.guests_allowed}</p>

        {Array.from({ length: guest.guests_allowed }).map((_, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Invitado ${index + 1}`}
            className="border-[#523324] text-[#523324] text-center border p-2 w-full mb-2"
            style={{ fontFamily: "Cormorant Garamond" }}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        ))}

        <button className="bg-[#aa5532] text-white w-full py-2 mt-4"style={{ fontFamily: "Cormorant Garamond" }}>Confirmar asistencia</button>
      </form>
    </div>
  );
}