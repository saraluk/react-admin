import React from "react";
import { Nav } from "./Nav";
import { Menu } from "./Menu";

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper(props: WrapperProps) {
  const { children } = props;

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
