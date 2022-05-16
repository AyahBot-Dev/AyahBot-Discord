module.exports = {
  apps: [
    {
      name: "AyahBot",
      script: "./src/index.js",
      node_args: "-r dotenv/config",
    },
  ],
};
