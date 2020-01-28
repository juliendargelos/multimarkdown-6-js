const { spawn, spawnSync } = require('child_process')
const { bin } = require('./package.json')

const executable = require.resolve(bin.multimarkdown)

const defaultOptions = {
  batch: false,
  full: false,
  snippet: false,
  compatibility: false,
  random: false,
  unique: false,
  nosmart: false,
  nolabels: false,
  notransclude: false,
  opml: false,
  itmz: false,
  to: null,
  output: null,
  accept: false,
  reject: false,
  lang: null,
  metadataKeys: false,
  extract: null
}

function args({ path = [], ...options }) {
  return [
    ...Object
      .entries({ ...defaultOptions, ...options })
      .reduce((options, [option, value]) => {
        option in defaultOptions && value && options.push(`--${option}${
          typeof defaultOptions[option] === 'boolean' ? '' : `=${value}`
        }`)
        return options
      }, []),
    ...(Array.isArray(path) ? path : [path]).filter(Boolean)
  ]
}

function multimarkdown({ source = '', ...options }) {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(executable, args(options))

    function error() {
      childProcess.removeListener('exit', exit)
      reject(new Error(`${childProcess.stderr.read()}`))
    }

    function exit(code) {
      childProcess.removeListener('error', error)
      code === 0 ? resolve(`${childProcess.stdout.read()}`) : error()
    }

    childProcess.once('error', error)
    childProcess.once('exit', exit)

    if (source) {
      childProcess.stdin.write(source)
      childProcess.stdin.end()
    }
  })
}

function multimarkdownSync({ source = '', ...options }) {
  const result = spawnSync(executable, args(options), { input: source })
  if (result.error) throw result.error
  return result.output.filter(Boolean).map(String).join('')
}

multimarkdown.sync = multimarkdownSync
module.exports = multimarkdown
