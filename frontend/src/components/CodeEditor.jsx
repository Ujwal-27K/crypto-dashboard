import React from "react";
import Editor from "@monaco-editor/react";
import styled from "styled-components";
const EditorContainer = styled.div`
  flex: 1;
  min-height: 500px;
  border: 1px solid ${(props) => (props.theme === "Dark" ? "#333" : "#e0e0e0")};
  border-radius: 8px;
  overflow: hidden;
  background: ${(props) => (props.theme === "Dark" ? "#1e1e1e" : "#ffffff")};
`;
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  color: ${(props) => (props.theme === "Dark" ? "#ffffff" : "#333333")};
  font-size: 1.1rem;
`;
const getMonacoLanguage = (language) => {
  const languageMap = {
    HTML: "html",
    CSS: "css",
    JavaScript: "javascript",
    TypeScript: "typescript",
    Python: "python",
    Java: "java",
    "C++": "cpp",
  };
  return languageMap[language] || "plaintext";
};
const getMonacoTheme = (theme) => {
  const themeMap = {
    Dark: "vs-dark",
    Light: "vs",
    Monokai: "vs-dark",
    Solarized: "vs-dark",
  };
  return themeMap[theme] || "vs-dark";
};
const CodeEditor = ({ code, language, theme, onChange }) => {
  const handleEditorChange = (value) => {
    onChange(value || "");
  };
  return (
    <EditorContainer theme={theme}>
      <Editor
        height="500px"
        language={getMonacoLanguage(language)}
        theme={getMonacoTheme(theme)}
        value={code}
        onChange={handleEditorChange}
        loading={
          <LoadingContainer theme={theme}>Loading editor...</LoadingContainer>
        }
        options={{
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          minimap: { enabled: true },
          automaticLayout: true,
          wordWrap: "on",
          folding: true,
          lineNumbersMinChars: 3,
          scrollbar: {
            vertical: "visible",
            horizontal: "visible",
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false,
          },
        }}
      />
    </EditorContainer>
  );
};
export default CodeEditor;
