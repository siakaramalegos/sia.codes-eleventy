const fs = require('fs')

// get cache contents from json file
function readFromCache(cacheFilePath) {
  if (fs.existsSync(cacheFilePath)) {
    const cacheFile = fs.readFileSync(cacheFilePath)
    return JSON.parse(cacheFile)
  }

  // no cache found.
  return {
    lastFetched: null,
    children: []
  }
}

// save combined webmentions in cache file
function writeToCache(data, cacheFilePath, descriptor) {
  const dir = '_cache'
  const fileContent = JSON.stringify(data, null, 2)
  // create cache folder if it doesnt exist already
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  // write data to cache json file
  fs.writeFile(cacheFilePath, fileContent, err => {
    if (err) throw err
    console.log(`>>> ${descriptor} cached to ${cacheFilePath}`)
  })
}

module.exports = {
  readFromCache,
  writeToCache,
}
