import { useNavigate } from "react-router-dom";
import HomeCareLogo from "../../assets/images/mainLogo.jpg";
import { deleteCookie, getCookie } from "../../utils/setCookie";
import "./style.scss";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = getCookie("token");
  const username = getCookie("username");
  const logout = () => {
    deleteCookie("token");
    deleteCookie("username");
    localStorage.removeItem("book-detail");
    toast.success("Logged out successfully!");
    navigate("/login");
  };
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary">
          <div className="container-fluid main-header-nav">
            <a className="navbar-brand main-logo" href="#">
              <img
                src={HomeCareLogo}
                alt="Happy Home"
                width="88"
                height="88"
                className="d-inline-block align-text-top"
              />
            </a>
            <a className="navbar-brand homecare-name">Happy Home</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    <i className="bi bi-house-door"></i>
                    <span className="p-2">Home</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/caregiving">
                    <i className="bi bi-person-wheelchair"></i>
                    <span className="p-2">Caregiving</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/lab-services">
                    <i className="bi bi-hospital"></i>
                    <span className="p-2">Lab Services</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about-us">
                    <i className="bi bi-bookmark-heart"></i>
                    <span className="p-2">About Us</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/chat">
                    <i className="bi bi-chat-dots"></i>
                    <span className="p-2">Chat</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/help">
                    <i className="bi bi-patch-question"></i>
                    <span className="p-2">Help</span>
                  </a>
                </li>
                {isUserLoggedIn ? (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-person-lock"></i>
                      <span className="p-2">{username ?? "Account"}</span>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="/my-account">
                          <i className="bi bi-person-lines-fill"></i>
                          <span className="pl-5">My Account</span>
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="/my-appointments">
                          <i className="bi bi-journal-medical"></i>
                          <span className="pl-5">My Appointments</span>
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="/register">
                          <i className="bi bi-person-plus"></i>
                          <span className="pl-5">Register New User</span>
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#" onClick={logout}>
                          <i className="bi bi-box-arrow-right"></i>
                          <span className="pl-5">Logout</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      <i className="bi bi-person-lock"></i>
                      <span className="p-2">Login</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
