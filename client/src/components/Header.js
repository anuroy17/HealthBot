import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "./ContextProvider/Context";
import "./header.css";
import logo from "./logo.gif";

const Header = () => {
  const { logindata, setLoginData } = useContext(LoginContext);

  return (
    <>
      <header>
        <nav>
          <div className="healthbot">
            <img className="logo" src={logo} alt="logo" />
            <h1>HealthBot</h1>
          </div>

          <div className="avtar">
            {logindata.ValidUserOne ? (
              <>
                <div className="username">
                  <h4>{logindata.ValidUserOne.fname}</h4>
                </div>

                <Avatar style={{ background: "#89CFAD" }}>
                  {logindata.ValidUserOne.fname[0].toUpperCase()}
                </Avatar>
              </>
            ) : (
              <Avatar style={{ background: "#89CFAD" }} />
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
