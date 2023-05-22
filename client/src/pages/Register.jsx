import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [theErrors, setError] = useState("");
  const [hasClicked, setHasClicked] = useState(false);

  const handleClick = () => {
    if (!hasClicked) {
      toast("Email not required but needed in case you forgot your password", {
        icon: "❗",
        style: {
          background: "white",
          color: "red",
          border: "1px solid black",
        },
      });
      setHasClicked(true);
    }
  };

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/register", {
        username,
        password,
        email,
      });
      toast.success(response.data.message);
      navigate("/sign-in");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.errors
      ) {
        const { errors } = err.response.data;
        if (errors.username) {
          setError(errors.username.message);
        }
        if (errors.email) {
          setError(errors.email.message);
        }
        if (errors.password) {
          toast.error(errors.password.message);
        }
      } else {
        console.error(err);
      }
    }
  };

  console.log(theErrors);
  return (
    <div className="register-area w-full h-[80vh] overflow-hidden m-auto">
      <div className="flex flex-col justify-center items-center gap-7 mt-10 m-auto md:mt-[100px]">
        <p className="font-bold text-[25px] md:text-[40px] ">
          Join Insight Ink
        </p>
        <form className="flex flex-col items-center gap-4" onSubmit={onSubmit}>
          <div className="relative">
            <input
              type="text"
              id="email"
              placeholder="Enter Your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border-solid border-black border-[1px] rounded-lg p-3 hover:border-green"
              onClick={handleClick}
            />
          </div>

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
            type="submit"
            className="border-solid border-black border-[1px] bg-black text-white font-bold p-3 rounded-lg"
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
