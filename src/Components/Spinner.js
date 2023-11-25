import React from "react";
import spinner from "./Spinner-1s-200px.gif";

const Spinner = () => {
  return (
    <div className="text-center ">
      <img src={spinner} alt="loading" />
    </div>
  );
};

export default Spinner;
