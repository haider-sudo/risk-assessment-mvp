/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}
    // Note: autoprefixer is now included in @tailwindcss/postcss
    // so we don't need to list it as a separate plugin.
  }
}