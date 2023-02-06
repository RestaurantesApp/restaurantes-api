import Languages from '../../languages/index.js'

const languages = async (req, _res, next) => {
  let defaultLanguage = Object.keys(Languages)[0]
  let language = req.headers['accept-language'] ?? defaultLanguage
  if (!Object.keys(Languages).includes(language)) {
    language = defaultLanguage
  }
  const translation = property => {
    const translation = Languages[language]
    return translation[property]
  }
  req.t = translation
  return next()
}

export default languages
