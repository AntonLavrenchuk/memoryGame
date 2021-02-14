import React, { useState } from "react";

var users = JSON.parse(localStorage.getItem("users")) || [];

const passwordHash = require("password-hash");

export default function Register() {
  const [newUser, changeUser] = useState({});
  const [confirm, changeConfirm] = useState("");

  const addUser = function(e) {
    e.preventDefault();

    if (passwordHash.verify(confirm, newUser.password)) {
      hashPasword();

      users = [...users, newUser];
      localStorage.setItem("users", JSON.stringify(users));
      console.log("Success");
    } else {
      console.log("Fail");
    }
  };

  const hashPasword = function() {
    changeUser({
      ...newUser,
      password: passwordHash.generate(newUser.password)
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    changeUser({ ...newUser, [name]: value });
  };

  const handleChangePassword = ({ target: { value } }) => {
    changeUser({
      ...newUser,
      password: passwordHash.generate(value)
    });
  };

  const handleChangeConfirm = ({ target: { value } }) => {
    changeConfirm(value);
  };

  return (
    <>
      <p>Register</p>

      <form onSubmit={addUser}>
        <input
          type="email"
          onChange={handleChange}
          name="email"
          placeholder="Email"
        />
        <input
          type="password"
          onChange={handleChangePassword}
          name="password"
          placeholder="Password"
        />
        <input
          type="password"
          onChange={handleChangeConfirm}
          name="confirm"
          placeholder="Confirm password"
        />

        <button>Register</button>
      </form>
    </>
  );
}
