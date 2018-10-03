import * as webpack from 'webpack'
import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'

function src(...paths: string[]) {
    return path.resolve(__dirname, '..', 'src', ...paths)
}

function dist(...paths: string[]) {
    return path.resolve(__dirname, '..', 'dist', ...paths)
}

const config: webpack.Configuration = {
    mode: (process.env.NODE_ENV === 'development' ? 'development' : 'production'),
    entry: {
        index: src('index.tsx')
    },
    output: {
        path: dist(),
        filename: '[name].js',
        pathinfo: false
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': src()
        }
    },
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: [
                    { 
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        } 
                    }
                ]
            },
            {
                test: /.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /.png$/,
                use: [
                    { loader: 'file-loader' }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: src('index.html')
        })
    ]
}

export default config
