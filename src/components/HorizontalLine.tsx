import styled from "styled-components";

export const HorizontalLine = styled.hr`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.outline};
`;
