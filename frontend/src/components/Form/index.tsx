import { Container } from "./styles";

interface Properties {
  theme?: string | null;
  children?: React.ReactNode;
}

function Form({ children, theme }: Properties) {
  return <Container theme={theme}>{children}</Container>;
}

export default Form;
