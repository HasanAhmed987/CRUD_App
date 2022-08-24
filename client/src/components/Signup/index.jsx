import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [input] = useState([
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      values: values.firstName,
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      values: values.lastName,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      values: values.email,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      values: values.password,
    },
  ]);

  const setData = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;

    setValues((val) => {
      return {
        ...val,
        [name]: value,
      };
    });
  };

  const nameRegex = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+[.][A-Za-z]{2,}$/;

  const registerData = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = values;

    if (!firstName) {
      alert("First Name is missing");
    } else if (!nameRegex.test(firstName)) {
      alert("Please enter a valid first name");
    } else if (firstName.length < 5 || firstName.length > 50) {
      alert("The length of name should be between 3 and 50");
    } else if (!lastName) {
      alert("First Name is missing");
    } else if (!nameRegex.test(lastName)) {
      alert("Please enter a valid last name");
    } else if (lastName.length < 5 || lastName.length > 50) {
      alert("The length of name should be between 3 and 50");
    } else if (!email) {
      alert("Email is required");
    } else if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
    } else if (!password) {
      alert("Password is required");
    } else {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 401) {
        alert(data.message)
      } else {
        navigate("/");
        console.log("Sign Up successful");
      }
    }
  };

  return (
    <div className="signup-form">
      <form className="form-inner">
        <div className="form-input">
          {input.map((item, index) => (
            <div
              key={index.toString()}
              className="mb-3 col-lg-6 col-md-6 col-12"
            >
              <input
                type={item.type}
                className="form-control"
                name={item.name}
                placeholder={item.label}
                onChange={setData}
                // value={item.values}
              />
            </div>
          ))}
        </div>
        <button type="submit" className="login-button" onClick={registerData}>
          Sign Up
        </button>
        <div className="link">
          <Link to="/">Have an account already? Click here to login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
