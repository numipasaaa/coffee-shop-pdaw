import path from "path";

const config = {
    entry: "./src/components/index.js",
    mode: "development",
    module: {
        rules: [
            {
                exclude: /(node_modules)/,
                test: /\.(js|jsx)$/i,
                loader: "babel-loader"
            }
        ]
    },
    output: {
        path: path.resolve("./dist")
    },
    plugins: []
};

export default config;

