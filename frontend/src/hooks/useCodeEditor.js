import { useState, useEffect, useCallback } from "react";
import { DEFAULT_HTML_CODE, SAMPLE_CODES } from "../utils/constants";
import { snippetAPI } from "../services/api";
import toast from "react-hot-toast";
export const useCodeEditor = () => {
  const [code, setCode] = useState(DEFAULT_HTML_CODE);
  const [language, setLanguage] = useState("HTML");
  const [theme, setTheme] = useState("Dark");
  const [isShareDisabled, setIsShareDisabled] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [sharedUrl, setSharedUrl] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  // Load snippet from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      loadSnippet(hash);
    }
  }, []);
  // Track unsaved changes
  const handleCodeChange = useCallback((newCode) => {
    setCode(newCode);
    setHasUnsavedChanges(true);
    setIsShareDisabled(false);
    setSharedUrl("");
  }, []);
  // Change language and load sample code
  const handleLanguageChange = useCallback((newLanguage) => {
    setLanguage(newLanguage);
    if (SAMPLE_CODES[newLanguage]) {
      setCode(SAMPLE_CODES[newLanguage]);
      setHasUnsavedChanges(true);
      setIsShareDisabled(false);
      setSharedUrl("");
    }
  }, []);
  // Change theme
  const handleThemeChange = useCallback((newTheme) => {
    setTheme(newTheme);
  }, []);
  // Load snippet by ID
  const loadSnippet = useCallback(async (snippetId) => {
    try {
      const response = await snippetAPI.getSnippet(snippetId);
      if (response.success) {
        setCode(response.data.code);
        setLanguage(response.data.language);
        setTheme(response.data.theme);
        setHasUnsavedChanges(false);
        setIsShareDisabled(true);
        toast.success("Snippet loaded successfully!");
      }
    } catch (error) {
      console.error("Failed to load snippet:", error);
      toast.error("Failed to load snippet: " + error.message);
    }
  }, []);
  // Share current code
  const shareCode = useCallback(async () => {
    if (!code.trim()) {
      toast.error("Cannot share empty code");
      return;
    }
    setIsSharing(true);
    try {
      const response = await snippetAPI.createSnippet({
        code,
        language,
        theme,
      });
      if (response.success) {
        const shareUrl = response.data.shareUrl;
        setSharedUrl(shareUrl);
        setIsShareDisabled(true);
        setHasUnsavedChanges(false);
        // Update URL hash
        window.history.replaceState(null, "", `#${response.data.id}`);
        toast.success("Code shared successfully!");
        // Copy to clipboard
        try {
          await navigator.clipboard.writeText(shareUrl);
          toast.success("Share URL copied to clipboard!");
        } catch (clipboardError) {
          console.warn("Failed to copy to clipboard:", clipboardError);
        }
        return shareUrl;
      }
    } catch (error) {
      console.error("Failed to share code:", error);
      toast.error("Failed to share code: " + error.message);
    } finally {
      setIsSharing(false);
    }
  }, [code, language, theme]);
  // Reset to default code
  const resetCode = useCallback(() => {
    setCode(DEFAULT_HTML_CODE);
    setLanguage("HTML");
    setTheme("Dark");
    setIsShareDisabled(false);
    setSharedUrl("");
    setHasUnsavedChanges(false);
    window.history.replaceState(null, "", window.location.pathname);
    toast.success("Code reset to default");
  }, []);
  return {
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
    loadSnippet,
    resetCode,
  };
};
