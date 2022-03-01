const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
    plugins: [
        require("postcss-url")({ url: "inline" }),
        require("postcss-import"),
        purgecss({
            content: [
                "./src/**/*.js",
                "./src/**/*.jsx",
                "./src/**/*.ts",
                "./src/**/*.tsx",
            ],
            css: ["./src/**/*.css"],
            whitelistPatterns: [/html/, /body/],
            defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || [],
        }),
        require("cssnano")({
            preset: "default",
        }),
    ],
};