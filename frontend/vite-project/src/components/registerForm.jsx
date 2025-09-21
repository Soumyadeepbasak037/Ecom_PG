import { useState } from "react";

export default function Register() {
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault(); // prevent page reload
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");

    const user = { email, username, password };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      console.log("API Response:", result.message);
      setLoading(false);
    } catch (err) {
      console.error("Error registering:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 p-4 dark:text-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Register
        </h1>

        <form onSubmit={register} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="p-2 rounded border border-gray-400 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              id="username"
              name="username"
              required
              className="p-2 rounded border border-gray-400 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
             className="p-2 rounded border border-gray-400 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-sky-700"
          >
            {loading ? "Registering..." : "Submit"}
          </button>
        </form>
      </div>
      </div>
  );
}
