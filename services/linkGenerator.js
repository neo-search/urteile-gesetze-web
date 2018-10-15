const generateUrteilslandingpageLink = query => {
  return (
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
  )
}

export default { generateUrteilslandingpageLink }
