import axios from "axios";
import { SyntheticEvent, useCallback, useState } from "react";
import { Navigate } from "react-router-dom";
import "../../src/Login.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      try {
        await axios.post("register", {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          password_confirm: passwordConfirm,
        });

        setRedirect(true);
      } catch (e) {
        console.error(e);
      }
    },
    [email, firstName, lastName, password, passwordConfirm],
  );

  if (redirect) {
    return <Navigate to="/login" />;
  }

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
