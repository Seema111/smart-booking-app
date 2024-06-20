import LabImg3 from "../../assets/images/nurse.jpg";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllCareGivers } from "../../services/http-request";
import { caregivingData } from "../../utils/dummyData";
import LoaderSpinner from "../../components/Loader";
import { validateResponse } from "../../utils/validateResponse";

const CaregivingPage = () => {
  const navigate = useNavigate();
  const [caregivers, setCaregivers] = useState({
    loading: true,
    data: caregivingData,
  });

  useEffect(() => {
    try {
      getAllCareGivers()
        .then((res) => {
          validateResponse(res);
          return res.json();
        })
        .then((data) => {
          if (data) {
            console.log(data);
            setCaregivers({
              loading: false,
              data,
            });
          } else {
            toast.error(JSON.stringify(data));
          }
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error(JSON.stringify(error));
    }
  }, []);

  const redirectToBookAppointment = (event, uuid) => {
    event.stopPropagation();
    navigate(`/caregiving/${uuid}/book-appointment`);
  };

  const getMoreDetails = (uuid) => {
    navigate(`/caregiving/${uuid}`);
  };

  return (
    <>
      <LoaderSpinner loading={caregivers.loading} />
      <div className="container parent-container">
        <div className="row justify-content-md-center">
          <div className="col-12">
            <h1 className="text-center fw-bold text-uppercase d-flex justify-content-center">
              <span className="pr-5">Caregivers</span>
            </h1>
            <p className="display-5 mb-4 mb-md-5 text-center">
              {" "}
              Our Caregivers play an indispensable role in enriching the lives
              of those we serve.
            </p>
            <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
          </div>
        </div>
      </div>
      <div className="container overflow-hidden">
        <div className="row gy-4 gy-md-0 gx-xxl-5 mb-5">
          {caregivers.data.map((each) => (
            <div className="col-12 col-md-4" key={each.uuid}>
              <div className="card border-0 border-bottom border-primary shadow-sm text-cursor mb-5">
                <div className="card-body pt-5 px-5" title="Learn more">
                  <figure>
                    {each.user.profile.profile_picture ? (
                      <img
                        className="img-fluid rounded rounded mb-4 border border-5"
                        loading="lazy"
                        src={each.user.profile.profile_picture}
                        style={{ height: "200px", width: "200px" }}
                        alt=""
                      />
                    ) : (
                      <img
                        className="img-fluid rounded rounded mb-4 border border-5"
                        loading="lazy"
                        src={LabImg3}
                        alt=""
                      />
                    )}

                    <figcaption>
                      <div
                        className="bsb-ratings text-warning mb-3"
                        data-bsb-star={Math.ceil(Number(each.ratings)) || 5}
                        data-bsb-star-off="0"
                      ></div>
                      <blockquote className="bsb-blockquote-icon mb-4 blockquote-bio">
                        {each.bio}
                      </blockquote>
                      <h4 className="mb-2">
                        {each?.user?.first_name} {each?.user?.last_name}
                      </h4>
                      <h5 className="fs-6 text-secondary mb-1">
                        {each.speciality}
                      </h5>
                      <h5 className="fs-6 text-secondary mb-1">
                        Experience: {each.experience}
                      </h5>
                    </figcaption>
                    <div className="col-12 text-center">
                      <button
                        type="button"
                        className="btn btn-lg btn-success mt-3 w-100"
                        onClick={(event) => {
                          redirectToBookAppointment(event, each.uuid);
                          localStorage.setItem(
                            "book-detail",
                            JSON.stringify(each),
                          );
                        }}
                      >
                        <i className="bi bi-person-plus pr-5"></i>
                        Book Appointment
                      </button>
                      <button
                        type="button"
                        className="btn btn-lg btn btn-outline-info mt-3"
                        onClick={() => getMoreDetails(each.uuid)}
                      >
                        Learn more..
                      </button>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CaregivingPage;
