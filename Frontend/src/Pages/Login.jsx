import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../APIS/Api/AuthApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email.trim());
      formData.append("password", password);

      const response = await dispatch(login(formData));

      if (response?.payload?.status === "success") {
        toast.success(response?.payload?.message);
        Cookies.set("token", response?.payload?.token);
        Cookies.set("userId", response?.payload?.user?.id);
        navigate("/dashboard");
      } else {
        toast.error(response?.payload?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded space-y-4">
        <h2 className="text-white text-xl text-center">Welcome back</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full p-2 rounded bg-gray-700 text-white outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-2 rounded bg-gray-700 text-white outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">
            Don’t have an account?
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="w-full border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white py-2 rounded transition"
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
}
