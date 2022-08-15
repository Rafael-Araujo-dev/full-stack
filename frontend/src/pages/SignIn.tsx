import React, { Suspense, useState, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeProvider";
import { api } from "../api/api";

import { Link } from "react-router-dom";
import { Checkbox } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook, GrTwitter, GrGithub } from "react-icons/gr";
import ContentLoader from "react-content-loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = React.lazy(() => import("../components/Form"));

const Main = styled.main<{ _theme: string }>`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  background-color: ${(props) =>
    props._theme === "Light" ? "#FFF" : "#151515"};
  transition: background 0.2s;

  aside {
    flex: 1;
    background-image: ${(props) =>
      props._theme === "Light"
        ? `url("./bgImage.jpg")`
        : `url("./bgImageDark.jpg")`};
    transition: background-color 0.2s, background-image 0.2s;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    background-color: ${(props) =>
      props._theme === "Light" ? "#EEE" : "#202020"};
    color: #fff;
    @media (max-width: 768px) {
      display: none;
    }
  }

  div.content {
    flex: 1;
    background-color: ${(props) =>
      props._theme === "Light" ? "#FFF" : "#151515"};
    transition-property: background-color;
    transition-duration: 200ms;
    padding: 20px 0;
    overflow: auto;
    margin: auto;

    animation: fadeIn_anim 0.5s;

    h1 {
      font-family: "Roboto", sans-serif;
      font-size: 2.5rem;
      font-weight: 400;
      text-align: center;
      color: ${(props) => (props._theme === "Light" ? "#202020" : "#FFF")};
      transition: color 0.2s;
    }

    form {
      max-width: 500px;
    }
  }

  button.theme-toggle {
    position: absolute;
    right: 5%;
    top: 20px;
    cursor: pointer;
    border: none;
    background: transparent;
    color: ${(props) => (props._theme === "Light" ? "#202020" : "#FFF")};
  }

  .checkbox {
    span:first-of-type {
      background-color: ${(props) =>
        props._theme === "Light" ? "#FFF" : "#101010"};
      color: ${(props) => (props._theme === "Light" ? "#202020" : "#FFF")};
      transition: border 0.2s, background-color 0.2s, color 0.2s;
      width: 20px;
      height: 20px;
      border-radius: 4px;
      border: 1.5px solid
        ${(props) => (props._theme === "Light" ? "#808080" : "#303030")};
    }
  }
`;

function SignIn() {
  const [rememberPassword, setRememberPassword] = useState<boolean>(false);

  const { _theme, themeSwitcher } = useContext(ThemeContext);

  const notify = (
    message: string,
    theme: string,
    type: string,
    callbackOpen?: any,
    callbackClose?: any
  ) => {
    if (type === "success") {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: theme === "Light" ? "colored" : "dark",
        onClose: callbackClose,
      });
    }

    if (type === "error") {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: theme === "Light" ? "colored" : "dark",
        onOpen: callbackOpen,
        onClose: callbackClose,
      });
    }
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.classList.value === "invalid")
      e.target.classList.remove("invalid");

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.clearWaitingQueue();

    let filled = false;

    // Verifica se todos os campos estão preenchidos
    if (!username || !password) {
      notify("All fields need to be filled", _theme, "error", () => {
        for (let i = 0; i < Object.keys(formData).length; i++) {
          if (Object.values(formData)[i] === "") {
            const id = Object.keys(formData)[i];
            const el = document.getElementById(id) as HTMLElement;
            el.classList.add("invalid");
          }
        }
      });
    } else filled = true;

    if (filled) {
      await api({
        method: "POST",
        url: "/users/login",
        data: {
          username: username,
          password: password,
        },
      })
        .then((response) => {
          notify(response.data.message, _theme, "success");
        })
        .catch((err) => {
          notify(err.response.data.message, _theme, "error");
        });
    }

    toast.clearWaitingQueue();
  };

  return (
    <Main _theme={_theme}>
      <ToastContainer limit={1} />
      <aside />
      <div className="content">
        <button className="theme-toggle" onClick={() => themeSwitcher()}>
          {_theme === "Light" ? (
            <FaMoon
              size="1.5rem"
              role="img"
              aria-label="Changes theme to Dark Mode"
            />
          ) : (
            <FaSun
              size="1.5rem"
              role="img"
              aria-label="Changes theme to Light Mode"
            />
          )}
        </button>
        <h1>Sign In</h1>
        <Suspense
          fallback={
            <div
              style={{
                padding: "0 5%",
                maxWidth: 500,
                margin: "auto",
              }}
            >
              <ContentLoader
                height="625"
                width="100%"
                backgroundColor={_theme === "Light" ? "#f6f6ef" : "#202020"}
                foregroundColor={_theme === "Light" ? "#e8e8e3" : "#252525"}
              >
                <rect x="0" y="15" rx="4" ry="4" width="150" height="25" />
                <rect x="0" y="45" rx="4" ry="4" width="100%" height="35" />
                <rect x="0" y="100" rx="4" ry="4" width="150" height="25" />
                <rect x="0" y="130" rx="4" ry="4" width="100%" height="35" />
                <rect x="0" y="185" rx="4" ry="4" width="200" height="30" />
                <rect x="0" y="240" rx="4" ry="4" width="100%" height="35" />
                <rect x="0" y="310" rx="4" ry="4" width="100%" height="2" />
                <rect x="0" y="345" rx="4" ry="4" width="100%" height="35" />
                <rect x="0" y="400" rx="4" ry="4" width="100%" height="35" />
                <rect x="0" y="460" rx="4" ry="4" width="100%" height="35" />
                <rect x="0" y="515" rx="4" ry="4" width="100%" height="35" />
              </ContentLoader>
            </div>
          }
        >
          <Form id="login-form" _theme={_theme}>
            <div className="group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                autoComplete="username"
                onChange={onChangeForm}
              />
            </div>
            <div className="group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={onChangeForm}
                autoComplete="off"
              />
            </div>
            <div>
              <Checkbox
                colorScheme="red"
                className="checkbox"
                isChecked={rememberPassword}
                onChange={() => setRememberPassword(!rememberPassword)}
              >
                Remember Password
              </Checkbox>
            </div>
            <input type="submit" value="Login" onClick={(e) => loginUser(e)} />
            <div>
              <p>
                Don't have an account yet? <Link to="/SignUp">Sign Up</Link>
              </p>
            </div>

            <div className="divider">
              <span />
              or
              <span />
            </div>

            <div>
              <button
                className="btn-google"
                onClick={(e) => e.preventDefault()}
              >
                <FcGoogle
                  size="1.5rem"
                  role="img"
                  aria-label="Authorizes with an Google account"
                />
                Authorize with Google
              </button>
            </div>

            <div>
              <button
                className="btn-facebook"
                onClick={(e) => e.preventDefault()}
              >
                <GrFacebook
                  size="1.5rem"
                  role="img"
                  aria-label="Authorizes with an Facebook account"
                />
                Authorize with Facebook
              </button>
            </div>

            <div>
              <button
                className="btn-twitter"
                onClick={(e) => e.preventDefault()}
              >
                <GrTwitter
                  size="1.5rem"
                  role="img"
                  aria-label="Authorizes with an Twitter account"
                />
                Authorize with Twitter
              </button>
            </div>

            <div>
              <button
                className="btn-github"
                onClick={(e) => e.preventDefault()}
              >
                <GrGithub
                  size="1.5rem"
                  role="img"
                  aria-label="Authorizes with an GitHub account"
                />
                Authorize with GitHub
              </button>
            </div>
          </Form>
        </Suspense>
      </div>
    </Main>
  );
}

export default SignIn;
