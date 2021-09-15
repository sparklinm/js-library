module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                useBuiltIns: 'usage',
                corejs: 3,
                targets: {
                    // 目标浏览器版本，该浏览器缺失某新语法，babel才会引入这个新语法
                    ie: 11
                }
            }
        ]
    ],
    plugins: [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: {
                    version: false // 可选 false | 2 | 3
                    // proposals: true
                }
            }
        ],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-private-methods'
    ],
    ignore: ['node_modules/**']
}
