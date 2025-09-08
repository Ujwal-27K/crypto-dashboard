import React from "react";
import styled from "styled-components";
import { LANGUAGES } from "../utils/constants";
const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Label = styled.label`
  font-weight: 600;
  color: ${(props) => (props.theme === "Dark" ? "#ffffff" : "#333333")};
  font-size: 0.9rem;
`;
const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.theme === "Dark" ? "#555" : "#ccc")};
  border-radius: 4px;
  background: ${(props) => (props.theme === "Dark" ? "#2d2d2d" : "#ffffff")};
  color: ${(props) => (props.theme === "Dark" ? "#ffffff" : "#333333")};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:focus {
    outline: none;
    border-color: #007acc;
    box-shadow: 0 0 0 2px rgba(0, 122, 204, 0.2);
  }
  &:hover {
    border-color: ${(props) => (props.theme === "Dark" ? "#777" : "#999")};
  }
  option {
    background: ${(props) => (props.theme === "Dark" ? "#2d2d2d" : "#ffffff")};
    color: ${(props) => (props.theme === "Dark" ? "#ffffff" : "#333333")};
  }
`;
const LanguageSelector = ({ language, theme, onChange }) => {
  return (
    <SelectorContainer>
      <Label htmlFor="language-select" theme={theme}>
        Language
      </Label>
      <Select
        id="language-select"
        value={language}
        onChange={(e) => onChange(e.target.value)}
        theme={theme}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </Select>
    </SelectorContainer>
  );
};
export default LanguageSelector;
