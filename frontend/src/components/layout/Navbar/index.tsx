import { Link } from "react-router-dom";

// Styles
import { Container, Content } from "./styles";

function Navbar() {
  return (
    <Container>
      <Content>
        <div className="logo">
          <Link to="/">Logo</Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/signin">Login</Link>
            </li>
          </ul>
        </nav>
      </Content>
    </Container>
  );
}

export default Navbar;
