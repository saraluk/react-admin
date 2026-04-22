import React, { SyntheticEvent, useCallback, useState } from "react";
import "../../src/Login.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      console.log({
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
      });
    },
    [email, firstName, lastName, password, passwordConfirm],
  );

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please register</h1>
        <input
          className="form-control"
          placeholder="First Name"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="email"
          className="form-control"
          placeholder="Last Name"
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password Confirm"
          required
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button className="btn btn-primary w-100 py-2" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
