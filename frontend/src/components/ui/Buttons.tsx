import styled from "styled-components";

interface IButton {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Buttons = styled.button``;

export default ({ label, onClick }: IButton) => {
  return <Buttons onClick={onClick}>{label}</Buttons>;
};
