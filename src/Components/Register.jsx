import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "/src/Api/public";

function Register() {
    const [details, setDetails] = useState({
      username: "",
      email: "",
      password: "",
      confirmPass: "",
    });
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const checkCredentials = (e) => {
        e.preventDefault();
        if (!details.username || !details.email || !details.password || !details.confirmPass) {
          alert("Check The Credentials Properly");
          return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(details.email)) {
          alert("Please enter a valid email address.");
          return;
        }
        if(details.password.length < 8) {
          alert("Passwords must be atleast 8 characters long");
          return;
        }
        if (details.password !== details.confirmPass) {
          alert("Passwords do not match");
          return;
        }
        const register = async () => {
            try {
              const response = await Api.post("/user/register", details);
              console.log(response.data);
              navigate("/");
            } catch(err) {
              console.log(`${err.message}`);
            }
        };

        register();
    }

    return (
        <>
        <div className="flex flex-col justify-start items-center min-h-screen bg-grey-500">
            <img
              src="/ConvergeLogo.png"
              alt="Converge"
              className="w-40 md:w-64 h-auto"
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
              <div className="bg-blue-500 p-6 rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md mb-3">
                <h1 className="text-yellow-400 text-3xl font-mono text-center italic">
                  REGISTER
                </h1>
                <form className="my-4">
                  <div className="mb-4">
                    <p className="text-yellow-400 text-xl font-mono italic my-2">Username</p>
                    <input
                      type="text"
                      name="username"
                      value={details.username}
                      className="text-white w-full px-4 py-2 border border-white caret-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <p className="text-yellow-400 text-xl font-mono italic my-2">Email</p>
                    <input
                      type="text"
                      name="email"
                      value={details.email}
                      className="text-white w-full px-4 py-2 border border-white caret-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-6">
                    <p className="text-yellow-400 text-xl font-mono italic my-2">Password</p>
                    <input
                      type="password"
                      name="password"
                      value={details.password}
                      className="text-white w-full px-4 py-2 border border-white caret-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-6">
                    <p className="text-yellow-400 text-xl font-mono italic my-2">Confirm Password</p>
                    <input
                      type="password"
                      name="confirmPass"
                      value={details.confirmPass}
                      className="text-white w-full px-4 py-2 border border-white caret-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 text-white py-2 rounded-md hover:bg-yellow-700 transition"
                    onClick={checkCredentials}
                  >
                    Register
                  </button>
                  <p className="text-center text-white mt-4 text-sm">
                    Already Registerd?{" "}
                    <Link to="/" className="text-yellow-400 hover:underline italic">
                      Login
                    </Link>
                  </p>
                </form>
            </div>
            )}
        </div>
        </>
    );
}

export default Register;