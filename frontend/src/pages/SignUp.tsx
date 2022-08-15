import React, { Suspense, useState, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/ThemeProvider";
import { api } from "../api/api";

import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
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

function SignUp() {
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
    email: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, birthdate, password, confirmPassword } = formData;

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.classList.value === "invalid")
      e.target.classList.remove("invalid");

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const setMaxBirthdate = () => new Date().toISOString().split("T")[0];

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.clearWaitingQueue();
    const btn = e.target as HTMLInputElement;
    btn.disabled = true;
    setTimeout(() => (btn.disabled = false), 3000);

    let validated = {
      fields: false,
      username: false,
      email: false,
      birthdate: false,
      password: false,
      confirmPassword: false,
    };

    // Verifica se todos os campos estão preenchidos
    if (!username || !email || !birthdate || !password || !confirmPassword) {
      notify("All fields need to be filled", _theme, "error", () => {
        for (let i = 0; i < Object.keys(formData).length; i++) {
          if (Object.values(formData)[i] === "") {
            const id = Object.keys(formData)[i];
            const el = document.getElementById(id) as HTMLElement;
            el.classList.add("invalid");
          }
        }
      });
    } else validated.fields = true;

    if (validated.fields) {
      // Verifica se o nome de usuário possui ao menos 4 letras
      if (username.replace(/[^a-zA-Z]/g, "").length <= 3) {
        const el = document.getElementById("username") as HTMLElement;
        el?.classList.add("invalid");
        notify("Username must be at least 4 letters long", _theme, "error");
      } else validated.username = true;

      // Verifica se é um email válido
      const mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(mailformat)) {
        const el = document.getElementById("email") as HTMLElement;
        el?.classList.add("invalid");
        notify("Please, type a valid email", _theme, "error");
      } else validated.email = true;

      // Verifica se a idade é menor que 13 anos
      const today = new Date();
      const birth = new Date(birthdate);
      let age = today.getFullYear() - birth.getFullYear();
      if (today.getMonth() < birth.getMonth()) age--;
      if (age < 13) {
        const el = document.getElementById("birthdate") as HTMLElement;
        el?.classList.add("invalid");
        notify("You must be at least 13 years old", _theme, "error");
      } else validated.birthdate = true;

      // Valida a senha
      const passFormat =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;

      if (!passFormat.test(password)) {
        const el = document.getElementById("password") as HTMLElement;
        el?.classList.add("invalid");
        notify("Please enter a valid password", _theme, "error");
      } else validated.password = true;

      // Verifica se a senha e confirmação de senha estão iguais
      if (password !== confirmPassword) {
        const el = document.getElementById("confirmPassword") as HTMLElement;
        el?.classList.add("invalid");
        notify("Passwords do not match", _theme, "error");
      } else {
        validated.confirmPassword = true;
        const el = document.getElementById("confirmPassword") as HTMLElement;
        el?.classList.remove("invalid");
      }

      if (
        validated.fields &&
        validated.username &&
        validated.email &&
        validated.birthdate &&
        validated.password &&
        validated.confirmPassword
      ) {
        await api({
          method: "POST",
          url: "/users/register",
          data: {
            username: username,
            email: email,
            birthdate: birthdate,
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
    }
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
        <h1>Sign Up</h1>
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
          <Form id="registration-form" _theme={_theme}>
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
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                autoComplete="username"
                onChange={onChangeForm}
              />
            </div>
            <div className="group">
              <label htmlFor="birthdate">Birthdate</label>
              <input
                type="date"
                name="birthdate"
                id="birthdate"
                value={birthdate}
                min="1900-01-01"
                max={setMaxBirthdate()}
                autoComplete="off"
                onChange={onChangeForm}
              />
              <span className="for-rules">
                You must be at least 13 years old
              </span>
            </div>
            <div className="group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                autoComplete="off"
                onChange={onChangeForm}
              />
              <ul className="for-rules">
                <li>8 characters minimum</li>
                <li>1 minimum capital letter</li>
                <li>1 number at least</li>
                <li>1 symbol at least: $*&@#</li>
              </ul>
            </div>
            <div className="group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                autoComplete="off"
                onChange={onChangeForm}
              />
            </div>
            <input
              type="submit"
              value="Register"
              onClick={(e) => registerUser(e)}
            />
            <div>
              <p>
                Already have an account? <Link to="/SignIn">Sign In</Link>
              </p>
            </div>
          </Form>
        </Suspense>
      </div>
    </Main>
  );
}

export default SignUp;
