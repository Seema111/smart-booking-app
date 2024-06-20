import PageNotFoundImg from "../../assets/images/pagenotfound.jpg";
import "./style.scss";

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
