const { v4: uuidv4 } = require("uuid");
const Snippet = require("../models/Snippet");
// Generate unique ID for snippet
const generateSnippetId = () => {
  return uuidv4().replace(/-/g, "").substring(0, 12);
};
// Create new snippet
const createSnippet = async (req, res) => {
  try {
    const { code, language = "HTML", theme = "Dark" } = req.body;
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code content is required",
      });
    }
    const snippetId = generateSnippetId();
    const snippet = new Snippet({
      id: snippetId,
      code,
      language,
      theme,
    });
    await snippet.save();
    res.status(201).json({
      success: true,
      data: {
        id: snippet.id,
        url: `${req.protocol}://${req.get("host")}/api/snippets/${snippet.id}`,
        shareUrl: `${process.env.CORS_ORIGIN}/#${snippet.id}`,
      },
      message: "Snippet created successfully",
    });
  } catch (error) {
    console.error("Create snippet error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create snippet",
    });
  }
};
// Get snippet by ID
const getSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.findOne({ id });
    if (!snippet) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }
    res.json({
      success: true,
      data: {
        id: snippet.id,
        code: snippet.code,
        language: snippet.language,
        theme: snippet.theme,
        createdAt: snippet.createdAt,
        updatedAt: snippet.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get snippet error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve snippet",
    });
  }
};
// Get recent snippets (optional - for analytics)
const getRecentSnippets = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const snippets = await Snippet.find({})
      .select("id language theme createdAt")
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json({
      success: true,
      data: snippets,
      count: snippets.length,
    });
  } catch (error) {
    console.error("Get recent snippets error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve snippets",
    });
  }
};
module.exports = {
  createSnippet,
  getSnippet,
  getRecentSnippets,
};
