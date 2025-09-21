import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./App.css";

export default function Login() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault(); // prevent page reload
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    const user = { username, password };

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/products"), 1000);
      } else {
        setMessage(result.message || "Login failed");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setMessage("Network error. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center justify-center gap-4 p-4 dark:text-gray-200">
      <h1 className="text-2xl font-bold">Login</h1>
      {message && <p className="text-red-400">{message}</p>}
      <form onSubmit={login} className="flex flex-col gap-2 w-80">
        <label>Username:</label>
        <input
          id="username"
          name="username"
          className="p-2 rounded border border-gray-400 dark:bg-gray-700 dark:border-gray-600"
        />
        <label>Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          className="p-2 rounded border border-gray-400 dark:bg-gray-700 dark:border-gray-600"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}
