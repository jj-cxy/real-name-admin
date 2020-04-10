module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry'
      }
    ]
  ],
  // if your use import on Demand, Use this code
  plugins: [
    ['import', {
      'libraryName': 'Antd',
      'libraryDirectory': 'es',
      'style': 'css' // `style: true` 会加载 less 文件
    }]
  ]
}
