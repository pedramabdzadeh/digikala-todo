const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    watch: true,
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        library: 'app' // to enable as object in window
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                 test: /\.(png|svg|jpg|gif)$/,
                 use: [
                       'file-loader',
                 ],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from:'src/assets/icons',
                to:'assets/'
            }
        ]),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss']
    },
    mode: 'development'
};
