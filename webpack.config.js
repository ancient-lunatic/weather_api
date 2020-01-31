const path = require('path');
module.exports =  {
    mode: 'production',
    entry: './index.ts',
    output: {
        path :  path.resolve(__dirname , "dist"),
        filename: 'bundle.js'
    },

    node: {
        global: true,
        // __filename: 'mock',
        // __dirname: 'mock',
      },
    devtool: 'none',
    module: {
        rules: [
            {
                test: /\.ts?$/,
            
            //     use:[
            //         {
            //             loader: 'expose-loader',
            //             options:{...options}
            //     }]
            //    ,
                use : 'ts-loader',
                exclude: /node_modules/,
            },
        ]
        // [
        //         {
        //           test: /\.exec\.js$/,
        //           use: [ 'script-loader' ]
        //         }
        // ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
};