import React, { useContext } from "react";
import "./FormStyle.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../context/LoaderContext";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";
import { login } from "../config/API_config";
import ModalContainer from "./ModalContainer";
import Error from "./Error";
import { ErrorContext } from "../context/ErrorContextProvider";
export default function LoginForm() {
  const loaderContext = useContext(LoaderContext);
  const authContext = useContext(AuthContext);
  const errorContext = useContext(ErrorContext);
  const navigation = useNavigate();
  const Schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "email must be a valid email"
      )
      .required(),
    password: Yup.string().required().min(4),
  });

  const handleLogin = (values) => {
    console.log(values);
    loaderContext.setLoader("Login", true);
    const { email, password } = values;
    axios(login(values))
      .then((r) => {
        loaderContext.setLoader("", false);
        const accessToken = r.data.accessToken;
        const refreshToken = r.data.refreshToken;
        const userData = { name: r.data.name };

        authContext.setValues(accessToken, refreshToken, userData);
        navigation("/home");
        console.log(r.data);
      })
      .catch((e) => {
        console.log(e);
        loaderContext.setLoader("", false);
        errorContext.setError(e.response.data, true);
      });
  };

  const handleRouteToSignUp = () => {
    navigation("/signup");
  };
  return (
    <FormContainer>
      <Formik
        validationSchema={Schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleSubmit, values, errors }) => {
          return (
            <form className="login">
              Login
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
              <Button onClick={handleSubmit} label={"Log In"} />
              <Button onClick={handleRouteToSignUp} label={"Sign Up"} />
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
