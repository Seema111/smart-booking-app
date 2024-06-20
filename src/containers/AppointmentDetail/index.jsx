/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMyAppointments } from "../../services/http-request";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import { getCookie } from "../../utils/setCookie";
import MyImage from "../../assets/images/book4.jpg";
import "./style.scss";
import { validateResponse } from "../../utils/validateResponse";

const APPOINTMENT_DETAIL = [
  {
    uuid: "93083817-1486-498a-929f-1dfba44867e5",
    created_at: "2024-03-30T15:41:15.263784Z",
    appointment_for: "lab_service",
    on_date: "2024-04-01T00:00:00Z",
    is_paid: false,
    service: 1,
  },
  {
    uuid: "2c5af9e8-1338-4394-ab26-a3bcb776303d",
    created_at: "2024-03-30T15:42:11.282210Z",
    appointment_for: "lab_service",
    on_date: "2024-04-02T00:00:00Z",
    is_paid: false,
    service: 1,
  },
  {
    uuid: "6e44b1aa-177a-4b57-b3b4-0e868dd4ac87",
    created_at: "2024-03-30T15:49:23.914379Z",
    appointment_for: "lab_service",
    on_date: "2024-04-01T00:00:00Z",
    is_paid: true,
    service: 1,
  },
  {
    uuid: "7ab91e13-e64d-4d14-ad4c-a22b62e6ba9e",
    created_at: "2024-03-30T15:50:07.200033Z",
    appointment_for: "lab_service",
    on_date: "2024-04-01T00:00:00Z",
    is_paid: true,
    service: 1,
  },
  {
    uuid: "ea1197b4-c8af-4146-8ce4-75c1b7fa9817",
    created_at: "2024-03-30T15:53:05.414209Z",
    appointment_for: "lab_service",
    on_date: "2024-04-01T00:00:00Z",
    is_paid: false,
    service: 1,
  },
  {
    uuid: "1f5dcbad-9821-41d7-ab94-5c2f8d8e13ec",
    created_at: "2024-03-30T15:56:06.813263Z",
    appointment_for: "lab_service",
    on_date: "2024-04-04T00:00:00Z",
    is_paid: false,
    service: 1,
  },
  {
    uuid: "ec37e2cd-6f98-4454-8595-718c6f3af871",
    created_at: "2024-03-30T15:56:51.073130Z",
    appointment_for: "lab_service",
    on_date: "2024-04-04T00:00:00Z",
    is_paid: false,
    service: 1,
  },
  {
    uuid: "5c61b48d-7564-44a0-b878-2c55944ad38f",
    created_at: "2024-03-30T16:03:08.136516Z",
    appointment_for: "lab_service",
    on_date: "2024-04-01T00:00:00Z",
    is_paid: false,
    service: 1,
  },
  {
    uuid: "016a4642-0067-4ed8-80b3-be3a63d30cec",
    created_at: "2024-03-30T16:27:06.797021Z",
    appointment_for: "lab_service",
    on_date: "2024-04-05T00:00:00Z",
    is_paid: false,
    service: 1,
  },
  {
    uuid: "a8a09a6b-e819-4e76-9e75-4f872b8c0c0d",
    created_at: "2024-03-30T16:34:49.984546Z",
    appointment_for: "lab_service",
    on_date: "2024-04-02T00:00:00Z",
    is_paid: false,
    service: 1,
  },
  {
    uuid: "8e789bff-428a-41d2-8cec-fc38af23bc2f",
    created_at: "2024-03-30T16:35:56.542328Z",
    appointment_for: "lab_service",
    on_date: "2024-04-04T00:00:00Z",
    is_paid: false,
    service: 1,
  },
  {
    uuid: "51d19ac4-a959-443d-9562-c959bb68122c",
    created_at: "2024-03-30T17:37:12.473614Z",
    appointment_for: "lab_service",
    on_date: "2024-04-01T00:00:00Z",
    is_paid: false,
    service: 1,
  },
  {
    uuid: "32c1eeb6-dc82-416d-9a80-df3c477b7e9a",
    created_at: "2024-03-30T16:37:15.172634Z",
    appointment_for: "caregiver_service",
    service: "string",
    start_date: "2024-04-05T00:00:00Z",
    end_date: "2024-05-03T00:00:00Z",
    is_paid: true,
    caregiver: {
      uuid: "e4a8a549-9c7a-4b0c-ac8a-43461efffe8d",
      speciality: "Nepal Government Registered Nurse",
      languages: "Nepali, English",
      ratings: 4,
      experience: "1 Year",
      bio: "Mr. Rita Shrestha is an experienced medical professional who obtained his nurse degree from Harvard medical school. She has worked for more than 10 years in various hospitals and possesses brilliant medical knowledge and a penchant for modern research in the medical field. Rita has established herself as a compassionate and dedicated healer.",
      user: {
        id: 23,
        email: "cg2@gmail.com",
        username: "caregiver2",
        first_name: "Rita",
        last_name: "Shrestha",
        profile: {
          age: 35,
          gender: "FEMALE",
          phone: "9890987876",
          address: "KTM",
          profile_picture: null,
        },
      },
    },
  },
  {
    uuid: "a9d41690-7cfc-4ed9-a5b2-81bd41eefb15",
    created_at: "2024-03-30T16:43:08.086590Z",
    appointment_for: "caregiver_service",
    service: "string",
    start_date: "2024-04-05T00:00:00Z",
    end_date: "2024-03-30T00:00:00Z",
    is_paid: true,
    caregiver: {
      uuid: "e4a8a549-9c7a-4b0c-ac8a-43461efffe8d",
      speciality: "Nepal Government Registered Nurse",
      languages: "Nepali, English",
      ratings: 4,
      experience: "1 Year",
      bio: "Mr. Rita Shrestha is an experienced medical professional who obtained his nurse degree from Harvard medical school. She has worked for more than 10 years in various hospitals and possesses brilliant medical knowledge and a penchant for modern research in the medical field. Rita has established herself as a compassionate and dedicated healer.",
      user: {
        id: 23,
        email: "cg2@gmail.com",
        username: "caregiver2",
        first_name: "Rita",
        last_name: "Shrestha",
        profile: {
          age: 35,
          gender: "FEMALE",
          phone: "9890987876",
          address: "KTM",
          profile_picture: null,
        },
      },
    },
  },
];

