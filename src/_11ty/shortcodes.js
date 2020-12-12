const CLOUDNAME = "siacodes"
const FOLDER = "v1607719366/sia.codes/"
const BASE_URL = `https://res.cloudinary.com/${CLOUDNAME}/image/upload/`;
const FALLBACK_WIDTHS = [ 300, 600, 680, 1360 ];
const FALLBACK_WIDTH = 680;
const SEO_ASPECT_RATIOS = ["1:1", "4:3", "16:9"]

function getSrcset(file, widths) {
  const widthSet = widths ? widths : FALLBACK_WIDTHS
  return widthSet.map(width => {
    return `${getSrc(file, width)} ${width}w`;
  }).join(", ")
}

function getSrc(file, width) {
  return `${BASE_URL}q_auto,f_auto,w_${width ? width : FALLBACK_WIDTH}/${FOLDER}${file}`
}

function fullSizeCrop(file, aspectRatio) {
  return `${BASE_URL}q_auto,ar_${aspectRatio},c_crop/${FOLDER}${file}`
}

module.exports = {
  srcset: (file, widths) => getSrcset(file, widths),
  src: (file, width) => getSrc(file, width),
  seoImages: (file) => {
    const imageSet = SEO_ASPECT_RATIOS.map(aspectRatio => fullSizeCrop(file, aspectRatio))
    return JSON.stringify(imageSet)
  }
}
