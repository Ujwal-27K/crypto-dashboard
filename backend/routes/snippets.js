const express = require('express');
const router = express.Router();
const {
createSnippet,
getSnippet,
getRecentSnippets
} = require('../controllers/snippetController');
// POST /api/snippets - Create new snippet
router.post('/', createSnippet);
// GET /api/snippets/:id - Get snippet by ID
router.get('/:id', getSnippet);
// GET /api/snippets - Get recent snippets (optional)
router.get('/', getRecentSnippets);
module.exports = router;