import PageNotFoundImg from "../../assets/images/pagenotfound.jpg";
import "./style.scss";

/**
 * @description Generates a HTML div element with a centered "Oops, Page not found"
 * message and an arrow icon linked to the homepage.
 * 
 * @returns { HTML element } a HTML division element with a centralized image and a
 * message indicating that the page cannot be found.
 * 
 * 	* `id`: The ID of the not found container div, which is set to `"notfound"`.
 * 	* `className`: The class name of the not found container div, which is set to
 * `"d-flex flex-column p-5 justify-content-center align-items-center not-found-container"`.
 * 	* `src`: The image URL for the 404 error page, which is set to `"PageNotFoundImg"`
 * and has a height of `500` and width of `500`.
 * 	* `height`: The height of the error page image, which is set to `500`.
 * 	* `width`: The width of the error page image, which is set to `500`.
 * 	* `alt`: The alternative text for the error page image, which is set to `"happy-home-dashboard-img"`.
 * 	* `className`: The class name of the 404 error message div, which is set to `"notfound-404"`.
 * 	* `h2`: The title of the 404 error message, which is set to `"Oops, The Page you
 * are looking for cannot be found!"`.
 * 	* `a`: The anchor tag that directs users back to the homepage, which has a `href`
 * attribute set to `/` and a `className` attribute set to `"btn btn-success"`. The
 * `span` element within the `a` tag has a class name of `"arrow"`。
 */
const PageNotFound = () => {
  return (
    <div
      id="notfound"
      className="d-flex flex-column p-5 justify-content-center align-items-center not-found-container"
    >
      <div className="notfound-404">
        <img
          src={PageNotFoundImg}
          className="rounded m-5"
          alt="happy-home-dashboard-img"
          height={500}
          width={500}
        />
      </div>
      <h2 className="mb-4">
        Oops, The Page you are looking for cannot be found!
      </h2>
      <a href="/" className="btn btn-success">
        <span className="arrow"></span>Return To Homepage
      </a>
    </div>
  );
};

export default PageNotFound;
