module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      ["@babel/preset-env", { targets: { node: "current" } }],
      '@babel/preset-typescript',
    ],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".jsx",
            ".js",
            ".json",
          ],
          alias: {
            screens: "./src/screens",
            navigation: "./src/navigation",
            assets: "./src/assets",
            config: "./src/config",
            components: "./src/components",
            reducers: "./src/reducers",
            store: "./src/store",
            middlewares: "./src/middlewares",
            utils: "./src/utils",
            services: "./src/services",
          },
        },
      ],
    ],
  };
};
