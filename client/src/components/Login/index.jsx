import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

function Login({ setToken }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [input] = useState([
    {
      label: "Email",
      name: "email",
      values: values.email,
    },
    {
      label: "Password",
      name: "password",
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

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+[.][A-Za-z]{2,}$/;

  const login = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    if (!email) {
      alert("Email is required");
    } else if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
    } else if (!password) {
      alert("Password is required");
    } else {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 400 || !data) {
        alert(data.message);
      } else {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/table");
          console.log("Logged in successful");
        } else {
          alert(data.message);
          console.log("Error");
        }
      }
    }
  };

  return (
    <div className="login-form">
      <form className="form-inner">
        <div className="form-input">
          {input.map((item, index) => (
            <div
              key={index.toString()}
              className="mb-3 col-lg-6 col-md-6 col-12"
            >
              <input
                type={item.name}
                className="form-control"
                name={item.name}
                placeholder={item.label}
                onChange={setData}

                // value={item.values}
              />
            </div>
          ))}
        </div>
        <button type="submit" className="login-button" onClick={login}>
          Login
        </button>
        <div className="link">
          <Link to="/signup">
            Don't have an account? Click here to register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
