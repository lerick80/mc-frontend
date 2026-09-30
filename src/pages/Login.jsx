import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/admin/login`, { username, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin";
    } catch (err) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f3ed]">
      <form onSubmit={handleLogin} className="bg-[#f9f7f4] p-6 rounded-xl shadow w-80">
        <h2 className="text-4xl text-[#aa5532] text-center mb-3" style={{ fontFamily: "Great Vibes" }}>Carlos & Magali</h2>

        <input placeholder="Usuario" className="border-[#aa5532] text-[#523324] text-center border p-2 w-full mb-2"style={{ fontFamily: "Cormorant Garamond" }} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="border-[#523324] text-[#523324] text-center border p-2 w-full mb-2"style={{ fontFamily: "Cormorant Garamond" }} onChange={(e) => setPassword(e.target.value)} />

        <button className="bg-[#aa5532] text-white w-full py-2 mt-4"style={{ fontFamily: "Cormorant Garamond" }}>Entrar</button>
      </form>
    </div>
  );
}