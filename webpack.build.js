var path = require('path');
var webpack = require('webpack');
var ExtractStyle = require("extract-text-webpack-plugin");
var butter_components = new RegExp('node_modules\\'+path.sep+'(butter-.*)');

var butter_themes = Object.keys(packageJSON.devDependencies)
                          .concat(Object.keys(packageJSON.dependencies))
                          .filter((p) => (/(butter-theme-.*)/.test(p)))

var all_includes = [
    path.join(process.env.PWD||process.cwd(), './src'),
    path.join(process.env.PWD||process.cwd(), './test'),
    butter_components
];

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-md-icons',
        'butter-theme-base',
        './src/index.js'
    ].concat(butter_themes),
    output: {
        path: path.join(process.env.PWD||process.cwd(), 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/',
        libraryTarget: 'umd'
    },
    externals: {
        'react': { commonjs: 'react', commonjs2: 'react', amd: 'react', root: 'React' },
        'react-dom': { commonjs: 'react-dom', commonjs2: 'react-dom', amd: 'react-dom', root: 'ReactDOM' },
        'react-i18next':  { commonjs: 'react-i18next', commonjs2:'react-i18next', amd: 'react-i18next', root: 'react-i18next' }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            include: all_includes,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
        }, {
            test: /\.(styl)$/,
            include: all_includes,
            loader: ExtractStyle.extract({
                fallback:  "style-loader",
                loader: [
                    "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
                    {
                        loader: 'stylus-loader',
                        options: {
                            use: [require('nib')()],
                            import: ['~nib/index.styl', path.join(__dirname, 'styl/app.styl')]
                        }
                    }
                ]

            })
        }, {
            test: /\.css$/,
            loader: ExtractStyle.extract({
                fallback:  "style-loader",
                loader: "css-loader?importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
            })
        }, {
            test: /\.(jpg|png|svg|woff2?|eot|ttf).*$/,
            loader: 'url-loader?limit=100000'
        }]
    },
    plugins: [
        new ExtractStyle('styles.css')
    ]
};
