import React, { useContext, useEffect } from "react";
import "./FormStyle.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signUp } from "../config/API_config";
import { AuthContext } from "../context/AuthContextProvider";
import { LoaderContext } from "../context/LoaderContext";
export default function SignUp() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const loaderContext = useContext(LoaderContext);
  const navigation = useNavigate();

  const Schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(4),
    name: Yup.string().required().min(3),
  });
  useEffect(() => {
    if (authContext.values.accessToken) {
      loaderContext.setLoader("Signing in", false);

      navigate("/home");
    }
  }, [authContext.values.accessToken]);
  const handleSignUp = (values) => {
    loaderContext.setLoader("Signing in", true);

    axios(
      signUp({
        name: values.name,
        email: values.email,
        password: values.password,
      })
    )
      .then((r) => {
        const accessToken = r.data.accessToken;
        const refreshtoken = r.data.refreshtoken;
        const userData = {
          name: r.data.name,
          email: r.data.email,
        };
        authContext.setValues(accessToken, refreshtoken, userData);
        // navigate("/home");
        console.log(r.data);
      })
      .catch((e) => {
        loaderContext.setLoader("Signing in", false);

        console.log(JSON.stringify(e));
      });
  };

  const handleRouteToLogin = () => {
    navigation("/");
  };
  return (
    <FormContainer>
      <Formik
        validationSchema={Schema}
        initialValues={{ email: "", password: "", name: "" }}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <form className="login">
              Sign Up
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  value={values.name}
                  onChange={handleChange("name")}
                  type="text"
                  className="login__input"
                  placeholder="Name"
                />
                <div className="error_text">{errors.name}</div>
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  value={values.email}
                  onChange={handleChange("email")}
                  type="text"
                  className="login__input"
                  placeholder=" Email"
                />
                <div className="error_text">{errors.email}</div>
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  value={values.password}
                  onChange={handleChange("password")}
                  type="password"
                  className="login__input"
                  placeholder="Password"
                />
                <div className="error_text">{errors.password}</div>
              </div>
              <Button onClick={handleSubmit} label={"Sign Up"} />
              <Button onClick={handleRouteToLogin} label={"Log In"} />
            </form>
          );
        }}
      </Formik>
    </FormContainer>
  );
}

const FormContainer = ({ children }) => {
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">{children}</div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};
const Button = ({ onClick, label }) => {
  return (
    <button type="submit" onClick={onClick} className="button login__submit">
      <span className="button__text">{label}</span>
      <i className="button__icon fas fa-chevron-right"></i>
    </button>
  );
};
