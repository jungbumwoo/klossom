const path = require("path");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "./src/assets", "./src/js", "./src/main.js");
const OUTPUT_DIR = path.join(__dirname, "./src/static");

const config = {
    entry: ENTRY_FILE,
    mode: MODE,
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugin() {
                                return [autoprefixer({ browsers: "cover 99.5%"})];
                            }
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    }
};

module.exports = config;