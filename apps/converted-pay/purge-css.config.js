module.exports = {
    content: ['./dist/apps/converted-pay/index.html','./dist/apps/converted-pay/*.js'],
    css: ['./dist/apps/converted-pay/*.css'],
    safelist: {
      deep: [/^p-toast/,/^p-badge/,/dynamicdialog$/],
      greedy:[/dialog$/,]
    },
    output: './dist/apps/converted-pay/',
    skippedContentGlobs:['./dist/apps/converted-pay/flagIcons*.css','./dist/apps/converted-pay/appStyles*.css'],
    defaultExtractor: content => {
        // Match normal classes and media query prefixed classes
        return content.match(/[\w-/.:]+(?<!:)/g) || [];
      },
  }