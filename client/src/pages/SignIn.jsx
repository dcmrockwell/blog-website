import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      if (response.data.userID) {
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        window.localStorage.setItem("username", response.data.username);
        window.localStorage.setItem("createdAt", response.data.createdAt);
        window.localStorage.setItem("profileImage", response.data.profileImage);
        window.localStorage.setItem("username", response.data.username);
        navigate("/");
      } else {
        toast("Invalid username or password. Try again", {
          icon: "❌",
          style: {
            background: "red",
            color: "white",
          },
        });
      }
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="sign-in h-[80vh] w-full overflow-hidden m-auto">
      <div className="flex flex-col text-center gap-7 mt-10 max-w-[1440px] m-auto md:mt-[100px]">
        <p className="font-bold text-[25px] md:text-[40px] ">Sign In</p>
        <form className="flex flex-col items-center gap-4" onSubmit={onSubmit}>
          <input
            name="username"
            type="text"
            id="username"
            placeholder="Enter Your Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className={`border-solid border-black border-[1px] rounded-lg p-3 ${
              errors && "border-red-500 border-[2px]"
            }`}
          />
          <input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={`border-solid border-black border-[1px] rounded-lg p-3 ${
              errors && "border-red-500 border-[2px] "
            }`}
          />
          <button
            className="border-solid border-black border-[1px] bg-black text-white font-bold p-3 rounded-lg"
            type="submit"
          >
            Log In
          </button>
        </form>
        <p className="text-[12px] md:text-[20px] text-[#000000b4]">
          Not an Insight Ink user?
          <Link
            to="/register"
            className="decoration-solid border-b-[1px] border-solid border-black "
          >
            {" "}
            Create an account!
          </Link>{" "}
        </p>
        {errors && <p className="text-[#ff00009f]">{errors}</p>}
      </div>
      <footer className="absolute bottom-0  w-full ">
        <div className="h-[120px] bg-black w-full"></div>
      </footer>
    </div>
  );
};

export default SignIn;
