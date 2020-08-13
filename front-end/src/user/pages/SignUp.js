import React, { useState, Fragment, useContext } from "react";
import "./Auth.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import CardCatalog from "../../global/components/front-end-comps/CardCatalog";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../global/context/UserContext";
import axios from "axios";
import ErrorNotice from "../../global/components/front-end-comps/ErrorNotice";

const Auth2 = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [error, setError] = useState();
  const history = useHistory();
  const { setUserData } = useContext(UserContext);

  const signupSubmitHandler = async (e) => {
    e.preventDefault();
    // sign up
    try {
      const newUser = {
        name,
        email,
        password,
        passwordCheck,
      };
      await axios.post("http://localhost:5001/api/users/signup", newUser);
      setUserData({
        token: undefined,
        user: undefined,
      });
      history.push("/login");
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
              <form className="needs-validation" onSubmit={signupSubmitHandler}>
                <p className="h5 mb-5 text-center">Sign up</p>
                {error && (
                  <ErrorNotice
                    message={error}
                    clearError={() => setError(undefined)}
                    className="text-center"
                  />
                )}
                <div className="grey-text">
                  <MDBInput
                    id="name"
                    label="Name"
                    group
                    icon="user"
                    type="text"
                    required
                    error="wrong"
                    success="right"
                    onChange={(e) => setName(e.target.value)}
                  />

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

                  <MDBInput
                    id="passwordCheck"
                    label="Confirm Password"
                    icon="lock"
                    group
                    required
                    type="password"
                    onChange={(e) => setPasswordCheck(e.target.value)}
                  />
                </div>

                <MDBCol md="" className="mb-3">
                  <div className="custom-control custom-checkbox pl-3">
                    <input
                      className="custom-control-input"
                      type="checkbox"
                      value=""
                      id="invalidCheck"
                      required
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="invalidCheck"
                    >
                      Agree to terms and conditions
                    </label>
                    <div className="invalid-feedback">
                      You must agree before submitting.
                    </div>
                  </div>
                </MDBCol>

                <div className="text-center">
                  <MDBBtn type="submit" className="rounded-0" color="elegant">
                    SIGN UP
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </CardCatalog>
      <CardCatalog className="log-form log2">
        <p>
          Have an account? <Link to="/login">Login</Link>
        </p>
      </CardCatalog>
    </Fragment>
  );
};

export default Auth2;
