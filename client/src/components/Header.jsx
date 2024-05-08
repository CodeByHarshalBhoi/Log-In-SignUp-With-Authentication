import { useContext, useState } from "react";
import "./header.css";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "./ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const gotoDashboard = () => {
    navigate("/dashboard");
  };

  const gotoError = () => {
    navigate("*");
  };

  const logoutUser = async () => {
    let token = localStorage.getItem("userdatatoken");

    console.log(token);

    const res = await fetch("http://localhost:3000/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 201) {
      console.log("User logout");
      localStorage.removeItem("userdatatoken");
      console.log("logout")
      setLoginData(false);
      navigate("/");
    } else {
      console.log("Error");
    
    }
  };

  const { loginData, setLoginData } = useContext(LoginContext);
  console.log(loginData);

  return (
    <>
      <header>
        <nav>
          <h1>HB CLOUD</h1>
          <div className="avatar">
            {loginData.validUserone ? (
              <Avatar
                style={{
                  backgroundColor: "salmon",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
                onClick={handleClick}
              >
                {loginData.validUserone.fname[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                style={{ backgroundColor: "blue" }}
                onClick={handleClick}
              />
            )}
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {loginData.validUserone
              ? [
                  // eslint-disable-next-line react/jsx-key
                  <MenuItem onClick={gotoDashboard}>Profile</MenuItem>,
                  // eslint-disable-next-line react/jsx-key
                  <MenuItem
                    onClick={() => {
                      logoutUser();
                      handleClose();
                    }}
                  >
                    Logout
                  </MenuItem>,
                ]
              : [
                  // eslint-disable-next-line react/jsx-key
                  <MenuItem
                    onClick={() => {
                      gotoError();
                      handleClose();
                    }}
                  >
                    Profile
                  </MenuItem>,
                ]}
          </Menu>
        </nav>
      </header>
    </>
  );
}
