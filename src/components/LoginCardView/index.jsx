/* eslint-disable react/prop-types */
import HomeCareLogo from "../../assets/images/home.png";
import AssetLoginImage from "../../assets/images/login9.jpg";
import "./style.scss";

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
