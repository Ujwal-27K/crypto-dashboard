import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Toaster } from "react-hot-toast";
import { useCodeEditor } from "./hooks/useCodeEditor";
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import LanguageSelector from "./components/LanguageSelector";
import ThemeSelector from "./components/ThemeSelector";
import ShareButton from "./components/ShareButton";
import "./styles/globals.css";
const AppContainer = styled.div`
  min-height: 100vh;
  background: ${(props) => (props.theme === "Dark" ? "#0d1117" : "#f6f8fa")};
  color: ${(props) => (props.theme === "Dark" ? "#ffffff" : "#333333")};
  transition: all 0.3s ease;
`;
const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  min-height: calc(100vh - 80px);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1rem;
  }
`;
const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: ${(props) => (props.theme === "Dark" ? "#161b22" : "#ffffff")};
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.theme === "Dark" ? "#30363d" : "#e0e0e0")};
  height: fit-content;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    order: 2;
  }
`;
const EditorSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 768px) {
    order: 1;
  }
`;
const SectionTitle = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: ${(props) => (props.theme === "Dark" ? "#ffffff" : "#333333")};
  border-bottom: 2px solid #007acc;
  padding-bottom: 0.5rem;
`;
function App() {
  const {
    code,
    language,
    theme,
    isShareDisabled,
    isSharing,
    sharedUrl,
    hasUnsavedChanges,
    handleCodeChange,
    handleLanguageChange,
    handleThemeChange,
    shareCode,
    resetCode,
  } = useCodeEditor();
  const themeConfig = {
    theme,
  };
  return (
    <ThemeProvider theme={themeConfig}>
      <AppContainer theme={theme}>
        <Header theme={theme} onReset={resetCode} />
        <MainContent>
          <Sidebar theme={theme}>
            <div>
              <SectionTitle theme={theme}>Settings</SectionTitle>
              <LanguageSelector
                language={language}
                theme={theme}
                onChange={handleLanguageChange}
              />
            </div>
            <ThemeSelector theme={theme} onChange={handleThemeChange} />
            <div>
              <SectionTitle theme={theme}>Share</SectionTitle>
              <ShareButton
                onShare={shareCode}
                isDisabled={isShareDisabled}
                isSharing={isSharing}
                sharedUrl={sharedUrl}
                theme={theme}
                hasUnsavedChanges={hasUnsavedChanges}
              />
            </div>
          </Sidebar>
          <EditorSection>
            <CodeEditor
              code={code}
              language={language}
              theme={theme}
              onChange={handleCodeChange}
            />
          </EditorSection>
        </MainContent>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: theme === "Dark" ? "#333" : "#fff",
              color: theme === "Dark" ? "#fff" : "#333",
            },
          }}
        />
        <footer className="app-footer">
          <div className="footer-trademark">
            <p>
              Built by{" "}
              <a
                href="https://portfolio-eta-blush-qsq9j1ksqi.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Ujwal Khairnar</strong>
              </a>
            </p>
            <p>© 2025 Ujwal Khairnar. All rights reserved.</p>
            <div className="footer-links">
              <a
                href="https://github.com/Ujwal-27K"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <span>•</span>
              <a
                href="https://linkedin.com/in/ujwal-khairnar"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <span>•</span>
              <a href="mailto: ujwal.khairnar.uk@gmail.com">Contact</a>
            </div>
          </div>
        </footer>
      </AppContainer>
    </ThemeProvider>
  );
}
export default App;
