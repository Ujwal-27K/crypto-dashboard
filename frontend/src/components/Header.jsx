import React from "react";
import styled from "styled-components";
const HeaderContainer = styled.header`
  background: ${(props) => (props.theme === "Dark" ? "#1e1e1e" : "#ffffff")};
  color: ${(props) => (props.theme === "Dark" ? "#ffffff" : "#333333")};
  padding: 1rem 2rem;
  border-bottom: 1px solid
    ${(props) => (props.theme === "Dark" ? "#333" : "#e0e0e0")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #007acc;
`;
const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
const ResetButton = styled.button`
  background: transparent;
  border: 1px solid ${(props) => (props.theme === "Dark" ? "#555" : "#ccc")};
  color: ${(props) => (props.theme === "Dark" ? "#ffffff" : "#333333")};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  &:hover {
    background: ${(props) => (props.theme === "Dark" ? "#555" : "#f0f0f0")};
  }
`;
const Header = ({ theme, onReset }) => {
  return (
    <HeaderContainer theme={theme}>
      <HeaderContent>
        <Logo>NoteCode</Logo>
        <Nav>
          <ResetButton theme={theme} onClick={onReset}>
            Reset Code
          </ResetButton>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};
export default Header;
