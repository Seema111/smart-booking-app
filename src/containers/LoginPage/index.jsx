/* eslint-disable react/no-unescaped-entities */
import "./style.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/http-request";
import { toast } from "react-toastify";
import LoginCardView from "../../components/LoginCardView";
import { getCookie, setCookie } from "../../utils/setCookie";

const INITIAL_VALUE = {
  username: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState(INITIAL_VALUE);
  const token = getCookie("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleOnChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      loginUser(formValue)
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          if (data.token) {
            setCookie("token", data.token, 15);
            setCookie("username", data.username, 15);
            toast.success("User LoggedIn Successfully!");
            navigate("/");
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
    <LoginCardView
      title="Login Page"
      subTitle="Welcome to Homecare Login Page. Please enter your details to
                  sign in to your account!"
    >
      <div className="d-flex justify-content-end">
        <span className="py-3 dashboard-container__introduction__already_account_text">
          Don't have an account? <a href="/register">Register here</a>
        </span>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control form-control-lg"
            placeholder="Enter your username"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control form-control-lg"
            id="passwordInput"
            onChange={handleOnChange}
            placeholder="Enter Password"
            required
          />
        </div>
        <input
          className="btn btn-primary btn-lg w-100 mt-2"
          type="submit"
          value="Sign In"
        />
      </form>
      <span className="py-3 dashboard-container__introduction__already_account_text">
        <a href="/forgot-password"> Forgot Password?</a>
      </span>
    </LoginCardView>
  );
};

export default LoginPage;
