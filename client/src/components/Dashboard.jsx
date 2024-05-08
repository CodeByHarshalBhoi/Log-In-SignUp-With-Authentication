import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";

export default function Dashboard() {
  const { loginData, setLoginData } = useContext(LoginContext);
  console.log(loginData);
  const navigate = useNavigate();
  
  const dashboardValid = async () => {
    let token = localStorage.getItem("userdatatoken");

    console.log(token);

    const res = await fetch("http://localhost:3000/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.status == 401 || !data) {
      navigate("*");
    } else {
      console.log("User varyfied");
      setLoginData(data);
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    dashboardValid();
  }, []);

  
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="../man.png"
          style={{ width: "200px", marginTop: 20 }}
          alt="manimage"
        />
        <h1>User Email:Harshal@gmail.com</h1>
      </div>
    </>
  );
}
