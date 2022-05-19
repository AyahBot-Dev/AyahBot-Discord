module.exports = {
  apps: [
    {
      name: "AyahBot",
      script: "./index.js",
      node_args: "--experimental-specifier-resolution=node -r dotenv/config",
    },
  ],
};
