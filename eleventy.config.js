const handlebars = require("@11ty/eleventy-plugin-handlebars");
const { parse } = require('marked');
const matter = require('gray-matter');

module.exports = function (eleventyConfig) {
    console.log("Custom Eleventy Configuration");

    // Register the Handlebars plugin
    eleventyConfig.addPlugin(handlebars);

    // Passthrough for CSS and images
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("src/Screenshots");

    // Set Handlebars and Markdown as template formats
    eleventyConfig.setTemplateFormats(["md", "hbs"]);

    // Register the Handlebars helper
    eleventyConfig.addShortcode("markdownToHTML", function (content) {
        if (!content) return "";
        const parsed = matter(content); // Extract front matter
        return parse(parsed.content);   // Convert Markdown content to HTML
    });

    return {
        dir: {
            input: "src",    // Source folder for templates
            output: "dist",  // Output folder for the built site
            data: "_data"    // Folder where JSON files are stored
        }
    };
};
