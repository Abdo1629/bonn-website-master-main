"use client";
import { useState } from "react";

export default function MakeAdmin() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleAdmin = async () => {
    try {
      const res = await fetch("/api/set-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMsg(data.message || data.error);
    } catch (err) {
      console.error(err);
      setMsg("Failed to set admin");
    }
  };

  return (
    <div className="p-8">
      <h2>Make Admin</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleAdmin}>Set Admin</button>
      {msg && <p>{msg}</p>}
    </div>
  );
}
