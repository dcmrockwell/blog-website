import React from "react";
import { useGetUserId } from "../hooks/getUserID";
import { useGetUsername } from "../hooks/getUserUsername";

const Home = () => {
  const userId = useGetUserId();
  const username = useGetUsername();
  console.log(userId);
  console.log(username);

  return <div className="w-full h-[80vh] overflow-hidden m-auto">test</div>;
};

export default Home;
