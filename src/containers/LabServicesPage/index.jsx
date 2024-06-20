// import LabImg1 from "../../assets/images/lab4.jpg";
// import LabImg3 from "../../assets/images/lab7.jpg";
import LabImg4 from "../../assets/images/lab7.jpg";
import { useEffect, useState } from "react";
import { getAllLabServices } from "../../services/http-request";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoaderSpinner from "../../components/Loader";
import { validateResponse } from "../../utils/validateResponse";

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
