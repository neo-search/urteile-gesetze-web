const title = str => niceTrim(str, 63);

const description = str => niceTrim(str, 155);

const niceTrim = (str, length) => {
  if (!str) return null;

  if (str.length < length) return str;

  const trimmedStr = str.substring(0, Math.min(str.length, length + 1));
  return trimmedStr.substring(0, trimmedStr.lastIndexOf(" ")) + "...";
};

export default { title, description };
