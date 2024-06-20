/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import LocationView from "../../components/LocationView";
import "./style.scss";
import BookingLogo from "../../assets/images/book4.jpg";
import CashLogo from "../../assets/images/cash.jpg";
import KhaltiLogo from "../../assets/images/khalti1.jpg";

import { useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../utils/setCookie";
import {
  bookAppointment,
  verifyKhaltiPayment,
} from "../../services/http-request";
import { toast } from "react-toastify";
import CustomModal from "../../components/CustomModal";
import LoaderSpinner from "../../components/Loader";
import { validateResponse } from "../../utils/validateResponse";

const KHALTI = "Khalti";

const SERVICE_TYPES = [
  {
    name: "Lab Services",
    value: "lab-services",
  },
  {
    name: "Caregiving",
    value: "caregiving",
  },
];

const AppointmentPage = ({ page }) => {
  const params = useParams();
  const token = getCookie("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  const initialState = {
    appointment_for: "string",
    full_name: "string",
    phone: "string",
    address: "string",
    start_date: "",
    end_date: new Date().toISOString().split("T")[0],
    description: "string",
    payment_medium: KHALTI,
  };
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [appointmentDetail, setAppointmentDetail] = useState(initialState);
  const [showBookingSuccess, setBookingSuccess] = useState(false);
  const [defaultAppointment, setDefaultAppointment] = useState({
    title: "Caregiving",
    service: "caregiving",
    detail: {},
  });

  const intializKhaltiWeb = (data) => {
    const { product_id, product_name, product_url, transaction_uuid } = data;
    let config = {
      // replace this key with yours
      publicKey: "test_public_key_f1fe71fff3ad4f50aaf6ee0f507546b2",
      productIdentity: product_id || "testing",
      productName: product_name || "testing",
      productUrl: product_url,
      eventHandler: {
        onSuccess(payload) {
          // hit merchant api for initiating verfication
          console.log(payload, "AFTER SUCCESS");
          try {
            const verifyData = {
              khalti_token: payload.token,
              transaction_uuid: transaction_uuid,
            };
            verifyKhaltiPayment(verifyData)
              .then(function (res) {
                validateResponse(res);
                return res.json();
              })
              .then(function (data) {
                if (data) {
                  setBookingSuccess(true);
                  setPaymentLoading(false);
                } else {
                  toast.error(JSON.stringify(data));
                }
              });
          } catch (error) {
            console.error("Error:", error);
            toast.error(JSON.stringify(error));
          }
        },
        // onError handler is optional
        onError(error) {
          // handle errors
          console.log(error);
        },
        onClose() {
          console.log("widget is closing");
        },
      },
      paymentPreference: ["KHALTI"],
    };
    let checkout = new KhaltiCheckout(config);
    // minimum transaction amount must be 10, i.e 1000 in paisa.
    checkout.show({ amount: 10000 });
    setPaymentLoading(true);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    try {
      bookAppointment(appointmentDetail)
        .then(function (res) {
          validateResponse(res);
          return res.json();
        })
        .then(function (data) {
          if (data) {
            if (appointmentDetail.payment_medium === KHALTI) {
              intializKhaltiWeb(data.transaction);
            } else {
              setBookingSuccess(true);
            }
          } else {
            toast.error(JSON.stringify(data));
          }
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error(JSON.stringify(error));
    }
  };
  const handleOnChange = (event) => {
    const formInput = event.target.value;
    let defaultValue = {
      ...appointmentDetail,
      [event.target.name]: formInput,
    };
    if (
      defaultAppointment.service === "labservices" &&
      event.target.name === "start_date"
    ) {
      defaultValue = {
        ...defaultValue,
        end_date: formInput,
      };
    }
    setAppointmentDetail(defaultValue);
  };

  useEffect(() => {
    if (page) {
      const bookingDetail = localStorage.getItem("book-detail");
      setDefaultAppointment({
        title: page,
        service: page.toLowerCase().replace(/\s/g, ""),
        detail: JSON.parse(bookingDetail),
      });
    }
    if (params) {
      setAppointmentDetail({
        ...appointmentDetail,
        appointment_for: params.uuid,
      });
    }
  }, []);

  const getMessageForServiceType = () => {
    let defaultMessage = `${defaultAppointment?.detail?.user?.first_name}
    ${defaultAppointment?.detail?.user?.last_name}
    ${defaultAppointment?.detail?.speciality}`;
    if (defaultAppointment.service === "labservices") {
      defaultMessage = defaultAppointment?.detail?.name;
    }
    return defaultMessage;
  };

  return (
    <LocationView>
      <LoaderSpinner loading={paymentLoading} />
      <CustomModal
        title="Appointment Booked Successfully!"
        imgSrc={BookingLogo}
        message={`Your Booking for ${getMessageForServiceType()} have been registered for ${appointmentDetail?.start_date}.
                     Thank you for choosing our service.`}
        showModal={showBookingSuccess}
        handleClose={() => setBookingSuccess(false)}
      />
      <div className="card appointment-card">
        <div className="card-body">
          <h1 className="card-title">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/caregiving">{defaultAppointment.title}</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Book Appointment
                </li>
              </ol>
            </nav>
          </h1>
          <p className="card-text">
            Fill the information to confirm your booking for selected services.
          </p>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="full_name"
                maxLength="50"
                className="form-control form-control-lg"
                placeholder="Enter your fullname"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input
                type="number"
                name="phone"
                maxLength="14"
                className="form-control form-control-lg"
                id="pageInput"
                onChange={handleOnChange}
                placeholder="Enter Your contact number"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                maxLength="50"
                className="form-control form-control-lg"
                id="pageInput"
                onChange={handleOnChange}
                placeholder="Enter Your contact number"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Services Type</label>
              <select
                className="form-select form-select-lg"
                name="description"
                aria-label="Select Services"
                disabled
                onChange={handleOnChange}
                value={defaultAppointment.service}
                placeholder="Select which service you want to book"
              >
                {SERVICE_TYPES.map((eachService, index) => (
                  <option value={eachService.value} key={index}>
                    {eachService.name} - {getMessageForServiceType()}
                  </option>
                ))}
              </select>
            </div>
            <div className="row mb-3">
              <div
                className={`${defaultAppointment.service === "caregiving" ? "col-6 p-0" : "col-12 p-0"}`}
              >
                <label className="form-label">Appointment Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  className="form-control form-control-lg"
                  min={new Date().toISOString().split("T")[0]}
                  id="date"
                  onChange={handleOnChange}
                  placeholder="Enter Your Date"
                />
              </div>
              {defaultAppointment.service === "caregiving" ? (
                <div className="col-6">
                  <label className="form-label">Appointment End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    className="form-control form-control-lg"
                    min={appointmentDetail.start_date}
                    disabled={!appointmentDetail.start_date}
                    id="date"
                    onChange={handleOnChange}
                    placeholder="Enter Your Date"
                  />
                </div>
              ) : (
                ""
              )}
            </div>
            <label className="form-label">Select Payment Method: </label>
            <div className="mb-3 d-flex">
              <div
                className={`form-check ml-5 ${appointmentDetail.payment_medium === KHALTI && "active"}`}
                role="presentation"
                onClick={() =>
                  setAppointmentDetail({
                    ...appointmentDetail,
                    payment_medium: KHALTI,
                  })
                }
              >
                <img src={KhaltiLogo} height="60" />

                <span className="ml-5">Pay with Khalti</span>
              </div>
              <div
                className={`form-check ml-5 ${appointmentDetail.payment_medium === "Cash" && "active"}`}
                role="presentation"
                onClick={() =>
                  setAppointmentDetail({
                    ...appointmentDetail,
                    payment_medium: "Cash",
                  })
                }
              >
                <img src={CashLogo} height="60" />
                <span className="ml-5">Cash on Payment</span>
              </div>
            </div>
            <button className="btn btn-primary btn-lg mt-2" type="submit">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </LocationView>
  );
};

export default AppointmentPage;