const AppointmentDetailPage = () => {
  const isUserLoggedIn = getCookie("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  });
  const [allAppointments, setAllAppointments] = useState([]);
  console.log(allAppointments);

  useEffect(() => {
    try {
      getAllMyAppointments()
        .then(function (res) {
          validateResponse(res);
          return res.json();
        })
        .then(function (data) {
          if (data) {
            setAllAppointments(data);
          } else {
            toast.error(JSON.stringify(data));
          }
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error(JSON.stringify(error));
    }
  }, []);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const convertDate = (newDate) => {
    const dateObject = new Date(newDate);
    // Get year, month, day, hour, minute, and AM/PM separately
    const year = dateObject.getFullYear().toString(); // Extract last two digits of the year
    const month = monthNames[dateObject.getMonth()]; // Get month abbreviation from array
    const day = ("0" + dateObject.getDate()).slice(-2); // Get day and pad with leading zero if needed
    const formattedDateTime = `${day} ${month} ${year}`;
    return formattedDateTime;
  };

  const getTime = (newDate) => {
    const dateObject = new Date(newDate);
    let hour = dateObject.getHours();
    const minute = ("" + dateObject.getMinutes()).slice(-2); // Get minute and pad with leading zero if needed
    const amPM = hour >= 12 ? "PM" : "AM"; // Determine AM/PM
    hour = hour % 12 || 12; // Convert hour to 12-hour format
    const formattedDateTime = `${hour}:${minute} ${amPM}`;
    return formattedDateTime;
  };

  return (
    <div className="row d-flex mt-5 justify-content-center align-items-center">
      <div className="col-8 p-5 m-5">
        <h2 className="mb-3">MY APPOINTMENT'S SCHEDULE</h2>
        {allAppointments.length > 0 ? (
          <div className="appointment-card-container">
            {(allAppointments || APPOINTMENT_DETAIL).map((eachAppointment) => (
              <Card key={eachAppointment.uuid} className="appointment-card">
                <Card.Body>
                  <Card.Title className="card-title">
                    <p>
                      <i className="bi bi-calendar2-check pr-5"></i>{" "}
                      {convertDate(
                        eachAppointment.on_date || eachAppointment.start_date,
                      )}{" "}
                      {eachAppointment?.end_date
                        ? " - " + convertDate(eachAppointment.end_date)
                        : ""}
                    </p>
                  </Card.Title>
                  <Card.Text>
                    <div className="row">
                      <div className="col-3">
                        <img
                          src={MyImage}
                          className="rounded-circle mx-auto d-block mb-3"
                          alt="ProfileImage"
                          height={150}
                          width={150}
                        ></img>
                      </div>
                      <div className="col-6 d-flex flex-column justify-content-center appointment-detail-col">
                        <div>
                          <b>Service Type:</b>{" "}
                          {eachAppointment.appointment_for ===
                          "caregiver_service"
                            ? "Caregiver Service"
                            : "Lab Service"}{" "}
                        </div>
                        <div>
                          <b>Scheduled Time:</b>{" "}
                          {getTime(
                            eachAppointment.on_date ||
                              eachAppointment.start_date,
                          )}
                        </div>
                        {eachAppointment.appointment_for ===
                        "caregiver_service" ? (
                          <div>
                            <div>
                              <b>Caregiver Name:</b>{" "}
                              {eachAppointment.caregiver.user.first_name}{" "}
                              {eachAppointment.caregiver.user.last_name}
                            </div>
                            <div>
                              <b>Speciality:</b>{" "}
                              {eachAppointment.caregiver.speciality}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-2 d-flex flex-column justify-content-center appointment-detail-col">
                        <Badge
                          className="p-3"
                          bg={
                            String(eachAppointment.is_paid) === "true"
                              ? "success"
                              : "danger"
                          }
                        >
                          {" "}
                          {String(eachAppointment.is_paid) === "true"
                            ? "Payment Success"
                            : "Payment Pending"}
                        </Badge>{" "}
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <div className="nodata-container">
            <p>Looks like, you have no scheduled appoinments.</p>
            <a
              className="btn btn-success btn-lg"
              href="/caregiving"
              role="button"
            >
              <b> Book Your Appointment</b>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetailPage;
