import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserId } from "../hooks/getUserID";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaGithubSquare,
} from "react-icons/fa";

const Settings = () => {
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserId();
  const [isProfileFound, setIsProfileFound] = useState(true);
  const [savedProfile, getSavedProfile] = useState();
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    description: "",
    facebook: "",
    twitter: "",
    github: "",
    userOwner: userID,
    profileImage: null,
  });

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/profile/${userID}`
        );
        getSavedProfile(response.data);
        setIsProfileFound(true);
        console.log(response.data);
      } catch (err) {
        console.error(err);
        setIsProfileFound(false);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  // appends name
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/profile", profile, {
        headers: { authorization: cookies.access_token },
      });
      alert("Profile Created!");
      console.log(profile);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" w-full m-auto overflow-hidden">
      <div className="flex flex-col text-center items-center gap-7 mt-10 mb-10 max-w-[1440px] m-auto xl:mb-[100px]">
        <h1 className="text-[25px] font-bold"> Settings</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center"
        >
          <div className="flex flex-col items-start pt-5 gap-2 ">
            <label className="text-[15px] font-bold">Your Name</label>
            <input
              className="border-black border-solid border-[1px] w-[200px] py-1 px-2 rounded-md"
              placeholder={
                isProfileFound && savedProfile?.name
                  ? savedProfile.name
                  : "Enter your name"
              }
              id="name"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col items-start pt-5 gap-2 ">
            <label className="text-[15px] font-bold">Bio</label>
            <textarea
              className="border-black border-solid border-[1px] min-h-[100px] w-[200px] py-1 px-2 rounded-md resize-y overflow-auto"
              placeholder={
                isProfileFound && savedProfile?.description
                  ? savedProfile.description
                  : "Tell us a little bit about yourself"
              }
              name="description"
              id="description"
              onChange={handleChange}
            ></textarea>
          </div>
          <h1 className="text-center font-bold text-[25px] mt-5">Socials</h1>
          <div className="flex flex-col items-center pt-5 gap-2 ">
            <FaFacebookSquare size={"30px"} />
            <input
              className="border-black border-solid border-[1px] w-[200px] py-1 px-2 rounded-md"
              placeholder={
                isProfileFound && savedProfile?.facebook
                  ? savedProfile.facebook
                  : "https://www.facebook.com/"
              }
              name="facebook"
              id="facebook"
              onChange={handleChange}
            />
            <FaTwitterSquare size={"30px"} />
            <input
              className="border-black border-solid border-[1px] w-[200px] py-1 px-2 rounded-md"
              placeholder={
                isProfileFound && savedProfile?.twitter
                  ? savedProfile.twitter
                  : "https://twitter.com/"
              }
              id="twitter"
              name="twitter"
              onChange={handleChange}
            />
            <FaGithubSquare size={"30px"} />
            <input
              className="border-black border-solid border-[1px] w-[200px] py-1 px-2 rounded-md"
              placeholder={
                isProfileFound && savedProfile?.github
                  ? savedProfile.github
                  : "https://github.com/"
              }
              id="github"
              name="github"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col justify-center items-center mt-10 mb-5">
            <label
              htmlFor="profile"
              className="text-center font-bold text-[25px] mt-5"
            >
              Profile Image
            </label>
            <div className="flex flex-col gap-5 items-center cursor-pointer  mt-5">
              <div className="border-[2px] border-solid border-black h-[45px] w-[45px] rounded-[100%] flex flex-row items-center justify-center hover:border-[blue]">
                <img
                  src={`https://avatars.dicebear.com/api/identicon/${userID}.svg`}
                  className="h-[30px]  rounded-[40%] "
                />
              </div>
              <input
                type="file"
                name="profileImage"
                id="profileImage"
                className="ml-[80px]"
              />
            </div>
          </div>

          <button
            className="mt-5 border-black border-[1px] border-solid bg-black text-white px-4 py-2 rounded-lg"
            type="submit"
          >
            {isProfileFound ? "Submit Changes" : "Submit Profile"}
          </button>
        </form>
      </div>
      <footer className="mb-[-5px]">
        <div className="h-[150px] bg-black w-full"></div>
      </footer>
    </div>
  );
};

export default Settings;
