function createQueryString(object) {
  const keyValuePairs = [];
  for (const key in object) {
    keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(object[key]));
  }
  return keyValuePairs.join('&');
}

module.exports = createQueryString;
