/*module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};*/

/*module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};*/

/*module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'nativewind/babel'],
    plugins: ['react-native-reanimated/plugin'],
  };
};*/

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "expo-router/babel",
      "react-native-reanimated/plugin", // dernier
    ],
  };
};






/*module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      "nativewind/babel", // décommente seulement si tu utilises NativeWind
      "react-native-reanimated/plugin", // doit rester en dernier
    ],
  };
};

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      "nativewind/babel", // enlève cette ligne si tu n'utilises pas NativeWind
      "react-native-reanimated/plugin", // doit rester dernier
    ],
  };
};*/
