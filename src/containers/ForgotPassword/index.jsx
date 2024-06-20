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

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    otpSent: false,
    resetPassword: false,
  });
  const [formValue, setFormValue] = useState(INITIAL_VALUE);
  const [resetFormValue, setResetForm] = useState(INITIAL_RESET_PASSWORD);
  const [sentOTP, setOTPSent] = useState(false);

  const handleOnChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const handleOnChangeReset = (event) => {
    setResetForm({
      ...resetFormValue,
      [event.target.name]: event.target.value,
    });
  };

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
