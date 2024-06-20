/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
// import { registerUser } from "../../services/http-request";
import { useNavigate } from "react-router-dom";
import LoginCardView from "../../components/LoginCardView";
import {
  forgotPasswordEmail,
  forgotPasswordReset,
} from "../../services/http-request";
import { toast } from "react-toastify";
import { validateResponse } from "../../utils/validateResponse";

const INITIAL_VALUE = {
  email: "",
};

const INITIAL_RESET_PASSWORD = {
  otp: "",
  new_password: "",
  confirm_password: "",
};

/**
 * @description Generates high-quality documentation for code given to it and:
 * 
 * * Handles form submissions for forgot password email or OTP resetting.
 * * Validates responses from API calls.
 * 
 * @returns { HTMLDivElement } a login card view with form fields for email or OTP,
 * and buttons for submitting the form.
 * 
 * 	* `const navigate = useNavigate();`: This line defines a `navigate` variable that
 * is assigned the `useNavigate()` function from the React Navigation library. This
 * allows for easier navigation between pages in the application.
 * 	* `const [loading, setLoading] = useState({ ...loading, otpSent: false, resetPassword:
 * false });`: This line defines a state variable called `loading` that is initialized
 * to an empty object with two properties: `otpSent` and `resetPassword`. These
 * properties are initially set to `false`.
 * 	* `const [formValue, setFormValue] = useState(INITIAL_VALUE);`: This line defines
 * a state variable called `formValue` that is initialized to the value of `INITIAL_VALUE`.
 * 	* `const [resetFormValue, setResetForm] = useState(INITIAL_RESET_PASSWORD);`:
 * This line defines a state variable called `resetFormValue` that is initialized to
 * the value of `INITIAL_RESET_PASSWORD`.
 * 	* `const sentOTP = useRef(false);`: This line defines a reference variable called
 * `sentOTP` that is initially set to `false`.
 * 	* `const onSubmitEmailHandler = async (e) => { ... }`: This line defines a function
 * called `onSubmitEmailHandler` that takes an event object as its parameter and
 * performs an asynchronous action when the email submission button is clicked.
 * 	* `const onSubmitChangePasswordHandler = async (e) => { ... }`: This line defines
 * a function called `onSubmitChangePasswordHandler` that takes an event object as
 * its parameter and performs an asynchronous action when the change password button
 * is clicked.
 * 
 * 	In summary, the `ForgotPasswordPage` function returns an output with various state
 * variables, functions, and references defined in it, which are used to handle user
 * input and navigate between pages in the application.
 */
