import React, { SyntheticEvent, useCallback, useState } from "react";
import "../../src/Login.css";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      try {
        const response = await axios.post(
          "http://localhost:8000/api/login",
          {
            email,
            password,
          },
          { withCredentials: true },
        );

        console.log(response.data);
      } catch (e) {
        console.error(e);
      }
    },
    [email, password],
  );

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Sign in</h1>
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

        <button className="btn btn-primary w-100 py-2" type="submit">
          Log in
        </button>
      </form>
    </main>
  );
}
