const webpack = require('webpack');
const extractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        'index': './index',
    },

    output:{
        path:'dist',
        filename:'[name]-[chunkhash].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: extractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {
                test:  /\.(png|jpg)$/,
                loader:'url-loader?limit=200000000&name=images/[name].[hash].[ext]'
            }
        ],
    },
    plugins: [
        new extractTextPlugin('[name].[contenthash:4].css'),
    ],
}