module.exports.extractKeyValue = function (obj) {
  const result = {}
  Object.keys(obj).forEach(function (key) {
    result[key] = JSON.stringify(obj[key])
  })
  return result
}
