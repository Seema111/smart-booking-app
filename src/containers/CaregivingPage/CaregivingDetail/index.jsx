import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LabImg3 from "../../../assets/images/nurse.jpg";
import { getCaregiverDetail } from "../../../services/http-request";
import "../style.scss";
import { validateResponse } from "../../../utils/validateResponse";

const CaregivingDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [caregiverDetail, setCaregiverDetail] = useState({});

  useEffect(() => {
    try {
      if (params.caregiverId) {
        getCaregiverDetail(params.caregiverId)
          .then((res) => {
            validateResponse(res)
            return res.json();
          })
          .then((data) => {
            if (data) {
              setCaregiverDetail(data);
            } else {
              toast.error(JSON.stringify(data));
            }
          });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(JSON.stringify(error));
    }
  }, [params]);

  const redirectToBookAppointment = (event) => {
    event.stopPropagation();
    navigate(`/caregiving/book-appointment`);
  };

  return (
    <>
      <div className="container parent-container caregiver-detail-container">
        <div className="row">
          <div className="col-6 p-5">
            <img
              src={caregiverDetail?.user?.profile?.profile_picture? caregiverDetail?.user?.profile?.profile_picture: LabImg3}
              className="img-thumbnail"
              alt="image data"
              height={600}
            />
          </div>
          <div className="col-6 p-5">
            <div className="card border-0 border-bottom border-primary shadow-sm text-cursor">
              <div className="card-body p-5">
                <figure>
                  <figcaption>
                    <h2 className="mb-2">
                      {caregiverDetail?.user?.first_name}{" "}
                      {caregiverDetail?.user?.last_name}
                    </h2>
                    <h3 className="fs-4 text-secondary mb-1">
                      {caregiverDetail.speciality}
                    </h3>
                    <h5 className="fs-5 text-secondary mb-1">
                      Experience: {caregiverDetail.experience}
                    </h5>
                    <h5 className="fs-5 text-secondary mb-1">
                      Fluent in {caregiverDetail.languages}
                    </h5>
                    <div
                      className="bsb-ratings text-warning mb-3"
                      data-bsb-star={
                        Math.ceil(Number(caregiverDetail.ratings)) || 5
                      }
                      data-bsb-star-off="0"
                    ></div>
                    <blockquote className="bsb-blockquote-icon mb-4">
                      {caregiverDetail.bio}
                    </blockquote>
                  </figcaption>
                  <button
                    type="button"
                    className="btn btn-lg btn-success mt-3"
                    onClick={redirectToBookAppointment}
                  >
                    <i className="bi bi-person-plus pr-5"></i>
                    Book Appointment
                  </button>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaregivingDetail;
