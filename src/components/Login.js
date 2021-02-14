import React, { useState } from "react";

var users = JSON.parse(localStorage.getItem("users")) || [];

const passwordHash = require("password-hash");

export default function Login() {
  const [user, changeUser] = useState({});

  const logIn = function(e) {
    e.preventDefault();

    for (let el of users) {
      console.log(el);
      if (passwordHash.verify(user.password, el.password)) {
        localStorage.setItem("currentUser", JSON.stringify(el));
        console.log("Success");
        return;
      }
    }
    console.log("Fail");
  };

  const handleChange = ({ target: { name, value } }) => {
    changeUser({ ...user, [name]: value });
  };

  return (
    <>
      <p>Login</p>

      <form onSubmit={logIn}>
        <input
          type="email"
          onChange={handleChange}
          name="email"
          placeholder="Email"
        />
        <input
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="Password"
        />
        <button>Login</button>
      </form>
    </>
  );
}
