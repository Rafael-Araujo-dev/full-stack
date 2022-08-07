import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Form from "../components/Form";

import { FaSun, FaMoon } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook, GrTwitter } from "react-icons/gr";

const Main = styled.main<{ theme: string }>`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  background-color: ${(props) =>
    props.theme === "Light" ? "#FFF" : "#151515"};
  /* overflow: auto; */

  transition: background 0.2s;

  & > * {
    flex: 1;
  }

  aside {
    background-image: ${(props) =>
      props.theme === "Light"
        ? `url("./bgImage.jpg")`
        : `url("./bgImageDark.jpg")`};
    transition: background-image 0.2s;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    color: #fff;
    @media (max-width: 768px) {
      display: none;
    }
  }

  div.content {
    background-color: ${(props) =>
      props.theme === "Light" ? "#FFF" : "#151515"};
    transition-property: background-color;
    transition-duration: 200ms;
    /* max-height: 100vh; */
    padding: 20px 0;
    overflow: auto;
    margin: auto;

    h1 {
      font-family: "Roboto", sans-serif;
      font-size: 2.5rem;
      font-weight: 400;
      text-align: center;
      /* margin: 60px 0 0 0; */
      color: ${(props) => (props.theme === "Light" ? "#202020" : "#FFF")};
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
    color: ${(props) => (props.theme === "Light" ? "#202020" : "#FFF")};
  }
`;

function SignIn() {
  const [rememberPassword, setRememberPassword] = useState<boolean>(false);
  const [theme, setTheme] = useState("Light");

  return (
    <Main theme={theme}>
      <aside />
      <button
        className="theme-toggle"
        onClick={() =>
          theme === "Light" ? setTheme("Dark") : setTheme("Light")
        }
      >
        {theme === "Light" ? (
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
      <div className="content">
        <h1>Sign In</h1>
        <Form theme={theme}>
          <div className="group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="username"
            />
          </div>
          <div className="group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
            />
          </div>
          <div>
            <input
              type="checkbox"
              name="rememberPassword"
              id="rememberPassword"
              onChange={(e) => setRememberPassword(e.target.checked)}
            />
            <label
              htmlFor="rememberPassword"
              aria-checked={rememberPassword}
              role="checkbox"
            >
              Remember Password
            </label>
          </div>
          <input
            type="submit"
            value="Login"
            onClick={(e) => e.preventDefault()}
          />
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
            <button onClick={(e) => e.preventDefault()}>
              <FcGoogle
                size="1.5rem"
                role="img"
                aria-label="Authorizes with an Google account"
              />
              Authorize with Google
            </button>
          </div>

          <div>
            <button onClick={(e) => e.preventDefault()}>
              <GrFacebook
                color={theme === "Light" ? "#3c5a99" : "#FFF"}
                size="1.5rem"
                role="img"
                aria-label="Authorizes with an Facebook account"
              />
              Authorize with Facebook
            </button>
          </div>

          <div>
            <button onClick={(e) => e.preventDefault()}>
              <GrTwitter
                color="#1DA1F2"
                size="1.5rem"
                role="img"
                aria-label="Authorizes with an Twitter account"
              />
              Authorize with Twitter
            </button>
          </div>
        </Form>
      </div>
    </Main>
  );
}

export default SignIn;
