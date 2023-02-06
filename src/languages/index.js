import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const en = require('./en.json')
const es = require('./es.json')

export default { en, es }
