// Plugins

// Filters
const dateFilter = require("./src/filters/date-filter.js");

// Transforms
const htmlMinTransform = require("./src/transforms/html-min-transform.js");

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === "production";

// Functions
const sortByDisplayOrder = require("./src/utils/sort-by-display-order.js");

module.exports = (config) => {
    // Only minify HTML if we are in production because it slows builds _right_ down
    if (isProduction) {
        config.addTransform("htmlmin", htmlMinTransform);
    }

    // Add filters
    config.addFilter("dateFilter", dateFilter);

    // Add plugins

    // Returns a collection of blog posts in reverse date order
    config.addCollection("blog", (collection) => {
        return [...collection.getFilteredByGlob("./src/posts/*.md")].reverse();
    });

    // Returns work items, sorted by display order
    config.addCollection("work", (collection) => {
        return sortByDisplayOrder(
            collection.getFilteredByGlob("./src/work/*.md")
        );
    });

    // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
    config.setUseGitIgnore(false);

    return {
        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dir: {
            input: "src",
            output: "dist",
        },
    };
};
