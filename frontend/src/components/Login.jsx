import { useForm } from "react-hook-form";
import {
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  mutedText,
  linkClass,
} from "../styles/common";
import { NavLink } from "react-router";
import { useAuth } from "../stores/authStore";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-hot-toast";

function Login() {
  const [searchParams] = useSearchParams();
  const requestedRole = searchParams.get("role") === "author" ? "AUTHOR" : "USER";
  const { register, handleSubmit } = useForm({ defaultValues: { role: requestedRole } });
  const login = useAuth((state) => state.login);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);
  const error = useAuth((state) => state.error);
  const navigate = useNavigate();

  // console.log("Is Authenticated :", isAuthenticated);
  // console.log("Current usr", currentUser);
 // console.log("error is ", error);
  const onUserLogin = async (userCredObj) => {
    await login(userCredObj);
  };

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      if (currentUser.role === "USER") {
        toast.success("Logged in successfully");
        navigate("/user-profile");
      }
      if (currentUser.role === "AUTHOR") {
        toast.success("Logged in as author");
        navigate("/author-profile");
      }
      if (currentUser.role === "ADMIN") {
        navigate("/admin-dashboard");
      }
    }
  }, [isAuthenticated, currentUser, navigate]);

  return (
    <div className={`${pageBackground} flex items-center justify-center py-16 px-4`}>
      <div className={formCard}>
        {/* Title */}
        <h2 className={formTitle}>Sign In</h2>

        {/* error message */}
        {error && <p className={errorClass}>{error}</p>}
        <form onSubmit={handleSubmit(onUserLogin)}>
          <div className="mb-5">
            <p className={labelClass}>Login as</p>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <label className="cursor-pointer rounded-lg border border-[#d2d2d7] bg-white px-4 py-3 text-sm font-semibold text-[#1d1d1f]">
                <input type="radio" value="USER" className="mr-2 accent-[#0066cc]" {...register("role")} />
                User
              </label>
              <label className="cursor-pointer rounded-lg border border-[#d2d2d7] bg-white px-4 py-3 text-sm font-semibold text-[#1d1d1f]">
                <input type="radio" value="AUTHOR" className="mr-2 accent-[#0066cc]" {...register("role")} />
                Author
              </label>
            </div>
          </div>

          {/* Email */}
          <div className={formGroup}>
            <label className={labelClass}>Email</label>
            <input type="email" {...register("email")} placeholder="you@example.com" className={inputClass} />
          </div>

          {/* Password */}
          <div className={formGroup}>
            <label className={labelClass}>Password</label>
            <input type="password" {...register("password")} placeholder="Enter your password" className={inputClass} />
          </div>

          {/* Forgot password */}
          <div className="text-right -mt-2 mb-4">
            <a href="/forgot-password" className={`${linkClass} text-xs`}>
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button type="submit" className={submitBtn}>
            Sign In
          </button>
        </form>

        {/* Footer note */}
        <p className={`${mutedText} text-center mt-5`}>
          Don't have an account?{" "}
          <NavLink to="/register" className={linkClass}>
            Create one
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
