import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../APIS/Api/AuthApi";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

export default function Signup() {
  const dispatch = useDispatch();
const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    try {
      
      const formData = new FormData();
      formData.append("username", username.trim());
      formData.append("email", email.trim());
      formData.append("password", password);

      
      const res = await dispatch(signup(formData));

      console.log("Signup success:", res);
       if(res?.payload?.status == "success"){
        toast.success(res?.payload?.message);
        navigate("/");
       }

    } catch (error) {
      console.error("Signup error:", error);
      alert(error?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded">
        <h2 className="text-white text-xl mb-4">Create Account</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            className="w-full p-2 rounded bg-gray-700 text-white outline-none"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
