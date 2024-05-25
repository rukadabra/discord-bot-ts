module.exports = {
  apps: [
    {
      script: "dist/index.js",
      watch: ["src"],
      // Delay between restart
      watch_delay: 1000,
      ignore_watch: ["node_modules", "\\.git", "*.log"],
    },
  ],
};
