import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetail, updateUserDetail } from "../../services/http-request";
import { toast } from "react-toastify";
import { getCookie } from "../../utils/setCookie";
import MyImage from "../../assets/images/user.jpg";
import "./style.scss";
import { validateResponse } from "../../utils/validateResponse";

const INITIAL_VALUE = {
  email: "",
  first_name: "",
  last_name: "",
  gender: "",
  age: 0,
  phone: "",
  address: "",
};

const ProfilePage = () => {
  const isUserLoggedIn = getCookie("token");
  const username = getCookie("username");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  });
  const [formValue, setFormValue] = useState(INITIAL_VALUE);

  const handleOnChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      updateUserDetail({ username, body: formValue })
        .then(function (res) {
          validateResponse(res);
          return res.json();
        })
        .then(function (data) {
          if (data) {
            toast.success("Profile is updated successfully!");
          } else {
            toast.error(JSON.stringify(data));
          }
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error(JSON.stringify(error));
    }
  };
  useEffect(() => {
    try {
      getUserDetail(username)
        .then(function (res) {
          validateResponse(res)
          return res.json();
        })
        .then(function (data) {
          if (data) {
            setFormValue({
              email: data.email,
              first_name: data.first_name,
              last_name: data.last_name,
              gender: data.profile.gender,
              age: data.profile.age,
              phone: data.profile.phone,
              address: data.profile.address,
            });
            navigate("/my-account");
          } else {
            toast.error(JSON.stringify(data));
          }
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error(JSON.stringify(error));
    }
  }, []);
  console.log(isUserLoggedIn, "user loggedIn");

  return (
    <div className="row parent-container d-flex justify-content-center align-items-center">
      <div className="col-6 card p-5 m-5">
        <h2>My Account</h2>
        <img
          src={MyImage}
          className="rounded-circle mx-auto d-block mb-3"
          alt="ProfileImage"
          height={200}
          width={200}
        ></img>
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
                value={formValue.first_name}
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
                value={formValue.last_name}
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
                value={formValue.age}
                onChange={handleOnChange}
                placeholder="Enter Your Age"
              />
            </div>
            <div className="col-6 pl-5">
              <label className="form-label">Gender</label>
              <select
                className="form-select form-select-lg"
                name="gender"
                aria-label="Enter Your Gender"
                value={formValue.gender}
                onChange={handleOnChange}
                placeholder="Select your Gender"
              >
                <option selected>Select your Gender</option>
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
                value={formValue.phone}
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
                value={formValue.address}
                className="form-control form-control-lg"
                placeholder="Enter your address"
                onChange={handleOnChange}
                required
              />
            </div>
          </div>
          <div className="mb-3 d-flex">
            <div className="col-12">
              <label className="form-label">Email</label>
              <input
                type="text"
                name="email"
                maxLength="50"
                value={formValue.email}
                className="form-control form-control-lg"
                placeholder="Enter your email"
                onChange={handleOnChange}
                required
              />
            </div>
          </div>
          <input
            className="btn btn-primary btn-lg w-100 mt-2"
            type="submit"
            value="Update Profile"
          />
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
