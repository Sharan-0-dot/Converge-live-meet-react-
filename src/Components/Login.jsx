import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Api from "/src/Api/public";

function Login() {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const authenticate = (e) => {
    e.preventDefault();
    if (!details.email || !details.password) {
      alert("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(details.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (details.password.length < 8) {
      alert("Passwords must be at least 8 characters long");
      return;
    }

    const verify = async () => {
      try {
        setLoader(true)
        await Api.post("/user/login", details);
        const userData = {
          username: details.username,
          email: details.email,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setLoader(false);
        navigate("/home");
      } catch (err) {
        alert("user not found");
        setLoader(false);
        console.log(`${err.message}`);
      }
    };

    verify();
  };

  return (
    <>
      <div className="flex flex-col justify-start items-center min-h-screen bg-grey-500">
        <img
          src="/ConvergeLogo.png"
          alt="Converge"
          className="w-48 md:w-64 h-auto mb-8 md:mb-12"
        />
        {loader && (
          <>
            <div className="flex justify-center align-middle h-60">
              <span className="loading loading-infinity loading-xl"></span>
            </div>
            <div role="alert" className="alert alert-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>As The backend server is deployed on render it may take few seconds to process the first request please wait</span>
            </div>
          </>
        )}
        {!loader && (
          <div className="bg-blue-500 p-6 rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md">
          <h1 className="text-yellow-400 text-3xl font-mono text-center italic">
            LOGIN
          </h1>
          <form className="my-4">
            <div className="mb-4">
              <p className="text-yellow-400 text-xl font-mono italic my-2">Username</p>
              <input
                type="text"
                name="username"
                value={details.username}
                className="text-white w-full px-4 py-2 border border-white caret-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-4">
              <p className="text-yellow-400 text-xl font-mono italic my-2">Email</p>
                <input
                  type="email"
                  name="email"
                  value={details.email}
                  autoComplete="email"
                  className="text-white w-full px-4 py-2 border border-white caret-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleOnChange}
                />
            </div>
            <div className="mb-6">
              <p className="text-yellow-400 text-xl font-mono italic my-2">Password</p>
                <input
                  type="password"
                  name="password"
                  value={details.password}
                  autoComplete="current-password"
                  className="text-white w-full px-4 py-2 border border-white caret-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleOnChange}
                />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-700 transition"
              onClick={authenticate}
            >
              Login
            </button>
            <p className="text-center text-white mt-4 text-sm">
              New user?{" "}
              <Link
                to="/sign-up"
                className="text-yellow-400 hover:underline italic"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
        )}
      </div>
    </>
  );
}

export default Login;
