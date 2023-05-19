import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserId } from "../hooks/getUserID";
import { useGetUsername } from "../hooks/getUsername";
import { getProfileImage } from "../hooks/profileImage";
import { Link, useLocation } from "react-router-dom";

const UserStories = () => {
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserId();
  const username = useGetUsername();
  const profilePhoto = getProfileImage();

  const [savedProfile, getSavedProfile] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProfileFound, setIsProfileFound] = useState(true);

  useEffect(() => {
    const fetchSavedProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/write/${userID}`
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

  return (
    <div className="w-full border-t-[1px] border-slate-200 border-solid">
      <div className="max-w-[1440px] m-auto flex flex-col">
        <div>
          <ul>
            <div>
              <li>Title Here</li>
              <li>Body Here</li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserStories;
