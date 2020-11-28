module.exports = {
  ignore: ["**/*.d.ts"],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "80",
        },
        modules: false,
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: ["@babel/plugin-proposal-class-properties"],
};
