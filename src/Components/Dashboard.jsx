import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "/src/Api/public";

function Dashboard() {
    const [details, setDetails] = useState([]);
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");
    const [storedUser, setUser] = useState([]);

    const fetch = async () => {
        try {
            const response = await Api.get("/user/");
            setDetails(response.data);
        } catch (err) {
            console.log(`${err.message}`);
        }
    };

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
        fetch();
    }, []);

    const handleOnChange = (e) => {
        setRoomId(e.target.value);
    }

    const joinRoom = () => {
        const url = `/call?roomID=${roomId}`;
        navigate(url);
    }

    const newMeeting = () => {
        const url = `/call?username=${storedUser.username}`;
        navigate(url);
    }

    const handleLogout = () => {
        const logout = async () => {
            try {
                const response = await Api.post("/user/logout", {email : storedUser.email});
                console.log(response.data);
                localStorage.removeItem("user");
                navigate("/");
            } catch (err) {
                alert("logout failed");
                console.log(`${err.message}`);
            }
        }

        logout();
    }

    return (
        <>
        <div className="flex flex-col justify-start items-center min-h-screen overflow-y-auto">
            <img
              src="/ConvergeLogo.png"
              alt="Converge"
              className="w-40 md:w-60 h-auto"
            />
            <figure className="diff aspect-16/9 w-3/4 md:w-1/3 mb-10" tabIndex={0}>
              <div className="diff-item-1" role="img" tabIndex={0}>
                <img alt="daisy" src="/meet.png" />
              </div>
              <div className="diff-item-2" role="img">
                <img
                  alt="converge"
                  src="/meetBlur.png" />
              </div>
              <div className="diff-resizer"></div>
            </figure>
            <div className="flex flex-col justify-center items-center md:w-3/10">
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition mb-5"
                    onClick={newMeeting}
                >
                    Create new Meeting
                </button>
                <div className="flex flex-row mb-5 w-full">
                    <input
                      type="text"
                      name="meetId"
                      placeholder="Meeting ID"
                      className="text-black w-full px-4 py-2 border border-grey caret-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3"
                      onChange={handleOnChange}
                    />
                    <button
                        type="submit"
                        className="w-6/10 md:w-1/2 bg-accent text-white py-2 rounded-md"
                        onClick={joinRoom}
                    >
                        Join
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-1/2 bg-base-content text-white py-2 rounded-md mb-3"
                    onClick={handleLogout}
                >
                    Logout
                </button>
                <h1 className="text-xl font-mono italic mb-3">Connected Users</h1>
                <button
                  onClick={fetch}
                  className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition"
                >
                  Refresh
                </button>
                {details.map((user) => (
                        <div
                          key={user.email}
                          className="bg-base-100 border border-base-300 p-3 rounded-md shadow-lg mb-2 w-full"
                        >
                            <div className="font-semibold">{user.username}</div>
                            <div className="text-sm mb-2">{user.email}</div>
                        </div>
                    ))}
            </div>
        </div>
        </>
    );
}

export default Dashboard;