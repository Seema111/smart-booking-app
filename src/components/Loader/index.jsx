/* eslint-disable react/prop-types */
import React from "react";
import "./style.scss";

/**
 * @description Renders an overlay with a loading indicator while the `loading` prop
 * is true.
 * 
 * @param { boolean } loading - status of the loading operation within the LoaderSpinner
 * component, with a value of true indicating that the loading state is active.
 * 
 * @returns { HTML element of class "loader-overlay } an HTML container containing a
 * loading indicator (`<div className="loader-overlay">`) and a `<div>` element with
 * a `loader` class.
 * 
 * 	* `>` is a fragment marker used to define the return type of the function as a
 * JSX expression.
 * 	* `<>` is used to enclose the generated JSX code.
 * 	* `{ ... }`: This represents a JavaScript object literal, where each property is
 * defined by its curly brace notation.
 * 	* `loading`: A boolean property that indicates whether the loader should be shown
 * or not. When `true`, the loader is displayed; otherwise, it is hidden.
 * 	* `<div className="loader-overlay">`: This marks the beginning of a div element
 * with the class "loader-overlay".
 * 	* `<div className="loader"></div>`: This marks the beginning of another div element
 * with the class "loader".
 */
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
