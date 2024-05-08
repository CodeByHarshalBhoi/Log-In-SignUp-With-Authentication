import { useState } from "react";
import "./mix.css";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [passShow, setPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;
    if (email === "") {
      alert("Enter email");
    } else if (!email.includes("@")) {
      alert("Enter valid email");
    } else if (password === "") {
      alert("Enter password");
    } else if (password.length < 6) {
      alert("Password must be 6 char");
    } else {
      // console.log("User log in successfully!", inpval)
      const data = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const res = await data.json();
      console.log(res);
      if (res.status === 201) {
        alert("User login successfully!");
        localStorage.setItem("userdatatoken", res.result.token);
        navigate("/dashboard");
        setInpval({
          ...inpval,
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please login</p>
          </div>
          <form onSubmit={loginUser}>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
                value={inpval.email}
                onChange={setVal}
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="Enter Your password"
                  value={inpval.password}
                  onChange={setVal}
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn">Login</button>
            <p>
              Don't have an Account? <Link to={"/register"}>Sign Up</Link>{" "}
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
