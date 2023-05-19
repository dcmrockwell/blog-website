import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserId } from "../hooks/getUserID";
import { useGetUsername } from "../hooks/getUsername";
import { createdAt } from "../hooks/createdAt";
import { BsFillCalendarCheckFill, BsLink45Deg } from "react-icons/bs";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaGithubSquare,
  FaLinkedin,
} from "react-icons/fa";
import UserStories from "../components/UserStories";

const Profile = () => {
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserId();
  const username = useGetUsername();
  const joinDate = createdAt();
  const navigate = useNavigate();
  const [savedProfile, getSavedProfile] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProfileFound, setIsProfileFound] = useState(true);

  useEffect(() => {
    const fetchSavedProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/profile/${userID}`
        );
        getSavedProfile(response.data);
        setSelectedImage(response.data.profileImage);
        setIsProfileFound(true);

        console.log(response.data);
      } catch (err) {
        console.error(err);
        setIsProfileFound(false);
      }
    };

    fetchSavedProfile();
  }, [userID]);

  const profileName = isProfileFound ? savedProfile?.accountName : username;
  const formattedDate = joinDate.toString().split("T")[0];
  const bioProfile = isProfileFound ? savedProfile?.description : " ";

  return (
    <div className="w-full m-auto">
      <div className=" mt-10 mb-10 gap-10 flex flex-col items-start max-w-[1440px] m-auto">
        <div className="flex flex-col px-2 items-start gap-2 m-auto md:w-full md:px-[50px] md:items-center">
          <div className="flex flex-row items-center gap-2 md:flex-col">
            <div
              className="border-[2px] border-solid border-black h-[55px] rounded-[100%] flex flex-row items-center
           justify-center hover:border-[blue] md:h-[100px] md:w-[100px]"
            >
              {selectedImage ? (
                <img
                  src={`http://localhost:3001/profile/images/${savedProfile?.profileImage}`}
                  alt="Profile"
                  className="h-[50px] rounded-[50%] md:h-[95px]"
                />
              ) : (
                <img
                  src={`https://avatars.dicebear.com/api/identicon/${userID}.svg`}
                  alt="profileImage"
                  className="h-[45px] rounded-[45%]"
                />
              )}
            </div>
            <div>
              <h1 className="text-[16px] font-bold md:text-center md:text-[23px]">
                {profileName}
              </h1>
              <p className="text-[12px] md:text-center md:text-[18px]">
                @{username}
              </p>
            </div>
          </div>
          <h3 className="text-[13px] w-[280px] md:text-center md:text-[15px] md:italic ">
            {bioProfile}
          </h3>
          <div className="flex flex-col gap-2 justify-center  md:flex-row md:items-center">
            <div className="flex flex-row gap-2">
              <BsFillCalendarCheckFill size={"20px"} className="opacity-[.7]" />
              <p className="text-[13px] text-[#615454]">{formattedDate}</p>
            </div>
            <p className="hidden md:block">|</p>
            {savedProfile?.website ? (
              <a href={savedProfile?.website} target="_blank">
                <div className="flex flex-row items-center gap-2">
                  <BsLink45Deg size={"20px"} />
                  <p className="text-[12px] text-[#615454]">
                    {savedProfile?.website}
                  </p>
                </div>
              </a>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-row">
            {savedProfile?.linkedIn ? (
              <a href={savedProfile?.linkedIn} target="_blank">
                <FaLinkedin size={"30px"} className="relative" />
                <p className="hidden hover:block absolute">ToolTip</p>
              </a>
            ) : (
              ""
            )}

            {savedProfile?.github ? (
              <a href={savedProfile?.github} target="_blank">
                <FaGithubSquare size={"30px"} />
              </a>
            ) : (
              ""
            )}

            {savedProfile?.twitter ? (
              <a href={savedProfile?.twitter} target="_blank">
                <FaTwitterSquare size={"30px"} />
              </a>
            ) : (
              ""
            )}

            {savedProfile?.facebook ? (
              <a href={savedProfile?.facebook} target="_blank">
                <FaFacebookSquare size={"30px"} />
              </a>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <UserStories />
      <footer className="mb-[-5px] absolute w-full bottom-0">
        <div className="h-[150px] bg-black w-full"></div>
      </footer>
    </div>
  );
};

export default Profile;
