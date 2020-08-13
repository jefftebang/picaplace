import React, { useState, Fragment, useContext } from "react";
import "./Auth.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import CardCatalog from "../../global/components/front-end-comps/CardCatalog";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorNotice from "../../global/components/front-end-comps/ErrorNotice";
import UserContext from "../../global/context/UserContext";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    // login
    try {
      const loginUser = { email, password };
      const loginRes = await axios.post(
        "http://localhost:5001/api/users/login",
        loginUser
      );

      await sessionStorage.setItem("creator", loginRes.data.user.id);
      await sessionStorage.setItem("token", loginRes.data.token);
      await sessionStorage.setItem("name", loginRes.data.user.name);
      window.location.replace("/users");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <Fragment>
      <CardCatalog className="log-form">
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <form className="needs-validation" onSubmit={loginSubmitHandler}>
                <p className="h5 mb-5 text-center">Login</p>
                {error && (
                  <ErrorNotice
                    message={error}
                    clearError={() => setError(undefined)}
                    className="text-center"
                  />
                )}
                <div className="grey-text">
                  <MDBInput
                    id="email"
                    label="Email"
                    group
                    icon="envelope"
                    type="email"
                    required
                    error="wrong"
                    success="right"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MDBInput
                    id="password"
                    label="Password"
                    icon="lock"
                    group
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="text-center">
                  <MDBBtn type="submit" className="rounded-0" color="elegant">
                    LOGIN
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </CardCatalog>
      <CardCatalog className="log-form log2">
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </CardCatalog>
    </Fragment>
  );
};

export default Login;
