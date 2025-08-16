import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Link } from "react-router-dom";
import auth from "../../Firebase .config";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const emailref = useRef()
  const handleForgetPassword = () =>{
    const email = emailref.current.value;
    if (!email) {
      console.log("Please provide a valid email address");
    }else{
      sendPasswordResetEmail(auth, email)
      .then(()=>{
        alert("please check Your email")
      })
      .catch(error=>{
        console.log(error);
        
      })
    }
    
  }
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    setLoginError("");
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        if (!result.user.emailVerified) {
          setLoginError("Please verify your email address");
        } else {
          toast.success("Account Login successfully! 🎉");
          form.reset();
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginError(error.message);
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Login to Your Account
        </h1>

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailref}
              name="email"
              placeholder="name@example.com"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>

          {/* Password with eye toggle */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 pr-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <HiOutlineEyeOff className="w-5 h-5" />
                ) : (
                  <HiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm text-gray-600 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-3 transition focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Sign In
          </button>
          {/* Inline error */}
          {loginError && (
            <p className="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">
              {loginError}
            </p>
          )}
          <div className="flex justify-center">
            <Link
            onClick={handleForgetPassword}
            to=''
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Extra links */}
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
    to='/register'              
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default Login;
