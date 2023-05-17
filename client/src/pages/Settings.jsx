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
import toast from "react-hot-toast";

const Settings = () => {
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserId();
  const [isProfileFound, setIsProfileFound] = useState(true);
  const [savedProfile, getSavedProfile] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [profile, setProfile] = useState({
    accountName: "",
    description: "",
    facebook: "",
    twitter: "",
    github: "",
    userOwner: userID,
    profileImage: "",
  });

  useEffect(() => {
    const fetchSavedProfile = async () => {
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

    fetchSavedProfile();
  }, [userID]);

  const profilePicture =
    isProfileFound && savedProfile?.profileImage ? (
      `http://localhost:3001/profile/images/${savedProfile?.profileImage}`
    ) : (
      <img
        src={`https://avatars.dicebear.com/api/identicon/${userID}.svg`}
        className="h-[25px] rounded-[45%]  "
      />
    );

  const fetchSelectedImage = async () => {
    try {
      const response = await axios.get(profilePicture);
      setSelectedImage(response);
      setIsProfileFound(true);
      console.log(response);
    } catch (err) {
      console.error(err);
      setIsProfileFound(false);
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (event) => {
    const { name, files } = event.target;
    if (name === "profileImage") {
      const imageFile = files[0];
      setProfile({ ...profile, profileImage: imageFile });

      // Display the selected image
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("accountName", profile.accountName);
    formData.append("description", profile.description);
    formData.append("facebook", profile.facebook);
    formData.append("twitter", profile.twitter);
    formData.append("github", profile.github);
    formData.append("userOwner", profile.userOwner);
    if (profile.profileImage) {
      formData.append("profileImage", profile.profileImage);
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/profile/",

        formData,
        {
          headers: { authorization: cookies.access_token },
        }
      );
      toast.success("Profile Updated!");
      console.log(response.data);
    } catch (error) {
      console.log(error);
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
              placeholder={"Enter your name"}
              id="accountName"
              name="accountName"
              onChange={handleChange}
              value={profile.accountName || ""}
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
              value={savedProfile?.description || ""}
            ></textarea>
          </div>
          <h1 className="text-center font-bold text-[25px] mt-5">Socials</h1>
          <div className="flex flex-col items-center pt-5 gap-2 ">
            <FaFacebookSquare size={"30px"} />
            <input
              className="border-black border-solid border-[1px] w-[200px] py-1 px-2 rounded-md"
              placeholder="https://www.facebook.com/"
              name="facebook"
              id="facebook"
              value={profile.facebook || ""}
              onChange={handleChange}
            />
            <FaTwitterSquare size={"30px"} />
            <input
              className="border-black border-solid border-[1px] w-[200px] py-1 px-2 rounded-md"
              placeholder="https://twitter.com/"
              id="twitter"
              name="twitter"
              value={profile.twitter || ""}
              onChange={handleChange}
            />
            <FaGithubSquare size={"30px"} />
            <input
              className="border-black border-solid border-[1px] w-[200px] py-1 px-2 rounded-md"
              placeholder="https://github.com/"
              id="github"
              name="github"
              onChange={handleChange}
              value={profile.github || ""}
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
                {selectedImage ? (
                  <img
                    src={
                      selectedImage ||
                      profilePicture ||
                      `https://avatars.dicebear.com/api/identicon/${userID}.svg`
                    }
                    className="h-[38px] rounded-[50%]"
                    alt="Selected"
                  />
                ) : (
                  <img
                    src={
                      profilePicture ||
                      `https://avatars.dicebear.com/api/identicon/${userID}.svg`
                    }
                    className="h-[38px] rounded-[50%]"
                    alt="Selected"
                  />
                )}
              </div>
              <input
                type="file"
                name="profileImage"
                id="profileImage"
                className="ml-[80px]"
                onChange={handleImageChange}
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
