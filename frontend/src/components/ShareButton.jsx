import React from "react";
import styled from "styled-components";
const ShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const ShareButtonStyled = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${(props) => (props.disabled ? "#666" : "#007acc")};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  &:hover {
    background: ${(props) => (props.disabled ? "#666" : "#005a99")};
    transform: ${(props) => (props.disabled ? "none" : "translateY(-1px)")};
  }
  &:active {
    transform: ${(props) => (props.disabled ? "none" : "translateY(0)")};
  }
`;
const ShareUrl = styled.div`
  background: ${(props) => (props.theme === "Dark" ? "#2d2d2d" : "#f8f9fa")};
  border: 1px solid ${(props) => (props.theme === "Dark" ? "#555" : "#e0e0e0")};
  border-radius: 4px;
  padding: 0.75rem;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 0.85rem;
  color: ${(props) => (props.theme === "Dark" ? "#ffffff" : "#333333")};
  word-break: break-all;
  line-height: 1.4;
`;
const ShareUrlLabel = styled.label`
  font-weight: 600;
  color: ${(props) => (props.theme === "Dark" ? "#ffffff" : "#333333")};
  font-size: 0.9rem;
`;
const StatusIndicator = styled.div`
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-align: center;
  background: ${(props) => {
    if (props.type === "success") return "#d4edda";
    if (props.type === "warning") return "#fff3cd";
    return "transparent";
  }};
  color: ${(props) => {
    if (props.type === "success") return "#155724";
    if (props.type === "warning") return "#856404";
    return props.theme === "Dark" ? "#ffffff" : "#333333";
  }};
  border: 1px solid
    ${(props) => {
      if (props.type === "success") return "#c3e6cb";
      if (props.type === "warning") return "#ffeaa7";
      return "transparent";
    }};
`;
const ShareButton = ({
  onShare,
  isDisabled,
  isSharing,
  sharedUrl,
  theme,
  hasUnsavedChanges,
}) => {
  const getStatusMessage = () => {
    if (sharedUrl) {
      return { type: "success", message: "Code shared successfully!" };
    }
    if (hasUnsavedChanges && !isDisabled) {
      return { type: "warning", message: "You have unsaved changes" };
    }
    if (isDisabled && !sharedUrl) {
      return { type: "success", message: "Code is saved and shared" };
    }
    return { type: "info", message: "Ready to share your code" };
  };
  const status = getStatusMessage();
  return (
    <ShareContainer>
      <ShareButtonStyled onClick={onShare} disabled={isDisabled || isSharing}>
        {isSharing ? (
          <>
            <span>🔄</span>
            Sharing...
          </>
        ) : (
          <>
            <span>🚀</span>
            {isDisabled ? "Shared" : "Share Code"}
          </>
        )}
      </ShareButtonStyled>
      <StatusIndicator type={status.type} theme={theme}>
        {status.message}
      </StatusIndicator>
      {sharedUrl && (
        <>
          <ShareUrlLabel theme={theme}>
            Share URL (copied to clipboard):
          </ShareUrlLabel>
          <ShareUrl theme={theme}>{sharedUrl}</ShareUrl>
        </>
      )}
    </ShareContainer>
  );
};
export default ShareButton;
