import axios from "axios";
import { SyntheticEvent, useCallback, useState } from "react";
import { Navigate } from "react-router-dom";
import "../../src/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      try {
        await axios.post(
          "http://localhost:8000/api/login",
          {
            email,
            password,
          },
          { withCredentials: true },
        );

        setRedirect(true);
      } catch (e) {
        console.error(e);
      }
    },
    [email, password],
  );

  if (redirect) {
    return <Navigate to="/" />;
  }

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
