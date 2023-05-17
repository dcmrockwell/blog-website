import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/register", {
        username,
        password,
      });
      toast.success(response.data.message);
      navigate("/sign-in");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register-area w-full h-[80vh] overflow-hidden m-auto">
      <div className="flex flex-col justify-center items-center gap-7 mt-10 m-auto md:mt-[100px]">
        <p className="font-bold text-[25px] md:text-[40px] ">
          Join Insight Ink
        </p>
        <form className="flex flex-col items-center gap-4" onSubmit={onSubmit}>
          <input
            type="text"
            id="username"
            placeholder="Set Your Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="border-solid border-black border-[1px] rounded-lg p-3"
          />
          <input
            type="password"
            id="password"
            placeholder="Set Your Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border-solid border-black border-[1px] rounded-lg p-3"
          />
          <button
            className="border-solid border-black border-[1px] bg-black text-white font-bold p-3 rounded-lg"
            onSubmit={onSubmit}
          >
            Register
          </button>
        </form>
        <p className="text-[12px] md:text-[20px] text-[#000000b4]">
          Already have an account with us?
          <Link
            to="/sign-in"
            className="decoration-solid border-b-[1px] border-solid border-black "
          >
            {" "}
            Sign in
          </Link>{" "}
        </p>
      </div>
      <footer className="absolute bottom-0  w-full ">
        <div className="h-[120px] bg-black w-full"></div>
      </footer>
    </div>
  );
};

export default Register;
