var path = require('path');
var webpack = require('webpack');
var SRC = path.join(__dirname, 'src/');
var NODE_MODULES = path.join(__dirname, 'node_modules/');
console.log(__dirname)
module.exports = [{
    entry: './src/app.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public/build'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', 'jpg','.css', 'png'],
        alias: {
            Common: path.resolve(__dirname, 'src/components/scss/')
        }
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader'
            },
            {
                test: /\.js?$/,
                include: path.join(__dirname, '/node_modules'),
                use: 'babel-loader',
            },
            { 
                test: /\.json$/,
                use: 'json-loader' 
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            /*{
                test: /\.(png|jpg|svg)$/,
                include: __dirname + '/src/images/',
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './build/images/'
                    }
                }
            }
            */
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // nned to research this more sounds close to cache busting
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'

    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }

}];
