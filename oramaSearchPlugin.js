// oramaSearchPlugin.js
const { create, insert, search } = require('@orama/orama');
const path = require('path');
const fs = require('fs').promises;

module.exports = function oramaSearchPlugin(context, options) {
  let db;

  return {
    name: 'docusaurus-orama-search',

    async loadContent() {
      // Create the Orama database
      db = await create({
        schema: {
          title: 'string',
          content: 'string',
          url: 'string',
        },
      });

      // Get the docs directory path
      const docsDir = path.join(context.siteDir, 'docs');

      // Read all markdown files in the docs directory
      const files = await fs.readdir(docsDir);
      const markdownFiles = files.filter(file => file.endsWith('.md'));
      console.log("this is the markdown files", markdownFiles);
      // Process each markdown file
      for (const file of markdownFiles) {
        const filePath = path.join(docsDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        console.log(content);
        // Extract title from the first line (assuming it's a # heading)
        const title = content.split('\n')[0].replace('#', '').trim();

        // Insert document into Orama database
        await insert(db, {
          title,
          content,
          url: `/docs/${file.replace('.md', '')}`,
        });

        console.log(`Indexed document: ${file}`);
      }

      return db;
    },

    async contentLoaded({ content, actions }) {
      // You can perform additional actions here if needed
      console.log('Content loaded. Database size:', db.size);
    },

    async postBuild({ siteConfig, routesPaths, outDir }) {
      // You can perform actions after the build is complete
      console.log('Build completed. Indexed documents:', db.size);
    },

    injectHtmlTags() {
      // Inject any necessary HTML tags (e.g., for search UI)
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              type: 'text/javascript',
            },
            innerHTML: `
              // Your client-side search logic here
              console.log('Orama search initialized');
            `,
          },
        ],
      };
    },
  };
};