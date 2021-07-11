// this list should match the `filter` list in tags.njk
const excludedTags = ["all", "nav", "post", "posts"]
const externalWriting = require('../_data/external_writing.js')

module.exports = function(collection) {
  let tagSet = new Set();
  collection.getAll().forEach(function(item) {
    if( "tags" in item.data ) {
      let tags = item.data.tags.filter(item => !excludedTags.includes(item));

      for (const tag of tags) {
        tagSet.add(tag);
      }
    }
  });
  externalWriting.forEach(item => {
    for (const tag of item.tags) {
      tagSet.add(tag)
    }
  })

  // returning an array in addCollection works in Eleventy 0.5.3
  return [...tagSet];
};
