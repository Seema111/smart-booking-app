import { useNavigate } from "react-router-dom";
import HomeCareLogo from "../../assets/images/logo1.png";
import { deleteCookie, getCookie } from "../../utils/setCookie";
import { toast } from "react-toastify";
import "./style.scss";

/**
 * @description Generates a HTML component that renders a navbar with logo, home,
 * caregiving, lab services, about us, chat, and help buttons, as well as an account
 * dropdown menu for logged-in users.
 * 
 * @returns { HTML element } a HTML structure for a header navigation bar with dropdown
 * menu.
 * 
 * 	1/ `</>`: This marks the end of the HTML document.
 * 	2/ `<div>`: This element creates a new division tag within the HTML document.
 * 	3/ `classList.add()`: This method adds a class name to the HTML element, in this
 * case, "container-fluid".
 * 	4/ `<nav>`: This element creates a new navigation element within the HTML document.
 * 	5/ `container-fluid`: This is the added class name, which makes the container
 * fluid and wider than its parent element.
 * 	6/ `main-header-nav`: This is the added class name, which styles the navigation
 * element as a main header navigation.
 * 	7/ `<a>`: This element creates a new hyperlink within the HTML document.
 * 	8/ `className="navbar-brand"`: This sets the class of the hyperlink to "navbar-brand".
 * 	9/ `src` :This attributes sets the source of the hyperlink to an image file named
 * "HomeCareLogo".
 * 	10/ `alt` :This attribute sets the alternative text for the image, in this case,
 * "Happy Home".
 * 	11/ `width` :This attribute sets the width of the hyperlink image to 88 pixels.
 * 	12/ `height` :This attribute sets the height of the hyperlink image to 88 pixels.
 * 	13/ `className` :This sets the class name of the hyperlink to "main-logo".
 * 	14/ `<a>`: This element creates a new hyperlink within the HTML document.
 * 	15/ `className"homecare-name"`: This sets the class name of the hyperlink to "homecare-name".
 * 	16/ `<button>` :This element creates a new button element within the HTML document.
 * 	17/ `className` :This sets the class name of the button to "navbar-toggler".
 * 	18/ `type`: This attribute sets the type of the button to a click event.
 * 	19/ `data-bs-toggle`: This attribute sets the toggle state of the button to "dropdown".
 * 	20/ `aria-expanded`: This attribute sets the expanded state of the button to "false".
 * 	21/ `<ul>` :This element creates a new unordered list element within the HTML document.
 * 	22/ `className"dropdown"` :This sets the class name of the ul element to "dropdown".
 * 	23/ `<li>` :This element creates a new list item within the HTML document.
 * 	24/ `className` :This sets the class name of the li element to "dropdown-item".
 * 	25/ `<a>`: This element creates a new hyperlink within the HTML document.
 * 	26/ `className"bi bi-person-lock"`: This sets the class name of the a element to
 * "bi bi person lock".
 * 	27/ `<span>` :This element creates a new span element within the HTML document.
 * 	28/ `className` :This sets the class name of the span element to "p-2".
 * 	29/ `<hr>` :This element creates a horizontal line within the HTML document.
 * 	30/ `</ul>` :This marks the end of the ul element.
 * 
 * 	In summary, the `Header` function returns an HTML element with a navigation bar
 * that contains a logo image, a user name hyperlink, and a button to open a dropdown
 * menu containing additional hyperlinks.
 */

const Header = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = getCookie("token");
  const username = getCookie("username");
  /**
   * @description Deleting cookie named "token", "username" and remove item from local
   * storage. It also displays a toast message indicating successful logout and navigates
   * to the login page.
   */
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
            <div className="navbar-brand main-logo" href="#">
              <img
                src={HomeCareLogo}
                alt="Prana Home Care"
                width="88"
                height="88"
                className="d-inline-block align-text-top"
              />
            </div>
            <div className="navbar-brand homecare-name">Prana Home Care</div>
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
