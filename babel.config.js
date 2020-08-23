module.exports = {
  presets: [
    [
      "@vue/app",
      {
        useBuiltIns: "entry",
        // polyfills: ["es6.promise", "es6.symbol"],
        targets: ["chrome >= 49"],
      },
    ],
  ],
};
