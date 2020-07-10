module.exports = {
  source: {
    include: [],
    exclude: [],
    includePattern: '.+\\.js(doc|x)?$',
    excludePattern: '(^|\\/|\\\\)_'
  },
  plugins: ['plugins/markdown'], // 使用markdown 插件
  markdown: {
    tags: ['file'], // 增加额外需要解析的标签
    excludeTags: ['author'], // 排除不用解析的标签
    parser: 'gfm', // gfm
    hardwrap: true // 允许多行
  },
  templates: {
    // 模板配置，包含了 DocStrap 的配置参数
    // "logoFile": "images/logo.png",        //logo 文件路径
    cleverLinks: false,
    monospaceLinks: false,
    // dateFormat: 'ddd MMM Do YYYY', // 当需要打印日期时使用的格式
    outputSourceFiles: true, // 是否输出文件源码
    outputSourcePath: true, // 是否输出源码路径
    systemName: 'Tool Function', // 系统名称
    footer: '', // 页脚内容
    // copyright: 'https://lzw.me.', // 页脚版权信息
    navType: 'vertical', // vertical 或 inline
    // docstrap 模板主题。可取值: cosmo, cyborg, flatly, journal, lumen, paper,
    // readable, sandstone, simplex, slate, spacelab, superhero, united, yeti
    theme: 'spacelab',
    linenums: true, // 是否显示行号
    collapseSymbols: false, // 是否折叠太长的内容
    inverseNav: true, // 导航是否使用 bootstrap 的 inverse header
    protocol: 'html://', // 生成文档使用的阅读协议
    methodHeadingReturns: true // method 方法标题上是否包含返回类型
  },
  // 命令行执行参数配置。在这里配置了后
  // 命令行只需要执行: jsdoc -c jsdoc-conf.json 即可
  opts: {
    // 'template': 'templates/default', // 使用 JSDoc 默认模板
    template: './node_modules/ink-docstrap/template', // 使用 docstrap 模板
    destination: './docs/', // 输出目录。等同于 -d ./out/
    recurse: true, // 是否递归查找。 -r
    debug: true, // 启用调试模式。--debug
    readme: './util/README.md' // 要写到文档首页的 readme 文档。-R README.md
  }
}
