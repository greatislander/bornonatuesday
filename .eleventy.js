const htmlmin = require('html-minifier');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const dateFilter = require('./src/filters/date-filter.js');
const w3cDateFilter = require('./src/filters/w3c-date-filter.js');
const navLinks = require('./src/filters/navLinks.js');
const extractCaptionShortcode = require('./src/shortcodes/extract-caption.js');
const extractImagesFilter = require('./src/filters/extract-images.js');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addLayoutAlias('main', 'layouts/main.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');

  eleventyConfig.addShortcode('extractCaption', extractCaptionShortcode);
  eleventyConfig.addFilter('extractImages', extractImagesFilter);

  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('src/admin/config.yml');

  eleventyConfig.addFilter('dateFilter', dateFilter);
  eleventyConfig.addFilter('w3cDateFilter', w3cDateFilter);
  eleventyConfig.addFilter('navLinks', navLinks);

  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if( outputPath.endsWith('.html') ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  return {
    dir: {
      input: './src'
    },
    passthroughFileCopy: true
  };
};
