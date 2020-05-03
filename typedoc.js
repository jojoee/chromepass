module.exports = {
  src: [
    './src/chromepass.ts'
  ],
  mode: 'file',
  includeDeclarations: true,
  tsconfig: 'tsconfig.json',
  out: './doc',
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
  excludeNotExported: true,
  readme: 'readme.md',
  name: 'chromepass',
  ignoreCompilerErrors: true,
  plugin: 'none',
  listInvalidSymbolLinks: true,
  theme: 'markdown'
}
