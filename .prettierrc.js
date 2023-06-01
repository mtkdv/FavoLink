/** @type {import("prettier").Config} */
const config = {
  overrides: [
    {
      files: "*.md",
      // options: { parser: "markdown-nocjsp", quickFix: true },
      options: { parser: "markdown-nocjsp" },
    },
  ],
};

module.exports = config;