const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    otpSent: false,
    resetPassword: false,
  });
  const [formValue, setFormValue] = useState(INITIAL_VALUE);
  const [resetFormValue, setResetForm] = useState(INITIAL_RESET_PASSWORD);
  const [sentOTP, setOTPSent] = useState(false);

  /**
   * @description Sets form values by setting a value to a part of the larger `formValue`.
   * 
   * @param { object } event - Event object that triggered the function, providing
   * access to the Event's target property, which contains the current form element
   * being focused or changed.
   */
  const handleOnChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  /**
   * @description Updates the `resetForm` object by adding the value of the currently
   * changed input field to its existing value for that field, and also provides the
   * current name of the field as a second property in the updated object.
   * 
   * @param { object } event - event that triggered the function and provides the
   * relevant data, such as the form name and value, to update the `resetForm` state.
   */
  const handleOnChangeReset = (event) => {
    setResetForm({
      ...resetFormValue,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * @description Sends a password reset email when the form is submitted and validates
   * the response from the API.
   * 
   * @param { event. } e - Event object, which is used to prevent the default form
   * submission behavior when the forgot password button is clicked.
   * 
   * 	* `preventDefault()` - prevents the default behavior of the form submission, which
   * is usually to send the form data to the server.
   * 	* `setLoading({ ...loading, otpSent: true })` - updates the `loading` object with
   * the `otpSent` property set to `true`. This indicates that the email was sent
   * successfully and the user should be directed to the next step in the password
   * recovery process.
   * 	* `try { ... } catch (error) { ... }` - this block of code is a try-catch block
   * that executes the code inside it if no errors occur, and catches any errors that
   * may arise during its execution. The code inside the try block sends an email to
   * the user's registered email address using the `forgotPasswordEmail` function.
   * 	* `forgotPasswordEmail(formValue)` - this function takes in the `formValue` object
   * as input and sends an email to the user's registered email address with a password
   * recovery link.
   * 	* `validateResponse(res)` - this function checks the response from the server for
   * any errors or warnings, and handles them accordingly. It is called after the
   * `forgotPasswordEmail` function completes successfully.
   * 	* `.then(function (res) { ... })` - this chain of functions is used to handle the
   * response from the `forgotPasswordEmail` function once it is received. The function
   * inside this chain is called with the response as its input.
   * 	* `.then(function (data) { ... })` - this function is called with the response
   * data as its input, and processes it accordingly. In this case, it checks if any
   * errors or warnings were returned in the response, and handles them if necessary.
   * 	* `if (data.message) { ... }` - this line of code checks if an error or warning
   * message was returned in the response, and handles it if necessary. If an error was
   * returned, the user is notified through the toast notification system, and the form
   * values are reset to their initial state.
   * 	* `setFormValue(INITIAL_VALUE)` - updates the `formValue` object with its initial
   * value. This resets the form fields to their initial state in case an error occurred
   * during email sending.
   * 	* `setOTPSent(true)` - sets a flag to indicate that the email was sent successfully
   * and the user should be directed to the next step in the password recovery process.
   * 
   * @returns { JSON-typed response } a promise that resolves with an HTTP response
   * object containing the response data.
   * 
   * 	* `res`: An instance of the `Response` object, which contains information about
   * the server's response to the request.
   * 	* `data`: The JSON data returned by the server, containing the response message
   * or error.
   * 	* `message`: A string representation of the response message, which can be either
   * a success message or an error message.
   * 
   * 	In the `then` clauses, these properties are handled accordingly:
   * 
   * 	* In the first `then` clause, the `res` property is used to validate the response
   * and extract any relevant data from it. If the response is successful, the `data`
   * property is accessed and its contents are processed further.
   * 	* In the second `then` clause, the `message` property is extracted directly from
   * the `res` object and handled appropriately (either displayed as a toast message
   * or stored in the form value).
   * 
   * 	Overall, the `onSubmitEmailHandler` function is responsible for handling the
   * submission of an email form by validating the input, sending an OTP, and displaying
   * the response message or error to the user.
   */
  const onSubmitEmailHandler = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, otpSent: true });
    try {
      forgotPasswordEmail(formValue)
        .then(function (res) {
          validateResponse(res);
          return res.json();
        })
        .then(function (data) {
          if (data.message) {
            setLoading({ ...loading, otpSent: false });
            toast.success(JSON.stringify(data.message));
            setFormValue(INITIAL_VALUE);
            setOTPSent(true);
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
   * @description Prevents the default form submission behavior, sets a state variable
   * for password reset, and makes an API call to the forgot password endpoint with the
   * updated password details. It then handles the response from the API call, either
   * displaying a success message or an error message depending on the result.
   * 
   * @param { event. } e - Event object generated by the button's onSubmit event, and
   * it is used to prevent the default form submission behavior.
   * 
   * 	* `preventDefault()` - Stops the default behavior of the form submission.
   * 	* `setLoading({ ...loading, resetPassword: true })` - Updates the `loading` state
   * to indicate that the password is being reset.
   * 	* `try...catch` block - Executes the code inside the `try` block if the
   * `forgotPasswordReset()` call is successful, and catches any errors that may occur
   * during the execution.
   * 	* `forgotPasswordReset(resetFormValue)` - Calls the `forgotPasswordReset()`
   * function with the `resetFormValue` argument, which contains the password reset
   * information from the form submission.
   * 	* `validateResponse(res)` - Validates the response returned by the `forgotPasswordReset()`
   * function.
   * 	* `setLoading({ ...loading, resetPassword: false })` - Updates the `loading` state
   * to indicate that the password reset is complete.
   * 	* `toast.success()` - Displays a success toast message with the message "Your new
   * password is updated. Please login with new credentials.".
   * 
   * @returns { object } a JSON response indicating whether the password reset was
   * successful or not.
   */
  const onSubmitChangePasswordHandler = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, resetPassword: true });
    try {
      forgotPasswordReset(resetFormValue)
        .then(function (res) {
          validateResponse(res);
          return res.json();
        })
        .then(function (data) {
          if (data.message) {
            setLoading({ ...loading, resetPassword: false });
            toast.success("Your new password is updated. Please login with new credentials.");
            setResetForm(INITIAL_RESET_PASSWORD);
            setOTPSent(false);
            navigate("/login");
          } else {
            toast.error(JSON.stringify(data));
          }
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error(JSON.stringify(error));
    }
  };

  return (
    <LoginCardView title="Forgot Password" subTitle="">
      {sentOTP ? (
        <form onSubmit={onSubmitChangePasswordHandler}>
          <div className="col-12 mb-3">
            <label className="form-label">Enter OTP</label>
            <input
              type="text"
              name="otp"
              maxLength="50"
              value={resetFormValue.otp}
              autoComplete="false"
              className="form-control form-control-lg"
              placeholder="Enter the OTP sent in your mail"
              onChange={handleOnChangeReset}
              required
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Enter New Password</label>
            <input
              type="password"
              name="new_password"
              maxLength="50"
              autoComplete="false"
              value={resetFormValue.new_password}
              className="form-control form-control-lg"
              placeholder="Enter New Password"
              onChange={handleOnChangeReset}
              required
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Enter Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={resetFormValue.confirm_password}
              maxLength="50"
              autoComplete="false"
              className="form-control form-control-lg"
              placeholder="Enter Confirm Password"
              onChange={handleOnChangeReset}
              required
            />
          </div>
          <button
            className="btn btn-primary btn-lg w-100 mt-2"
            type="submit"
            disabled={loading.resetPassword}
          >
            {loading.resetPassword ? (
              <div className="spinner-border text-light" role="status" />
            ) : (
              ""
            )}{" "}
            Update Password
          </button>
        </form>
      ) : (
        <form onSubmit={onSubmitEmailHandler}>
          <div className="col-12 mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              name="email"
              maxLength="50"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              onChange={handleOnChange}
              required
            />
          </div>
          <button
            className="btn btn-primary btn-lg w-100 mt-2"
            type="submit"
            disabled={loading.otpSent}
          >
            {loading.otpSent ? (
              <div className="spinner-border text-light" role="status" />
            ) : (
              ""
            )}{" "}
            Send OTP
          </button>
        </form>
      )}

      <span className="py-3 dashboard-container__introduction__already_account_text">
        <>
          {" "}
          Login with another account! <a href="/login">Login here</a>{" "}
        </>
      </span>
    </LoginCardView>
  );
};

export default ForgotPasswordPage;
