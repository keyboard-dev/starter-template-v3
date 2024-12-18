module.exports = {
  plugins: [
    require('postcss-import')({
      // Options for postcss-import
      path: ['node_modules'],
      resolve: (id, basedir, importOptions) => {
        if (id.startsWith('@scalar/')) {
          return require.resolve(id);
        }
        return id;
      },
      onImport: (sources) => {
        sources.forEach((source) => {
          if (source.startsWith('@scalar/')) {
            console.log(`Imported: ${source}`);
          }
        });
      },
    }),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}