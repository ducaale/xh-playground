import rust from "@wasm-tool/rollup-plugin-rust";

export default {
  input: {
    xh: "../Cargo.toml",
  },
  plugins: [
    rust(),
  ],
};