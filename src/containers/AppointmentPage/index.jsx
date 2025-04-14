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

/**
 * @description 1) retrieves appointment detail and sets default values, 2) renders
 * a form for user to input their details, 3) handles form submission and updates
 * appointment detail, and 4) displays booking success message if successful payment.
 * 
 * @param { string } page - appointment page or service selected by the user, and it
 * is used to initialize the default appointment detail data when the component mounts.
 * 
 * @returns { JSX element } a user interface for booking an appointment, with input
 * fields and payment options.
 * 
 * 	* `LocationView`: This is an HOC (Higher-Order Component) that wraps around another
 * component and provides additional props to it. In this case, it is wrapping around
 * the `CustomModal` component.
 * 	* `LoaderSpinner`: This is a React hook that renders a loading indicator while
 * data is being fetched or processed. It is passed as a prop to the `LocationView`
 * component.
 * 	* `CustomModal`: This is a custom modal component that provides additional
 * functionality beyond what is provided by the standard `Modal` component in React
 * Bootstrap. It is passed as a prop to the `LocationView` component.
 * 	* `form`: This is a form component that contains input fields for the user to
 * enter their payment details. It is rendered within the `CustomModal` component.
 * 	* `button`: This is a button component that is used to submit the form data when
 * the user clicks on it. It is passed as a prop to the `form` component.
 * 	* `ServiseTypes`: This is an array of objects that represents the different service
 * types available for booking. Each object in the array has a `value` property that
 * represents the service type, and a `name` property that provides the display name
 * for the service type.
 * 	* `appointmentDetails`: This is an object that contains the appointment details,
 * including the start date, end date (only if caregiving is selected), and payment
 * medium. It is passed as a prop to the `form` component.
 * 	* `KHaltiLogo` and `CashLogo`: These are images that are used in the form inputs
 * for the payment medium options. They are passed as props to the `form` component.
 * 
 * 	Overall, the output of the `AppointmentPage` function is a form-based component
 * that allows users to book an appointment for caregiving services. It retrieves
 * appointment details and provides payment medium options to the user for selection.
 */

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

  /**
   * @description Generates high-quality documentation for code given to it, without
   * repeating the question or using any personal statements, and limits its responses
   * to less than 100 words. It takes in data containing a product ID, name, URL, and
   * transaction UUID, and uses this information to configure an instance of the
   * `KhaltiCheckout` class. The instance is then used to initiate a payment verification
   * process using Khalti's API.
   * 
   * @param { object } data - object containing information about the product, transaction
   * UUID, and other parameters required to initiate verification via Merchant API.
   * 
   * @returns { object } a configured `KhaltiCheckout` instance that initiates verification
   * of a payment request.
   */

  const intializKhaltiWeb = (data) => {
    const { product_id, product_name, product_url, transaction_uuid } = data;
    let config = {
      // replace this key with yours
      publicKey: "test_public_key_f1fe71fff3ad4f50aaf6ee0f507546b2",
      productIdentity: product_id || "testing",
      productName: product_name || "testing",
      productUrl: product_url,
      eventHandler: {
        /**
         * @description Initiates a verification process with a merchant API using the provided
         * token and transaction UUID, and sets `bookingSuccess` and `paymentLoading` variables
         * to reflect the outcome.
         * 
         * @param { object } payload - payload of an HTTP request generated by the
         * `hitMerchantApi()` function, containing information related to the payment
         * verification process.
         * 
         * @returns { object } a JSON response indicating whether the payment was successful
         * or not.
         */
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
        /**
         * @description Captures and logs errors occurred during execution, providing a
         * centralized location for handling unexpected conditions.
         * 
         * @param { object } error - error object passed from the caller, which can contain
         * information about the specific error that occurred during execution.
         */
        onError(error) {
          // handle errors
          console.log(error);
        },
        /**
         * @description Logs a message to the console when the widget is closing.
         */
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

  /**
   * @description Prevents the form from submitting and instead performs an asynchronous
   * booking operation using `bookAppointment` function. If successful, it validates
   * the response and updates the UI. Otherwise, it handles errors and displays them
   * on the toast notification.
   * 
   * @param { Event. } e - event object, which provides additional information about
   * the button click, including the current state of the form and any other relevant
   * details.
   * 
   * 	* `preventDefault()`: Prevents the default form submission behavior to avoid
   * navigating away from the current page.
   * 	* `try...catch`: Used for handling potential errors that may occur during the
   * booking process. The `catch` block is executed if any error occurs, which includes
   * displaying an error message to the user.
   * 
   * @returns { array } a JSON object containing the booking details or an error message
   * if there is any.
   */
  
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

  /**
   * @description Updates appointment detail's properties with event-related changes.
   * It checks if the service is "labservices" and the input name is "start_date", then
   * updates "end_date" property as well.
   * 
   * @param { object } event - value of a form field, specifically the `start_date`,
   * and is used to update the `appointmentDetail` object with the corresponding field
   * value.
   */
  
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


  /**
   * @description Takes a `defaultAppointment` object and returns a pre-defined message
   * for the user based on their appointment details, with the service type taken into
   * account.
   * 
   * @returns { string } a personalized message for an appointment, containing the
   * user's name and specialty or service type.
   */

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

      /**
       * @description Displays a message confirming the successful booking of an appointment
       * and providing the booked service details and appointment date.
       * 
       * @param { string } title - header title for the Modal box that displays a message
       * indicating that an appointment has been booked successfully.
       * 
       * @param { image URL. } imgSrc - URL or path of an image file used to display the
       * booking logo.
       * 
       * 	* `title`: A string containing the title of the modal, which is "Appointment
       * Booked Successfully!" in this case.
       * 	* `imgSrc`: An object containing the source of an image, with the following properties:
       * 		+ `src`: A string representing the URL or path to the image. In this case, it
       * points to a logo image named "BookingLogo".
       * 		+ `alt`: An optional string representing the alternative text for the image,
       * which is not provided in this case.
       * 
       * @param { string } message - message that is displayed to the user upon successful
       * booking of an appointment.
       * 
       * @param { boolean } showModal - state of the modal, with `true` indicating that the
       * modal is currently shown and `false` representing when it is hidden.
       * 
       * @param { (`arrow function expression`) } handleClose - function to be executed
       * when the user closes the booking success modal.
       * 
       * 	* `showModal`: This is a prop that controls whether the modal should be displayed
       * or not. It is passed as an event handler to the `handleClose` function.
       * 	* `handleClose`: This is a function that is called when the user closes the modal.
       * It updates the `bookingSuccess` state variable to `false`.
       */

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

              /**
               * @description Is used to render a dropdown menu with options representing different
               * services that can be booked through an appointment system, and provide information
               * on each service type upon selection.
               * 
               * @param { string } className - `class name` of the `select` element and is used to
               * set the class name of the element.
               * 
               * @param { string } name - `aria-label` attribute for the `select` element and sets
               * its label to "Select Services".
               * 
               * @param { string } aria-label - accessible label for the `select` element, indicating
               * to assistive technologies such as screen readers what the user can expect to see
               * or select when interacting with the dropdown menu.
               * 
               * @param { `EventHandler`. } onChange - event triggered when the user selects an
               * option from the dropdown menu, and it invokes the function handleOnChange with the
               * selected service value as its argument.
               * 
               * 	* `handleOnChange`: The handleOnChange property is a function that handles changes
               * to the selection made in the select field. It receives the new selected value as
               * an argument and can perform any necessary actions based on the change.
               * 
               * @param { string } value - default service selected by the user.
               * 
               * @param { string } placeholder - default value of the select element, displayed
               * when no selection is made by the user.
               */

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

              /**
               * @description Adds an image of the Khaliti logo and a span label when clicked will
               * update appointment detail by setting payment_medium to khalti
               * 
               * @param { string } className - class name of an element that can be activated or
               * deactivated using the `onClick` function.
               * 
               * @param { string } role - presentation state of the `div` element and is used to
               * set its role value as either "presentation" or "button".
               * 
               * @param { anonymous function. } onClick - payment medium Khalti when the button is
               * clicked.
               * 
               * 	* `role`: Defines the role of the element, which is set to `presentation` in this
               * case.
               * 	* `className`: Defines the class name(s) applied to the element. For the given
               * code snippet, the className includes the string `"form-check"` and an optional
               * string `"ml-5"`.
               * 	* `onClick`: Defines the function executed when the element is clicked. In this
               * case, it updates the `appointmentDetail` object by changing the `payment_medium`
               * property to `KHALTI`.
               */
               
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

              /**
               * @description Allows users to switch between payment methods, including cash, by
               * clicking on the associated logo or text label. When the cash option is selected,
               * the `payment_medium` property in the `appointmentDetail` object is set to "Cash".
               * 
               * @param { string } className - class name to assign to an element when the function
               * is called, specifically adding or removing the class "active" depending on the
               * value of the `payment_medium` property.
               * 
               * @param { string } role - payment medium as an activation switch for a presentation
               * state, and when clicked sets the `payment_medium` property of the `appointmentDetail`
               * object to "Cash".
               * 
               * @param { `Function`. } onClick - payment medium for the appointment as cash when
               * clicked, updating the `payment_medium` property of the `appointmentDetail` state
               * with the value "Cash".
               * 
               * 	`role`: This attribute sets the role of the button to "presentation". It specifies
               * the button's purpose and ensures that assistive technologies can interpret its
               * intent properly.
               * 
               * 	`onClick`: This event is triggered when the user clicks on the button. When called,
               * it updates the `appointmentDetail` object with a new payment medium value of "Cash".
               * The `setAppointmentDetail()` function is used for this purpose.
               */

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
