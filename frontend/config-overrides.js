/* eslint-disable @typescript-eslint/no-var-requires */
const { override } = require("customize-cra");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function singleSpa(config) {
    if (!process.env.SINGLE_SPA) {
        return config;
    }

    config.entry = "./src/single-spa-entry.tsx";
    config.output = {
        ...config.output,
        filename: "bundle.js",
        libraryTarget: "system",
    };
    config.externals = {
        react: "react",
        "react-dom": "react-dom",
    };
    delete config.optimization;
    config.plugins = config.plugins.filter(
        plugin => plugin.constructor.name !== "HtmlWebpackPlugin" && plugin.constructor.name !== "MiniCssExtractPlugin"
    );
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: "bundle.css",
        })
    );
    return config;
}

module.exports = override(singleSpa);