import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Menu } from "./Menu";
import { Nav } from "./Nav";

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper(props: WrapperProps) {
  const { children } = props;

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        await axios.get("user");
      } catch (e) {
        setRedirect(true);
      }
    };

    verifyAuthentication();
  }, []);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
