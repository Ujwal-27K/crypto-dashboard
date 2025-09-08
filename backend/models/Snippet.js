const mongoose = require("mongoose");
const snippetSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      enum: [
        "HTML",
        "CSS",
        "JavaScript",
        "Python",
        "Java",
        "C++",
        "TypeScript",
      ],
      default: "HTML",
    },
    theme: {
      type: String,
      required: true,
      enum: ["Dark", "Light", "Monokai", "Solarized"],
      default: "Dark",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
// Add index for better query performance
snippetSchema.index({ id: 1 });
snippetSchema.index({ createdAt: -1 });
const Snippet = mongoose.model("Snippet", snippetSchema);
module.exports = Snippet;
