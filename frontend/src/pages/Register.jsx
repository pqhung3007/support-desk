import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    verifiedPassword: "",
  });
  const { name, email, password, verifiedPassword } = formData;

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
      toast.error("Password do not match!");
    }
  };

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
