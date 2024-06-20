/* eslint-disable react/prop-types */
import React from "react";
import "./style.scss";

function LoaderSpinner({ loading }) {
  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}

export default LoaderSpinner;
