import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Nav() {
  const [user, setUser] = useState({
    firstName: "",
  });

  const handleLogout = async () => {
    await axios.post("logout");
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get("user");
        setUser({
          firstName: data.first_name,
        });
      } catch (e) {
        console.error(e);
      }
    };

    getUser();
  }, []);

  return (
    <nav
      className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
      data-bs-theme="dark"
    >
      <a
        className="navbar-brand col-md-3 col-lg-2 mr-0 px-3 text-decoration-none"
        href="#"
      >
        Company name
      </a>
      <ul className="my-2 my-md-0 mr-md-3">
        <Link className="p-2 text-white text-decoration-none" to="/profile">
          {user.firstName}
        </Link>
        <Link
          className="p-2 text-white text-decoration-none"
          to="/login"
          onClick={handleLogout}
        >
          Sign out
        </Link>
      </ul>
    </nav>
  );
}
