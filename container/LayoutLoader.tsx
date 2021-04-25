import React from "react";
import ContentLoader, { List } from "react-content-loader";
import styled from "styled-components";
import Divider from "../components/Divider";
import palette from "../theme/palette";

const Wrapper = styled.div`
  overflow: hidden;
  position: absolute;
  height: 100vh;
  width: 100%;
`;
const { primary } = palette;
export default function LayoutLoader() {
  return (
    <Wrapper>
      <ContentLoader
        viewBox="0 0 380 20"
        backgroundColor={primary.dark}
        foregroundColor={primary.light}
        height="5rem"
      >
        <rect x="0" y="0" width="1000" height="70" />
      </ContentLoader>
      <List />
      <Divider />
      <br />
      <List />
      <Divider />
      <br />
      <List />
      <Divider />
      <br />
      <List />
      <Divider />
      <br />
      <List />
      <Divider />
      <br />
      <List />
      <Divider />
      <br />
      <List />
    </Wrapper>
  );
}
