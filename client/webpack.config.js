const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.jsx", // Entry file
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/", // Ensures React Router works with direct URL access
        clean: true, // Clears dist folder on rebuild
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"], // Resolve these file types
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/, // Babel for JSX/TSX
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/, // CSS loader
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/, // Image loader
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html", // HTML template
        }),
        new MiniCssExtractPlugin(),
    ],
    devServer: {
        static: path.resolve(__dirname, "dist"),
        compress: true,
        port: 3000,
        historyApiFallback: true, // Ensures React Router works with direct URL access
    },
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
};
