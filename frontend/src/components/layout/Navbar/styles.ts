import styled from "styled-components";

export const Container = styled.header`
    background-color: #303030;
    padding: 10px 5%;
`;

export const Content = styled.div`
    margin: auto;
    max-width: 1100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    .logo {
        align-self: center;
        cursor: pointer;
        a {
            color: #FFF;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 1.4rem;
        }
    }

    ul {
        display: flex;
        list-style: none;
        column-gap: 20px;
    }

    li {
        color: #FFF;
        font-size: 1.2rem;
        cursor: pointer;

        a {
            color: #FFF;
            text-decoration: none;
        }
    }

    li:hover {
        text-decoration: underline;
    }
`