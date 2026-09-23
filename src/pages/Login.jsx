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
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow w-80">
        <h2 className="text-xl mb-4 text-center">Carlos & Magali</h2>

        <input placeholder="Usuario" className="border p-2 w-full mb-3" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 w-full mb-3" onChange={(e) => setPassword(e.target.value)} />

        <button className="bg-black text-white w-full py-2">Entrar</button>
      </form>
    </div>
  );
}