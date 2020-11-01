module.exports.generateDocumentslandingpageLink = function (query) {
  const url =
    '/' +
    query
      .toLowerCase()
      .split(' ')
      .join('-')
      .split('ö')
      .join('oe')
      .split('ä')
      .join('ae')
      .split('ü')
      .join('ue')
      .split('ß')
      .join('ss')
  return url
}

module.exports.generateUrteilslandingpageLink = function (query) {
  const url =
    '/' +
    query
      .toLowerCase()
      .split(' ')
      .join('-')
      .split('ö')
      .join('oe')
      .split('ä')
      .join('ae')
      .split('ü')
      .join('ue')
      .split('ß')
      .join('ss') +
    '-urteile'
  return url
}
