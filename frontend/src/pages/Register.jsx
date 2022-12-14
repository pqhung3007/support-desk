import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    verifiedPassword: "",
  });
  const { name, email, password, verifiedPassword } = formData;

  const { isLoading } = useSelector((state) => state.auth); // state name
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      //? name attribute
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Check password matching */
    if (password !== verifiedPassword) {
      toast.error("Password does not match!");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      /* register user with provided input */
      dispatch(register(userData))
        //? NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
        //? getting a good response from our API or catch the AsyncThunkAction
        //? rejection to show an error message
        .unwrap()
        .then((user) => {
          toast.success(`Registered new user with name ${user.name}`);
          navigate("/");
        })
        .catch(toast.error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Let's create an account</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="passwords"
              name="verifiedPassword"
              value={verifiedPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
