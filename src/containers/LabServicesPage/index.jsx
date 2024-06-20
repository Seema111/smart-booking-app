// import LabImg1 from "../../assets/images/lab4.jpg";
// import LabImg3 from "../../assets/images/lab7.jpg";
import LabImg4 from "../../assets/images/lab7.jpg";
import { useEffect, useState } from "react";
import { getAllLabServices } from "../../services/http-request";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../../components/Loader";
import { validateResponse } from "../../utils/validateResponse";


/**
 * @description 1) retrieves all lab services using effect hook, 2) sets `loading`
 * state to `false`, and 3) renders a list of lab services with a book appointment
 * button for each service.
 * 
 * @returns { object } a web page displaying a list of lab services with a book
 * appointment button for each service.
 */

const LabServicesPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allLabServices, setLabServices] = useState([]);
  
  useEffect(() => {
    try {
      getAllLabServices()
        .then((res) => {
          validateResponse(res);
          return res.json();
        })
        .then((data) => {
          setLoading(false);
          if (data) {
            setLabServices(data);
          } else {
            toast.error(JSON.stringify(data));
          }
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error(JSON.stringify(error));
    }
  }, []);


  /**
   * @description Navigates to the book appointment page for a specific UUID.
   * 
   * @param { string } uuid - unique identifier of the lab service to which the user
   * will be navigated.
   */

  const redirectToBookAppointment = (uuid) => {
    navigate(`/lab-services/${uuid}/book-appointment`);
  };

  return (
    <>
      <LoaderSpinner loading={loading} />
      <div className="container parent-container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center fw-bold text-uppercase d-flex justify-content-center">
              <span className="pr-5">Lab Services</span>
            </h1>
            <h2 className="display-5 mb-4 mb-md-5 text-center">
              Our journey began with a dream of redefining how the world
              perceives medical Assistance.
            </h2>
          </div>
        </div>
      </div>

      <div
        className="container overflow-hidden mb-5"
        style={{ minHeight: "70vh" }}
      >

        {/**
         * @description Maps through an array of lab services and displays a card for each
         * service, containing its name, description, and a book appointment button.
         * 
         * @param { string } className - CSS class name of the container element that the
         * card will be appended to.
         */}

        <div className="row gy-4 gy-lg-0">
          {allLabServices.length > 0 &&
            allLabServices.map((eachLab) => (
              <div className="col-12 col-lg-6 mb-5" key={eachLab.uuid}>
                <article>
                  <div className="card border-0">
                    <img
                      className="card-img-top m-0"
                      loading="lazy"
                      src={LabImg4}
                      height={400}
                      alt=""
                    />
                    <div className="card-body border bg-white p-4">
                      <div className="entry-header mb-3">
                        <h2 className="card-title entry-title h4 mb-0">
                          <a
                            className="link-dark text-decoration-none"
                            href="#!"
                          >
                            {eachLab.name}
                          </a>
                        </h2>
                      </div>
                      <p className="card-text entry-summary text-secondary mb-3 text-truncate">
                        {eachLab.description}
                      </p>
                      <div className="col-12 text-center">

                        /**
                         * @description When clicked, redirects to the book appointment page and stores the
                         * lab's UUID in local storage.
                         * 
                         * @param { string } type - type of appointment to book, specifically "button" in
                         * this case.
                         * 
                         * @param { string } className - class name for the button, which is set to `btn-lg
                         * btn-success mt-3 w-100` to provide styling and layout information for the button.
                         * 
                         * @param { JavaScript function reference. } onClick - functionality of clicking the
                         * button and takes the action to redirect to book appointment page with the specified
                         * lab UUID passed as argument.
                         * 
                         * 	* `type`: A String representing the type of the element, which is set to "button".
                         * 	* `className`: A String representing the class name of the element, which includes
                         * "btn-lg btn-success mt-3 w-100".
                         * 	* `onClick`: An arrow function that is triggered when the button is clicked. It
                         * calls the `redirectToBookAppointment` function and stores the UUID of the lab in
                         * local storage using `localStorage.setItem()`.
                         */

                        <button
                          type="button"
                          className="btn btn-lg btn-success mt-3 w-100"
                          onClick={() => {
                            redirectToBookAppointment(eachLab.uuid);
                            localStorage.setItem(
                              "book-detail",
                              JSON.stringify(eachLab),
                            );
                          }}
                        >
                          <i className="bi bi-person-plus pr-5"></i>
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default LabServicesPage;
