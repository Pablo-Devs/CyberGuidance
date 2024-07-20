import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Footer from "../../components/Footer";
import bgImage from "../../assets/Counselling.jpg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

// Define the validation schema
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Simulate a delay before showing the signup card
    const timer = setTimeout(() => {
      setShowCard(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (data) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add your signup logic here
    localStorage.setItem("userToken", "yourTokenHere");
    
    setIsLoading(false);
    navigate("/student/setup");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative flex-grow flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={bgImage} alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        {!showCard ? (
          <div className="relative z-10">
            <FaSpinner className="animate-spin text-white text-4xl" />
          </div>
        ) : (
          <div className="relative z-10 bg-white p-5 rounded-lg shadow-lg w-full max-w-md m-3 transition-all duration-500 ease-in-out transform hover:scale-105">
            <h2 className="xl:text-3xl md:text-2xl sm:text-xl font-bold text-center mb-6 text-blue-600">Sign Up for Cyber-Counselling</h2>
            <p className="text-center text-gray-600 mb-6">Create your account to get started.</p>
            <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                  Username
                </label>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="username"
                      placeholder="Enter your username"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.username ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  )}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter your password"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className="absolute right-3 top-11 text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
                  Confirm Password
                </label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
                        errors.confirmPassword ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className="absolute right-3 top-11 text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Signing up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-6">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="text-blue-500 hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/services" className="text-blue-500 hover:underline">
                Services
              </Link>
              .
            </p>

            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/student/login" className="text-blue-600 hover:underline font-semibold">
                Log in
              </Link>
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Signup;