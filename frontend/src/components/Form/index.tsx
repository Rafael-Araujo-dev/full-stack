import { Container } from "./styles";

interface Properties {
  id?: string;
  _theme?: string;
  children?: React.ReactNode;
}

function Form({ children, id, _theme }: Properties) {
  return (
    <Container id={id} _theme={_theme}>
      {children}
    </Container>
  );
}

export default Form;
