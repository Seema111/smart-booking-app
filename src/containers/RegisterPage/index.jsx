/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
// import { registerUser } from "../../services/http-request";
import { useNavigate } from "react-router-dom";
import LoginCardView from "../../components/LoginCardView";
import { registerUser } from "../../services/http-request";
import { toast } from "react-toastify";

const INITIAL_VALUE = {
  email: "",
  username: "",
  first_name: "",
  last_name: "",
  password: "",
  password2: "",
  gender: "",
  age: 0,
  phone: "",
  address: "",
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(INITIAL_VALUE);

  const handleOnChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      registerUser(formValue)
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          if (data.message) {
            toast.success(JSON.stringify(data.message));
            setFormValue(INITIAL_VALUE);
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
    <LoginCardView title="User Registration" subTitle="">
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3 d-flex">
          <div className="col-6">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="first_name"
              maxLength="50"
              className="form-control form-control-lg"
              placeholder="Enter your first name"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="col-6 pl-5">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="last_name"
              maxLength="50"
              className="form-control form-control-lg"
              placeholder="Enter your last name"
              onChange={handleOnChange}
              required
            />
          </div>
        </div>
        <div className="mb-3 d-flex">
          <div className="col-6">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              className="form-control form-control-lg"
              id="pageInput"
              onChange={handleOnChange}
              placeholder="Enter Your Age"
            />
          </div>
          <div className="col-6 pl-5">
            <label className="form-label">Gender</label>
            <select
              className="form-select form-select-lg"
              name="gender"
              aria-label="Select Your Gender"
              onChange={handleOnChange}
              placeholder="Select your Gender"
            >
              <option selected>Select Your Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="mb-3 d-flex">
          <div className="col-6">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phone"
              maxLength="14"
              className="form-control form-control-lg"
              id="phoneInput"
              onChange={handleOnChange}
              placeholder="Enter Your Phone Number"
            />
          </div>
          <div className="col-6 pl-5">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              maxLength="50"
              className="form-control form-control-lg"
              placeholder="Enter your address"
              onChange={handleOnChange}
              required
            />
          </div>
        </div>
        <div className="mb-3 d-flex">
          <div className="col-6">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              maxLength="50"
              className="form-control form-control-lg"
              placeholder="Enter username"
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="col-6 pl-5">
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
        </div>
        <div className="mb-3 d-flex">
          <div className="col-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              maxLength="50"
              className="form-control form-control-lg"
              id="passwordInput"
              onChange={handleOnChange}
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="col-6 pl-5">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="password2"
              maxLength="50"
              className="form-control form-control-lg"
              id="password2Input"
              onChange={handleOnChange}
              placeholder="Enter Confirm Password"
              required
            />
          </div>
        </div>
        <input
          className="btn btn-primary btn-lg w-100 mt-2"
          type="submit"
          value="Sign Up"
        />
      </form>
      <span className="py-3 dashboard-container__introduction__already_account_text">
        <>
          {" "}
          Already have an account? <a href="/login">Login here</a>{" "}
        </>
      </span>
    </LoginCardView>
  );
};

export default RegisterPage;
