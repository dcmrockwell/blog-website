import React from "react";
import logoNav from "../assets/pen-logo.png";
import nameLogo from "../assets/name-logo.png";
import { BiCode, BiCodeAlt } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserId } from "../hooks/getUserID";

const Navbar = () => {
  const [nav, setNav] = useState();
  const handleClick = () => setNav(!nav);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const userID = useGetUserId();

  const handleNavClick = () => {
    setNav(!nav);
  };

  const handleLinkClick = () => {
    setNav(false);
  };

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("createdAt");
    window.localStorage.removeItem("username");
    navigate("/sign-in");
  };

  return (
    <div className=" h-[80px] w-full border-b-[1px] border-b-black  ">
      <div className="flex flex-row justify-between items-center px-3 py-[10px] max-w-[1440px] m-auto md:px-6">
        <Link to="/">
          <div className="flex flex-row items-end gap-0 cursor-pointer md:items-center">
            <img
              src={logoNav}
              alt="Insight Ink"
              className="hidden md:block h-[60px] "
            />
            <img
              src={nameLogo}
              alt="Insight Ink"
              className="w-[170px] mt-3 md:mt-0"
            />
          </div>
        </Link>

        <ul className="hidden lg:flex flex-row items-center gap-7">
          <Link to="/">
            <li className="cursor-pointer">Home</li>
          </Link>

          <li className="cursor-pointer">Write A Story</li>

          {!cookies.access_token ? (
            ""
          ) : (
            <>
              <li className="cursor-pointer">Saved Stories</li>
            </>
          )}

          {!cookies.access_token ? (
            <Link to="/sign-in">
              <li className="cursor-pointer border-solid border-[1px] border-black px-5 py-2 rounded-lg hover:bg-black hover:text-white">
                Sign In
              </li>
            </Link>
          ) : (
            <div className="cursor-pointer relative" onClick={handleClick}>
              <div className="border-[2px] border-solid border-black h-[40px] w-[40px] rounded-[100%] flex flex-row items-center justify-center hover:border-[blue]">
                <img
                  src={`https://avatars.dicebear.com/api/identicon/${userID}.svg`}
                  className="h-[25px] rounded-[45%]  "
                />
              </div>

              <div
                className={
                  !nav
                    ? "hidden"
                    : "absolute h-[170px] w-[150px] flex flex-col gap-5 justify-center items-center rounded-lg top-[50px] right-[10px] bg-black border-solid border-[gray] border-[1px]"
                }
              >
                <Link to="/profile">
                  <p className="text-white text-[18px] hover:border-b-[1px] border-solid border-gray-400">
                    Profile
                  </p>
                </Link>
                <Link to="/settings">
                  <p className="text-white text-[18px] hover:border-b-[1px] border-solid border-gray-400">
                    Settings
                  </p>
                </Link>
                <p
                  className="text-white text-[18px] hover:border-b-[1px] border-solid border-gray-400"
                  onClick={logout}
                >
                  Log Out
                </p>
              </div>
            </div>
          )}

          {!cookies.access_token ? (
            <Link to="/register">
              <li className="cursor-pointer border-solid border-[1px] border-black px-4 py-2 rounded-lg bg-black text-white">
                Register
              </li>
            </Link>
          ) : (
            ""
          )}
        </ul>

        <div className="cursor-pointer mt-2 lg:hidden" onClick={handleClick}>
          {!nav ? <BiCode size={"50px"} /> : <BiCodeAlt size={"50px"} />}
        </div>
      </div>

      {/* Mobile */}
      <ul
        className={
          !nav
            ? "hidden"
            : "absolute z-10 bg-black w-full h-[100vh] text-center flex flex-col items-center gap-10 lg:hidden"
        }
      >
        <Link
          to="/"
          className={location.pathname === "/"}
          onClick={handleLinkClick}
        >
          <li className="text-white text-[20px] mt-10">Home</li>
        </Link>

        <li className="text-white text-[20px]">Write A Story</li>
        {!cookies.access_token ? (
          ""
        ) : (
          <>
            <li className="text-white text-[20px]">Saved Stories</li>
            <Link
              to="/profile"
              className={location.pathname === "/profile"}
              onClick={handleLinkClick}
            >
              <li className="text-white text-[20px]">Profile</li>
            </Link>
            <Link
              to="/settings"
              className={location.pathname === "/settings"}
              onClick={handleLinkClick}
            >
              <li className="text-white text-[20px]">Settings</li>
            </Link>
          </>
        )}
        {!cookies.access_token ? (
          <Link
            to="/sign-in"
            className={location.pathname === "/sign-in"}
            onClick={handleLinkClick}
          >
            <li className="text-white text-[20px]">Sign In</li>
          </Link>
        ) : (
          <li className="text-white text-[20px]" onClick={logout}>
            Sign Out
          </li>
        )}
        {!cookies.access_token ? (
          <Link
            to="/register"
            className={location.pathname === "/register"}
            onClick={handleLinkClick}
          >
            <li className="text-white text-[20px]">Register</li>
          </Link>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default Navbar;
