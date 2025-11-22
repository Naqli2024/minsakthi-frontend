import React from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";

const Loader = ({ isLoading }) => {
  if (!isLoading) {
    return null; 
  }

  return (
    <div className="thunder-loader">
        <AiOutlineThunderbolt className="thunder-icon" />
    </div>
  );
};

export default Loader;