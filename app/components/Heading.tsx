import styled from "styled-components";

type HeadingProps = {
  as: "h1" | "h2" | "h3";
};

const Heading = styled.h1<HeadingProps>`
  ${(props) =>
    props.as &&
    `
  font-size: ${
    props.as === "h1"
      ? "2rem"
      : props.as === "h2"
      ? "1.2rem"
      : props.as === "h3"
      ? "0.8rem"
      : ""
  };
  font-weight: 500;
  `}
`;

export default Heading;
