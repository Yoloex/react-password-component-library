module.exports = {
  roots: ["<rootDir>/src/components/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^.+\\.(s?css|less|jpg|png|svg)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"]
  // ... other options ...
};
