import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [role, setRole] = useState(""); // Role state
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPass = localStorage.getItem("rememberedPass");
    if (storedEmail && storedPass) {
      setEmail(storedEmail);
      setPassword(storedPass);
      setRememberMe(true);
    }
  }, []);

  async function loginUser(ev) {
    ev.preventDefault();
    if (!role) {
      alert("Please select a role before signing in.");
      return;
    }

    try {
      const { data } = await axios.post("/login", { email, password, role });
      setUser(data);
      alert("Login successful");

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPass", password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPass");
      }

      setRedirect(true);
    } catch (e) {
      alert("Login failed. Please check your credentials.");
    }
  }

  if (redirect) {
    if (role === "admin") return <Navigate to="/admin" />;
    if (role === "faculty") return <Navigate to="/FacultyHome" />;
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex w-full h-full px-10 py-10 justify-center items-center mt-20">
      <div className="bg-white w-full max-w-md px-7 py-7 rounded-xl shadow-md">
        <form className="flex flex-col gap-4" onSubmit={loginUser}>
          <h1 className="text-2xl font-bold text-center text-primarydark">
            Sign In
          </h1>

          {/* Role Buttons */}
          <div className="flex justify-center gap-4">
            {["user", "admin", "faculty"].map((r) => (
              <button
                key={r}
                type="button"
                className={`px-4 py-2 rounded border capitalize ${
                  role === r ? "bg-blue-500 text-white" : "bg-white"
                }`}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Email Field */}
          <div className="input flex items-center gap-2 border rounded px-3 py-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M17.834 6.166a8.25 8.25 0 100 11.668.75.75 0 011.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0121.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 11-.82-6.26V8.25a.75.75 0 011.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 00-2.416-5.834zM15.75 12a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="input flex items-center gap-2 border rounded px-3 py-2 relative">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
            <Link
              to="/forgotpassword"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="primary w-full py-2">
            Sign In
          </button>

          <div className="flex justify-between items-center mt-4">
            <Link to="/" className="secondary flex items-center gap-1">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              ></svg>
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold text-primarydark"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
