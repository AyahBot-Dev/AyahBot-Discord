module.exports = {
  apps: [
    {
      name: "AyahBot",
      script: "./index.js",
      node_args: "-r dotenv/config",
    },
  ],
};
