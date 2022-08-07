import styled from "styled-components";

export const Container = styled.form<{theme: string}>`
    font-family: "Roboto", sans-serif;
    margin: 0 auto;
    padding: 10px 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    div {
        width: 100%;
    }

    div.group {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
        width: 100%;

        label {
            font-size: 1.1rem;
            font-weight: 400;
            color: ${ props => props.theme === "Light" ? "#202020" : "#FFF"};
            transition: color .2s;
        }
    }

    input[type="text"], input[type="password"] {
        width: 100%;
        padding: 4px 8px;
        font-size: 1.1rem;
        border-radius: 4px;
        border: 1.5px solid ${ props => props.theme === "Light" ? "#808080" : "#303030"};
        outline: none;
        transition-property: border, color, background;
        transition-duration: 200ms;
        background-color: ${ props => props.theme === "Light" ? "#FFF" : "#101010"};
        color: ${ props => props.theme === "Light" ? "#202020" : "#FFF"};
    }

    input[type="text"]:focus,  input[type="password"]:focus {
        border: 1.5px solid ${ props => props.theme === "Light" ? "#202020" : "#808080"};
    }

    input[type="checkbox"] {
        margin-right: 5px;
        cursor: pointer;
    }

    input[type="submit"] {
        margin: 20px auto;
        width: 100%;
        background-color: #404040;
        color: #FFF;
        border-radius: 4px;
        border: none;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 1.1rem;
        transition-property: background-color;
        transition-duration: 200ms;
        background-color: ${ props => props.theme === "Light" ? "#202020" : "#000"};

        &:hover {
            background-color: ${ props => props.theme === "Light" ? "#404040" : "#303030"};
        }
    }

    label[aria-checked], label, p {
        color: ${ props => props.theme === "Light" ? "#202020" : "#FFF"};
        transition: color .2s;
    }

    label[aria-checked] {
        cursor: pointer;
    }

    a, a:visited {
        text-decoration: none;
        font-weight: 500;
        transition: color .2s;
        color: ${(props) => (props.theme === "Light" ? "#1976D2" : "#EEE")};
    }

    a:hover {
        text-decoration: underline;
    }

    div.divider {
        margin: 20px 0;
        display: flex;
        column-gap: 10px;
        color: ${(props) => (props.theme === "Light" ? "#626262" : "#EEE")};
        transition: color .2s;

        span {
            background-color: red;
            flex: 1;
            height: 1.5px;
            align-self: center;
            background-color: ${(props) => (props.theme === "Light" ? "#AAA" : "#a8a8a8")}; 
            transition: background .2s;
        } 
    }

    button {
        margin-bottom: 20px;
        width: 100%;
        font-size: 0.8rem;
        background-color: ${(props) => (props.theme === "Light" ? "#FFF" : "#151515")};
        border-radius: 4px;
        border: 1.5px solid ${ props => props.theme === "Light" ? "#808080" : "#303030"};
        cursor: pointer;
        padding: 8px 12px;
        color: ${(props) => (props.theme === "Light" ? "#202020" : "#FFF")};
        transition: color .2s,  background-color .2s, border .2s;

        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 15px;

        &:hover {
            background-color: ${(props) => (props.theme === "Light" ? "#EEE" : "#202020")};
        }

        &.btn-google:hover {
            background-color: ${(props) => (props.theme === "Light" ? "#EEE" : "#FFF")};
            color: #202020;
            border-color: ${(props) => (props.theme === "Light" ? "#EEE" : "#FFF")};
        }

        &.btn-facebook svg {
            color: ${ props => props.theme === "Light" ? "#3c5a99" : "#FFF"};
            transition: color .2s;
        }

        &.btn-facebook:hover {
            color: #FFF;
            background-color: #3c5a99;
            border-color: #3c5a99;

            svg {
                color: #FFF;
            }
        }

        &.btn-twitter svg {
            color: #1DA1F2;
            transition: color .2s;
        }

        &.btn-twitter:hover {
            color: #FFF;
            background-color: #1DA1F2;
            border-color: #1DA1F2;
            
            svg {
                color: #FFF;
            }
        }
    }

`