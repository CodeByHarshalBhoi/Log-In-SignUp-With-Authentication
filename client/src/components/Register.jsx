import { useState } from "react";
import "./mix.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);
  const navigate = useNavigate();
  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addUserData = async (e) => {
    e.preventDefault();
    const { fname, email, password, cpassword } = inpval;
    if (fname === "") {
      alert("please enter your name");
    } else if (email === "") {
      alert("please enter email");
    } else if (!email.includes("@")) {
      alert("please enter valid email");
    } else if (password === "") {
      alert("please enter passowrd");
    } else if (password.length < 6) {
      alert("password must be 6 char");
    } else if (cpassword === "") {
      alert("please enter confirm password");
    } else if (cpassword.length < 6) {
      alert("confirm password must be 6 char");
    } else if (password !== cpassword) {
      alert("password and confirm password not match");
    } else {
      // console.log("user register succesfully", inpval)
      const data = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          email,
          password,
          cpassword,
        }),
      });
      const res = await data.json();
      console.log(res);
      if (res.status === 201) {
        alert("User registration done");
        setInpval({
          ...inpval,
          fname: "",
          email: "",
          password: "",
          cpassword: "",
        });
        navigate("/");
      }
    }
  };

  return (
    <div>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad thar you will be using Project Cloud to manage <br />{" "}
              your tasks! we hope that you will get like it.
            </p>
          </div>
          <form onSubmit={addUserData}>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="fname"
                id="fname"
                name="fname"
                placeholder="Enter Your Name"
                onChange={setVal}
                value={inpval.fname}
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
                onChange={setVal}
                value={inpval.email}
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={setVal}
                  value={inpval.password}
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="cpassword">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  name="cpassword"
                  id="cpassword"
                  placeholder="Confirm password"
                  onChange={setVal}
                  value={inpval.cpassword}
                />
                <div
                  className="showpass"
                  onClick={() => setCPassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn">Sign Up</button>
            <p>
              Already have an Account? <Link to={"/"}>Login</Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
