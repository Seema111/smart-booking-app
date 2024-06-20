/* eslint-disable react/prop-types */
import HomeCareLogo from "../../assets/images/home.png";
import AssetLoginImage from "../../assets/images/login9.jpg";
import "./style.scss";

/**
 * @description Generates a card-based login interface, comprising an image, heading,
 * subheading (if provided), and children content.
 * 
 * @param { string } title - title of the page being generated and is used to display
 * a header with the given title on the generated page.
 * 
 * @param { string } subTitle - 2nd line of text to display below the logo and title
 * on the login page, providing an optional additional line of text for customization
 * or supplementary information.
 * 
 * @param { HTML fragment. } children - content to be rendered within the central
 * column of the returned login container layout, and it can include text, images,
 * or other elements.
 * 
 * 	* `children`: This is the content that appears inside the login card component.
 * It can be any React component or a JavaScript object with properties that can be
 * used to render the content within the card.
 * 
 * 	For example, if `children` is a string, it will be rendered as text within the
 * card. If `children` is an array of strings, each string will be displayed in a
 * separate line inside the card. Similarly, if `children` is a React component, it
 * will be rendered as the primary content inside the card.
 * 
 * 	In summary, the `LoginCardView` function takes an input of the form `(title,
 * subTitle, children)`, where `title` and `subTitle` are strings that represent the
 * title and subtitle of the login card, respectively, and `children` is a React
 * component or a JavaScript object with properties that determine the content inside
 * the card.
 * 
 * @returns { Component } a layout for a login page with a background image and a
 * form for entering login credentials.
 */

const LoginCardView = ({ title, subTitle, children }) => {
  return (
    <div className="row login-container gx-5">
      <div className="col-md-12 login-container__main-col">
        <div className="card login-container__login-form">
          <div className="row">
            <div
              className="col-lg-6 d-none d-lg-block login-container__bg-image"
              style={{
                backgroundImage: `url(${AssetLoginImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="col-lg-6 login-container__form d-flex flex-column justify-content-center px-5">
              <div className="text-center">
                <img
                  src={HomeCareLogo}
                  className="rounded mb-5"
                  alt="happy-home-dashboard-img"
                  height={108}
                  width={108}
                />
              </div>
              <h1 className="card-title">{title}</h1>
              {subTitle ? <p>{subTitle}</p> : ""}
              {children}
              <a href="/" className="text-primary">
                <i className="bi bi-arrow-left me-1"></i>
                <span className="pl-2">Back to Homepage</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCardView;
