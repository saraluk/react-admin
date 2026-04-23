import axios from "axios";
import React, { useEffect, useState } from "react";

export function Nav() {
  const [user, setUser] = useState({
    firstName: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/user", {
          withCredentials: true,
        });
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
        <a className="p-2 text-white text-decoration-none" href="#">
          {user.firstName}
        </a>
        <a className="p-2 text-white text-decoration-none" href="#">
          Sign out
        </a>
      </ul>
    </nav>
  );
}
