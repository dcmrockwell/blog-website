import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserId } from "../hooks/getUserID";

const Profile = () => {
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserId();
  const [isProfileFound, setIsProfileFound] = useState(true);
  const [savedProfile, getSavedProfile] = useState();
  const navigate = useNavigate();

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

  return (
    <div className="w-full m-auto">
      <div className="flex flex-col text-center items-center gap-7 mt-10 mb-10 max-w-[1440px] m-auto"></div>
      <footer className="mb-[-5px]">
        <div className="h-[150px] bg-black w-full"></div>
      </footer>
    </div>
  );
};

export default Profile;
