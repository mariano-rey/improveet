import { useState } from "react";
import styled from "styled-components";

interface IInput {
  placeholder: string;
  id?: string;
}

const Inputs = styled.input`
  flex: 1;
`;

export default ({ placeholder, id }: IInput) => {
  const [value, setValue] = useState("");

  return (
    <Inputs
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
