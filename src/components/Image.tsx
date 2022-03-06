import React from "react";
import styled from "styled-components";

const Wrapper = styled.img`
  display: block;
  border-radius: 8px;
`;

function Image(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <Wrapper {...props} />;
}

export default Image;
