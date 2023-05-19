import React from "react";
import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <RingLoader color="#4F46E5" loading={true} size={150} />
    </div>
  );
};

export default Loading;
