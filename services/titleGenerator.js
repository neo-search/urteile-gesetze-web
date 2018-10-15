const title = (str, maxlength) => {
  if (!str) return null;

  if (str.length < maxlength) return str;

  const trimmedStr = str.substring(0, Math.min(str.length, maxlength + 1));
  return trimmedStr.substring(0, trimmedStr.lastIndexOf(" "));
};

export default { title };
