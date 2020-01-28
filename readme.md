# MultiMarkdown 6 JS

JavaScript wrapper for multimarkdown executable, requires make and cmake for building.

### Install

```bash
yarn add multimarkdown-6
```

### Usage

###### From cli

```bash
multimarkdown [-bfscarm] [--help] [--version] [--random] [--unique] [--nosmart]
              [--nolabels] [--notransclude] [--opml] [--itmz] [-t FORMAT]
              [-o FILE] [-l LANG] [-e KEY] [<FILE>]...
```

See [Documentation](https://fletcher.github.io/MultiMarkdown-6/MMD_Users_Guide.html#usage)

###### From node

```javascript
import multimarkdown from 'multimarkdown-6'

;(async () => {
  console.log(await multimarkdown({ source: '# Lorem' }))
  console.log(await multimarkdown({ path: 'readme.md' }))
  console.log(await multimarkdown({ path: ['a.md', 'b.md'] }))
})()

console.log(multimarkdown.sync({ source: '# Lorem' }))
console.log(multimarkdown.sync({ path: 'readme.md' }))
console.log(multimarkdown.sync({ path: ['a.md', 'b.md'] }))
```

In additions to the `source` and `path` parameters which are used as input, all multimarkdown cli options are available with the same name.
