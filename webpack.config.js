const path = require('path');
//this configuration is because puppeter dependencie
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/main.ts',
    target:'web',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader:'ts-loader',
                    //this configuration is because puppeter dependencie
                    options: {
                        transpileOnly: true
                    }
                },
                exclude: /node_modules/,
            },
        ],
    },
    //this configuration is because puppeter dependencie
    externals: nodeExternals(),
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};